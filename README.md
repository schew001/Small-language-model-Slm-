# SLM — Small Language Model

SLM is a tiny local-first chatbot UI (ChatGPT-style) built with plain HTML/CSS/JS.

## Goals

- No external API calls.
- Runs fully in the browser.
- Uses lightweight rule-based + tiny bigram text generation.
- Includes a small built-in world knowledge dictionary.

## Run

Open `index.html` directly, or run a local server:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Notes

This is intentionally small and not an LLM replacement. Think of it as a fun offline SLM prototype.
