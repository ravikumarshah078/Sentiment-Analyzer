# Sentiment Analyzer

A full-stack web application that analyzes the sentiment of text input using a BERT-based machine learning model.

## Features

- **Real-time Analysis**: Instant sentiment scoring using a pre-trained BERT model (`nlptown/bert-base-multilingual-uncased-sentiment`).
- **Visual Feedback**: Dynamic display with emojis, star ratings (1-5), and score-based coloring.
- **Modern UI**: Dark-themed, responsive frontend built with Next.js.
- **Microservices**: Containerized architecture with Docker Compose.

## Tech Stack

### Backend
- **FastAPI**: High-performance web framework for the API.
- **PyTorch & Transformers**: For running the NLP model.
- **Uvicorn**: ASGI server.

### Frontend
- **Next.js**: React framework for the interface.
- **TypeScript**: For type safety.
- **CSS**: Custom styling for a clean look.

## Quick Start (Docker)

The easiest way to run the application is using Docker Compose.

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd Sentiment-Analyzer
   ```

2. **Start the services**:
   ```bash
   docker-compose up --build
   ```

3. **Access the application**:
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend API Docs: [http://localhost:8000/docs](http://localhost:8000/docs)

## Manual Setup

If you prefer running services locally without Docker:

### Backend

1. Navigate to the app directory:
   ```bash
   cd app
   ```
2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   # Windows
   .\venv\Scripts\activate
   # Linux/Mac
   source venv/bin/activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Run the server:
   ```bash
   uvicorn main:app --reload
   ```

### Frontend

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
Sentiment-Analyzer/
├── app/                 # Backend FastAPI application
│   ├── main.py          # API endpoints
│   ├── model.py         # ML model logic
│   └── requirements.txt
├── frontend/            # Frontend Next.js application
│   ├── app/             # Application pages
│   └── lib/             # API helpers
├── docker-compose.yml   # Docker orchestration
└── Dockerfile           # Backend container definition
```