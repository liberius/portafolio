import { useState } from 'react'
import { useWindowStore } from '../../stores/windowStore'
import { StartMenu } from './StartMenu'
import './Taskbar.css'

export const Taskbar: React.FC = () => {
  const { windows, focusWindow, activeWindowId, restoreWindow } = useWindowStore()
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false)

  const handleStartClick = () => {
    setIsStartMenuOpen(!isStartMenuOpen)
  }

  const handleTaskbarItemClick = (windowId: string, isMinimized: boolean) => {
    if (isMinimized) {
      restoreWindow(windowId)
      focusWindow(windowId)
    } else if (activeWindowId === windowId) {
      // Already active, do nothing or minimize
      // minimizeWindow(windowId) // Optional behavior
    } else {
      focusWindow(windowId)
    }
  }

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    })
  }

  return (
    <>
      {isStartMenuOpen && <StartMenu onClose={() => setIsStartMenuOpen(false)} />}

      <div className="taskbar">
        <button
          className={`taskbar__start ${isStartMenuOpen ? 'taskbar__start--active' : ''}`}
          onClick={handleStartClick}
        >
          <span className="taskbar__start-icon">⊞</span>
          <span className="taskbar__start-text">start</span>
        </button>

        <div className="taskbar__separator" />

        <div className="taskbar__items">
          {windows.map((window) => (
            <button
              key={window.id}
              className={`taskbar__item ${
                activeWindowId === window.id && !window.isMinimized ? 'taskbar__item--active' : ''
              }`}
              onClick={() => handleTaskbarItemClick(window.id, window.isMinimized)}
            >
              <span className="taskbar__item-title">{window.title}</span>
            </button>
          ))}
        </div>

        <div className="taskbar__tray">
          <div className="taskbar__clock">{getCurrentTime()}</div>
        </div>
      </div>
    </>
  )
}
