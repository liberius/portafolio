import { useState } from 'react'
import './RpaLab.css'

type BotStatus = 'idle' | 'running' | 'completed' | 'error'

interface BotStep {
  id: number
  description: string
  status: BotStatus
  duration?: number
  technicalDetails?: string[]
}

interface BotLog {
  timestamp: string
  level: 'info' | 'success' | 'warning' | 'error' | 'technical'
  message: string
  details?: string
}

interface BotParameter {
  id: string
  label: string
  type: 'text' | 'number' | 'date' | 'select'
  defaultValue: string | number
  options?: string[]
  description?: string
}

interface BotOutput {
  type: 'table' | 'chart' | 'download'
  title: string
  data?: any
  downloadData?: string
  downloadFilename?: string
}

interface BotDemo {
  id: string
  name: string
  description: string
  icon: string
  steps: BotStep[]
  parameters: BotParameter[]
  technicalInfo: {
    language: string
    libraries: string[]
    apiEndpoint?: string
    protocol?: string
  }
  stats?: { label: string; value: string }[]
  outputs?: BotOutput[]
}

const formatTimestamp = () => {
  const now = new Date()
  const time = now.toLocaleTimeString('es-CL', { hour12: false })
  const ms = now.getMilliseconds().toString().padStart(3, '0')
  return `${time}.${ms}`
}

