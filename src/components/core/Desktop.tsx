import { useWindowStore } from '../../stores/windowStore'
import { Window } from './Window'
import { AppComponentMap } from '../apps/AppComponentMap'
import { DesktopIcon } from './DesktopIcon'
import { DesktopPet } from './DesktopPet'
import type { WindowComponent } from '../../types/window'
import './Desktop.css'

interface DesktopIconConfig {
  id: string
  label: string
  icon: string
  component: WindowComponent
  title: string
}

const DESKTOP_ICONS: DesktopIconConfig[] = [
  { id: 'my-computer', label: 'Mis Proyectos', icon: '💻', component: 'Explorer', title: 'Mis Proyectos' },
  { id: 'interactive-lab', label: 'Lab Interactivo', icon: '🎮', component: 'InteractiveLab', title: 'Laboratorio Interactivo' },
  { id: 'code-samples', label: 'Código', icon: '📄', component: 'CodeSamples', title: 'Ejemplos de Código' },
  { id: 'terminal', label: 'Terminal', icon: '⌨️', component: 'Terminal', title: 'Terminal' },
  { id: 'notepad', label: 'Sobre Mí', icon: '📝', component: 'Notepad', title: 'Sobre Mí' },
]

export const Desktop: React.FC = () => {
  const { windows, openWindow } = useWindowStore()

  const handleIconDoubleClick = (icon: DesktopIconConfig) => {
    openWindow({
      id: `${icon.id}-${Date.now()}`,
      title: icon.title,
      component: icon.component,
    })
  }

  return (
    <div className="desktop">
      <div className="desktop__background" />

      <div className="desktop__icons">
        {DESKTOP_ICONS.map((icon) => (
          <DesktopIcon
            key={icon.id}
            label={icon.label}
            icon={icon.icon}
            onDoubleClick={() => handleIconDoubleClick(icon)}
          />
        ))}
      </div>

      <div className="desktop__windows">
        {windows.map((window) => {
          const AppComponent = AppComponentMap[window.component]

          if (!AppComponent) {
            console.warn(`No component found for: ${window.component}`)
            return null
          }

          return (
            <Window key={window.id} window={window}>
              <AppComponent />
            </Window>
          )
        })}
      </div>

      <DesktopPet />
    </div>
  )
}
