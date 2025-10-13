import { useWindowStore } from '../../stores/windowStore'
import type { WindowComponent } from '../../types/window'
import './StartMenu.css'

interface StartMenuProps {
  onClose: () => void
}

interface AppMenuItem {
  id: string
  title: string
  component: WindowComponent
  icon: string
}

const appMenuItems: AppMenuItem[] = [
  { id: 'explorer', title: 'My Projects', component: 'Explorer', icon: '📁' },
  { id: 'notepad', title: 'About Me', component: 'Notepad', icon: '📝' },
  { id: 'code-samples', title: 'Code Samples', component: 'CodeSamples', icon: '💻' },
  { id: 'terminal', title: 'Terminal', component: 'Terminal', icon: '⌨️' },
  { id: 'api-demo', title: 'API Demos', component: 'ApiDemo', icon: '🌐' },
  { id: 'rpa-lab', title: 'RPA Lab', component: 'RpaLab', icon: '🤖' },
  { id: 'control-panel', title: 'Control Panel', component: 'ControlPanel', icon: '⚙️' },
]

export const StartMenu: React.FC<StartMenuProps> = ({ onClose }) => {
  const { openWindow } = useWindowStore()

  const handleAppClick = (item: AppMenuItem) => {
    openWindow({
      id: `${item.id}-${Date.now()}`,
      title: item.title,
      component: item.component,
    })
    onClose()
  }

  return (
    <>
      <div className="start-menu-overlay" onClick={onClose} />
      <div className="start-menu">
        <div className="start-menu__header">
          <div className="start-menu__user">Manuel Medina</div>
        </div>

        <div className="start-menu__content">
          <div className="start-menu__section">
            <div className="start-menu__section-title">All Programs</div>
            {appMenuItems.map((item) => (
              <button
                key={item.id}
                className="start-menu__item"
                onClick={() => handleAppClick(item)}
              >
                <span className="start-menu__item-icon">{item.icon}</span>
                <span className="start-menu__item-title">{item.title}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="start-menu__footer">
          <button className="start-menu__footer-btn">
            <span>📴</span> Log Off
          </button>
          <button className="start-menu__footer-btn">
            <span>⏻</span> Turn Off Computer
          </button>
        </div>
      </div>
    </>
  )
}
