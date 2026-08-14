# Dynamic RAG Pipeline

This repository now contains a compact, local-first **Retrieval-Augmented Generation** prototype.

The previous Interactive DSA frontend/backend scaffold has been removed. The project is now centered on a single Python package that demonstrates:

* semantic drop chunking
* two-stage retrieval
* grounded answer composition
* a runnable command-line demo

The implementation is intentionally lightweight and deterministic so it can run without external services.

---

## What It Includes

* **Semantic chunking:** groups sentences until topic similarity drops.
* **Stage 1 retrieval:** vector-style candidate selection over local chunks.
* **Stage 2 re-ranking:** cross-encoder-style scoring with lexical and phrase bonuses.
* **Grounded response synthesis:** answers are composed only from retrieved evidence.
* **Sample corpus:** built-in documents so the demo works out of the box.

---

## Project Layout

```text
.
├── main.py
├── rag_pipeline/
│   ├── __init__.py
│   ├── chunking.py
│   ├── corpus.py
│   ├── demo.py
│   ├── llm.py
│   ├── models.py
│   ├── pipeline.py
│   ├── reranking.py
│   └── retrieval.py
├── tests/
│   └── test_pipeline.py
├── requirements.txt
└── .env.example
```

---

## Run The Demo

```bash
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python main.py
```

You can also pass your own question:

```bash
python main.py "How does the re-ranking stage improve the final answer?"
```

The demo prints a JSON payload with:

* the question
* the grounded answer
* the evidence summary
* the ranked supporting chunks

---

## How The Pipeline Works

1. **Chunking** splits each document into topic-aware chunks.
2. **Retrieval** scores chunks against the query and keeps the best candidates.
3. **Re-ranking** reorders those candidates with more precise scoring.
4. **Answer composition** builds a short grounded response from the best evidence.

---

## Example Output

```json
{
  "question": "How does the two-stage RAG pipeline keep answers grounded?",
  "summary": "Top evidence from: Stage Two Re-ranking, Grounded Answer Generation, Semantic Drop Chunking",
  "answer": "The retrieved evidence supports a two-stage, grounded RAG pipeline..."
}
```

---

## Configuration

The optional `.env.example` file documents the knobs used by the local demo:

* `OPENAI_API_KEY`
* `OLLAMA_BASE_URL`
* `SIMILARITY_THRESHOLD`
* `TOP_K`
* `RERANK_K`

The current code does not require any of them to run.

---

## Testing

```bash
pytest
```

The test suite checks that the pipeline indexes the sample corpus and returns a grounded answer.

---

## Notes

This is a polished prototype, not a full production RAG system. The structure is intentionally clean and finished-looking, but the implementation stays local and dependency-light.
