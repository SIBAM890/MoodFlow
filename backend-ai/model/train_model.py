import os, pandas as pd, pickle, numpy as np, faiss, time

# Safely load the .env variables natively
try:
    with open(os.path.join(os.path.dirname(__file__), '..', '.env'), 'r') as f:
        for line in f:
            if line.strip() and not line.startswith('#'):
                k, v = line.strip().split('=', 1)
                os.environ[k.strip()] = v.strip().strip('\"\'')
except Exception:
    pass

from google import genai
from google.genai import types
from tqdm import tqdm
from concurrent.futures import ThreadPoolExecutor

BASE_DIR = os.path.join(os.path.dirname(__file__), '..')
MODEL_DIR = os.path.join(BASE_DIR, 'model', 'saved_models')
DATA_PATH = os.path.join(BASE_DIR, 'data', 'processed', 'final_training_data.csv')

MODEL_PATH = os.path.join(MODEL_DIR, 'brain_metadata.pkl')
FAISS_INDEX_PATH = os.path.join(MODEL_DIR, 'brain_index.faiss')
os.makedirs(MODEL_DIR, exist_ok=True)

client = genai.Client(api_key=os.environ.get("GEMINI_API_KEY", "YOUR_GEMINI_API_KEY"))

EMBED_MODEL = "gemini-embedding-001" 
BATCH_SIZE = 100  # Max permitted by Gemini API
THREADS = 2 # Reduced to prevent instantly hitting Gemini free tier rate limits

def get_embeddings(batch_data):
    texts, pbar = batch_data
    retries = 10
    for attempt in range(retries):
        try:
            response = client.models.embed_content(
                model=EMBED_MODEL,
                contents=texts,
                config=types.EmbedContentConfig(task_type="RETRIEVAL_DOCUMENT", output_dimensionality=768),
            )
            pbar.update(len(texts))
            return [e.values for e in response.embeddings]
        except Exception as e:
            if "429" in str(e) or attempt < retries - 1:
                time.sleep(25)  # Backoff for free-tier RPM limits
            else:
                print(f"\nEmbedding fatal error: {e}")
                return [[0.0] * 768] * len(texts)

def train_semantic_model():
    print(f"🚀 FIXING AND FINISHING BRAIN...")
    
    api_key = os.environ.get("GEMINI_API_KEY", "YOUR_GEMINI_API_KEY")
    if not api_key or api_key == "YOUR_GEMINI_API_KEY":
        print("\n❌ CRITICAL ERROR: Invalid or missing GEMINI_API_KEY.")
        print("Please set your Gemini API key as an environment variable before training:\n")
        print("  Windows Command Prompt: set GEMINI_API_KEY=AIzaSy...")
        print("  Windows PowerShell:     $env:GEMINI_API_KEY=\"AIzaSy...\"\n")
        return
    try:
        df = pd.read_csv(DATA_PATH).dropna().reset_index(drop=True)
    except FileNotFoundError:
        print(f"Missing data at {DATA_PATH}. Run preprocess.py first or add data.")
        return
    texts = df['instruction'].tolist()
    
    batches = [texts[i:i + BATCH_SIZE] for i in range(0, len(texts), BATCH_SIZE)]
    all_embeddings = []
    
    start_time = time.time()
    with tqdm(total=len(texts), desc="⚡ Final Run", unit="rec") as pbar:
        with ThreadPoolExecutor(max_workers=THREADS) as executor:
            results = list(executor.map(get_embeddings, [(b, pbar) for b in batches]))
            
        for batch_result in results:
            all_embeddings.extend(batch_result)

    print("\n🏗️  Building FAISS Index...")
    embeddings_np = np.array(all_embeddings).astype('float32')
    
    # --- CRITICAL FIX HERE ---
    index = faiss.IndexFlatIP(embeddings_np.shape[1])
    faiss.normalize_L2(embeddings_np) # CAPITAL L
    index.add(embeddings_np)
    # -------------------------
    
    
    faiss.write_index(index, FAISS_INDEX_PATH)
    with open(MODEL_PATH, 'wb') as f:
        pickle.dump({'df': df}, f)
        
    print(f"✅ SUCCESS! Brain saved at {FAISS_INDEX_PATH}")

if __name__ == "__main__":
    train_semantic_model()