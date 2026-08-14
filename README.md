# 🔍 Dynamic-RAG-Pipeline

[![RAG Engine](https://img.shields.io/badge/Architecture-Advanced--RAG-blue)](#)
[![Vector Index](https://img.shields.io/badge/Index-FAISS-orange)](#)
[![Re-Ranking](https://img.shields.io/badge/Re--Ranker-Cross--Encoder-purple)](#)
[![Retrieval Score](https://img.shields.io/badge/NDCG%4010-0.68%20(%2B0.07)-brightgreen)](#)

An end-to-end, locally hosted **Retrieval-Augmented Generation (RAG)** pipeline designed to minimize chunk fragmentation and maximize retrieval precision. Featuring a **semantic drop chunking algorithm**, a **two-stage retrieval pipeline (Bi-Encoder + FAISS + Cross-Encoder)**, and local LLM orchestration for fully grounded, hallucination-resistant Q&A.

---

## ✨ Key Technical Highlights

* **Semantic Drop Chunking:** Replaced rigid, character-based splitting with semantic similarity boundaries. Chunks are split dynamically when sentence embedding cosine similarity drops below an adaptive threshold, preserving contextual integrity.
* **Two-Stage Retrieval (Bi-Encoder + Cross-Encoder):** 
  1. **Stage 1 (Fast Search):** Dense vector index backed by **FAISS** and a Bi-Encoder for low-latency top-$K$ candidate retrieval.
  2. **Stage 2 (Precision Re-ranking):** A **Cross-Encoder** re-scores candidates to account for full sentence-pair interactions before feeding context to the LLM.
* **Grounded Local LLM Generation:** Integrated open-source LLMs running locally via native APIs (Ollama / vLLM / LocalAI) to generate strictly grounded answers bounded by retrieved passages.
* **Eval-Driven Performance:** Benchmarked on a custom domain QA dataset, increasing **NDCG@10** by **+0.07** over baseline fixed-size chunking strategies.

---

## 📊 Benchmark Results

Evaluated on a domain-specific QA test set measuring retrieval relevance:

| Architecture / Chunking Strategy | Retrieval Pipeline | NDCG@10 Score |
| :--- | :--- | :---: |
| **Baseline RAG (Fixed 512-token chunks)** | Bi-Encoder + FAISS | **0.61** |
| **Dynamic-RAG (Semantic-Drop chunks)** | **Bi-Encoder + FAISS + Cross-Encoder** | **0.68 (+0.07)** |

> **Key Takeaway:** Semantic chunking keeps full topic thoughts intact, while Cross-Encoder re-ranking removes low-relevance noise from the context window, boosting top-10 ranking precision.

---

## 🏗️ Architecture & Pipeline Flow
