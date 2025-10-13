import type { WindowComponent } from '../../types/window'
import { Explorer } from './Explorer'
import { Terminal } from './Terminal'
import { Notepad } from './Notepad'
import { ApiDemo } from './ApiDemo'
import { RpaLab } from './RpaLab'
import { ControlPanel } from './ControlPanel'
import { CodeSamples } from './CodeSamples'
import { TestApp } from './TestApp'
import { BillingApp } from './BillingApp'
import { InteractiveLab } from './InteractiveLab'

// Placeholder components for apps not yet implemented
const Apibee: React.FC = () => <div style={{ padding: '20px' }}>🐝 Apibee - En desarrollo</div>

export const AppComponentMap: Record<WindowComponent, React.FC> = {
  Explorer,
  Terminal,
  Notepad,
  ApiDemo,
  RpaLab,
  ControlPanel,
  CodeSamples,
  TestApp,
  BillingApp,
  Apibee,
  InteractiveLab,
}
