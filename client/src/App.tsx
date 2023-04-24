import { useState } from 'react'
import {tw} from 'typewind'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
      <button>
          Click Me
      </button>
  )
}

export default App
