import { useState, useEffect } from 'react'
import './Apibee.css'

type BeeEmotion = 'happy' | 'excited' | 'calm' | 'sleeping' | 'sad' | 'angry'
type Interaction = 'acariciar' | 'ignorar' | 'alimentar' | 'jugar'

interface EmotionData {
  emoji: string
  icon: string
  color: string
  description: string
  energy: number
}

const EMOTIONS: Record<BeeEmotion, EmotionData> = {
  happy: {
    emoji: '😊',
    icon: '/assets/apibee/corazon.png',
    color: '#FFD700',
    description: 'Feliz y contenta',
    energy: 80,
  },
  excited: {
    emoji: '🤩',
    icon: '/assets/apibee/corazon.png',
    color: '#FF6B6B',
    description: '¡Súper emocionada!',
    energy: 100,
  },
  calm: {
    emoji: '😌',
    icon: '/assets/apibee/acariciar.png',
    color: '#4ECDC4',
    description: 'Tranquila y relajada',
    energy: 60,
  },
  sleeping: {
    emoji: '😴',
    icon: '/assets/apibee/ignorar.png',
    color: '#95A5A6',
    description: 'Durmiendo...',
    energy: 30,
  },
  sad: {
    emoji: '😢',
    icon: '/assets/apibee/ignorar.png',
    color: '#6C757D',
    description: 'Un poco triste',
    energy: 40,
  },
  angry: {
    emoji: '😠',
    icon: '/assets/apibee/espantado.png',
    color: '#E74C3C',
    description: 'Molesta',
    energy: 50,
  },
}

