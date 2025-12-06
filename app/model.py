from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch

MODEL_NAME = "nlptown/bert-base-multilingual-uncased-sentiment"

tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
model = AutoModelForSequenceClassification.from_pretrained(MODEL_NAME)


def analyze_sentiment(text: str):
    tokens = tokenizer(text, return_tensors="pt",
                       truncation=True, padding=True)
    result = model(**tokens)
    scores = torch.nn.functional.softmax(result.logits, dim=1)
    rating = torch.argmax(scores).item() + 1  # 1 to 5 stars

    return {
        "result_text": text,
        "sentiment_score": rating,
        "raw_scores": scores.tolist()
    }
