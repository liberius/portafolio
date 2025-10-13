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
  { id: 'my-computer', label: 'Mi PC', icon: '💻', component: 'Explorer', title: 'My Projects' },
  { id: 'notepad', label: 'About Me', icon: '📝', component: 'Notepad', title: 'About Me' },
  { id: 'code-samples', label: 'Code Samples', icon: '📄', component: 'CodeSamples', title: 'Code Samples' },
  { id: 'terminal', label: 'Terminal', icon: '⌨️', component: 'Terminal', title: 'Terminal' },
  { id: 'api-demos', label: 'API Demos', icon: '🌐', component: 'ApiDemo', title: 'API Demos' },
  { id: 'rpa-lab', label: 'RPA Lab', icon: '🤖', component: 'RpaLab', title: 'RPA Lab' },
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
