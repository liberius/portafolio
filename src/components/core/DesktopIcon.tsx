import { useState } from 'react'
import './DesktopIcon.css'

interface DesktopIconProps {
  icon: string
  label: string
  onDoubleClick: () => void
}

export const DesktopIcon: React.FC<DesktopIconProps> = ({ icon, label, onDoubleClick }) => {
  const [isSelected, setIsSelected] = useState(false)
  const [clickCount, setClickCount] = useState(0)
  const [clickTimer, setClickTimer] = useState<number | null>(null)

  const handleClick = () => {
    setIsSelected(true)

    if (clickTimer) {
      clearTimeout(clickTimer)
      setClickTimer(null)
    }

    const newCount = clickCount + 1

    if (newCount === 2) {
      // Double click
      onDoubleClick()
      setClickCount(0)
      setIsSelected(false)
    } else {
      setClickCount(newCount)
      const timer = setTimeout(() => {
        setClickCount(0)
      }, 300)
      setClickTimer(timer)
    }
  }

  const handleBlur = () => {
    setIsSelected(false)
  }

  return (
    <button
      className={`desktop-icon ${isSelected ? 'desktop-icon--selected' : ''}`}
      onClick={handleClick}
      onBlur={handleBlur}
    >
      <div className="desktop-icon__icon">{icon}</div>
      <div className="desktop-icon__label">{label}</div>
    </button>
  )
}
