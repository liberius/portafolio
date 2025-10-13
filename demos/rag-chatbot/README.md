# 🤖 RAG Chatbot Demo

Chatbot con **Retrieval-Augmented Generation (RAG)** que responde preguntas sobre documentos usando búsqueda semántica y generación de texto.

## 🎯 Skills Demostradas

- **RAG Architecture**: Implementación completa del pipeline Retrieval-Augmented Generation
- **Vector Search**: Búsqueda semántica sobre documentos
- **LLM Integration**: Generación de respuestas contextualizadas
- **Document Processing**: Indexación y chunking de documentos
- **Conversation Management**: Historial y context tracking

## 🏗️ Arquitectura

```
Query → Retrieval → Augmentation → Generation → Response
         (Vector    (Context       (LLM)
          Search)    Injection)
```

1. **Retrieval**: Busca documentos relevantes usando embeddings
2. **Augmentation**: Prepara contexto combinando query + documentos
3. **Generation**: LLM genera respuesta basándose en contexto

## 🚀 Uso

```bash
python chatbot.py
```

## 📊 Output

- Respuestas contextualizadas basadas en documentos
- Fuentes citadas para cada respuesta
- Historial de conversación exportado a JSON

## 💡 Versión de Producción

Para un sistema RAG completo, se requeriría:

- **ChromaDB**: Base de datos vectorial para embeddings
- **Ollama**: LLM local (Llama 3, Mistral, etc.)
- **LangChain**: Framework de orchestration
- **Sentence Transformers**: Generación de embeddings
- **PyPDF**: Procesamiento de documentos PDF

## 🔧 Casos de Uso

- Chatbot de soporte técnico sobre documentación
- Q&A sobre políticas corporativas
- Asistente para búsqueda en knowledge base
- Análisis de contratos y documentos legales
