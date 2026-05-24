import pandas as pd
import pickle

from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score

# =====================================================
# LOAD PREPROCESSED DATASET
# =====================================================

df = pd.read_csv(
    "data/processed/processed_dataset.csv"
)

print("Dataset loaded...")
# =====================================================
# SELECT FEATURES FOR K-MEANS CLUSTERING
# =====================================================

cluster_features = [

    "age",
    "monthly_income",
    "matches_watched_per_season",
    "sports_content_watch_hours_per_week",
    "sports_equipment_spending_per_month"
]

X = df[cluster_features]
print("Training K-Means...")
# =====================================================
# TRAIN K-MEANS MODEL
# =====================================================

kmeans = KMeans(
    n_clusters=4,
    random_state=42,
    n_init=10
)

# Predict clusters
df["cluster"] = kmeans.fit_predict(X)

# =====================================================
# EVALUATE CLUSTER QUALITY
# =====================================================

score = silhouette_score(
    X,
    df["cluster"]
)

print(f"\nSilhouette Score: {score:.3f}")

# =====================================================
# SAVE K-MEANS MODEL
# =====================================================

pickle.dump(
    kmeans,
    open("models/kmeans_model.pkl", "wb")
)

# =====================================================
# MAP CLUSTER LABELS TO DESCRIPTIVE NAMES
# =====================================================
cluster_names = {
    0: "High Income Casual Viewers",
    1: "Budget IPL Enthusiasts",
    2: "Premium Hardcore IPL Fans",
    3: "Low Engagement Users"
}

df["cluster_label"] = df["cluster"].map(
    cluster_names
)

# =====================================================
# SAVE CLUSTERED DATASET
# =====================================================

df.to_csv(
    "data/processed/clustered_dataset.csv",
    index=False
)

# =====================================================
# SHOW CLUSTER DISTRIBUTION
# =====================================================

print("\nCluster Distribution:")

print(
    df["cluster"].value_counts()
)

# =====================================================
# SHOW CLUSTER SUMMARY
# =====================================================

cluster_summary = df.groupby("cluster")[[
    "age",
    "monthly_income",
    "matches_watched_per_season",
    "sports_content_watch_hours_per_week",
    "sports_equipment_spending_per_month"
]].mean()

print("\nCluster Summary:")
print(cluster_summary)

# =====================================================
# SHOW SAMPLE DATA
# =====================================================

print("\nDataset Preview:")
print(df.head())