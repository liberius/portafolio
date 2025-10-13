import { Desktop } from './components/core/Desktop'
import { Taskbar } from './components/core/Taskbar'
import './App.css'

function App() {
  return (
    <div className="app">
      <Desktop />
      <Taskbar />
    </div>
  )
}

export default App
