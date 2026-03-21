# 🌿 Mood Flow - AI-Powered Emotional Intelligence & Support

Empower your mental well-being with multimodal AI-driven insights, secure vocal biomarker analysis, and RAG-based empathetic support.

🚀 Quick Start

Try the Demo

**Demo Credentials:**

* **Email:** `demo@moodflow.com`
* **Password:** `demo123`
👉 **Launch Demo**
Pre-loaded with sample insights to explore the interactive Mood Journey and Journaling features.

✨ Features

🧠 AI-Powered Emotional Support

* **Clinical RAG Engine**: Empathetic chat responses powered by Llama 3 and FAISS vector indexing.
* **Crisis Guardrails**: Automated detection of high-risk mentions with instant localized emergency contact injection.
* **Burnout Heatmap**: Visual analysis of emotional density and burnout levels derived from chat interactions.

🎙️ Multimodal Analysis

* **Vocal Biomarkers**: Real-time extraction of acoustic signals (pitch, energy, speed) to detect non-verbal emotional states.
* **Speech-to-Text**: Seamless transcription of voice notes for unified journaling and analysis.

🔐 Privacy & Security

* **Identity Vault**: Secure, centralized storage for clinical data and user session management.
* **Blockchain Privacy Anchor**: Tamper-proof SHA-256 hashing for analytical reports ensuring data integrity.

📊 Insight Visualization

* **Mood Journey**: Interactive SVG-based wave graphs tracking emotional trends over time.
* **Intelligent Journaling**: Auto-categorized entries with clinical summaries and thematic tags.

🎯 Tech Stack

**Frontend**

* **React 18** - UI Library
* **Tailwind CSS** - Styling
* **Lucide React** - Iconography
* **Recharts / Custom SVG** - Data visualization
* **Axios** - HTTP client

**Backend Services**

* **FastAPI (Identity Vault)** - Main service & security
* **Flask (NLP Brain)** - AI RAG engine
* **Python (Voice Service)** - Microservice for acoustic analysis
* **SQLAlchemy** - ORM
* **SQLite/PostgreSQL** - Database

**Integrations**

* **Llama 3** - AI Language Model
* **FAISS** - Vector database for RAG
* **JWT** - Secure Authentication

📦 Installation

**Prerequisites**

* Python 3.10+
* Node.js 18+ and npm

**1. Clone Repository**

```bash
git clone https://github.com/yourusername/mood-flow.git
cd mood-flow

```

**2. Backend Setup (Identity Vault)**

```bash
cd backend-core
pip install -r requirements.txt
# Configure your .env with DATABASE_URL and JWT_SECRET
uvicorn app.main:app --port 8000 --reload

```

*Backend runs on http://localhost:8000*

**3. AI Engine & Voice Setup**

```bash
# In separate terminals
cd backend-ai
python run.py # Port 5000

cd voice-service
python main.py # Port 8001

```

**4. Frontend Setup**

```bash
cd mood-flow-web
npm install
npm start

```

*Frontend runs on http://localhost:3000*

🔐 Environment Variables

**Backend (.env)**

```bash
DATABASE_URL="sqlite:///./moodflow.db"
JWT_SECRET="your_secret_key"
ALGORITHM="HS256"
ACCESS_TOKEN_EXPIRE_MINUTES=30

```

📖 Project Structure

```text
MoodFlow/
│
├── README.md                    # High-level system overview (judges + mentors)
│
├── frontend/                    # 🎨 Frontend (React – handled by Frontend Dev)
│   ├── public/
│   │   └── images, icons
│   │
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   ├── dashboard/
│   │   │   ├── games/
│   │   │   └── layout/
│   │   │
│   │   ├── context/             # AuthContext, UserContext
│   │   ├── hooks/
│   │   ├── pages/
│   │   │   ├── LandingPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── SignupPage.jsx
│   │   │   └── MoodDashboard.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js            # Calls backend-core APIs
│   │   │
│   │   ├── styles/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   ├── vite.config.js
│   └── .gitignore
│
├── backend-core/                # 🛡️ Backend Core (YOU – System Brain)
│   ├── app/
│   │   ├── main.py              # FastAPI entry point
│   │   │
│   │   ├── auth/                # Login / Register
│   │   │   ├── routes.py
│   │   │   ├── schemas.py
│   │   │   └── service.py
│   │   │
│   │   ├── users/               # Identity vault
│   │   │   └── models.py
│   │   │
│   │   ├── sessions/            # Guest ID generation
│   │   │   ├── models.py
│   │   │   └── service.py
│   │   │
│   │   ├── mental_insights/     # 🧠 AI Insight Storage & Aggregation
│   │   │   ├── models.py        # MLInsight, DailyChatSummary
│   │   │   ├── schemas.py       # API contracts
│   │   │   ├── service.py       # Burnout logic, aggregation
│   │   │   └── routes.py        # /ingest, /weekly, /guest
│   │   │
│   │   ├── consent/             # User consent system
│   │   │   ├── models.py
│   │   │   ├── service.py
│   │   │   └── routes.py
│   │   │
│   │   ├── blockchain/          # ⛓️ Consent ledger
│   │   │   ├── ledger.py
│   │   │   └── service.py
│   │   │
│   │   ├── sos/                  # Crisis escalation
│   │   │   ├── models.py
│   │   │   ├── service.py
│   │   │   └── routes.py
│   │   │
│   │   ├── counselor/            # Counselor dashboard APIs
│   │   │   ├── routes.py
│   │   │   └── service.py
│   │   │
│   │   ├── config/
│   │   │   ├── database.py
│   │   │   ├── security.py
│   │   │   └── settings.py
│   │   │
│   │   └── common/
│   │       ├── utils.py
│   │       ├── responses.py
│   │       └── exceptions.py
│   │
│   ├── migrations/
│   ├── tests/
│   ├── requirements.txt
│   └── .env
│
├── backend-ai/                  # 🧠 NLP / ML Chatbot (AI Dev)
│   ├── app/
│   │   ├── routes.py            # /chat endpoint only
│   │   ├── chatbot_logic.py     # NLP + RAG response engine
│   │   └── __init__.py
│   │
│   ├── data/
│   │   ├── raw/                 # Original datasets
│   │   └── processed/           # Cleaned training data
│   │
│   ├── model/
│   │   ├── preprocess.py
│   │   ├── train_model.py
│   │   └── saved_models/
│   │       └── (trained files)
│   │
│   ├── run.py                   # Starts AI server
│   ├── requirements.txt
│   └── .gitignore
│
└── .gitignore                   # Root ignore


```


📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

👨‍💻 Author
**Sibam Prasad Sahoo
Shayanna Behera
Spandan Kar**

⭐ Show Your Support

If you find Mood Flow useful, please consider giving it a ⭐ on GitHub!

Built by "Sibam Prasad Sahoo" "Shayan Behera" "Spandan Kar"
