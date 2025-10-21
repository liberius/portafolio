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
    status: 'completado',
  },
  {
    id: 'apibee-wellbeing',
    title: 'Apibee - Gamificación para Bienestar Laboral',
    description:
      '🥈 2do lugar en Hackathon Apiux (5 equipos): App móvil interactiva para medir calidad de vida de empleados mediante gamificación. Los usuarios interactúan con una abeja animada que responde con diferentes estados emocionales, y las interacciones recopilan datos sobre estado emocional y engagement. Desarrollada en una noche para concurso interno.',
    skills: ['rpa-python', 'fullstack-python'],
    primarySkill: 'fullstack-python',
    stack: ['Python', 'Kivy', 'Animaciones', 'UX Gamification'],
    repoUrl: 'https://github.com/liberius/Apibee',
    status: 'completado',
  },
  {
    id: 'chatbot-rag-recruiting',
    title: 'Chatbot de Reclutamiento con IA - Análisis Inteligente de CVs',
    description:
      'Sistema conversacional con arquitectura RAG que actúa como reclutador profesional de RRHH. Analiza currículums en DOCX/PDF mediante búsqueda semántica con vectorización, responde preguntas contextuales sobre candidatos, y extrae información específica. Arquitectura: ChromaDB para embeddings, Google Generative AI (Gemini 1.5) como LLM, LangChain para orquestación del flujo RAG. Incluye implementaciones con Google AI API y Vertex AI para producción.',
    skills: ['ai-llm', 'fullstack-python', 'data-analysis'],
    primarySkill: 'ai-llm',
    stack: ['Python', 'Google Gemini', 'ChromaDB', 'LangChain', 'Vertex AI', 'Docx2txt', 'PyPDF2'],
    repoUrl: 'https://github.com/liberius/portafolio/tree/main/chatbot%20rag',
    status: 'completado',
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
    status: 'en progreso',
  },
  {
    id: 'rpa-email-triage',
    title: 'Bot RPA - Email Triage Automático',
    description:
      'Bot que clasifica emails automáticamente usando NLP, extrae datos, y actualiza CRM. Reduce 80% del tiempo manual de triaje.',
    skills: ['rpa-python', 'ai-llm'],
    primarySkill: 'rpa-python',
    stack: ['Python', 'UiPath', 'IMAP', 'spaCy', 'Pandas'],
    status: 'completado',
  },
  {
    id: 'scraper-real-estate',
    title: 'Web Scraper Inmobiliario',
    description:
      'Scraper que extrae listados de propiedades de múltiples portales, limpia datos, y genera reportes en Excel con análisis de precios.',
    skills: ['rpa-python', 'data-analysis'],
    primarySkill: 'rpa-python',
    stack: ['Python', 'Selenium', 'BeautifulSoup', 'Pandas', 'openpyxl'],
    status: 'completado',
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
    status: 'completado',
  },
  {
    id: 'llm-local-assistant',
    title: 'Asistente LLM Local con Ollama',
    description:
      'Chat assistant que corre 100% local usando Ollama (Llama 3), sin enviar datos a la nube. Ideal para documentos privados.',
    skills: ['ai-llm', 'fullstack-python'],
    primarySkill: 'ai-llm',
    stack: ['Python', 'Ollama', 'LangChain', 'FastAPI', 'React'],
    status: 'en progreso',
  },
  {
    id: 'excel-automation',
    title: 'Automatización de Reportes Excel',
    description:
      'Suite de scripts Python que genera reportes financieros en Excel con gráficos, tablas dinámicas, y formato corporativo automático.',
    skills: ['rpa-python', 'data-analysis'],
    primarySkill: 'data-analysis',
    stack: ['Python', 'openpyxl', 'XlsxWriter', 'Pandas'],
    status: 'completado',
  },
  {
    id: 'dashboard-data-viz',
    title: 'Dashboard de Visualización de Datos',
    description:
      'Dashboard interactivo para análisis de KPIs con gráficos dinámicos, filtros, y exportación de reportes.',
    skills: ['data-analysis', 'fullstack-python'],
    primarySkill: 'data-analysis',
    stack: ['Python', 'Plotly', 'Dash', 'Pandas', 'SQLite'],
    status: 'completado',
  },
  {
    id: 'api-rest-fastapi',
    title: 'API REST con FastAPI',
    description:
      'API robusta con autenticación JWT, documentación automática, validación de datos con Pydantic, y despliegue en Docker.',
    skills: ['fullstack-python', 'support-ops'],
    primarySkill: 'fullstack-python',
    stack: ['Python', 'FastAPI', 'PostgreSQL', 'Docker', 'JWT'],
    status: 'completado',
  },
]
