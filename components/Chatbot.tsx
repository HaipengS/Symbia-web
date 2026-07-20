"use client";

import { useState } from "react";

type ChatResponse = {
  answer: string;
};

const API_URL = "http://127.0.0.1:8000/chat";

export default function Chatbot() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!question.trim()) {
      setError("Ask a question to get started.");
      return;
    }
    setIsLoading(true);
    setError("");
    setAnswer("");
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
      if (!response.ok) {
        const message = await response.text();
        throw new Error(message || "Request failed.");
      }
      const data = (await response.json()) as ChatResponse;
      setAnswer(data.answer);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      className="w-full max-w-5xl space-y-6 text-left"
      id="assistant"
      aria-label="Symbia assistant"
    >
      <div className="flex flex-col gap-2">
        <p className="text-xs uppercase tracking-[0.14em] text-amber-warm/70">Ask Symbia</p>
        <h2 className="font-display text-3xl font-bold text-ink">Ask us anything</h2>
        <p className="text-sm text-ink/60">
          Ask questions about Symbia, the process, or your local knowledge base.
        </p>
      </div>

      <div className="card-surface rounded-2xl p-6">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <label className="block text-xs font-semibold uppercase tracking-[0.1em] text-ink/50" htmlFor="question">
            Your question
          </label>
          <textarea
            id="question"
            name="question"
            rows={4}
            className="w-full rounded-xl border border-ink/15 bg-black/25 px-4 py-3 text-sm text-ink outline-none transition placeholder:text-ink/30 focus:border-coral/50"
            placeholder="e.g. How is Symbia leather produced?"
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
          />
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="submit"
              className="rounded-full border border-coral/60 bg-coral/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-coral transition hover:bg-coral hover:text-soft disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? "Thinking..." : "Ask the bot"}
            </button>
            {error ? (
              <p className="text-sm text-coral/80">{error}</p>
            ) : null}
          </div>
        </form>

        <div className="mt-6 rounded-xl border border-ink/10 bg-black/20 p-4 text-sm text-ink/80">
          {answer ? (
            <p className="whitespace-pre-wrap">{answer}</p>
          ) : (
            <p className="text-ink/40">
              The answer will appear here after you ask a question.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