export const Apibee: React.FC = () => {
  const [emotion, setEmotion] = useState<BeeEmotion>('happy')
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [interactionCount, setInteractionCount] = useState(0)
  const [showFeedback, setShowFeedback] = useState(false)
  const [feedbackText, setFeedbackText] = useState('')
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    // Auto-decay de energía cada 10 segundos
    const interval = setInterval(() => {
      if (emotion !== 'sleeping') {
        const currentEnergy = EMOTIONS[emotion].energy
        if (currentEnergy <= 40) {
          setEmotion('sleeping')
        }
      }
    }, 10000)

    return () => clearInterval(interval)
  }, [emotion])

  const handleInteraction = (type: Interaction) => {
    setIsAnimating(true)
    setTimeout(() => setIsAnimating(false), 500)

    let newEmotion: BeeEmotion = emotion
    let points = 0
    let feedback = ''

    switch (type) {
      case 'acariciar':
        if (emotion === 'sleeping' || emotion === 'sad') {
          newEmotion = 'calm'
          points = 15
          feedback = '¡Le gusta que la acaricien! +15pts'
        } else if (emotion === 'angry') {
          newEmotion = 'happy'
          points = 20
          feedback = '¡La calmaste! +20pts'
        } else {
          newEmotion = 'happy'
          points = 10
          feedback = '¡Qué lindo! +10pts'
        }
        break

      case 'jugar':
        if (emotion === 'sleeping') {
          newEmotion = 'angry'
          points = -10
          feedback = '¡La despertaste! -10pts'
        } else if (emotion === 'calm' || emotion === 'happy') {
          newEmotion = 'excited'
          points = 25
          feedback = '¡Le encanta jugar! +25pts'
        } else {
          newEmotion = 'happy'
          points = 15
          feedback = '¡Diversión! +15pts'
        }
        break

      case 'alimentar':
        if (emotion === 'sleeping') {
          newEmotion = 'happy'
          points = 10
          feedback = 'Despertó con hambre +10pts'
        } else {
          newEmotion = 'excited'
          points = 20
          feedback = '¡Ñam ñam! +20pts'
        }
        break

      case 'ignorar':
        if (emotion === 'excited' || emotion === 'happy') {
          newEmotion = 'sad'
          points = -15
          feedback = 'Se puso triste... -15pts'
        } else if (emotion === 'angry') {
          newEmotion = 'calm'
          points = 5
          feedback = 'Se calmó sola +5pts'
        }
        break
    }

    setEmotion(newEmotion)
    setScore((prev) => Math.max(0, prev + points))
    setInteractionCount((prev) => prev + 1)
    setStreak((prev) => (points > 0 ? prev + 1 : 0))
    setFeedbackText(feedback)
    setShowFeedback(true)

    setTimeout(() => setShowFeedback(false), 2000)
  }

  const resetGame = () => {
    setEmotion('happy')
    setScore(0)
    setStreak(0)
    setInteractionCount(0)
  }

  const currentEmotion = EMOTIONS[emotion]
  const wellbeingScore = Math.min(100, (score / interactionCount) * 10 || 0)

  return (
    <div className="apibee">
      <div className="apibee__header">
        <div className="apibee__header-content">
          <h2>🐝 Apibee - Gamificación de Bienestar Laboral</h2>
          <p>Ganador de Hackathon Apiux | Interactúa con la abeja y descubre su estado emocional</p>
        </div>
      </div>

      <div className="apibee__main">
        <div className="apibee__stats-panel">
          <div className="apibee__stat-card">
            <div className="apibee__stat-icon">🎯</div>
            <div className="apibee__stat-content">
              <div className="apibee__stat-label">Puntuación</div>
              <div className="apibee__stat-value">{score}</div>
            </div>
          </div>

          <div className="apibee__stat-card">
            <div className="apibee__stat-icon">🔥</div>
            <div className="apibee__stat-content">
              <div className="apibee__stat-label">Racha</div>
              <div className="apibee__stat-value">{streak}</div>
            </div>
          </div>

          <div className="apibee__stat-card">
            <div className="apibee__stat-icon">🤝</div>
            <div className="apibee__stat-content">
              <div className="apibee__stat-label">Interacciones</div>
              <div className="apibee__stat-value">{interactionCount}</div>
            </div>
          </div>

          <div className="apibee__stat-card apibee__stat-card--wide">
            <div className="apibee__stat-icon">💚</div>
            <div className="apibee__stat-content">
              <div className="apibee__stat-label">Índice de Bienestar</div>
              <div className="apibee__wellbeing-bar">
                <div
                  className="apibee__wellbeing-fill"
                  style={{
                    width: `${wellbeingScore}%`,
                    backgroundColor: wellbeingScore > 70 ? '#4CAF50' : wellbeingScore > 40 ? '#FFC107' : '#F44336',
                  }}
                />
              </div>
              <div className="apibee__stat-value">{Math.round(wellbeingScore)}%</div>
            </div>
          </div>
        </div>

        <div className="apibee__bee-container">
          <div
            className={`apibee__bee ${isAnimating ? 'apibee__bee--animating' : ''}`}
            style={{ borderColor: currentEmotion.color }}
          >
            <div className="apibee__bee-emoji" style={{ fontSize: '120px' }}>
              🐝
            </div>
            <div className="apibee__bee-emotion" style={{ fontSize: '60px' }}>
              {currentEmotion.emoji}
            </div>
          </div>

          <div className="apibee__emotion-info" style={{ backgroundColor: currentEmotion.color }}>
            <div className="apibee__emotion-name">{currentEmotion.description}</div>
            <div className="apibee__emotion-energy">
              Energía: {currentEmotion.energy}%
              <div className="apibee__energy-bar">
                <div
                  className="apibee__energy-fill"
                  style={{ width: `${currentEmotion.energy}%` }}
                />
              </div>
            </div>
          </div>

          {showFeedback && (
            <div className="apibee__feedback">
              {feedbackText}
            </div>
          )}
        </div>

        <div className="apibee__controls">
          <button
            className="apibee__action-btn apibee__action-btn--acariciar"
            onClick={() => handleInteraction('acariciar')}
          >
            <img src="/assets/apibee/acariciar.png" alt="Acariciar" />
            <span>Acariciar</span>
          </button>

          <button
            className="apibee__action-btn apibee__action-btn--jugar"
            onClick={() => handleInteraction('jugar')}
          >
            <img src="/assets/apibee/corazon.png" alt="Jugar" />
            <span>Jugar</span>
          </button>

          <button
            className="apibee__action-btn apibee__action-btn--alimentar"
            onClick={() => handleInteraction('alimentar')}
          >
            <img src="/assets/apibee/api.png" alt="Alimentar" />
            <span>Alimentar</span>
          </button>

          <button
            className="apibee__action-btn apibee__action-btn--ignorar"
            onClick={() => handleInteraction('ignorar')}
          >
            <img src="/assets/apibee/ignorar.png" alt="Ignorar" />
            <span>Ignorar</span>
          </button>
        </div>
      </div>

      <div className="apibee__footer">
        <div className="apibee__info-box">
          <h3>🏆 Sobre Apibee</h3>
          <p>
            Apibee es una aplicación de gamificación desarrollada para el Hackathon interno de Apiux.
            Permite medir el bienestar laboral de los empleados a través de interacciones lúdicas
            con una mascota virtual (la abeja). Las interacciones recopilan datos sobre el estado
            emocional y engagement del usuario.
          </p>
          <div className="apibee__tech-stack">
            <span>Python</span>
            <span>Kivy</span>
            <span>Animaciones</span>
            <span>UX Gamification</span>
          </div>
        </div>

        <button className="apibee__reset-btn" onClick={resetGame}>
          🔄 Reiniciar Juego
        </button>
      </div>
    </div>
  )
}
