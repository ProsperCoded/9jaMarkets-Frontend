import { useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Explore from './components/Explore'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>

    <Header/>
    <Hero/>
    <Explore/>
    
    </>
  )
}

export default App
