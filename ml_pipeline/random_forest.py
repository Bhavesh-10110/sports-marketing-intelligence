import pandas as pd
import pickle
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report,accuracy_score,confusion_matrix

# =====================================================
# LOAD PROCESSED DATASET
# =====================================================

df=pd.read_csv(r"data/processed/clustered_dataset.csv")

# =====================================================
# DEFINE FEATURES & TARGET
# =====================================================

X = df.drop(columns=[
    'likely_to_buy_cricket_kit',
    'cluster_label'
],errors='ignore')

y = df['likely_to_buy_cricket_kit']

# =====================================================
# Split data into training and testing sets
# =====================================================

X_train, X_test, y_train, y_test = train_test_split(X,y,test_size=0.2,random_state=42)

# =====================================================
# Train Random Forest Classifier
# =====================================================

RF=RandomForestClassifier(
    n_estimators=100,
    random_state=42
)
RF.fit(X_train,y_train)

# =====================================================
# Prediction
# =====================================================

y_pred=RF.predict(X_test)

# =====================================================
# Evaluation
# =====================================================

print("Classification Report :\n",classification_report(y_test,y_pred))
print("Accuracy Score : \n",accuracy_score(y_test,y_pred))
print("Confusion Matrix :\n",confusion_matrix(y_test,y_pred))

# =====================================================
# SAVE MODEL
# =====================================================

pickle.dump(
    RF,
    open("models/random_forest_model.pkl", "wb")
)

# =====================================================
# SUCCESS MESSAGE
# =====================================================

print("\nRandom Forest model trained successfully!")