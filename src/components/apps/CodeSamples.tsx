import { useState } from 'react'
import './CodeSamples.css'

interface CodeSnippet {
  id: string
  title: string
  language: string
  skill: string
  description: string
  code: string
  repoUrl?: string
}

const CODE_SNIPPETS: CodeSnippet[] = [
  {
    id: 'selenium-multi-selector',
    title: 'Algoritmo de 8 Selectores Selenium (RPA Tool)',
    language: 'python',
    skill: 'RPA/Metaprogramming',
    description: 'Algoritmo que genera 8 estrategias de selectores de respaldo para código Selenium auto-reparable. Usado en herramienta de grabación RPA profesional.',
    code: `def _get_element_with_selectors(driver):
    """Genera 8 selectores de respaldo para máxima robustez"""
    script = """
    var element = document.activeElement;
    var selectors = [];

    // 1. ID selector (máxima prioridad - más estable)
    if (element.id) {
        selectors.push('id:' + element.id);
    }

    // 2. Name attribute (inputs, forms)
    if (element.name) {
        selectors.push('css:[name="' + element.name + '"]');
    }

    // 3. Type + Placeholder (inputs específicos)
    if (element.type && element.placeholder) {
        selectors.push('css:input[type="' + element.type +
                      '"][placeholder="' + element.placeholder + '"]');
    }

    // 4. Class selector (múltiples clases como fallback)
    if (element.className) {
        var classes = element.className.split(' ');
        classes.forEach(cls => selectors.push('class:' + cls));
    }

    // 5. XPath by visible text (robusto para botones)
    if (element.textContent && element.textContent.trim().length < 50) {
        var text = element.textContent.trim();
        selectors.push('xpath://' + element.tagName.toLowerCase() +
                      '[contains(text(),"' + text + '")]');
    }

    // 6. XPath by attributes (fallback estructural)
    var xpath = '//' + element.tagName.toLowerCase();
    if (element.id) {
        xpath += '[@id="' + element.id + '"]';
    } else if (element.className) {
        xpath += '[contains(@class,"' + element.className.split(' ')[0] + '")]';
    }
    selectors.push('xpath:' + xpath);

    // 7. Compound CSS selector
    var css = element.tagName.toLowerCase();
    if (element.id) css += '#' + element.id;
    else if (element.className) css += '.' + element.className.split(' ')[0];
    selectors.push('css:' + css);

    // 8. Position-based (último recurso)
    var siblings = Array.from(element.parentElement.children);
    var index = siblings.indexOf(element);
    selectors.push('css:' + element.tagName.toLowerCase() +
                  ':nth-child(' + (index + 1) + ')');

    return selectors;
    """
    return driver.execute_script(script)

# Uso: Generar código self-healing
selectors = _get_element_with_selectors(driver)
# Resultado: ['id:login-btn', 'css:[name="login"]', 'xpath://button[text()="Login"]', ...]`,
    repoUrl: 'https://github.com/liberius/portafolio/tree/main/demos/selenium-recorder',
  },
  {
    id: 'rag-pipeline',
    title: 'RAG Pipeline con LangChain',
    language: 'python',
    skill: 'AI/LLM',
    description: 'Pipeline RAG que indexa documentos y responde preguntas usando ChromaDB + Ollama',
    code: `from langchain.vectorstores import Chroma
from langchain.embeddings import OllamaEmbeddings
from langchain.llms import Ollama
from langchain.chains import RetrievalQA

# 1. Cargar documentos y crear embeddings
embeddings = OllamaEmbeddings(model="llama3")
vectorstore = Chroma.from_documents(
    documents=docs,
    embedding=embeddings,
    persist_directory="./chroma_db"
)

# 2. Crear chain RAG
llm = Ollama(model="llama3")
qa_chain = RetrievalQA.from_chain_type(
    llm=llm,
    chain_type="stuff",
    retriever=vectorstore.as_retriever(search_kwargs={"k": 3})
)

# 3. Query
response = qa_chain.run("¿Qué dice el documento sobre X?")`,
    repoUrl: 'https://github.com/liberius/portafolio/tree/main/demos/rag-chatbot',
  },
  {
    id: 'rpa-scraper',
    title: 'Web Scraper con Playwright',
    language: 'python',
    skill: 'RPA/Python',
    description: 'Scraper headless que extrae datos, maneja paginación y genera reportes Excel',
    code: `from playwright.sync_api import sync_playwright
import pandas as pd

def scrape_listings(url: str, pages: int = 5):
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        all_data = []
        for page_num in range(1, pages + 1):
            page.goto(f"{url}?page={page_num}")
            page.wait_for_selector(".listing-item")

            # Extraer datos
            listings = page.query_selector_all(".listing-item")
            for listing in listings:
                data = {
                    "title": listing.query_selector("h3").inner_text(),
                    "price": listing.query_selector(".price").inner_text(),
                    "location": listing.query_selector(".location").inner_text(),
                }
                all_data.append(data)

        browser.close()

    # Generar Excel
    df = pd.DataFrame(all_data)
    df.to_excel("listings_report.xlsx", index=False)
    return df`,
    repoUrl: 'https://github.com/liberius/portafolio/tree/main/demos/python-rpa-scraper',
  },
  {
    id: 'react-state',
    title: 'State Management con Zustand',
    language: 'typescript',
    skill: 'Frontend/React',
    description: 'Store type-safe para manejo de ventanas con seguridad contra XSS y DoS',
    code: `import { create } from 'zustand'
import type { WindowState } from '../types/window'

const MAX_WINDOWS = 20 // DoS protection

const sanitizeString = (str: string): string => {
  return str
    .replace(/<script\\b[^<]*(?:(?!<\\/script>)<[^<]*)*<\\/script>/gi, '')
    .replace(/<[^>]*>/g, '')
    .trim()
}

interface WindowStore {
  windows: WindowState[]
  openWindow: (id: string, title: string, component: string) => void
  closeWindow: (id: string) => void
  focusWindow: (id: string) => void
}

export const useWindowStore = create<WindowStore>((set, get) => ({
  windows: [],

  openWindow: (id, title, component) => {
    if (get().windows.length >= MAX_WINDOWS) return

    const safeId = sanitizeString(id)
    const safeTitle = sanitizeString(title)

    set((state) => ({
      windows: [...state.windows, {
        id: safeId,
        title: safeTitle,
        component,
        zIndex: Date.now(),
        // ... more state
      }]
    }))
  },
  // ... more methods
}))`,
    repoUrl: 'https://github.com/liberius/portafolio',
  },
  {
    id: 'sql-queries',
    title: 'SQL Queries Complejas',
    language: 'sql',
    skill: 'SQL/Data',
    description: 'Queries con CTEs, window functions y análisis temporal',
    code: `-- Análisis de ventas con ranking y crecimiento
WITH monthly_sales AS (
  SELECT
    DATE_TRUNC('month', sale_date) as month,
    product_id,
    SUM(amount) as total_sales,
    COUNT(*) as transactions
  FROM sales
  WHERE sale_date >= CURRENT_DATE - INTERVAL '12 months'
  GROUP BY 1, 2
),
sales_with_growth AS (
  SELECT
    *,
    LAG(total_sales) OVER (
      PARTITION BY product_id
      ORDER BY month
    ) as prev_month_sales,
    ROW_NUMBER() OVER (
      PARTITION BY month
      ORDER BY total_sales DESC
    ) as sales_rank
  FROM monthly_sales
)
SELECT
  month,
  product_id,
  total_sales,
  ROUND(
    100.0 * (total_sales - prev_month_sales) /
    NULLIF(prev_month_sales, 0),
    2
  ) as growth_pct,
  sales_rank
FROM sales_with_growth
WHERE sales_rank <= 10
ORDER BY month DESC, sales_rank;`,
  },
  {
    id: 'fastapi-crud',
    title: 'API REST con FastAPI',
    language: 'python',
    skill: 'Backend/Python',
    description: 'CRUD con autenticación JWT, validación Pydantic y docs automáticas',
    code: `from fastapi import FastAPI, Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel, validator
from typing import List

app = FastAPI(title="Demo API", version="1.0.0")
security = HTTPBearer()

class ItemCreate(BaseModel):
    name: str
    price: float

    @validator('price')
    def price_must_be_positive(cls, v):
        if v <= 0:
            raise ValueError('Price must be positive')
        return v

def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    # JWT verification logic
    if not is_valid_token(credentials.credentials):
        raise HTTPException(status_code=401, detail="Invalid token")
    return credentials.credentials

@app.post("/items", response_model=Item, status_code=201)
async def create_item(
    item: ItemCreate,
    token: str = Depends(verify_token)
):
    # Create item in database
    new_item = db.create_item(item.dict())
    return new_item

@app.get("/items", response_model=List[Item])
async def list_items(skip: int = 0, limit: int = 10):
    return db.get_items(skip=skip, limit=limit)`,
  },
]

