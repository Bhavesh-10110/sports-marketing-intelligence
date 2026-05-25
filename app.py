from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pickle
import pandas as pd
import numpy as np

app = FastAPI(title="Sports Marketing Intelligence API")

import os

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load Models
try:
    base_dir = os.path.dirname(os.path.abspath(__file__))
    with open(os.path.join(base_dir, "models/random_forest_model.pkl"), "rb") as f:
        rf_model = pickle.load(f)
    
    with open(os.path.join(base_dir, "models/kmeans_model.pkl"), "rb") as f:
        kmeans_model = pickle.load(f)

    with open(os.path.join(base_dir, "models/scaler.pkl"), "rb") as f:
        scaler = pickle.load(f)

    with open(os.path.join(base_dir, "models/label_encoders.pkl"), "rb") as f:
        label_encoders = pickle.load(f)
        
    print("Models and transformers loaded successfully!")
except Exception as e:
    print(f"Error loading models: {e}")
    raise e


class CustomerData(BaseModel):
    age: int
    gender: str
    city: str
    occupation: str
    monthly_income: float
    favorite_ipl_team: str
    matches_watched_per_season: int
    fantasy_cricket_user: str
    preferred_social_media_platform: str
    sports_content_watch_hours_per_week: float
    preferred_content_format: str
    social_media_activity_during_matches: str
    sports_equipment_spending_per_month: float
    preferred_shopping_platform: str

@app.get("/")
def read_root():
    return {"message": "Welcome to the Sports Marketing Intelligence API"}

@app.post("/predict")
def predict_behavior(customer: CustomerData):
    try:
        data = customer.dict()
        
        # Categorical columns that were encoded
        cat_cols = [
            'gender', 'city', 'occupation', 'favorite_ipl_team',
            'fantasy_cricket_user', 'preferred_social_media_platform',
            'preferred_content_format', 'social_media_activity_during_matches',
            'preferred_shopping_platform'
        ]
        
        # Encode categorical variables directly in the dictionary first
        for col in cat_cols:
            if col in label_encoders:
                encoder = label_encoders[col]
                # Default to 0 or first class if unknown category
                if data[col] in encoder.classes_:
                    data[col] = int(encoder.transform([data[col]])[0])
                else:
                    data[col] = 0

        # Convert to DataFrame AFTER updating the types to integers
        df = pd.DataFrame([data])

        # Feature order must match training data
        feature_order = [
            "age", "gender", "city", "occupation", "monthly_income",
            "favorite_ipl_team", "matches_watched_per_season", "fantasy_cricket_user",
            "preferred_social_media_platform", "sports_content_watch_hours_per_week",
            "preferred_content_format", "social_media_activity_during_matches", 
            "sports_equipment_spending_per_month", "preferred_shopping_platform"
        ]
        df = df[feature_order]

        # Scale features
        scaled_data = scaler.transform(df)
        df_scaled = pd.DataFrame(scaled_data, columns=feature_order)

        # Predict K-Means Cluster first (so we can use it for RF if needed)
        cluster_features = [
            "age",
            "monthly_income",
            "matches_watched_per_season",
            "sports_content_watch_hours_per_week",
            "sports_equipment_spending_per_month"
        ]
        kmeans_prediction = kmeans_model.predict(df_scaled[cluster_features])[0]

        # The RF model was trained with the 'cluster' column as well
        # Note: If it wasn't, remove this step. Looking at the error, it seems 'cluster' is required
        df_scaled["cluster"] = kmeans_prediction

        # Predict Random Forest
        rf_prediction = rf_model.predict(df_scaled)[0]

        return {
            "prediction": {
                "likely_to_buy_cricket_kit": int(rf_prediction),
                "cluster_segment": int(kmeans_prediction)
            },
            "status": "success"
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# Example of running the app
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)


