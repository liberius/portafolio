import { useState, useRef } from 'react'
import './DesktopIcon.css'

interface DesktopIconProps {
  icon: string
  label: string
  onDoubleClick: () => void
}

export const DesktopIcon: React.FC<DesktopIconProps> = ({ icon, label, onDoubleClick }) => {
  const [isSelected, setIsSelected] = useState(false)
  const [showContextMenu, setShowContextMenu] = useState(false)
  const [contextMenuPos, setContextMenuPos] = useState({ x: 0, y: 0 })
  const [clickCount, setClickCount] = useState(0)
  const [clickTimer, setClickTimer] = useState<number | null>(null)
  const iconRef = useRef<HTMLButtonElement>(null)

  const handleClick = () => {
    setIsSelected(true)
    setShowContextMenu(false)

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

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsSelected(true)
    setContextMenuPos({ x: e.clientX, y: e.clientY })
    setShowContextMenu(true)
  }

  const handleBlur = () => {
    // Delay to allow context menu clicks
    setTimeout(() => {
      setIsSelected(false)
      setShowContextMenu(false)
    }, 200)
  }

  const handleOpenClick = () => {
    onDoubleClick()
    setShowContextMenu(false)
    setIsSelected(false)
  }

  return (
    <>
      <button
        ref={iconRef}
        className={`desktop-icon ${isSelected ? 'desktop-icon--selected' : ''}`}
        onClick={handleClick}
        onContextMenu={handleContextMenu}
        onBlur={handleBlur}
      >
        <div className="desktop-icon__icon">{icon}</div>
        <div className="desktop-icon__label">{label}</div>
      </button>

      {showContextMenu && (
        <div
          className="desktop-icon__context-menu"
          style={{
            position: 'fixed',
            left: `${contextMenuPos.x}px`,
            top: `${contextMenuPos.y}px`,
          }}
        >
          <button className="desktop-icon__context-menu-item" onClick={handleOpenClick}>
            <span>📂</span> Abrir
          </button>
          <div className="desktop-icon__context-menu-separator" />
          <button
            className="desktop-icon__context-menu-item"
            onClick={() => setShowContextMenu(false)}
          >
            <span>ℹ️</span> Propiedades
          </button>
        </div>
      )}
    </>
  )
}
