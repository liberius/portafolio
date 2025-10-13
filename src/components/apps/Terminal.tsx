import { useState, useRef, useEffect } from 'react'
import './Terminal.css'

interface TerminalLine {
  type: 'command' | 'output' | 'error'
  content: string
}

const COMMANDS: Record<string, () => string> = {
  help: () => `
Comandos disponibles:
  help       - Muestra este mensaje de ayuda
  about      - Información sobre Manuel
  skills     - Lista de habilidades técnicas
  projects   - Proyectos destacados
  contact    - Información de contacto
  clear      - Limpia la terminal
  whoami     - ¿Quién soy?
  ls         - Lista archivos (simulado)
  cat        - Lee un archivo (ej: cat readme.txt)
  echo       - Imprime un mensaje
`,
  about: () => `
Manuel Medina - Full-Stack Developer & RPA Specialist

8+ años automatizando procesos, construyendo APIs, e integrando IA.
Apasionado por soluciones elegantes que hacen la vida más fácil.

Especialidades:
  • Python (FastAPI, Django, Flask)
  • RPA (UiPath, Selenium, Web Scraping)
  • React + TypeScript
  • IA/LLM Local (Ollama, LangChain)
  • Análisis de Datos (Pandas, Plotly)
`,
  skills: () => `
🔧 Stack Técnico:

Backend:
  • Python, FastAPI, Django, Flask
  • Node.js, Express
  • PostgreSQL, MongoDB, Redis

Frontend:
  • React, TypeScript, Next.js
  • Zustand, Redux
  • Tailwind CSS, Framer Motion

Automatización & RPA:
  • UiPath, Selenium, Playwright
  • BeautifulSoup, Scrapy
  • Pandas, openpyxl

IA & Data:
  • Ollama, LangChain, spaCy
  • Plotly, Dash, Matplotlib
  • Jupyter, NumPy

DevOps:
  • Docker, GitHub Actions
  • AWS, Vercel, Netlify
`,
  projects: () => `
📁 Proyectos Destacados:

1. Bot RPA Email Triage
   → Clasificación automática de emails con NLP
   → Reducción 80% en tiempo de triaje

2. Web Scraper Inmobiliario
   → Extracción multi-portal
   → Análisis de precios en Excel

3. API REST con FastAPI
   → JWT auth, docs automáticas
   → Despliegue Dockerizado

4. Asistente LLM Local
   → Ollama + LangChain
   → 100% privado, sin cloud

Usa el Explorer para ver todos los proyectos!
`,
  contact: () => `
📬 Información de Contacto:

Email:    manuel.medina@example.com
LinkedIn: linkedin.com/in/manuel-medina
GitHub:   github.com/manuelmedina
Web:      Este portafolio! :)

¿Quieres colaborar? ¡Escríbeme!
`,
  whoami: () => 'Manuel Medina - Developer & Automation Specialist',
  ls: () => `
readme.txt
projects/
skills.md
cv.pdf
contact.txt
`,
  clear: () => '', // Special case handled in code
}

export const Terminal: React.FC = () => {
  const [history, setHistory] = useState<TerminalLine[]>([
    {
      type: 'output',
      content: 'Microsoft Windows XP [Versión 5.1.2600]\n(C) Copyright 1985-2001 Microsoft Corp.\n',
    },
    {
      type: 'output',
      content: 'Escribe "help" para ver comandos disponibles.\n',
    },
  ])
  const [input, setInput] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [history])

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim()

    if (!trimmed) return

    // Add command to history
    setHistory((prev) => [
      ...prev,
      { type: 'command', content: `C:\\Users\\Manuel> ${trimmed}` },
    ])

    // Handle clear specially
    if (trimmed.toLowerCase() === 'clear') {
      setHistory([])
      return
    }

    // Handle cat command
    if (trimmed.toLowerCase().startsWith('cat ')) {
      const filename = trimmed.substring(4).trim()
      const content = {
        'readme.txt': 'Este es el portafolio interactivo de Manuel Medina.\nNavega por las ventanas para conocer más!',
        'contact.txt': COMMANDS.contact(),
        'skills.md': COMMANDS.skills(),
      }[filename.toLowerCase()]

      if (content) {
        setHistory((prev) => [...prev, { type: 'output', content: content + '\n' }])
      } else {
        setHistory((prev) => [...prev, { type: 'error', content: `cat: ${filename}: No such file\n` }])
      }
      return
    }

    // Handle echo command
    if (trimmed.toLowerCase().startsWith('echo ')) {
      const message = trimmed.substring(5)
      setHistory((prev) => [...prev, { type: 'output', content: message + '\n' }])
      return
    }

    // Find and execute command
    const commandFn = COMMANDS[trimmed.toLowerCase()]

    if (commandFn) {
      const output = commandFn()
      if (output) {
        setHistory((prev) => [...prev, { type: 'output', content: output }])
      }
    } else {
      setHistory((prev) => [
        ...prev,
        { type: 'error', content: `'${trimmed}' no se reconoce como comando. Escribe "help" para ver comandos disponibles.\n` },
      ])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleCommand(input)
    setInput('')
  }

  return (
    <div className="terminal" onClick={() => inputRef.current?.focus()}>
      <div className="terminal__output">
        {history.map((line, i) => (
          <div key={i} className={`terminal__line terminal__line--${line.type}`}>
            {line.content}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={handleSubmit} className="terminal__input-form">
        <span className="terminal__prompt">C:\Users\Manuel&gt; </span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="terminal__input"
          autoFocus
          spellCheck={false}
        />
      </form>
    </div>
  )
}
