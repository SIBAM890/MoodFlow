import faiss
import pickle
import numpy as np
import os

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

# Configuration
client = genai.Client(api_key=os.environ.get("GEMINI_API_KEY", "YOUR_GEMINI_API_KEY"))
LLM_MODEL = "gemini-2.5-flash"
EMBED_MODEL = "gemini-embedding-001"

# Load the FAISS brain
BASE_DIR = os.path.join(os.path.dirname(__file__), '..')
try:
    index = faiss.read_index(os.path.join(BASE_DIR, 'model', 'saved_models', 'brain_index.faiss'))
    with open(os.path.join(BASE_DIR, 'model', 'saved_models', 'brain_metadata.pkl'), 'rb') as f:
        brain_data = pickle.load(f)
    df = brain_data['df']
except Exception as e:
    print(f"Warning: Could not load FAISS brain. {e}")
    index = None
    df = None

def detect_crisis(text):
    """Checks for high-risk keywords in user input"""
    crisis_keywords = [
        'suicide', 'kill myself', 'end my life', 'depression', 
        'anxiety', 'panic attack', 'self harm', 'hopeless'
    ]
    text_lower = text.lower()
    return any(keyword in text_lower for keyword in crisis_keywords)

def get_crisis_resources():
    """Returns the emergency contact string"""
    return (
        "\n\n--- EMERGENCY SUPPORT CONTACTS ---\n"
        "Please know that you are not alone. Reach out for help:\n"
        "📞 AASRA: +91-9820466726\n"
        "📞 Sneha Foundation: +91-44-24640050\n"
        "📞 Vandrevala Foundation: 1860-2662-345\n"
        "----------------------------------"
    )

def get_response(user_input):
    # 1. CRISIS CHECK (Priority 1)
    is_crisis = detect_crisis(user_input)
    
    # 2. Semantic Search (RAG Pipeline)
    best_match = "I'm here for you, Spandan. Tell me what's on your mind. Provide a warm, supportive, and understanding response."
    
    if index is not None and df is not None:
        try:
            res = client.models.embed_content(
                model=EMBED_MODEL,
                contents=[user_input],
                config=types.EmbedContentConfig(task_type="RETRIEVAL_QUERY", output_dimensionality=768),
            )
            query_vec = np.array(res.embeddings[0].values).astype('float32')
            faiss.normalize_L2(query_vec)
            _, indices = index.search(query_vec, k=1)
            best_match = df.iloc[indices[0][0]]['response']
        except Exception as e:
            print(f"RAG Retrieval Error: {e}")


    # 3. Gemini Personality & Response Generation
    system_instruction = (
        "You are 'Mindful Companion', Spandan's empathetic AI. "
        "Your goal is to console him, validate his feelings, and provide motivation. "
        "If you detect distress, be extra gentle and warm. Speak naturally like a friend."
    )
    
    prompt = f"{system_instruction}\n\n" \
             f"Knowledge Context: {best_match}\n\n" \
             f"Spandan: {user_input}\n" \
             f"Companion:"
    
    try:
        response = client.models.generate_content(
            model=LLM_MODEL,
            contents=prompt
        )
        bot_msg = response.text.strip()
    except Exception:
        bot_msg = "I'm right here with you, Spandan. I might be having a technical glitch, but I'm listening."

    # 4. APPEND HELPLINES IF NEEDED
    if is_crisis:
        bot_msg += get_crisis_resources()
        
    return bot_msg

if __name__ == "__main__":
    while True:
        u = input("\nSpandan: ")
        if u.lower() in ['quit', 'exit']: break
        print(f"Companion: {get_response(u)}")