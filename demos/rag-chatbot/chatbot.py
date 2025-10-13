"""
RAG Chatbot Demo - Document Q&A System
========================================
Chatbot con Retrieval-Augmented Generation que responde preguntas
sobre documentos usando embeddings y LLM local.

Skills demostradas:
- RAG Architecture (Retrieval-Augmented Generation)
- Vector embeddings con ChromaDB
- LLM integration con Ollama
- Document processing y chunking
- Semantic search
"""

import os
from typing import List, Dict
import json
from datetime import datetime


class SimpleRAGChatbot:
    """
    Chatbot RAG simplificado para demostración de portfolio.
    En producción: usar LangChain + ChromaDB + Ollama real.
    """

    def __init__(self):
        self.documents = self._load_sample_documents()
        self.conversation_history = []
        print("✅ RAG Chatbot inicializado")
        print(f"📚 {len(self.documents)} documentos cargados en memoria")

    def _load_sample_documents(self) -> List[Dict]:
        """
        Carga documentos de ejemplo (simulando indexación de PDFs).
        """
        return [
            {
                "id": "doc1",
                "title": "Python Best Practices",
                "content": "Python es un lenguaje de programación interpretado de alto nivel. "
                          "Las mejores prácticas incluyen usar type hints, seguir PEP 8, "
                          "escribir docstrings, y usar virtual environments.",
                "metadata": {"category": "programming", "language": "python"}
            },
            {
                "id": "doc2",
                "title": "RAG Architecture Explained",
                "content": "RAG (Retrieval-Augmented Generation) combina recuperación de información "
                          "con generación de texto. Primero busca documentos relevantes usando embeddings, "
                          "luego los usa como contexto para que el LLM genere respuestas precisas.",
                "metadata": {"category": "ai", "language": "general"}
            },
            {
                "id": "doc3",
                "title": "RPA Automation Guide",
                "content": "RPA (Robotic Process Automation) automatiza tareas repetitivas. "
                          "Herramientas comunes: UiPath, Automation Anywhere, Playwright. "
                          "Casos de uso: data entry, web scraping, report generation.",
                "metadata": {"category": "automation", "language": "general"}
            },
            {
                "id": "doc4",
                "title": "Vector Databases",
                "content": "Las bases de datos vectoriales almacenan embeddings para búsqueda semántica. "
                          "ChromaDB, Pinecone, Weaviate son opciones populares. "
                          "Permiten encontrar documentos similares basándose en significado, no solo keywords.",
                "metadata": {"category": "databases", "language": "general"}
            },
            {
                "id": "doc5",
                "title": "LLM Best Practices",
                "content": "Los Large Language Models requieren prompts bien diseñados. "
                          "Técnicas: few-shot learning, chain-of-thought, system prompts. "
                          "Ollama permite correr LLMs localmente sin enviar datos a la nube.",
                "metadata": {"category": "ai", "language": "general"}
            }
        ]

    def _retrieve_relevant_docs(self, query: str, top_k: int = 2) -> List[Dict]:
        """
        Busca documentos relevantes usando búsqueda semántica simplificada.
        En producción: usar embeddings reales y vector similarity search.
        """
        query_lower = query.lower()
        scored_docs = []

        for doc in self.documents:
            # Scoring simple basado en keywords (en producción: usar embeddings)
            score = 0
            content_lower = doc['content'].lower()
            title_lower = doc['title'].lower()

            # Buscar palabras clave
            keywords = query_lower.split()
            for keyword in keywords:
                if keyword in content_lower:
                    score += 2
                if keyword in title_lower:
                    score += 5

            if score > 0:
                scored_docs.append((score, doc))

        # Ordenar por score y retornar top_k
        scored_docs.sort(reverse=True, key=lambda x: x[0])
        relevant_docs = [doc for score, doc in scored_docs[:top_k]]

        return relevant_docs

    def _generate_response(self, query: str, context_docs: List[Dict]) -> str:
        """
        Genera respuesta usando contexto de documentos.
        En producción: usar Ollama/GPT con context injection.
        """
        if not context_docs:
            return "Lo siento, no encontré información relevante en mi base de conocimientos."

        # Simular respuesta del LLM basándose en contexto
        context = "\n\n".join([f"[{doc['title']}]: {doc['content']}" for doc in context_docs])

        response = f"""Basándome en los documentos indexados, puedo responderte:

{context}

📚 Fuentes consultadas: {', '.join([doc['title'] for doc in context_docs])}
"""
        return response

    def chat(self, query: str) -> Dict:
        """
        Procesa una consulta del usuario usando RAG pipeline.
        """
        print(f"\n💬 Usuario: {query}")
        print("🔍 Buscando documentos relevantes...")

        # 1. Retrieval: Buscar documentos relevantes
        relevant_docs = self._retrieve_relevant_docs(query, top_k=2)
        print(f"📄 Encontrados {len(relevant_docs)} documentos relevantes")

        # 2. Augmentation: Preparar contexto
        # 3. Generation: Generar respuesta
        response = self._generate_response(query, relevant_docs)

        # Guardar en historial
        interaction = {
            "timestamp": datetime.now().isoformat(),
            "query": query,
            "response": response,
            "docs_used": [doc['id'] for doc in relevant_docs]
        }
        self.conversation_history.append(interaction)

        print(f"\n🤖 Bot: {response}")
        return interaction

    def export_history(self, filename='chat_history.json'):
        """
        Exporta historial de conversación a JSON.
        """
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(self.conversation_history, f, indent=2, ensure_ascii=False)
        print(f"\n💾 Historial exportado a {filename}")


def main():
    """
    Demo interactiva del chatbot RAG.
    """
    print("=" * 60)
    print("🤖 RAG Chatbot Demo - Portfolio Project")
    print("=" * 60)
    print()

    # Inicializar chatbot
    bot = SimpleRAGChatbot()

    # Consultas de ejemplo
    example_queries = [
        "¿Qué es RAG y cómo funciona?",
        "¿Cuáles son las mejores prácticas de Python?",
        "¿Qué herramientas se usan para RPA?",
    ]

    print("\n📋 Ejecutando consultas de ejemplo:\n")

    for query in example_queries:
        bot.chat(query)
        print("\n" + "-" * 60)

    # Exportar historial
    bot.export_history()

    print("\n" + "=" * 60)
    print("✅ Demo completado exitosamente!")
    print("=" * 60)
    print("\n💡 En producción, este chatbot usaría:")
    print("  - ChromaDB para almacenar embeddings")
    print("  - Ollama (Llama 3) para generación de respuestas")
    print("  - LangChain para orchestration")
    print("  - PDFs reales indexados con chunking inteligente")


if __name__ == "__main__":
    main()
