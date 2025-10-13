import { useState, useEffect, useRef } from 'react'
import './DesktopPet.css'

type PetState = 'idle' | 'walking' | 'sleeping' | 'playing'

export const DesktopPet: React.FC = () => {
  const [position, setPosition] = useState({ x: 100, y: window.innerHeight - 150 })
  const [state, setState] = useState<PetState>('idle')
  const [direction, setDirection] = useState<'left' | 'right'>('right')
  const petRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      // Random state changes
      const random = Math.random()

      if (random < 0.1) {
        setState('sleeping')
      } else if (random < 0.3) {
        setState('playing')
      } else if (random < 0.7) {
        setState('walking')
      } else {
        setState('idle')
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (state !== 'walking') return

    const interval = setInterval(() => {
      setPosition((prev) => {
        let newX = prev.x

        // Move in current direction
        if (direction === 'right') {
          newX += 2
          if (newX > window.innerWidth - 80) {
            newX = window.innerWidth - 80
            setDirection('left')
          }
        } else {
          newX -= 2
          if (newX < 0) {
            newX = 0
            setDirection('right')
          }
        }

        return { x: newX, y: prev.y }
      })
    }, 50)

    return () => clearInterval(interval)
  }, [state, direction])

  const getPetEmoji = () => {
    switch (state) {
      case 'sleeping':
        return '🐈‍⬛' // Changed from 😴 to actual cat
      case 'playing':
        return '😸'
      case 'walking':
        return '🐈' // More detailed walking cat
      default:
        return '😺'
    }
  }

  const handleClick = () => {
    if (state === 'sleeping') {
      setState('playing')
      setTimeout(() => setState('idle'), 2000)
    } else {
      setState('playing')
      setTimeout(() => setState('idle'), 1000)
    }
  }

  return (
    <div
      ref={petRef}
      className={`desktop-pet desktop-pet--${state} desktop-pet--${direction}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
      onClick={handleClick}
      title="Click me! I'm Felix 🐱"
    >
      <div className="desktop-pet__body">
        <div className="desktop-pet__sprite">{getPetEmoji()}</div>
        {state === 'sleeping' && (
          <div className="desktop-pet__zzz">
            <span>Z</span>
            <span>z</span>
            <span>z</span>
          </div>
        )}
      </div>
      {state === 'playing' && <div className="desktop-pet__heart">❤️</div>}
    </div>
  )
}
