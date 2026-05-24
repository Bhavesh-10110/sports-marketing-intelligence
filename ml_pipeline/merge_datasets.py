import pandas as pd

# =====================================================
# LOAD DATASETS
# =====================================================

customer_df = pd.read_csv(
    r"data/raw/Customer_Dataset.csv"
)

engagement_df = pd.read_csv(
    r"data/raw/ipl_engagement_dataset.csv"
)

social_df = pd.read_csv(
    r"data/raw/social_media_dataset.csv"
)

purchase_df = pd.read_csv(
    r"data/raw/purchase_dataset.csv"
)

# =====================================================
# MERGE DATASETS USING customer_id
# =====================================================

master_df = customer_df.merge(
    engagement_df,
    on="customer_id"
).merge(
    social_df,
    on="customer_id"
).merge(
    purchase_df,
    on="customer_id"
)

# =====================================================
# DROP IRRELEVANT / DUPLICATE COLUMNS
# =====================================================

drop_columns = [

    "state",
    "city_tier",
    "cricket_interest_score",
    "favorite_player",

    "engagement_id",
    "social_id",
    "purchase_id",

    "Unnamed: 11",

    "sports_equipment_spending_per_month_y",
    "preferred_shopping_platform_y",

    "likely_to_buy_cricket_kit_x"
]

master_df.drop(
    columns=drop_columns,
    inplace=True
)

# =====================================================
# RENAME COLUMNS
# =====================================================

master_df.rename(columns={

    "sports_equipment_spending_per_month_x":
        "sports_equipment_spending_per_month",

    "preferred_shopping_platform_x":
        "preferred_shopping_platform",

    "likely_to_buy_cricket_kit_y":
        "likely_to_buy_cricket_kit"

}, inplace=True)

# =====================================================
# SAVE MASTER DATASET
# =====================================================

master_df.to_csv(
    "data/processed/master_dataset.csv",
    index=False
)

# =====================================================
# SUCCESS MESSAGE
# =====================================================

print("Master dataset created successfully!")

print("\nDataset Shape:")
print(master_df.shape)

print("\nDataset Preview:")
print(master_df.head())