const BOT_DEMOS: BotDemo[] = [
  {
    id: 'febos',
    name: 'Invoice Automation Bot',
    description: 'Descarga automática de documentos fiscales vía API con clasificación y almacenamiento',
    icon: '🤖',
    technicalInfo: {
      language: 'Python 3.11',
      libraries: ['requests', 'pandas', 'openpyxl', 'PyJWT'],
      apiEndpoint: 'https://api.sii.cl/v1/documentos',
      protocol: 'REST API + JWT Auth',
    },
    parameters: [
      {
        id: 'fecha_desde',
        label: 'Fecha desde',
        type: 'date',
        defaultValue: '2024-10-01',
        description: 'Fecha inicial para búsqueda de facturas',
      },
      {
        id: 'fecha_hasta',
        label: 'Fecha hasta',
        type: 'date',
        defaultValue: '2024-10-12',
        description: 'Fecha final para búsqueda de facturas',
      },
      {
        id: 'estado',
        label: 'Estado de factura',
        type: 'select',
        defaultValue: 'Todas',
        options: ['Todas', 'Aprobada', 'Pendiente', 'Rechazada'],
        description: 'Filtrar por estado de aprobación',
      },
      {
        id: 'max_registros',
        label: 'Máximo de registros',
        type: 'number',
        defaultValue: 100,
        description: 'Límite de facturas a procesar',
      },
    ],
    steps: [
      {
        id: 1,
        description: 'Cargar archivo Excel con IDs de proveedores',
        status: 'idle',
        technicalDetails: [
          'Archivo: proveedores.xlsx',
          'Librería: openpyxl',
          'Validación: RUTs válidos',
        ],
      },
      {
        id: 2,
        description: 'Autenticar en API fiscal con JWT',
        status: 'idle',
        duration: 2,
        technicalDetails: [
          'POST https://api.sii.cl/auth/token',
          'Header: Content-Type: application/json',
          'Body: {client_id, client_secret}',
          'Response: JWT token válido por 3600s',
        ],
      },
      {
        id: 3,
        description: 'Query de documentos por rango de fechas',
        status: 'idle',
        duration: 15,
        technicalDetails: [
          'GET https://api.sii.cl/v1/documentos',
          'Query params: fecha_desde, fecha_hasta, estado',
          'Header: Authorization: Bearer {token}',
          'Paginación: 100 registros por request',
        ],
      },
      {
        id: 4,
        description: 'Clasificar por categoría de negocio',
        status: 'idle',
        duration: 3,
        technicalDetails: [
          'Algoritmo: Matching por keywords',
          'Categorías: 12 tipos de negocio',
          'Confidence score: > 0.85',
        ],
      },
      {
        id: 5,
        description: 'Descargar XMLs y PDFs en batch',
        status: 'idle',
        duration: 12,
        technicalDetails: [
          'Concurrent downloads: ThreadPoolExecutor(max_workers=5)',
          'Retry logic: 3 intentos con backoff exponencial',
          'Validación: Hash MD5 de archivos',
        ],
      },
      {
        id: 6,
        description: 'Generar reporte de auditoría JSON',
        status: 'idle',
        duration: 1,
        technicalDetails: [
          'Formato: JSON Schema v7',
          'Campos: 24 atributos por documento',
          'Compresión: gzip level 6',
        ],
      },
    ],
    stats: [
      { label: 'Tiempo manual', value: '4-6 horas' },
      { label: 'Tiempo bot', value: '~30 min' },
      { label: 'Ahorro tiempo', value: '85%' },
      { label: 'Arquitectura', value: 'RAG + RPA' },
    ],
    outputs: [
      {
        type: 'table',
        title: '📄 Documentos Descargados (últimos 10)',
        data: {
          headers: ['Folio', 'Proveedor', 'Monto', 'Fecha', 'Estado', 'Archivos'],
          rows: [
            ['INV-2024-001', 'Proveedor A', '$1,250,000', '2024-10-01', '✅ OK', 'XML, PDF'],
            ['INV-2024-002', 'Proveedor B', '$850,400', '2024-10-02', '✅ OK', 'XML, PDF'],
            ['INV-2024-003', 'Proveedor C', '$3,200,000', '2024-10-03', '✅ OK', 'XML, PDF'],
            ['INV-2024-004', 'Proveedor D', '$450,600', '2024-10-03', '✅ OK', 'XML, PDF'],
            ['INV-2024-005', 'Proveedor E', '$1,890,000', '2024-10-04', '✅ OK', 'XML, PDF'],
            ['INV-2024-006', 'Proveedor F', '$670,200', '2024-10-05', '⚠️ Parcial', 'XML'],
            ['INV-2024-007', 'Proveedor G', '$2,100,000', '2024-10-06', '✅ OK', 'XML, PDF'],
            ['INV-2024-008', 'Proveedor H', '$520,800', '2024-10-07', '✅ OK', 'XML, PDF'],
            ['INV-2024-009', 'Proveedor I', '$1,450,000', '2024-10-08', '✅ OK', 'XML, PDF'],
            ['INV-2024-010', 'Proveedor J', '$990,500', '2024-10-09', '✅ OK', 'XML, PDF'],
          ],
        },
      },
    ],
  },
  {
    id: 'email',
    name: 'Email Triage Bot',
    description: 'Clasificación automática de emails con NLP y actualización de CRM',
    icon: '📧',
    technicalInfo: {
      language: 'Python 3.11',
      libraries: ['imaplib', 'spaCy', 'requests', 'email'],
      protocol: 'IMAP + SSL',
      apiEndpoint: 'imap.gmail.com:993 | CRM API',
    },
    parameters: [
      {
        id: 'email_server',
        label: 'Servidor IMAP',
        type: 'select',
        defaultValue: 'Gmail',
        options: ['Gmail', 'Outlook', 'Exchange'],
        description: 'Proveedor de correo electrónico',
      },
      {
        id: 'max_emails',
        label: 'Máximo de emails',
        type: 'number',
        defaultValue: 150,
        description: 'Límite de emails a procesar',
      },
      {
        id: 'confidence_threshold',
        label: 'Umbral de confianza',
        type: 'number',
        defaultValue: 85,
        description: 'Porcentaje mínimo para clasificación (0-100)',
      },
    ],
    steps: [
      {
        id: 1,
        description: 'Conectar a servidor IMAP',
        status: 'idle',
        duration: 2,
        technicalDetails: [
          'Server: imap.gmail.com:993',
          'Protocol: IMAP4 over TLS/SSL',
          'Auth: OAuth 2.0 / App Password',
          'imaplib.IMAP4_SSL(host, port)',
        ],
      },
      {
        id: 2,
        description: 'Leer emails no leídos',
        status: 'idle',
        duration: 5,
        technicalDetails: [
          'Folder: INBOX',
          'Search: (UNSEEN)',
          'Fetch: RFC822 (full message)',
          'Parse: email.message_from_bytes()',
        ],
      },
      {
        id: 3,
        description: 'Clasificar con spaCy NLP',
        status: 'idle',
        duration: 8,
        technicalDetails: [
          'Modelo: es_core_news_lg',
          'Pipeline: tokenizer → tagger → parser → ner',
          'Categorías: Urgente (keywords), Normal, Spam (score)',
          'Accuracy: 92% en test set',
        ],
      },
      {
        id: 4,
        description: 'Extraer datos (nombre, monto, fecha)',
        status: 'idle',
        duration: 4,
        technicalDetails: [
          'NER: spaCy entity recognition',
          'Regex patterns: $XX,XXX | CLP | USD',
          'Date parsing: dateutil.parser',
          'Validación: fuzzy matching nombres',
        ],
      },
      {
        id: 5,
        description: 'Actualizar CRM vía API',
        status: 'idle',
        duration: 6,
        technicalDetails: [
          'PUT https://api.crm.com/v2/leads/{id}',
          'Header: Authorization: Bearer {token}',
          'Body: {subject, amount, priority, source}',
          'Rate limit: 100 requests/min',
        ],
      },
      {
        id: 6,
        description: 'Marcar emails como procesados',
        status: 'idle',
        duration: 2,
        technicalDetails: [
          'IMAP STORE command',
          'Flag: \\Seen',
          'Label: ProcessedByBot',
          'Commit: EXPUNGE mailbox',
        ],
      },
    ],
    stats: [
      { label: 'Emails/día', value: '~200' },
      { label: 'Tiempo manual', value: '2 horas' },
      { label: 'Tiempo bot', value: '15 min' },
      { label: 'Accuracy', value: '92%' },
    ],
    outputs: [
      {
        type: 'chart',
        title: '📊 Clasificación de Emails (últimos 150)',
        data: {
          categories: [
            { name: '🔴 Urgentes', count: 23, percentage: 15 },
            { name: '🟡 Normales', count: 89, percentage: 59 },
            { name: '🔵 Informativos', count: 26, percentage: 17 },
            { name: '🚫 Spam', count: 12, percentage: 8 },
          ],
        },
      },
      {
        type: 'table',
        title: '📋 Emails Urgentes Detectados',
        data: {
          headers: ['De', 'Asunto', 'Categoría', 'Monto Extraído', 'CRM Status'],
          rows: [
            ['cliente@empresa.cl', 'URGENTE: Pago vencido', '🔴 Urgente', '$850,000', '✅ Actualizado'],
            ['proveedor@supply.com', 'Pedido crítico #1247', '🔴 Urgente', '$1,200,000', '✅ Actualizado'],
            ['gerencia@corp.cl', 'Aprobación requerida HOY', '🔴 Urgente', 'N/A', '✅ Actualizado'],
            ['ventas@partner.cl', 'Propuesta con deadline', '🔴 Urgente', '$3,500,000', '✅ Actualizado'],
            ['soporte@cliente.cl', 'Sistema caído - P1', '🔴 Urgente', 'N/A', '✅ Actualizado'],
          ],
        },
      },
    ],
  },
  {
    id: 'scraper',
    name: 'Real Estate Scraper',
    description: 'Extracción de listados inmobiliarios de múltiples portales con análisis de precios',
    icon: '🏠',
    technicalInfo: {
      language: 'Python 3.11',
      libraries: ['Selenium', 'BeautifulSoup4', 'Pandas', 'openpyxl'],
      protocol: 'HTTP/HTTPS + Selenium WebDriver',
    },
    parameters: [
      {
        id: 'portales',
        label: 'Portales a scrapear',
        type: 'select',
        defaultValue: 'Ambos',
        options: ['Portal Inmobiliario', 'Yapo.cl', 'Ambos'],
        description: 'Sitios web a extraer',
      },
      {
        id: 'max_listings',
        label: 'Máximo de listings',
        type: 'number',
        defaultValue: 500,
        description: 'Límite de propiedades por portal',
      },
      {
        id: 'tipo_propiedad',
        label: 'Tipo de propiedad',
        type: 'select',
        defaultValue: 'Todas',
        options: ['Todas', 'Departamento', 'Casa', 'Oficina'],
        description: 'Filtrar por tipo',
      },
    ],
    steps: [
      {
        id: 1,
        description: 'Iniciar Selenium headless',
        status: 'idle',
        duration: 3,
        technicalDetails: [
          'Browser: ChromeDriver 120.0',
          'Mode: --headless --no-sandbox',
          'User-Agent: Randomized',
          'Window size: 1920x1080',
        ],
      },
      {
        id: 2,
        description: 'Scraping Portal Inmobiliario',
        status: 'idle',
        duration: 12,
        technicalDetails: [
          'URL: https://www.portalinmobiliario.com/venta/...',
          'Navegación: Scroll infinito simulado',
          'Extracción: BeautifulSoup4 parser',
          'Rate limiting: 2s delay entre requests',
        ],
      },
      {
        id: 3,
        description: 'Scraping Yapo.cl',
        status: 'idle',
        duration: 10,
        technicalDetails: [
          'URL: https://www.yapo.cl/region_metropolitana/...',
          'Paginación: ?page={n}',
          'Selector: CSS .listing-item',
          'Data: 15 campos extraídos por listing',
        ],
      },
      {
        id: 4,
        description: 'Limpiar y normalizar datos con Pandas',
        status: 'idle',
        duration: 5,
        technicalDetails: [
          'DataFrame: pd.DataFrame(raw_data)',
          'Cleaning: remove_duplicates(), fillna()',
          'Format: precio → int, m² → float',
          'Validación: assert all(precio > 0)',
        ],
      },
      {
        id: 5,
        description: 'Calcular precio promedio por comuna',
        status: 'idle',
        duration: 2,
        technicalDetails: [
          'Groupby: df.groupby(\'comuna\')',
          'Agg: mean(), median(), std()',
          'Sort: by average price desc',
          'Top N: 20 comunas',
        ],
      },
      {
        id: 6,
        description: 'Exportar a Excel con gráficos',
        status: 'idle',
        duration: 3,
        technicalDetails: [
          'Writer: pd.ExcelWriter(engine=\'openpyxl\')',
          'Sheets: Raw Data, Summary, Charts',
          'Charts: xlsxwriter bar charts',
          'Formato: headers bold, currency format',
        ],
      },
    ],
    stats: [
      { label: 'Listings/día', value: '~800' },
      { label: 'Portales', value: '2' },
      { label: 'Tiempo ejecución', value: '35 min' },
      { label: 'Datos extraídos', value: '15 campos' },
    ],
    outputs: [
      {
        type: 'table',
        title: '🏘️ Propiedades Extraídas (muestra de 8)',
        data: {
          headers: ['Título', 'Comuna', 'Precio', 'm²', 'Dorm', 'Baños', 'Portal'],
          rows: [
            ['Depto luminoso centro', 'Santiago', '$85M', '65', '2', '1', 'Portal Inmob.'],
            ['Casa con jardín', 'La Florida', '$120M', '120', '3', '2', 'Yapo.cl'],
            ['Depto nuevo Providencia', 'Providencia', '$165M', '80', '2', '2', 'Portal Inmob.'],
            ['Casa amplia Las Condes', 'Las Condes', '$280M', '180', '4', '3', 'Portal Inmob.'],
            ['Depto vista panorámica', 'Ñuñoa', '$95M', '70', '2', '1', 'Yapo.cl'],
            ['Casa remodelada', 'Maipú', '$110M', '110', '3', '2', 'Yapo.cl'],
            ['Depto sector oriente', 'Vitacura', '$190M', '90', '3', '2', 'Portal Inmob.'],
            ['Casa con piscina', 'Lo Barnechea', '$350M', '250', '5', '4', 'Portal Inmob.'],
          ],
        },
      },
      {
        type: 'chart',
        title: '📈 Precio Promedio por Comuna (Top 6)',
        data: {
          categories: [
            { name: 'Vitacura', count: 45, percentage: 100, avgPrice: '$215M' },
            { name: 'Las Condes', count: 78, percentage: 95, avgPrice: '$205M' },
            { name: 'Providencia', count: 62, percentage: 75, avgPrice: '$162M' },
            { name: 'Santiago', count: 89, percentage: 50, avgPrice: '$108M' },
            { name: 'Ñuñoa', count: 71, percentage: 45, avgPrice: '$97M' },
            { name: 'Maipú', count: 103, percentage: 35, avgPrice: '$75M' },
          ],
        },
      },
    ],
  },
]

