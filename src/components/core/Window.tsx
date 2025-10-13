import { useEffect, useRef } from 'react'
import { Rnd } from 'react-rnd'
import { motion } from 'framer-motion'
import { useWindowStore } from '../../stores/windowStore'
import type { WindowState } from '../../types/window'
import './Window.css'

interface WindowProps {
  window: WindowState
  children: React.ReactNode
}

export const Window: React.FC<WindowProps> = ({ window, children }) => {
  const {
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    restoreWindow,
    focusWindow,
    updateWindowPosition,
    updateWindowSize,
    activeWindowId,
  } = useWindowStore()

  const windowRef = useRef<HTMLDivElement>(null)

  const isActive = activeWindowId === window.id

  useEffect(() => {
    if (isActive && windowRef.current) {
      windowRef.current.focus()
    }
  }, [isActive])

  const handleClose = () => {
    closeWindow(window.id)
  }

  const handleMinimize = () => {
    minimizeWindow(window.id)
  }

  const handleMaximize = () => {
    if (window.isMaximized) {
      restoreWindow(window.id)
    } else {
      maximizeWindow(window.id)
    }
  }

  const handleFocus = () => {
    if (!isActive) {
      focusWindow(window.id)
    }
  }

  // Don't render minimized windows
  if (window.isMinimized) {
    return null
  }

  // Maximized window fills entire screen
  if (window.isMaximized) {
    return (
      <motion.div
        ref={windowRef}
        className={`window window--maximized ${isActive ? 'window--active' : ''}`}
        style={{ zIndex: window.zIndex }}
        onMouseDown={handleFocus}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.15 }}
        tabIndex={0}
      >
        <div className="window__titlebar">
          <div className="window__title">{window.title}</div>
          <div className="window__controls">
            <button
              className="window__control window__control--minimize"
              onClick={handleMinimize}
              aria-label="Minimize"
            >
              <span>_</span>
            </button>
            <button
              className="window__control window__control--maximize"
              onClick={handleMaximize}
              aria-label="Restore"
            >
              <span>□</span>
            </button>
            <button
              className="window__control window__control--close"
              onClick={handleClose}
              aria-label="Close"
            >
              <span>×</span>
            </button>
          </div>
        </div>
        <div className="window__content">{children}</div>
      </motion.div>
    )
  }

  // Regular draggable/resizable window
  return (
    <Rnd
      position={window.position}
      size={window.size}
      onDragStop={(_e, d) => {
        updateWindowPosition(window.id, { x: d.x, y: d.y })
      }}
      onResizeStop={(_e, _direction, ref, _delta, position) => {
        updateWindowSize(window.id, {
          width: parseInt(ref.style.width),
          height: parseInt(ref.style.height),
        })
        updateWindowPosition(window.id, position)
      }}
      minWidth={200}
      minHeight={150}
      bounds="parent"
      dragHandleClassName="window__titlebar"
      enableResizing={{
        top: true,
        right: true,
        bottom: true,
        left: true,
        topRight: true,
        bottomRight: true,
        bottomLeft: true,
        topLeft: true,
      }}
      style={{ zIndex: window.zIndex }}
      onMouseDown={handleFocus}
    >
      <motion.div
        ref={windowRef}
        className={`window ${isActive ? 'window--active' : ''}`}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.15 }}
        tabIndex={0}
      >
        <div className="window__titlebar">
          <div className="window__title">{window.title}</div>
          <div className="window__controls">
            <button
              className="window__control window__control--minimize"
              onClick={handleMinimize}
              aria-label="Minimize"
            >
              <span>_</span>
            </button>
            <button
              className="window__control window__control--maximize"
              onClick={handleMaximize}
              aria-label="Maximize"
            >
              <span>□</span>
            </button>
            <button
              className="window__control window__control--close"
              onClick={handleClose}
              aria-label="Close"
            >
              <span>×</span>
            </button>
          </div>
        </div>
        <div className="window__content">{children}</div>
      </motion.div>
    </Rnd>
  )
}
