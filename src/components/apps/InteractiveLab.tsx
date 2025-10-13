import { useState } from 'react'
import { useWindowStore } from '../../stores/windowStore'
import './InteractiveLab.css'

interface LabDemo {
  id: string
  title: string
  description: string
  icon: string
  color: string
  component: 'RpaLab' | 'BillingApp' | 'ApiDemo' | 'Apibee'
  features: string[]
  status: 'ready' | 'coming-soon'
}

const LAB_DEMOS: LabDemo[] = [
  {
    id: 'rpa-lab',
    title: 'RPA Automation Lab',
    description: 'Simulaciones visuales de bots RPA que automatizan tareas complejas',
    icon: '🤖',
    color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    component: 'RpaLab',
    features: [
      '3 bots RPA configurables',
      'Parámetros personalizables',
      'Descarga de reportes CSV',
      'Visualización paso a paso',
    ],
    status: 'ready',
  },
  {
    id: 'billing-system',
    title: 'Sistema POS/Boletas',
    description: 'Sistema completo de punto de venta con POO y arquitectura full-stack',
    icon: '💰',
    color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    component: 'BillingApp',
    features: [
      'Catálogo de productos',
      'Cálculo automático IVA',
      'Generación de boletas',
      'Historial de ventas',
    ],
    status: 'ready',
  },
  {
    id: 'api-demos',
    title: 'API Integration Demos',
    description: 'Ejemplos de integración con APIs REST y consumo de datos',
    icon: '🌐',
    color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    component: 'ApiDemo',
    features: [
      'Fetch API examples',
      'Error handling',
      'Loading states',
      'Data transformation',
    ],
    status: 'ready',
  },
  {
    id: 'apibee',
    title: 'Apibee - Gamificación',
    description: 'App ganadora de hackathon para medir bienestar laboral',
    icon: '🐝',
    color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    component: 'Apibee',
    features: [
      'Interacción con mascota',
      'Sistema de emociones',
      'Puntuación y rachas',
      'Índice de bienestar',
    ],
    status: 'ready',
  },
]

export const InteractiveLab: React.FC = () => {
  const { openWindow } = useWindowStore()
  const [selectedDemo, setSelectedDemo] = useState<string | null>(null)

  const handleOpenDemo = (e: React.MouseEvent, demo: LabDemo) => {
    e.stopPropagation()
    e.preventDefault()

    console.log('🎯 Opening demo:', demo.title, demo.component)

    if (demo.status === 'coming-soon') {
      alert('🚧 Esta demo estará disponible próximamente')
      return
    }

    console.log('✅ Calling openWindow with:', {
      id: `${demo.component.toLowerCase()}-${Date.now()}`,
      title: demo.title,
      component: demo.component,
    })

    openWindow({
      id: `${demo.component.toLowerCase()}-${Date.now()}`,
      title: demo.title,
      component: demo.component,
    })
  }

  const handleViewDetails = (e: React.MouseEvent, demoId: string) => {
    e.stopPropagation()
    e.preventDefault()

    console.log('👁️ Toggling details for:', demoId, 'Currently:', selectedDemo)
    setSelectedDemo(selectedDemo === demoId ? null : demoId)
  }

  return (
    <div className="interactive-lab">
      <div className="interactive-lab__header">
        <div className="interactive-lab__header-content">
          <h2>🎮 Laboratorio Interactivo</h2>
          <p>Explora mis demos técnicas en acción - Full-Stack, RPA, APIs y más</p>
        </div>
        <div className="interactive-lab__stats">
          <div className="interactive-lab__stat">
            <span className="interactive-lab__stat-value">
              {LAB_DEMOS.filter((d) => d.status === 'ready').length}
            </span>
            <span className="interactive-lab__stat-label">Demos Listas</span>
          </div>
          <div className="interactive-lab__stat">
            <span className="interactive-lab__stat-value">10+</span>
            <span className="interactive-lab__stat-label">Tecnologías</span>
          </div>
          <div className="interactive-lab__stat">
            <span className="interactive-lab__stat-value">100%</span>
            <span className="interactive-lab__stat-label">Interactivo</span>
          </div>
        </div>
      </div>

      <div className="interactive-lab__intro">
        <div className="interactive-lab__intro-card">
          <h3>👋 Bienvenido al Lab</h3>
          <p>
            Este espacio reúne todas mis demos técnicas interactivas. Cada proyecto está
            completamente funcional y listo para ser probado. Haz click en cualquier tarjeta para
            explorar.
          </p>
          <div className="interactive-lab__tech-stack">
            <span className="interactive-lab__tech">React</span>
            <span className="interactive-lab__tech">TypeScript</span>
            <span className="interactive-lab__tech">Python</span>
            <span className="interactive-lab__tech">RPA</span>
            <span className="interactive-lab__tech">APIs REST</span>
            <span className="interactive-lab__tech">POO</span>
          </div>
        </div>
      </div>

      <div className="interactive-lab__grid">
        {LAB_DEMOS.map((demo) => (
          <div
            key={demo.id}
            className={`interactive-lab__card ${demo.status === 'coming-soon' ? 'interactive-lab__card--disabled' : ''} ${selectedDemo === demo.id ? 'interactive-lab__card--expanded' : ''}`}
            style={{ background: demo.color }}
          >
            <div className="interactive-lab__card-header">
              <div className="interactive-lab__card-icon">{demo.icon}</div>
              <div className="interactive-lab__card-status">
                {demo.status === 'ready' ? '✅ Listo' : '🚧 Próximamente'}
              </div>
            </div>

            <div className="interactive-lab__card-body">
              <h3 className="interactive-lab__card-title">{demo.title}</h3>
              <p className="interactive-lab__card-description">{demo.description}</p>

              {selectedDemo === demo.id && (
                <div className="interactive-lab__card-features">
                  <h4>✨ Características:</h4>
                  <ul>
                    {demo.features.map((feature, idx) => (
                      <li key={idx}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="interactive-lab__card-actions">
              <button
                className="interactive-lab__btn interactive-lab__btn--primary"
                onClick={(e) => handleOpenDemo(e, demo)}
                disabled={demo.status === 'coming-soon'}
              >
                {demo.status === 'ready' ? '▶️ Abrir Demo' : '🔒 Próximamente'}
              </button>
              <button
                className="interactive-lab__btn interactive-lab__btn--secondary"
                onClick={(e) => handleViewDetails(e, demo.id)}
              >
                {selectedDemo === demo.id ? '▲ Menos' : '▼ Más info'}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="interactive-lab__footer">
        <div className="interactive-lab__footer-content">
          <h3>💡 ¿Qué puedes hacer aquí?</h3>
          <div className="interactive-lab__actions-grid">
            <div className="interactive-lab__action">
              <span className="interactive-lab__action-icon">🤖</span>
              <h4>Ejecutar Bots RPA</h4>
              <p>Configura parámetros y observa bots en acción</p>
            </div>
            <div className="interactive-lab__action">
              <span className="interactive-lab__action-icon">💰</span>
              <h4>Generar Boletas</h4>
              <p>Prueba el sistema POS completo con POO</p>
            </div>
            <div className="interactive-lab__action">
              <span className="interactive-lab__action-icon">🌐</span>
              <h4>Consumir APIs</h4>
              <p>Ve ejemplos de integración con APIs REST</p>
            </div>
            <div className="interactive-lab__action">
              <span className="interactive-lab__action-icon">📊</span>
              <h4>Ver Resultados</h4>
              <p>Descarga reportes y datos generados</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
