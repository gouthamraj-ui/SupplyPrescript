model = joblib.load("models/optimized_random_forest.pkl")

def predict(data):
    return model.predict(data)