export const CodeSamples: React.FC = () => {
  const [selectedSnippet, setSelectedSnippet] = useState<string | null>(null)

  const currentSnippet = CODE_SNIPPETS.find((s) => s.id === selectedSnippet)

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code)
    alert('✅ Código copiado al portapapeles!')
  }

  return (
    <div className="codesamples">
      <div className="codesamples__header">
        <h2>💻 Code Samples</h2>
        <p>Snippets de código real de proyectos personales</p>
      </div>

      {!selectedSnippet ? (
        <div className="codesamples__list">
          {CODE_SNIPPETS.map((snippet) => (
            <button
              key={snippet.id}
              className="codesamples__card"
              onClick={() => setSelectedSnippet(snippet.id)}
            >
              <div className="codesamples__card-header">
                <span className={`codesamples__language codesamples__language--${snippet.language}`}>
                  {snippet.language}
                </span>
                <span className="codesamples__skill">{snippet.skill}</span>
              </div>
              <h3>{snippet.title}</h3>
              <p>{snippet.description}</p>
            </button>
          ))}
        </div>
      ) : (
        <div className="codesamples__viewer">
          <div className="codesamples__viewer-header">
            <button className="codesamples__back-btn" onClick={() => setSelectedSnippet(null)}>
              ← Volver
            </button>
            <h3>{currentSnippet?.title}</h3>
          </div>

          <div className="codesamples__meta">
            <span className={`codesamples__language codesamples__language--${currentSnippet?.language}`}>
              {currentSnippet?.language}
            </span>
            <span className="codesamples__skill">{currentSnippet?.skill}</span>
          </div>

          <p className="codesamples__description">{currentSnippet?.description}</p>

          <div className="codesamples__code-block">
            <div className="codesamples__code-header">
              <span>Code</span>
              <button
                className="codesamples__copy-btn"
                onClick={() => copyToClipboard(currentSnippet?.code || '')}
              >
                📋 Copiar
              </button>
            </div>
            <pre>
              <code>{currentSnippet?.code}</code>
            </pre>
          </div>

          {currentSnippet?.repoUrl && (
            <div className="codesamples__actions">
              <a
                href={currentSnippet.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="codesamples__repo-btn"
              >
                🔗 Ver en GitHub
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
