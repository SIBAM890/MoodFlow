# 🌿 MoodFlow (formerly Healio)

> **AutoFlow AI & Cryptographic Privacy-First Mental Wellness Ecosystem**

MoodFlow is a next-generation mental health platform bridging the gap between clinical transparency and gentle, empathetic patient care. Functioning as an intelligent journaling companion for students, MoodFlow simultaneously provisions highly securely segmented operational dashboards for University Heads (Analytics) and Psychiatrists (Intervention routing).

## 💡 Architecture & Security
- **Intelligence**: Ranks, routes, and dynamically formulates conversational responses using a custom Retrieval-Augmented Generation (RAG) mapping tied directly to Google's **Gemini 2.5 Flash** foundation models. 
- **Privacy Assurance**: All clinical data consent events (grants and revocations) are immutably preserved utilizing a simulated **SHA-256 Blockchain Ledger** preventing unauthorized tampering.
- **Reporting**: Leverages completely localized, zero-cloud-storage rendering to output clinically relevant **A4 "My Wellness Reports"** securely generated on-edge for immediate Psychiatric review.

---

## 📂 System Directory Roadmap

The system is segregated into three specialized, highly decoupled micro-services:

```text
📦 MoodFlow (Root)
 ┣ 📂 frontend/              # The Interface Layer (React / Vite)
 ┃ ┣ 📂 src/
 ┃ ┃ ┣ 📂 components/        # Dashboards, Kawaii Assets, Core Layouts
 ┃ ┃ ┣ 📂 context/           # JWT & Secure Local Storage Rehydration
 ┃ ┃ ┣ 📂 pages/             # Specialized views (Patient, Counselor, Admin)
 ┃ ┃ ┣ 📂 services/          # api.js handling multi-gateway fetches
 ┃ ┃ ┗ 📂 utils/             # Native zero-storage PDF Document Compilers
 ┃
 ┣ 📂 backend-core/          # The Identity & Trust Vault (FastAPI)
 ┃ ┣ 📂 app/         
 ┃ ┃ ┣ 📂 auth/              # JWT issuance and Role-based Hashing
 ┃ ┃ ┣ 📂 blockchain/        # SHA-256 Immutable Ledger Logic
 ┃ ┃ ┗ 📂 analytics/         # Data Aggregation for University Admin
 ┃ ┗ 📜 moodflow_vault.db    # Relational SQLite Data Store
 ┃
 ┗ 📂 backend-ai/            # The AutoFlow RAG Engine (Flask + Gemini API)
   ┣ 📂 app/                 
   ┃ ┗ 📜 chatbot_logic.py   # System instructions & FAISS routing mechanisms
   ┣ 📂 model/               
   ┃ ┗ 📜 train_model.py     # Gemini-embedding-001 Vector Compilation script
   ┗ 📜 run.py               # Flask proxy gateway entrypoint
```

## 🚀 Getting Started

To launch the full micro-service cluster sequentially:

1. **Start the Trust Vault (FastAPI Core):**
   ```bash
   cd backend-core
   source venv/bin/activate  # (or venv\Scripts\activate on Windows)
   uvicorn app.main:app --reload --port 8000
   ```

2. **Start the AutoFlow Neural Engine (Flask NLP):**
   ```bash
   cd backend-ai
   source venv/bin/activate
   # Ensure your .env file is populated with GEMINI_API_KEY
   python run.py 
   ```

3. **Launch the User Interface (React):**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

*(Ensure all systems are operational simultaneously. The `api.js` gateway natively bridges these specific ports: `:8000`, `:5000`, and `:5173` into one cohesive experience.)*

---
*Developed with 💚 for the safety, serenity, and support of every student.*
