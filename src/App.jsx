import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import InteractionDemo from './InteractionDemo'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <InteractionDemo/>
    </>
  )
}

export default App
