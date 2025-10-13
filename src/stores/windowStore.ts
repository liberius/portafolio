import { create } from 'zustand'
import type { WindowState, WindowConfig, Position, Size, WindowComponent } from '../types/window'

// Security: Whitelist of allowed components
const ALLOWED_COMPONENTS: WindowComponent[] = [
  'Explorer',
  'Terminal',
  'Notepad',
  'ApiDemo',
  'RpaLab',
  'ControlPanel',
  'TestApp',
  'CodeSamples',
  'Apibee',
  'BillingApp',
  'InteractiveLab',
]

// Constants for validation
const MAX_WINDOWS = 20
const MIN_WINDOW_WIDTH = 200
const MIN_WINDOW_HEIGHT = 150
const MAX_WINDOW_WIDTH = 3840
const MAX_WINDOW_HEIGHT = 2160
const MIN_POSITION = 0
const MAX_POSITION = 10000

interface WindowStore {
  windows: WindowState[]
  activeWindowId: string | null
  nextZIndex: number

  openWindow: (config: WindowConfig) => void
  closeWindow: (id: string) => void
  focusWindow: (id: string) => void
  minimizeWindow: (id: string) => void
  maximizeWindow: (id: string) => void
  restoreWindow: (id: string) => void
  updateWindowPosition: (id: string, position: Position) => void
  updateWindowSize: (id: string, size: Size) => void
}

// Security: Sanitize string to prevent XSS
const sanitizeString = (str: string): string => {
  return str
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<[^>]*>/g, '')
    .trim()
}

// Security: Validate ID to prevent path traversal and prototype pollution
const isValidId = (id: string): boolean => {
  const dangerous = ['__proto__', 'constructor', 'prototype', '..', '/', '\\']
  return !dangerous.some((d) => id.includes(d))
}

// Validation: Clamp position values
const clampPosition = (pos: Position): Position => ({
  x: Math.max(MIN_POSITION, Math.min(MAX_POSITION, pos.x)),
  y: Math.max(MIN_POSITION, Math.min(MAX_POSITION, pos.y)),
})

// Validation: Clamp size values
const clampSize = (size: Size): Size => ({
  width: Math.max(MIN_WINDOW_WIDTH, Math.min(MAX_WINDOW_WIDTH, size.width)),
  height: Math.max(MIN_WINDOW_HEIGHT, Math.min(MAX_WINDOW_HEIGHT, size.height)),
})

// Validation: Check if component is allowed
const isAllowedComponent = (component: string): component is WindowComponent => {
  return ALLOWED_COMPONENTS.includes(component as WindowComponent)
}

// Default window configuration with specific sizes for different components
const getDefaultWindowConfig = (component?: WindowComponent): Pick<WindowState, 'position' | 'size'> => {
  // Larger default for Explorer to show project cards properly
  if (component === 'Explorer') {
    return {
      position: { x: 50, y: 50 },
      size: { width: 1000, height: 700 },
    }
  }

  // Larger default for RpaLab to show outputs properly
  if (component === 'RpaLab') {
    return {
      position: { x: 100, y: 100 },
      size: { width: 900, height: 650 },
    }
  }

  // Default for other windows
  return {
    position: { x: 100, y: 100 },
    size: { width: 700, height: 500 },
  }
}

