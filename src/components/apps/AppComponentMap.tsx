import type { WindowComponent } from '../../types/window'
import { Explorer } from './Explorer'
import { Terminal } from './Terminal'
import { Notepad } from './Notepad'
import { ApiDemo } from './ApiDemo'
import { RpaLab } from './RpaLab'
import { ControlPanel } from './ControlPanel'
import { CodeSamples } from './CodeSamples'
import { TestApp } from './TestApp'

export const AppComponentMap: Record<WindowComponent, React.FC> = {
  Explorer,
  Terminal,
  Notepad,
  ApiDemo,
  RpaLab,
  ControlPanel,
  CodeSamples,
  TestApp,
}
