export type WindowComponent =
  | 'Explorer'
  | 'Terminal'
  | 'Notepad'
  | 'ApiDemo'
  | 'RpaLab'
  | 'ControlPanel'
  | 'CodeSamples'
  | 'TestApp'
  | 'Apibee'
  | 'BillingApp'
  | 'InteractiveLab'

export interface Position {
  x: number
  y: number
}

export interface Size {
  width: number
  height: number
}

export interface WindowState {
  id: string
  title: string
  component: WindowComponent
  position: Position
  size: Size
  isMinimized: boolean
  isMaximized: boolean
  zIndex: number
  previousPosition?: Position
  previousSize?: Size
}

export interface WindowConfig {
  id: string
  title: string
  component: WindowComponent
  position?: Position
  size?: Size
}
