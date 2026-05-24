import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.preprocessing import LabelEncoder
import pickle

# =====================================================
# LOAD MASTER DATASET
# =====================================================

model_df = pd.read_csv(
    "data/processed/master_dataset.csv"
)

# =====================================================
# KEEP ONLY REQUIRED INPUT FEATURES + TARGET
# =====================================================

input_features = [

    # SECTION 1 — BASIC PROFILE
    "age",
    "gender",
    "city",
    "occupation",
    "monthly_income",

    # SECTION 2 — IPL INTEREST
    "favorite_ipl_team",
    "matches_watched_per_season",
    "fantasy_cricket_user",

    # SECTION 3 — DIGITAL ENGAGEMENT
    "preferred_social_media_platform",
    "sports_content_watch_hours_per_week",
    "preferred_content_format",
    "social_media_activity_during_matches",

    # SECTION 4 — SHOPPING BEHAVIOR
    "sports_equipment_spending_per_month",
    "preferred_shopping_platform"
]

target = "likely_to_buy_cricket_kit"

final_columns = input_features + [target]

# Keep only selected columns
model_df = model_df[final_columns]

# =====================================================
# HANDLE MISSING VALUES
# =====================================================

# Numerical columns
num_cols = model_df.select_dtypes(
    include=['int64', 'float64']
).columns

# Categorical columns
cat_cols = model_df.select_dtypes(
    include=['object']
).columns

# =====================================================
# ENCODE CATEGORICAL VARIABLES
# =====================================================

label_encoders = {}

for col in cat_cols:

    encoder = LabelEncoder()

    model_df[col] = encoder.fit_transform(
        model_df[col]
    )

    label_encoders[col] = encoder

# =====================================================
# SPLIT FEATURES & TARGET
# =====================================================

X = model_df.drop(
    "likely_to_buy_cricket_kit",
    axis=1
)

y = model_df["likely_to_buy_cricket_kit"]

# =====================================================
# FEATURE SCALING
# =====================================================

scaler = StandardScaler()

X_scaled = scaler.fit_transform(X)

# =====================================================
# SAVE SCALER
# =====================================================

pickle.dump(
    scaler,
    open("models/scaler.pkl", "wb")
)

# =====================================================
# SAVE LABEL ENCODERS
# =====================================================

pickle.dump(
    label_encoders,
    open("models/label_encoders.pkl", "wb")
)

# =====================================================
# SAVE PROCESSED DATASET
# =====================================================

processed_df = pd.DataFrame(
    X_scaled,
    columns=X.columns
)

processed_df["likely_to_buy_cricket_kit"] = y.values

processed_df.to_csv(
    "data/processed/processed_dataset.csv",
    index=False
)

# =====================================================
# SUCCESS MESSAGE
# =====================================================

print("Preprocessing completed successfully!")

print("\nProcessed Dataset Shape:")
print(processed_df.shape)

print("\nProcessed Dataset Preview:")
print(processed_df.head())