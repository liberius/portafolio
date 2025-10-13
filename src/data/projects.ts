import type { Project } from '../types/project'

export const projects: Project[] = [
  {
    id: 'selenium-recorder',
    title: '🎬 Selenium Code Generator - RPA Automation Tool',
    description:
      '⚡ Herramienta profesional de RPA que graba interacciones del usuario y auto-genera código Selenium robusto con 8 estrategias de selectores de respaldo (ID → XPath → CSS → Texto → Posición). Detecta ventanas emergentes automáticamente y genera código self-healing. Demuestra metaprogramming, JavaScript injection, y capacidad de crear herramientas de automation desde cero.',
    skills: ['rpa-python', 'fullstack-python'],
    primarySkill: 'rpa-python',
    stack: ['Python', 'Selenium', 'JavaScript Injection', 'Keyboard/Mouse Hooks', 'Code Generation'],
    repoUrl: 'https://github.com/liberius/portafolio/tree/main/demos/selenium-recorder',
    status: 'completed',
  },
  {
    id: 'apibee-wellbeing',
    title: 'Apibee - Gamificación para Bienestar Laboral',
    description:
      '🏆 Ganador de Hackathon Apiux: App móvil interactiva para medir calidad de vida de empleados mediante gamificación. Los usuarios interactúan con una abeja animada, y las interacciones recopilan datos sobre estado emocional y engagement. Desarrollada en una noche para concurso interno.',
    skills: ['rpa-python', 'fullstack-python'],
    primarySkill: 'fullstack-python',
    stack: ['Python', 'Kivy', 'Animaciones', 'UX Gamification'],
    repoUrl: 'https://github.com/liberius/Apibee',
    status: 'completed',
  },
  {
    id: 'febos-rag-rpa',
    title: 'Sistema RAG + RPA para Automatización de Facturación',
    description:
      'Chatbot IA con arquitectura RAG (Retrieval-Augmented Generation) indexando documentación técnica de APIs fiscales + Suite de scripts RPA para descarga automatizada de documentos XML/PDF. Reducción de 85% en tiempo de proceso. Arquitectura: Vector DB para embeddings, LLM local para consultas, automatización web headless para descarga masiva.',
    skills: ['ai-llm', 'rpa-python', 'fullstack-python', 'data-analysis'],
    primarySkill: 'ai-llm',
    stack: ['Python', 'Ollama', 'ChromaDB', 'LangChain', 'Streamlit', 'Playwright', 'Pandas', 'Rocketbot'],
    status: 'completed',
  },
  {
    id: 'retro-portfolio',
    title: 'Portafolio Retro Windows XP',
    description:
      'Portafolio interactivo que simula un escritorio Windows XP con ventanas arrastrables, demostrando habilidades full-stack con React, TypeScript, y Zustand.',
    skills: ['fullstack-python', 'api-frontend'],
    primarySkill: 'api-frontend',
    stack: ['React', 'TypeScript', 'Zustand', 'Vite', 'Framer Motion'],
    repoUrl: '#',
    status: 'in-progress',
  },
  {
    id: 'rpa-email-triage',
    title: 'Bot RPA - Email Triage Automático',
    description:
      'Bot que clasifica emails automáticamente usando NLP, extrae datos, y actualiza CRM. Reduce 80% del tiempo manual de triaje.',
    skills: ['rpa-python', 'ai-llm'],
    primarySkill: 'rpa-python',
    stack: ['Python', 'UiPath', 'IMAP', 'spaCy', 'Pandas'],
    status: 'completed',
  },
  {
    id: 'scraper-real-estate',
    title: 'Web Scraper Inmobiliario',
    description:
      'Scraper que extrae listados de propiedades de múltiples portales, limpia datos, y genera reportes en Excel con análisis de precios.',
    skills: ['rpa-python', 'data-analysis'],
    primarySkill: 'rpa-python',
    stack: ['Python', 'Selenium', 'BeautifulSoup', 'Pandas', 'openpyxl'],
    status: 'completed',
  },
  {
    id: 'api-pokedex',
    title: 'PokeDex con PokeAPI',
    description:
      'Aplicación web que consume PokeAPI para mostrar información de Pokémon con búsqueda, filtros, y detalles interactivos.',
    skills: ['api-frontend'],
    primarySkill: 'api-frontend',
    stack: ['React', 'TypeScript', 'Fetch API', 'CSS Modules'],
    demoUrl: '#',
    status: 'completed',
  },
  {
    id: 'llm-local-assistant',
    title: 'Asistente LLM Local con Ollama',
    description:
      'Chat assistant que corre 100% local usando Ollama (Llama 3), sin enviar datos a la nube. Ideal para documentos privados.',
    skills: ['ai-llm', 'fullstack-python'],
    primarySkill: 'ai-llm',
    stack: ['Python', 'Ollama', 'LangChain', 'FastAPI', 'React'],
    status: 'in-progress',
  },
  {
    id: 'excel-automation',
    title: 'Automatización de Reportes Excel',
    description:
      'Suite de scripts Python que genera reportes financieros en Excel con gráficos, tablas dinámicas, y formato corporativo automático.',
    skills: ['rpa-python', 'data-analysis'],
    primarySkill: 'data-analysis',
    stack: ['Python', 'openpyxl', 'XlsxWriter', 'Pandas'],
    status: 'completed',
  },
  {
    id: 'dashboard-data-viz',
    title: 'Dashboard de Visualización de Datos',
    description:
      'Dashboard interactivo para análisis de KPIs con gráficos dinámicos, filtros, y exportación de reportes.',
    skills: ['data-analysis', 'fullstack-python'],
    primarySkill: 'data-analysis',
    stack: ['Python', 'Plotly', 'Dash', 'Pandas', 'SQLite'],
    status: 'completed',
  },
  {
    id: 'api-rest-fastapi',
    title: 'API REST con FastAPI',
    description:
      'API robusta con autenticación JWT, documentación automática, validación de datos con Pydantic, y despliegue en Docker.',
    skills: ['fullstack-python', 'support-ops'],
    primarySkill: 'fullstack-python',
    stack: ['Python', 'FastAPI', 'PostgreSQL', 'Docker', 'JWT'],
    status: 'completed',
  },
]
