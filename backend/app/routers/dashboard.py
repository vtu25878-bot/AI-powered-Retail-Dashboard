from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from .. import models, dependencies

router = APIRouter(prefix="/api/dashboard", tags=["dashboard"])

@router.get("/stats")
def get_dashboard_stats(db: Session = Depends(dependencies.get_db)):
    # Mock data for some, database queries for others
    total_revenue = db.query(func.sum(models.Order.total_amount)).scalar() or 0.0
    total_orders = db.query(models.Order).count()
    total_customers = db.query(models.Customer).count()
    low_stock_products = db.query(models.Product).filter(models.Product.stock_quantity < 10).count()
    
    return {
        "total_revenue": total_revenue,
        "total_orders": total_orders,
        "total_customers": total_customers,
        "low_stock_alerts": low_stock_products,
        "today_sales": total_revenue * 0.05, # Mock for today's sales
        "monthly_sales": total_revenue * 0.8 # Mock for monthly sales
    }

@router.get("/charts")
def get_dashboard_charts(db: Session = Depends(dependencies.get_db)):
    # Mock data for charts
    return {
        "monthly_revenue": [
            {"name": "Jan", "total": 4000},
            {"name": "Feb", "total": 3000},
            {"name": "Mar", "total": 2000},
            {"name": "Apr", "total": 2780},
            {"name": "May", "total": 1890},
            {"name": "Jun", "total": 2390},
            {"name": "Jul", "total": 3490},
        ],
        "category_sales": [
            {"name": "Electronics", "value": 400},
            {"name": "Clothing", "value": 300},
            {"name": "Home", "value": 300},
            {"name": "Sports", "value": 200},
        ],
        "order_trends": [
            {"name": "Week 1", "orders": 120},
            {"name": "Week 2", "orders": 200},
            {"name": "Week 3", "orders": 150},
            {"name": "Week 4", "orders": 300},
        ]
    }
