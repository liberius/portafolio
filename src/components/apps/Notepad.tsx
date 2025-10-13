import './Notepad.css'

export const Notepad: React.FC = () => {
  return (
    <div className="notepad">
      <div className="notepad__toolbar">
        <span>Archivo</span>
        <span>Edición</span>
        <span>Formato</span>
        <span>Ver</span>
        <span>Ayuda</span>
      </div>

      <div className="notepad__content">
        <pre className="notepad__text">
{`═══════════════════════════════════════════════════════════════
              📝 SOBRE MÍ - MANUEL MEDINA
═══════════════════════════════════════════════════════════════

👨‍💻 DESARROLLADOR FULL-STACK & ESPECIALISTA EN AUTOMATIZACIÓN

Apasionado por construir soluciones eficientes que combinan
desarrollo web moderno, automatización RPA, y tecnologías de IA.

-------------------------------------------------------------------
🎯 HABILIDADES PRINCIPALES
-------------------------------------------------------------------

[AZUL] Full-Stack Python
  • Desarrollo web con FastAPI, Django, Flask
  • APIs RESTful robustas con autenticación JWT
  • Bases de datos: PostgreSQL, MongoDB, SQLite
  • Despliegue: Docker, CI/CD, Cloud

[VERDE] RPA Python
  • Automatización de procesos con UiPath, Selenium
  • Web scraping (BeautifulSoup, Scrapy)
  • Bots de email triage y clasificación
  • Integración con sistemas legacy

[FUCSIA] APIs & Frontend
  • React 18 + TypeScript
  • Estado: Zustand, Redux Toolkit
  • Consumo de APIs REST/GraphQL
  • UI/UX moderno y responsive

[MORADO] IA/LLM Local
  • Integración con Ollama (Llama 3, Mistral)
  • LangChain para aplicaciones LLM
  • RAG (Retrieval-Augmented Generation)
  • Procesamiento NLP con spaCy

[NARANJA] Análisis de Datos
  • Pandas, NumPy para limpieza y transformación
  • Visualización: Plotly, Dash, Matplotlib
  • Reportes automatizados en Excel
  • Dashboards interactivos

[GRIS] Soporte/Ops
  • Troubleshooting y debugging
  • Scripting de automatización
  • Documentación técnica
  • Git, GitHub Actions

-------------------------------------------------------------------
💼 EXPERIENCIA
-------------------------------------------------------------------

• 8+ años de experiencia en desarrollo y automatización
• Reducción del 80% en tiempo de procesos manuales con RPA
• Implementación de APIs consumidas por 10,000+ usuarios
• Desarrollo de dashboards para análisis de KPIs ejecutivos

-------------------------------------------------------------------
🎓 EDUCACIÓN & CERTIFICACIONES
-------------------------------------------------------------------

• Ingeniería en Sistemas Computacionales
• Certificación UiPath RPA Developer
• AWS Certified Cloud Practitioner
• Google Data Analytics Certificate

-------------------------------------------------------------------
📫 CONTACTO
-------------------------------------------------------------------

📧 Email:    manuel.medina@example.com
💼 LinkedIn: linkedin.com/in/manuel-medina
🐙 GitHub:   github.com/manuelmedina
🌐 Portfolio: Este sitio que estás viendo! 😄

-------------------------------------------------------------------
🚀 LO QUE ME MOTIVA
-------------------------------------------------------------------

Me encanta resolver problemas complejos con soluciones elegantes.
Creo que la mejor tecnología es la que hace la vida más fácil a
las personas, automatizando lo tedioso para liberar tiempo para
la creatividad y la innovación.

Si estás buscando alguien que pueda:
  ✓ Automatizar procesos repetitivos
  ✓ Construir APIs robustas y escalables
  ✓ Integrar IA de forma práctica
  ✓ Analizar y visualizar datos
  ✓ Desarrollar interfaces modernas

... ¡Hablemos! Siempre estoy abierto a nuevos desafíos.

═══════════════════════════════════════════════════════════════
            💾 Guardado en: C:\\Users\\Manuel\\about_me.txt
═══════════════════════════════════════════════════════════════
`}
        </pre>
      </div>

      <div className="notepad__statusbar">
        <span>Ln 1, Col 1</span>
        <span>|</span>
        <span>100%</span>
        <span>|</span>
        <span>Windows (CRLF)</span>
        <span>|</span>
        <span>UTF-8</span>
      </div>
    </div>
  )
}
