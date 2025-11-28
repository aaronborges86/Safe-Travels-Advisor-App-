Overview

SafeTravels is a Single Page Application (SPA) built using React + FastAPI that aggregates and visualizes global safety indicators such as:

Crime & Violence Levels

Political Stability

LGBTQ+ Safety

Women’s Safety

Healthcare Quality

Transport Safety

The backend loads CSV datasets into an in-memory Pandas DataFrame and exposes REST endpoints.
The frontend consumes this API and renders interactive country-level dashboards.

🧱 Architecture
Frontend (React SPA)  -->  REST API (FastAPI)  -->  Pandas DataFrame (CSV)

Tech Stack
Layer	Technology
Frontend	React 18+, Vite, Tailwind CSS, Axios, React Router
Backend	FastAPI, ASGI, Pydantic, Pandas
Data Storage	Static CSV files loaded into memory
Visualization	Recharts / Radar Charts / Safety Cards
🚀 Features
Frontend

🔍 Search by country with debounce optimization

📊 Safety dashboards with charts

⚡ Instant filtering and sorting

🎨 Tailwind-based modern UI

🔄 Client-side routing using react-router-dom

🧩 Modular component system (/components, /pages)

Backend

⚡ High-performance FastAPI endpoints

📁 CSV → Pandas DataFrame (in-memory)

🧮 On-demand computation of safety metrics

🔐 CORS enabled for React integration

📝 Automatic /docs and /redoc API docs

📦 Project Structure
Backend
backend/
│── main.py
│── requirements.txt
│── data/
│     └── safety_dataset.csv

Frontend
frontend/
│── src/
│    ├── App.jsx
│    ├── main.jsx
│    ├── components/
│    ├── pages/
│    └── utils/api.js
│── tailwind.config.js
│── package.json

🔧 Installation & Setup
1️⃣ Clone the Repository
git clone https://github.com/your-username/safetravels.git
cd safetravels

2️⃣ Backend Setup (FastAPI)
Install dependencies:
cd backend
pip install -r requirements.txt

Run the server:
uvicorn main:app --reload


➡ Backend runs on: http://localhost:8000

➡ API docs: http://localhost:8000/docs

3️⃣ Frontend Setup (React + Vite)
Install dependencies:
cd frontend
npm install

Run development server:
npm run dev


➡ Frontend runs on: http://localhost:5173

🌐 API Endpoints
Method	Endpoint	Description
GET	/countries	Returns list of all countries
GET	/search?query=	Autocomplete search
GET	/country/{name}	Returns full safety profile
📊 Data Pipeline

CSV loaded during FastAPI startup

Converted into Pandas DataFrame

API filters/searches via vectorized operations

JSON serialized & returned to React

React visualizes data via charts + cards

🛡️ Key Concepts Used

Virtual DOM

Debounced search queries

JSON serialization

Client-side routing

Vectorized filtering (Pandas)

ASGI async concurrency

CORS middleware# Safe-Travels-Advisor-App-<img width="1816" height="303" alt="Screenshot 2025-11-28 200150" src="https://github.com/user-attachments/assets/99bc6d37-0106-4705-b507-2ff0fb0decda" />
<img width="1693" height="775" alt="Screenshot 2025-11-28 200139" src="https://github.com/user-attachments/assets/66675949-3a3f-4f5b-b80d-1726436da399" />
<img width="1817" height="859" alt="Screenshot 2025-11-28 200126" src="https://github.com/user-attachments/assets/b889e846-cfb1-4ee6-97ad-bac59ce1ace5" />
<img width="1656" height="848" alt="Screenshot 2025-11-28 200209" src="https://github.com/user-attachments/assets/503de504-cde1-4aef-b098-b76f2bbdf890" />
