from fastapi import APIRouter
import numpy as np
from sklearn.linear_model import LinearRegression

router = APIRouter(prefix="/api/ml", tags=["machine_learning"])

@router.get("/forecast")
def get_sales_forecast():
    # Simple scikit-learn forecasting mock
    # In a real scenario, this would load a trained model and predict based on db data
    X = np.array([[1], [2], [3], [4], [5], [6]])
    y = np.array([2000, 2500, 2300, 3000, 3200, 3500])
    
    model = LinearRegression()
    model.fit(X, y)
    
    future_X = np.array([[7], [8], [9]])
    predictions = model.predict(future_X)
    
    # Adding prediction confidence based on R^2 score
    confidence = model.score(X, y)
    
    return {
        "forecast": [
            {"month": "Aug", "predicted_sales": round(predictions[0], 2)},
            {"month": "Sep", "predicted_sales": round(predictions[1], 2)},
            {"month": "Oct", "predicted_sales": round(predictions[2], 2)},
        ],
        "confidence": f"{round(confidence * 100, 2)}%"
    }