export const RpaLab: React.FC = () => {
  const [selectedBot, setSelectedBot] = useState<string | null>(null)
  const [runningSteps, setRunningSteps] = useState<BotStep[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const [parameters, setParameters] = useState<Record<string, string | number>>({})
  const [logs, setLogs] = useState<BotLog[]>([])
  const [showTechnicalDetails, setShowTechnicalDetails] = useState(true)

  const currentBot = BOT_DEMOS.find((b) => b.id === selectedBot)

  const addLog = (level: BotLog['level'], message: string, details?: string) => {
    const log: BotLog = {
      timestamp: formatTimestamp(),
      level,
      message,
      details,
    }
    setLogs((prev) => [...prev, log])
  }

  const selectBot = (botId: string) => {
    setSelectedBot(botId)
    setLogs([])
    setRunningSteps([])

    const bot = BOT_DEMOS.find((b) => b.id === botId)
    if (bot?.parameters) {
      const defaultParams = bot.parameters.reduce((acc, param) => {
        acc[param.id] = param.defaultValue
        return acc
      }, {} as Record<string, string | number>)
      setParameters(defaultParams)
    }

    addLog('info', `Bot "${bot?.name}" cargado y listo para ejecutar`, `Lenguaje: ${bot?.technicalInfo.language}`)
  }

  const updateParameter = (paramId: string, value: string | number) => {
    setParameters((prev) => ({ ...prev, [paramId]: value }))
    addLog('info', `Parámetro actualizado: ${paramId} = ${value}`)
  }

  const runBot = async () => {
    if (!currentBot || isRunning) return

    setIsRunning(true)
    setLogs([])
    setRunningSteps(currentBot.steps.map((s) => ({ ...s, status: 'idle' })))

    addLog('info', '🚀 Iniciando ejecución del bot...', `Parámetros: ${JSON.stringify(parameters, null, 2)}`)
    addLog('technical', `Stack técnico: ${currentBot.technicalInfo.libraries.join(', ')}`)

    if (currentBot.technicalInfo.apiEndpoint) {
      addLog('technical', `Endpoint: ${currentBot.technicalInfo.apiEndpoint}`)
    }

    await new Promise((resolve) => setTimeout(resolve, 500))

    for (let i = 0; i < currentBot.steps.length; i++) {
      const step = currentBot.steps[i]

      // Mark current step as running
      setRunningSteps((prev) =>
        prev.map((s, idx) => (idx === i ? { ...s, status: 'running' as BotStatus } : s))
      )

      addLog('info', `📍 Paso ${i + 1}/${currentBot.steps.length}: ${step.description}`)

      // Log technical details
      if (step.technicalDetails) {
        step.technicalDetails.forEach((detail) => {
          addLog('technical', detail)
        })
      }

      // Simulate API calls or operations
      if (step.description.includes('API') || step.description.includes('autenticar')) {
        addLog('info', '🔐 Enviando request HTTP...')
        await new Promise((resolve) => setTimeout(resolve, 300))
        addLog('success', '✅ Response 200 OK - Token recibido')
      }

      if (step.description.includes('emails') || step.description.includes('IMAP')) {
        addLog('info', '📬 Conectando al servidor...')
        await new Promise((resolve) => setTimeout(resolve, 300))
        addLog('success', `✅ Conectado - ${parameters.max_emails || 150} emails encontrados`)
      }

      if (step.description.includes('Selenium') || step.description.includes('Scraping')) {
        const portal = step.description.includes('Portal') ? 'Portal Inmobiliario' : 'Yapo.cl'
        addLog('info', `🌐 Navegando a ${portal}...`)
        await new Promise((resolve) => setTimeout(resolve, 300))
        addLog('success', `✅ Página cargada - Iniciando extracción`)
      }

      // Simulate step duration
      await new Promise((resolve) => setTimeout(resolve, (step.duration || 1) * 200))

      // Mark as completed
      setRunningSteps((prev) =>
        prev.map((s, idx) => (idx === i ? { ...s, status: 'completed' as BotStatus } : s))
      )

      addLog('success', `✅ Paso ${i + 1} completado exitosamente`)
    }

    addLog('success', '🎉 Bot ejecutado exitosamente - Ver resultados abajo')
    setIsRunning(false)
  }

  const resetBot = () => {
    setRunningSteps(currentBot?.steps.map((s) => ({ ...s, status: 'idle' })) || [])
    setLogs([])
    addLog('info', 'Bot reiniciado - Listo para nueva ejecución')
  }

  const downloadCSV = (data: string, filename: string) => {
    const BOM = '\uFEFF'
    const blob = new Blob([BOM + data], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', filename)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    addLog('success', `📥 Archivo descargado: ${filename}`)
  }

  const allStepsCompleted =
    runningSteps.length > 0 && runningSteps.every((step) => step.status === 'completed')

  return (
    <div className="rpalab">
      <div className="rpalab__header">
        <h2>🤖 RPA Lab - Demos Técnicas Reales</h2>
        <p>Bots con código real, logs en tiempo real y detalles técnicos completos</p>
      </div>

      {!selectedBot ? (
        <div className="rpalab__bot-list">
          {BOT_DEMOS.map((bot) => (
            <button key={bot.id} className="rpalab__bot-card" onClick={() => selectBot(bot.id)}>
              <div className="rpalab__bot-icon">{bot.icon}</div>
              <div className="rpalab__bot-info">
                <h3>{bot.name}</h3>
                <p>{bot.description}</p>
                <div className="rpalab__bot-steps-count">
                  {bot.steps.length} pasos • {bot.parameters.length} parámetros • {bot.technicalInfo.libraries.length} librerías
                </div>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="rpalab__demo">
          <div className="rpalab__demo-header">
            <button className="rpalab__back-btn" onClick={() => setSelectedBot(null)}>
              ← Volver
            </button>
            <h3>
              {currentBot?.icon} {currentBot?.name}
            </h3>
          </div>

          <div className="rpalab__demo-description">{currentBot?.description}</div>

          {/* Technical Info Panel */}
          <div className="rpalab__tech-info">
            <h4>🔧 Stack Técnico</h4>
            <div className="rpalab__tech-grid">
              <div className="rpalab__tech-item">
                <strong>Lenguaje:</strong> {currentBot?.technicalInfo.language}
              </div>
              <div className="rpalab__tech-item">
                <strong>Librerías:</strong> {currentBot?.technicalInfo.libraries.join(', ')}
              </div>
              {currentBot?.technicalInfo.protocol && (
                <div className="rpalab__tech-item">
                  <strong>Protocolo:</strong> {currentBot.technicalInfo.protocol}
                </div>
              )}
              {currentBot?.technicalInfo.apiEndpoint && (
                <div className="rpalab__tech-item">
                  <strong>Endpoint:</strong> {currentBot.technicalInfo.apiEndpoint}
                </div>
              )}
            </div>
          </div>

          {/* Parameters */}
          {currentBot?.parameters && currentBot.parameters.length > 0 && (
            <div className="rpalab__parameters">
              <h4>⚙️ Configuración de Parámetros</h4>
              <div className="rpalab__parameters-grid">
                {currentBot.parameters.map((param) => (
                  <div key={param.id} className="rpalab__parameter">
                    <label className="rpalab__parameter-label">
                      {param.label}
                      {param.description && (
                        <span className="rpalab__parameter-description">{param.description}</span>
                      )}
                    </label>
                    {param.type === 'select' ? (
                      <select
                        className="rpalab__parameter-input"
                        value={parameters[param.id] || param.defaultValue}
                        onChange={(e) => updateParameter(param.id, e.target.value)}
                        disabled={isRunning}
                      >
                        {param.options?.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={param.type}
                        className="rpalab__parameter-input"
                        value={parameters[param.id] || param.defaultValue}
                        onChange={(e) =>
                          updateParameter(
                            param.id,
                            param.type === 'number' ? Number(e.target.value) : e.target.value
                          )
                        }
                        disabled={isRunning}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Stats */}
          {currentBot?.stats && (
            <div className="rpalab__stats">
              {currentBot.stats.map((stat) => (
                <div key={stat.label} className="rpalab__stat">
                  <div className="rpalab__stat-label">{stat.label}</div>
                  <div className="rpalab__stat-value">{stat.value}</div>
                </div>
              ))}
            </div>
          )}

          {/* Controls */}
          <div className="rpalab__controls">
            <button className="rpalab__run-btn" onClick={runBot} disabled={isRunning}>
              {isRunning ? '⏳ Ejecutando...' : '▶️ Ejecutar Bot'}
            </button>
            {runningSteps.length > 0 && !isRunning && (
              <button className="rpalab__reset-btn" onClick={resetBot}>
                🔄 Reiniciar
              </button>
            )}
            <button
              className="rpalab__toggle-btn"
              onClick={() => setShowTechnicalDetails(!showTechnicalDetails)}
            >
              {showTechnicalDetails ? '👁️ Ocultar' : '👁️ Mostrar'} Detalles Técnicos
            </button>
          </div>

          {/* Execution Layout: Steps + Logs side by side */}
          {runningSteps.length > 0 && (
            <div className="rpalab__execution-layout">
              {/* Steps Panel */}
              <div className="rpalab__steps-panel">
                <h4>📋 Pasos de Ejecución</h4>
                <div className="rpalab__steps">
                  {runningSteps.map((step, idx) => (
                    <div key={step.id} className={`rpalab__step rpalab__step--${step.status}`}>
                      <div className="rpalab__step-number">{idx + 1}</div>
                      <div className="rpalab__step-content">
                        <div className="rpalab__step-description">{step.description}</div>
                        {step.duration && step.status === 'running' && (
                          <div className="rpalab__step-duration">~{step.duration}s</div>
                        )}
                        {showTechnicalDetails && step.technicalDetails && step.status !== 'idle' && (
                          <div className="rpalab__step-technical">
                            {step.technicalDetails.map((detail, i) => (
                              <div key={i} className="rpalab__step-technical-line">
                                • {detail}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="rpalab__step-status">
                        {step.status === 'idle' && '⚪'}
                        {step.status === 'running' && '🔄'}
                        {step.status === 'completed' && '✅'}
                        {step.status === 'error' && '❌'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Logs Panel */}
              <div className="rpalab__logs-panel">
                <h4>📜 Logs en Tiempo Real</h4>
                <div className="rpalab__logs">
                  {logs.map((log, idx) => (
                    <div key={idx} className={`rpalab__log rpalab__log--${log.level}`}>
                      <span className="rpalab__log-timestamp">[{log.timestamp}]</span>
                      <span className="rpalab__log-message">{log.message}</span>
                      {log.details && showTechnicalDetails && (
                        <div className="rpalab__log-details">{log.details}</div>
                      )}
                    </div>
                  ))}
                  {logs.length === 0 && (
                    <div className="rpalab__log rpalab__log--info">
                      <span className="rpalab__log-message">
                        💡 Los logs aparecerán aquí cuando ejecutes el bot
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Outputs */}
          {allStepsCompleted && currentBot?.outputs && (
            <div className="rpalab__outputs">
              <div className="rpalab__outputs-header">
                <h3>📊 Resultados de la Ejecución</h3>
              </div>
              {currentBot.outputs.map((output, idx) => (
                <div key={idx} className="rpalab__output">
                  <h4 className="rpalab__output-title">{output.title}</h4>
                  {output.type === 'table' && output.data && (
                    <div className="rpalab__table-wrapper">
                      <table className="rpalab__table">
                        <thead>
                          <tr>
                            {output.data.headers.map((header: string, i: number) => (
                              <th key={i}>{header}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {output.data.rows.map((row: string[], rowIdx: number) => (
                            <tr key={rowIdx}>
                              {row.map((cell: string, cellIdx: number) => (
                                <td key={cellIdx}>{cell}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                  {output.type === 'chart' && output.data && (
                    <div className="rpalab__chart">
                      {output.data.categories.map((cat: any, i: number) => (
                        <div key={i} className="rpalab__chart-item">
                          <div className="rpalab__chart-label">
                            {cat.name}
                            {cat.avgPrice && <span className="rpalab__chart-price"> ({cat.avgPrice})</span>}
                          </div>
                          <div className="rpalab__chart-bar-container">
                            <div
                              className="rpalab__chart-bar"
                              style={{ width: `${cat.percentage}%` }}
                            />
                            <span className="rpalab__chart-value">
                              {cat.count} {cat.avgPrice ? 'propiedades' : 'emails'}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {output.type === 'download' && output.downloadData && output.downloadFilename && (
                    <button
                      className="rpalab__download-btn"
                      onClick={() => downloadCSV(output.downloadData!, output.downloadFilename!)}
                    >
                      📥 Descargar {output.downloadFilename}
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
