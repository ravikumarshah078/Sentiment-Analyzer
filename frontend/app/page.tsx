"use client"; // Add this at the very top

import { useState, FormEvent } from "react";
import api from "@/lib/api";

interface SentimentResult {
  sentiment_score: number;
  raw_scores: number[];
  result?: any; // optional, can type more specifically if needed
  result_text?: String,
}

function getSentimentData(score: number) {
  switch (score) {
    case 1:
      return { stars: "⭐", emoji: "😠", label: "Very Negative", color: "#ef4444" };
    case 2:
      return { stars: "⭐⭐", emoji: "😞", label: "Negative", color: "#f97316" };
    case 3:
      return { stars: "⭐⭐⭐", emoji: "😐", label: "Neutral", color: "#eab308" };
    case 4:
      return { stars: "⭐⭐⭐⭐", emoji: "🙂", label: "Positive", color: "#22c55e" };
    case 5:
      return { stars: "⭐⭐⭐⭐⭐", emoji: "🤩", label: "Very Positive", color: "#15803d" };
    default:
      return { stars: "", emoji: "", label: "Unknown", color: "#333" };
  }
}

export default function Home() {
  const [text, setText] = useState<string>("");
  const [result, setResult] = useState<SentimentResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text) return;

    setLoading(true);

    api
      .post<SentimentResult>("/predict", { text })
      .then((res) => {
        setResult(res.data);
      })
      .catch((err) => {
        console.error(err);
        alert("Error calling API");
      })
      .finally(() => {
        setText("");
        setLoading(false);
      });
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "auto" }}>
      <h1>Sentiment Analyzer</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
          style={{
            width: "100%",
            padding: "0.5rem",
            borderRadius: "4px",
            border: "1px solid #555",
            backgroundColor: "#222",
            color: "#fff",
          }}
          placeholder="Type your text here..."
        />
        <button
          type="submit"
          style={{
            marginTop: "1rem",
            padding: "0.5rem 1rem",
            borderRadius: "4px",
            border: "1px solid #555",
            backgroundColor: "#222",
            color: "#fff",
            cursor: "pointer",
          }}
          disabled={loading}
        >
          {loading ? "Analyzing..." : "Analyze"}
        </button>
      </form>

      {result && (
        <div style={{ marginTop: "2rem", textAlign: "center" }}>
          <h2>Result</h2>
          <div
            style={{
              fontSize: "2rem",
              marginTop: "1rem",
              color: getSentimentData(result.sentiment_score).color,
            }}
          >
            <div>{getSentimentData(result.sentiment_score).emoji}</div>
            <div style={{ marginTop: "0.5rem" }}>
              {getSentimentData(result.sentiment_score).stars}
            </div>
            <div style={{ fontSize: "1.2rem", marginTop: "0.5rem", color: "#555" }}>
              {getSentimentData(result.sentiment_score).label}
            </div>
          </div>
          <p style={{ marginTop: "1rem", color: "#888" }}>
            Your Text: {result.result_text}
          </p>
           <p style={{ marginTop: "1rem", color: "#888" }}>
            Score: {result.sentiment_score} / 5
          </p>
        </div>
      )}
    </div>
  );
}
