import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useWindowStore } from '../windowStore'

describe('WindowStore - Window Management', () => {
  beforeEach(() => {
    // Reset store state before each test
    const { result } = renderHook(() => useWindowStore())
    act(() => {
      result.current.windows.forEach(w => result.current.closeWindow(w.id))
    })
  })

  describe('Success Cases - Window Lifecycle', () => {
    it('should open a new window with correct default properties', () => {
      const { result } = renderHook(() => useWindowStore())

      act(() => {
        result.current.openWindow({
          id: 'test-window',
          title: 'Test Window',
          component: 'TestApp',
        })
      })

      expect(result.current.windows).toHaveLength(1)
      expect(result.current.windows[0]).toMatchObject({
        id: 'test-window',
        title: 'Test Window',
        component: 'TestApp',
        isMinimized: false,
        isMaximized: false,
        zIndex: 1,
      })
    })

    it('should increment zIndex for each new window', () => {
      const { result } = renderHook(() => useWindowStore())

      act(() => {
        result.current.openWindow({ id: 'window-1', title: 'Window 1', component: 'App1' })
        result.current.openWindow({ id: 'window-2', title: 'Window 2', component: 'App2' })
        result.current.openWindow({ id: 'window-3', title: 'Window 3', component: 'App3' })
      })

      expect(result.current.windows[0].zIndex).toBe(1)
      expect(result.current.windows[1].zIndex).toBe(2)
      expect(result.current.windows[2].zIndex).toBe(3)
    })

    it('should focus window and bring to front (highest zIndex)', () => {
      const { result } = renderHook(() => useWindowStore())

      act(() => {
        result.current.openWindow({ id: 'window-1', title: 'W1', component: 'App1' })
        result.current.openWindow({ id: 'window-2', title: 'W2', component: 'App2' })
        result.current.openWindow({ id: 'window-3', title: 'W3', component: 'App3' })
      })

      act(() => {
        result.current.focusWindow('window-1')
      })

      const window1 = result.current.windows.find(w => w.id === 'window-1')
      const maxZIndex = Math.max(...result.current.windows.map(w => w.zIndex))

      expect(window1?.zIndex).toBe(maxZIndex)
      expect(result.current.activeWindowId).toBe('window-1')
    })

    it('should minimize window', () => {
      const { result } = renderHook(() => useWindowStore())

      act(() => {
        result.current.openWindow({ id: 'test', title: 'Test', component: 'App' })
        result.current.minimizeWindow('test')
      })

      const window = result.current.windows.find(w => w.id === 'test')
      expect(window?.isMinimized).toBe(true)
    })

    it('should maximize window and save previous position/size', () => {
      const { result } = renderHook(() => useWindowStore())

      act(() => {
        result.current.openWindow({
          id: 'test',
          title: 'Test',
          component: 'App',
          position: { x: 100, y: 100 },
          size: { width: 400, height: 300 },
        })
        result.current.maximizeWindow('test')
      })

      const window = result.current.windows.find(w => w.id === 'test')
      expect(window?.isMaximized).toBe(true)
      expect(window?.previousPosition).toEqual({ x: 100, y: 100 })
      expect(window?.previousSize).toEqual({ width: 400, height: 300 })
    })

    it('should restore minimized window', () => {
      const { result } = renderHook(() => useWindowStore())

      act(() => {
        result.current.openWindow({ id: 'test', title: 'Test', component: 'App' })
        result.current.minimizeWindow('test')
        result.current.restoreWindow('test')
      })

      const window = result.current.windows.find(w => w.id === 'test')
      expect(window?.isMinimized).toBe(false)
    })

    it('should restore maximized window to previous position/size', () => {
      const { result } = renderHook(() => useWindowStore())

      act(() => {
        result.current.openWindow({
          id: 'test',
          title: 'Test',
          component: 'App',
          position: { x: 50, y: 75 },
          size: { width: 500, height: 400 },
        })
        result.current.maximizeWindow('test')
        result.current.restoreWindow('test')
      })

      const window = result.current.windows.find(w => w.id === 'test')
      expect(window?.isMaximized).toBe(false)
      expect(window?.position).toEqual({ x: 50, y: 75 })
      expect(window?.size).toEqual({ width: 500, height: 400 })
    })

    it('should close window and remove from list', () => {
      const { result } = renderHook(() => useWindowStore())

      act(() => {
        result.current.openWindow({ id: 'test', title: 'Test', component: 'App' })
        result.current.closeWindow('test')
      })

      expect(result.current.windows).toHaveLength(0)
    })

    it('should update window position', () => {
      const { result } = renderHook(() => useWindowStore())

      act(() => {
        result.current.openWindow({ id: 'test', title: 'Test', component: 'App' })
        result.current.updateWindowPosition('test', { x: 200, y: 150 })
      })

      const window = result.current.windows.find(w => w.id === 'test')
      expect(window?.position).toEqual({ x: 200, y: 150 })
    })

    it('should update window size', () => {
      const { result } = renderHook(() => useWindowStore())

      act(() => {
        result.current.openWindow({ id: 'test', title: 'Test', component: 'App' })
        result.current.updateWindowSize('test', { width: 800, height: 600 })
      })

      const window = result.current.windows.find(w => w.id === 'test')
      expect(window?.size).toEqual({ width: 800, height: 600 })
    })
  })

  describe('Failure Cases - Error Handling', () => {
    it('should not open duplicate window with same ID', () => {
      const { result } = renderHook(() => useWindowStore())

      act(() => {
        result.current.openWindow({ id: 'test', title: 'Test 1', component: 'App1' })
        result.current.openWindow({ id: 'test', title: 'Test 2', component: 'App2' })
      })

      expect(result.current.windows).toHaveLength(1)
      expect(result.current.windows[0].title).toBe('Test 1') // Should keep first one
    })

    it('should handle focusing non-existent window gracefully', () => {
      const { result } = renderHook(() => useWindowStore())

      act(() => {
        result.current.focusWindow('non-existent')
      })

      expect(result.current.activeWindowId).toBeNull()
    })

    it('should handle minimizing non-existent window gracefully', () => {
      const { result } = renderHook(() => useWindowStore())

      act(() => {
        result.current.minimizeWindow('non-existent')
      })

      expect(result.current.windows).toHaveLength(0)
    })

    it('should handle closing non-existent window gracefully', () => {
      const { result } = renderHook(() => useWindowStore())

      act(() => {
        result.current.openWindow({ id: 'test', title: 'Test', component: 'App' })
      })

      expect(() => {
        act(() => {
          result.current.closeWindow('non-existent')
        })
      }).not.toThrow()

      expect(result.current.windows).toHaveLength(1)
    })

    it('should handle invalid position values', () => {
      const { result } = renderHook(() => useWindowStore())

      act(() => {
        result.current.openWindow({ id: 'test', title: 'Test', component: 'App' })
        result.current.updateWindowPosition('test', { x: -1000, y: -500 })
      })

      const window = result.current.windows.find(w => w.id === 'test')
      // Should clamp to minimum values (0, 0) or keep previous valid position
      expect(window?.position.x).toBeGreaterThanOrEqual(0)
      expect(window?.position.y).toBeGreaterThanOrEqual(0)
    })

    it('should handle invalid size values', () => {
      const { result } = renderHook(() => useWindowStore())

      act(() => {
        result.current.openWindow({ id: 'test', title: 'Test', component: 'App' })
        result.current.updateWindowSize('test', { width: -100, height: -200 })
      })

      const window = result.current.windows.find(w => w.id === 'test')
      // Should enforce minimum window size
      expect(window?.size.width).toBeGreaterThan(0)
      expect(window?.size.height).toBeGreaterThan(0)
    })
  })

  describe('Security Cases - Input Validation & XSS Prevention', () => {
    it('should sanitize window title to prevent XSS', () => {
      const { result } = renderHook(() => useWindowStore())

      act(() => {
        result.current.openWindow({
          id: 'test',
          title: '<script>alert("XSS")</script>Test',
          component: 'App',
        })
      })

      const window = result.current.windows.find(w => w.id === 'test')
      // Should strip script tags or encode HTML entities
      expect(window?.title).not.toContain('<script>')
      expect(window?.title).not.toContain('alert(')
    })

    it('should reject window ID with special characters that could cause injection', () => {
      const { result } = renderHook(() => useWindowStore())

      act(() => {
        result.current.openWindow({
          id: '../../../etc/passwd',
          title: 'Malicious',
          component: 'App',
        })
      })

      // Should either reject or sanitize the ID
      const window = result.current.windows.find(w => w.id.includes('..'))
      expect(window).toBeUndefined()
    })

    it('should validate component name is from allowed list', () => {
      const { result } = renderHook(() => useWindowStore())

      act(() => {
        result.current.openWindow({
          id: 'test',
          title: 'Test',
          component: 'MaliciousComponent',
        })
      })

      const window = result.current.windows.find(w => w.id === 'test')
      // Should only allow predefined component names
      expect(['Explorer', 'Terminal', 'Notepad', 'ApiDemo', 'RpaLab', 'ControlPanel', 'TestApp'])
        .toContain(window?.component)
    })

    it('should enforce maximum number of open windows to prevent DoS', () => {
      const { result } = renderHook(() => useWindowStore())

      act(() => {
        // Try to open 25 windows (should enforce limit, e.g., max 20)
        for (let i = 0; i < 25; i++) {
          result.current.openWindow({
            id: `window-${i}`,
            title: `Window ${i}`,
            component: 'TestApp',
          })
        }
      })

      // Should enforce reasonable limit
      expect(result.current.windows.length).toBeLessThanOrEqual(20)
    })

    it('should validate position values are within screen bounds', () => {
      const { result } = renderHook(() => useWindowStore())

      act(() => {
        result.current.openWindow({
          id: 'test',
          title: 'Test',
          component: 'App',
        })
        // Try to position window far outside screen
        result.current.updateWindowPosition('test', { x: 999999, y: 999999 })
      })

      const window = result.current.windows.find(w => w.id === 'test')
      // Should clamp to reasonable screen bounds
      expect(window?.position.x).toBeLessThan(10000)
      expect(window?.position.y).toBeLessThan(10000)
    })

    it('should validate size values are within reasonable limits', () => {
      const { result } = renderHook(() => useWindowStore())

      act(() => {
        result.current.openWindow({
          id: 'test',
          title: 'Test',
          component: 'App',
        })
        // Try to create extremely large window
        result.current.updateWindowSize('test', { width: 999999, height: 999999 })
      })

      const window = result.current.windows.find(w => w.id === 'test')
      // Should enforce maximum size
      expect(window?.size.width).toBeLessThanOrEqual(3840) // 4K width max
      expect(window?.size.height).toBeLessThanOrEqual(2160) // 4K height max
    })

    it('should prevent prototype pollution via window properties', () => {
      const { result } = renderHook(() => useWindowStore())

      act(() => {
        result.current.openWindow({
          id: '__proto__',
          title: 'Prototype Pollution',
          component: 'App',
        })
      })

      // Should reject dangerous property names
      expect(result.current.windows.find(w => w.id === '__proto__')).toBeUndefined()
      expect(result.current.windows.find(w => w.id === 'constructor')).toBeUndefined()
    })
  })

  describe('Edge Cases - State Consistency', () => {
    it('should maintain correct activeWindowId when closing active window', () => {
      const { result } = renderHook(() => useWindowStore())

      act(() => {
        result.current.openWindow({ id: 'w1', title: 'W1', component: 'App1' })
        result.current.openWindow({ id: 'w2', title: 'W2', component: 'App2' })
        result.current.focusWindow('w2')
        result.current.closeWindow('w2')
      })

      // Should set activeWindowId to null or next available window
      expect(result.current.activeWindowId).not.toBe('w2')
    })

    it('should handle rapid successive window operations', () => {
      const { result } = renderHook(() => useWindowStore())

      act(() => {
        result.current.openWindow({ id: 'test', title: 'Test', component: 'App' })
        result.current.minimizeWindow('test')
        result.current.maximizeWindow('test')
        result.current.restoreWindow('test')
        result.current.focusWindow('test')
        result.current.closeWindow('test')
      })

      // Should handle gracefully without errors
      expect(result.current.windows).toHaveLength(0)
    })

    it('should maintain zIndex ordering consistency', () => {
      const { result } = renderHook(() => useWindowStore())

      act(() => {
        result.current.openWindow({ id: 'w1', title: 'W1', component: 'App1' })
        result.current.openWindow({ id: 'w2', title: 'W2', component: 'App2' })
        result.current.openWindow({ id: 'w3', title: 'W3', component: 'App3' })
        result.current.focusWindow('w1')
        result.current.focusWindow('w2')
      })

      const zIndexes = result.current.windows.map(w => w.zIndex)
      const sortedZIndexes = [...zIndexes].sort((a, b) => a - b)

      // All zIndexes should be unique
      expect(new Set(zIndexes).size).toBe(zIndexes.length)
      // Should be sequential or properly ordered
      expect(Math.max(...zIndexes)).toBeGreaterThan(Math.min(...zIndexes))
    })
  })
})
