# AI-Powered Retail Sales & Inventory Analytics Dashboard

An industry-level full-stack web application designed for enterprise retail management. Features a beautiful modern UI, AI-powered sales forecasting, role-based access control, and comprehensive analytics.

## Technology Stack

- **Frontend:** React.js, Vite, TypeScript, Tailwind CSS, Recharts, Framer Motion
- **Backend:** Python, FastAPI, SQLAlchemy ORM, PostgreSQL (fallback to SQLite), Scikit-learn
- **Deployment:** Docker, Docker Compose (Ready for Vercel & Render)

## Folder Structure

```
├── backend/
│   ├── app/
│   │   ├── main.py           # FastAPI application entry point
│   │   ├── database.py       # Database connection & Session
│   │   ├── models.py         # SQLAlchemy ORM models
│   │   ├── schemas.py        # Pydantic validation schemas
│   │   ├── security.py       # JWT & password hashing
│   │   ├── dependencies.py   # FastAPI dependencies (Auth, DB)
│   │   └── routers/          # API Routers
│   │       ├── auth.py
│   │       ├── dashboard.py
│   │       └── ml.py
│   ├── requirements.txt      # Python dependencies
│   ├── Dockerfile            # Backend Docker configuration
│   └── .env                  # Environment variables
├── frontend/
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/            # Page components
│   │   ├── App.tsx           # Main application routing
│   │   └── main.tsx          # React entry point
│   ├── package.json          # Node dependencies
│   ├── tailwind.config.js    # Tailwind styling config
│   └── Dockerfile            # Frontend Docker configuration
├── docker-compose.yml        # Multi-container orchestration
└── README.md                 # Project documentation
```

## Installation Guide

### Prerequisites
- Node.js v18+
- Python 3.10+
- PostgreSQL (optional, can use SQLite out of the box)
- Docker (optional)

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create and activate a virtual environment:
   ```bash
   # Windows
   python -m venv venv
   .\venv\Scripts\activate
   
   # macOS/Linux
   python3 -m venv venv
   source venv/bin/activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Run the FastAPI development server:
   ```bash
   uvicorn app.main:app --reload
   ```
   *The API will be available at `http://localhost:8000`. Swagger UI at `http://localhost:8000/docs`.*

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the Vite development server:
   ```bash
   npm run dev
   ```
   *The application will be available at `http://localhost:5173`.*

## Database Schema & ER Diagram

### ER Diagram
- `User (1) ---- (*) Role`
- `Category (1) ---- (*) Product`
- `Supplier (1) ---- (*) Product`
- `Customer (1) ---- (*) Order`
- `Order (1) ---- (*) OrderItem`
- `Product (1) ---- (*) OrderItem`

### Tables
- **users:** `id`, `username`, `email`, `hashed_password`, `role`, `is_active`
- **categories:** `id`, `name`
- **suppliers:** `id`, `name`, `contact_email`
- **products:** `id`, `name`, `description`, `price`, `stock_quantity`, `category_id`, `supplier_id`
- **customers:** `id`, `name`, `email`, `phone`
- **orders:** `id`, `customer_id`, `total_amount`, `created_at`
- **order_items:** `id`, `order_id`, `product_id`, `quantity`, `price`

## API Documentation
Once the backend is running, access the interactive Swagger API documentation at:
- `http://localhost:8000/docs`

Key Endpoints:
- `POST /api/auth/login`: Authenticate and receive JWT
- `GET /api/dashboard/stats`: Retrieve executive dashboard KPIs
- `GET /api/dashboard/charts`: Retrieve data for frontend visualization charts
- `GET /api/ml/forecast`: Trigger Scikit-learn predictive model for sales forecasting

## Deployment Guide

### Using Docker Compose
1. Ensure Docker Desktop is running.
2. From the root directory, run:
   ```bash
   docker-compose up -d --build
   ```
3. Access the frontend at `http://localhost:5173` and backend at `http://localhost:8000`.

### Vercel (Frontend)
1. Import the `frontend` folder into Vercel.
2. Build command: `npm run build`
3. Output directory: `dist`
4. Set environment variable `VITE_API_URL` to your backend URL.

### Render (Backend & DB)
1. Create a PostgreSQL database on Render.
2. Create a Web Service pointing to the `backend` folder.
3. Start command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
4. Set `DATABASE_URL` environment variable to the Render PostgreSQL URL.