export const useWindowStore = create<WindowStore>((set, get) => ({
  windows: [],
  activeWindowId: null,
  nextZIndex: 1,

  openWindow: (config: WindowConfig) => {
    // Security: Validate ID
    if (!isValidId(config.id)) {
      console.warn(`Invalid window ID: ${config.id}`)
      return
    }

    // Security: Validate component is in whitelist
    if (!isAllowedComponent(config.component)) {
      console.warn(`Component not allowed: ${config.component}`)
      return
    }

    const { windows, nextZIndex } = get()

    // Check for duplicate ID
    if (windows.some((w) => w.id === config.id)) {
      console.warn(`Window with ID ${config.id} already exists`)
      return
    }

    // Enforce maximum windows limit (DoS prevention)
    if (windows.length >= MAX_WINDOWS) {
      console.warn(`Maximum number of windows (${MAX_WINDOWS}) reached`)
      return
    }

    const defaults = getDefaultWindowConfig(config.component)

    const newWindow: WindowState = {
      id: config.id,
      title: sanitizeString(config.title),
      component: config.component,
      position: clampPosition(config.position || defaults.position),
      size: clampSize(config.size || defaults.size),
      isMinimized: false,
      isMaximized: false,
      zIndex: nextZIndex,
    }

    set({
      windows: [...windows, newWindow],
      activeWindowId: config.id,
      nextZIndex: nextZIndex + 1,
    })
  },

  closeWindow: (id: string) => {
    const { windows, activeWindowId } = get()

    const newWindows = windows.filter((w) => w.id !== id)

    // If closing active window, set activeWindowId to null or next window
    let newActiveId = activeWindowId
    if (activeWindowId === id) {
      newActiveId = newWindows.length > 0 ? newWindows[newWindows.length - 1].id : null
    }

    set({
      windows: newWindows,
      activeWindowId: newActiveId,
    })
  },

  focusWindow: (id: string) => {
    const { windows, nextZIndex } = get()

    const window = windows.find((w) => w.id === id)
    if (!window) {
      console.warn(`Window ${id} not found`)
      return
    }

    // Bring window to front
    const maxZIndex = Math.max(...windows.map((w) => w.zIndex), nextZIndex - 1)
    const newZIndex = maxZIndex + 1

    set({
      windows: windows.map((w) =>
        w.id === id ? { ...w, zIndex: newZIndex, isMinimized: false } : w
      ),
      activeWindowId: id,
      nextZIndex: newZIndex + 1,
    })
  },

  minimizeWindow: (id: string) => {
    const { windows, activeWindowId } = get()

    const window = windows.find((w) => w.id === id)
    if (!window) {
      console.warn(`Window ${id} not found`)
      return
    }

    const updates: Partial<WindowStore> = {
      windows: windows.map((w) => (w.id === id ? { ...w, isMinimized: true } : w)),
    }

    // If minimizing active window, clear activeWindowId
    if (activeWindowId === id) {
      updates.activeWindowId = null
    }

    set(updates)
  },

  maximizeWindow: (id: string) => {
    const { windows } = get()

    const window = windows.find((w) => w.id === id)
    if (!window) {
      console.warn(`Window ${id} not found`)
      return
    }

    set({
      windows: windows.map((w) =>
        w.id === id
          ? {
              ...w,
              isMaximized: true,
              isMinimized: false,
              previousPosition: w.position,
              previousSize: w.size,
            }
          : w
      ),
    })
  },

  restoreWindow: (id: string) => {
    const { windows } = get()

    const window = windows.find((w) => w.id === id)
    if (!window) {
      console.warn(`Window ${id} not found`)
      return
    }

    set({
      windows: windows.map((w) =>
        w.id === id
          ? {
              ...w,
              isMinimized: false,
              isMaximized: false,
              position: w.previousPosition || w.position,
              size: w.previousSize || w.size,
              previousPosition: undefined,
              previousSize: undefined,
            }
          : w
      ),
    })
  },

  updateWindowPosition: (id: string, position: Position) => {
    const { windows } = get()

    const window = windows.find((w) => w.id === id)
    if (!window) {
      console.warn(`Window ${id} not found`)
      return
    }

    set({
      windows: windows.map((w) =>
        w.id === id ? { ...w, position: clampPosition(position) } : w
      ),
    })
  },

  updateWindowSize: (id: string, size: Size) => {
    const { windows } = get()

    const window = windows.find((w) => w.id === id)
    if (!window) {
      console.warn(`Window ${id} not found`)
      return
    }

    set({
      windows: windows.map((w) => (w.id === id ? { ...w, size: clampSize(size) } : w)),
    })
  },
}))
