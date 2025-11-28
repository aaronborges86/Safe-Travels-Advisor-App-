from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import os
from typing import List, Optional
from pydantic import BaseModel

app = FastAPI(title="SafeTravels API")

# CORS Setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify the frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Data Loading
CSV_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), "travel_safety_demo_dataset.csv")
df = pd.DataFrame()

def load_data():
    global df
    try:
        df = pd.read_csv(CSV_PATH)
        # Precompute fields
        df['OverallScore'] = df[['HealthcareScore', 'TransportSafety', 'LGBTQSafety', 'WomensSafety', 'CrimeSafety', 'PoliticalStability']].mean(axis=1).round(1)
        
        def get_risk_level(score):
            if score > 80: return "Low"
            elif score >= 60: return "Medium"
            else: return "High"
            
        df['RiskLevel'] = df['OverallScore'].apply(get_risk_level)
        print("Data loaded successfully.")
    except Exception as e:
        print(f"Error loading data: {e}")

@app.on_event("startup")
async def startup_event():
    load_data()

# Models
class CountrySummary(BaseModel):
    Country: str
    OverallScore: float
    RiskLevel: str
    Region: Optional[str] = "Global" # Placeholder as Region isn't in CSV yet

class CountryDetail(BaseModel):
    Country: str
    HealthcareScore: int
    TransportSafety: int
    LGBTQSafety: int
    WomensSafety: int
    CrimeSafety: int
    PoliticalStability: int
    Currency: str
    Language: str
    EmergencyPolice: str
    EmergencyMedical: str
    EmergencyFire: str
    TravelAdvisory: str
    OverallScore: float
    RiskLevel: str
    Region: Optional[str] = "Global"

# Endpoints

@app.get("/countries", response_model=List[str])
def get_countries():
    if df.empty:
        raise HTTPException(status_code=500, detail="Data not loaded")
    return df['Country'].tolist()

@app.get("/country/{name}", response_model=CountryDetail)
def get_country(name: str):
    if df.empty:
        raise HTTPException(status_code=500, detail="Data not loaded")
    
    country_data = df[df['Country'].str.lower() == name.lower()]
    if country_data.empty:
        raise HTTPException(status_code=404, detail="Country not found")
    
    record = country_data.iloc[0].to_dict()
    # Handle NaN or float issues if any, though CSV looks clean
    return record

@app.get("/top-safe-countries", response_model=List[CountrySummary])
def get_top_safe_countries():
    if df.empty:
        raise HTTPException(status_code=500, detail="Data not loaded")
    
    top_countries = df.sort_values(by='OverallScore', ascending=False).head(6)
    return top_countries[['Country', 'OverallScore', 'RiskLevel']].to_dict(orient='records')

@app.get("/all-countries", response_model=List[CountryDetail])
def get_all_countries():
    if df.empty:
        raise HTTPException(status_code=500, detail="Data not loaded")
    return df.to_dict(orient='records')

@app.get("/search", response_model=List[str])
def search_countries(query: str = Query(..., min_length=1)):
    if df.empty:
        raise HTTPException(status_code=500, detail="Data not loaded")
    
    results = df[df['Country'].str.lower().str.contains(query.lower())]['Country'].tolist()
    return results

@app.get("/")
def read_root():
    return {"message": "Welcome to SafeTravels API"}
