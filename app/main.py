from pydantic import BaseModel
from fastapi import FastAPI
from model import analyze_sentiment
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class SentimentRequest(BaseModel):
    text: str


@app.get("/")
def home():
    return {"message": "Sentiment Analyzer API is running!"}


@app.post("/predict")
def predict(request: SentimentRequest):
    result = analyze_sentiment(request.text)
    return result
