import { useState } from 'react'
import './RpaLab.css'

type BotStatus = 'idle' | 'running' | 'completed' | 'error'

interface BotStep {
  id: number
  description: string
  status: BotStatus
  duration?: number
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
  stats?: {
    label: string
    value: string
  }[]
  outputs?: BotOutput[]
}

const BOT_DEMOS: BotDemo[] = [
  {
    id: 'febos',
    name: 'Invoice Automation Bot',
    description: 'Descarga automática de documentos fiscales vía API con clasificación y almacenamiento',
    icon: '🤖',
    steps: [
      { id: 1, description: 'Cargar archivo Excel con IDs de proveedores', status: 'idle' },
      { id: 2, description: 'Autenticar en API fiscal con JWT', status: 'idle', duration: 2 },
      { id: 3, description: 'Query de documentos por rango de fechas', status: 'idle', duration: 15 },
      { id: 4, description: 'Clasificar por categoría de negocio', status: 'idle', duration: 3 },
      { id: 5, description: 'Descargar XMLs y PDFs en batch', status: 'idle', duration: 12 },
      { id: 6, description: 'Generar reporte de auditoría JSON', status: 'idle', duration: 1 },
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
      {
        type: 'download',
        title: '💾 Descargar Reporte Completo',
        downloadFilename: 'reporte_facturas.csv',
        downloadData:
          'Folio,Proveedor,Monto,Fecha,Estado,XML,PDF\nINV-2024-001,Proveedor A,1250000,2024-10-01,OK,✓,✓\nINV-2024-002,Proveedor B,850400,2024-10-02,OK,✓,✓\nINV-2024-003,Proveedor C,3200000,2024-10-03,OK,✓,✓\nINV-2024-004,Proveedor D,450600,2024-10-03,OK,✓,✓\nINV-2024-005,Proveedor E,1890000,2024-10-04,OK,✓,✓\nINV-2024-006,Proveedor F,670200,2024-10-05,Parcial,✓,✗\nINV-2024-007,Proveedor G,2100000,2024-10-06,OK,✓,✓\nINV-2024-008,Proveedor H,520800,2024-10-07,OK,✓,✓\nINV-2024-009,Proveedor I,1450000,2024-10-08,OK,✓,✓\nINV-2024-010,Proveedor J,990500,2024-10-09,OK,✓,✓',
      },
    ],
  },
  {
    id: 'email',
    name: 'Email Triage Bot',
    description: 'Clasificación automática de emails con NLP y actualización de CRM',
    icon: '📧',
    steps: [
      { id: 1, description: 'Conectar a servidor IMAP', status: 'idle', duration: 2 },
      { id: 2, description: 'Leer 150 emails no leídos', status: 'idle', duration: 5 },
      { id: 3, description: 'Clasificar con spaCy NLP (Urgente/Normal/Spam)', status: 'idle', duration: 8 },
      { id: 4, description: 'Extraer datos (nombre, monto, fecha)', status: 'idle', duration: 4 },
      { id: 5, description: 'Actualizar CRM vía API', status: 'idle', duration: 6 },
      { id: 6, description: 'Marcar emails como procesados', status: 'idle', duration: 2 },
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
    steps: [
      { id: 1, description: 'Iniciar Selenium headless', status: 'idle', duration: 3 },
      { id: 2, description: 'Scraping Portal Inmobiliario (500 listings)', status: 'idle', duration: 12 },
      { id: 3, description: 'Scraping Yapo.cl (300 listings)', status: 'idle', duration: 10 },
      { id: 4, description: 'Limpiar y normalizar datos con Pandas', status: 'idle', duration: 5 },
      { id: 5, description: 'Calcular precio promedio por comuna', status: 'idle', duration: 2 },
      { id: 6, description: 'Exportar a Excel con gráficos', status: 'idle', duration: 3 },
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
      {
        type: 'download',
        title: '💾 Descargar Dataset Completo',
        downloadFilename: 'propiedades_extraidas.csv',
        downloadData:
          'Titulo,Comuna,Precio,Metros,Dormitorios,Banos,Portal,Fecha\nDepto luminoso centro,Santiago,85000000,65,2,1,Portal Inmobiliario,2024-10-12\nCasa con jardín,La Florida,120000000,120,3,2,Yapo.cl,2024-10-12\nDepto nuevo Providencia,Providencia,165000000,80,2,2,Portal Inmobiliario,2024-10-12\nCasa amplia Las Condes,Las Condes,280000000,180,4,3,Portal Inmobiliario,2024-10-12\nDepto vista panorámica,Ñuñoa,95000000,70,2,1,Yapo.cl,2024-10-12',
      },
    ],
  },
]

export const RpaLab: React.FC = () => {
  const [selectedBot, setSelectedBot] = useState<string | null>(null)
  const [runningSteps, setRunningSteps] = useState<BotStep[]>([])
  const [isRunning, setIsRunning] = useState(false)

  const currentBot = BOT_DEMOS.find((b) => b.id === selectedBot)

  const runBot = async () => {
    if (!currentBot || isRunning) return

    setIsRunning(true)
    setRunningSteps(currentBot.steps.map((s) => ({ ...s, status: 'idle' })))

    for (let i = 0; i < currentBot.steps.length; i++) {
      // Mark current step as running
      setRunningSteps((prev) =>
        prev.map((step, idx) => (idx === i ? { ...step, status: 'running' as BotStatus } : step))
      )

      // Simulate step duration
      await new Promise((resolve) => setTimeout(resolve, (currentBot.steps[i].duration || 1) * 200))

      // Mark as completed
      setRunningSteps((prev) =>
        prev.map((step, idx) => (idx === i ? { ...step, status: 'completed' as BotStatus } : step))
      )
    }

    setIsRunning(false)
  }

  const resetBot = () => {
    setRunningSteps(currentBot?.steps.map((s) => ({ ...s, status: 'idle' })) || [])
  }

  const downloadCSV = (data: string, filename: string) => {
    const blob = new Blob([data], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', filename)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const allStepsCompleted =
    runningSteps.length > 0 && runningSteps.every((step) => step.status === 'completed')

  return (
    <div className="rpalab">
      <div className="rpalab__header">
        <h2>🤖 RPA Lab - Bot Simulations</h2>
        <p>Simulaciones visuales de bots RPA en producción</p>
      </div>

      {!selectedBot ? (
        <div className="rpalab__bot-list">
          {BOT_DEMOS.map((bot) => (
            <button key={bot.id} className="rpalab__bot-card" onClick={() => setSelectedBot(bot.id)}>
              <div className="rpalab__bot-icon">{bot.icon}</div>
              <div className="rpalab__bot-info">
                <h3>{bot.name}</h3>
                <p>{bot.description}</p>
                <div className="rpalab__bot-steps-count">{bot.steps.length} pasos automatizados</div>
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

          <div className="rpalab__controls">
            <button className="rpalab__run-btn" onClick={runBot} disabled={isRunning}>
              {isRunning ? '⏳ Ejecutando...' : '▶️ Ejecutar Bot'}
            </button>
            {runningSteps.length > 0 && !isRunning && (
              <button className="rpalab__reset-btn" onClick={resetBot}>
                🔄 Reiniciar
              </button>
            )}
          </div>

          <div className="rpalab__steps">
            {(runningSteps.length > 0 ? runningSteps : currentBot?.steps || []).map((step, idx) => (
              <div key={step.id} className={`rpalab__step rpalab__step--${step.status}`}>
                <div className="rpalab__step-number">{idx + 1}</div>
                <div className="rpalab__step-content">
                  <div className="rpalab__step-description">{step.description}</div>
                  {step.duration && step.status === 'running' && (
                    <div className="rpalab__step-duration">~{step.duration}s</div>
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
