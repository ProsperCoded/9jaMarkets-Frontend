import { useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1 className="text-[100px] hidden md:flex lg:text-red-800 font-bold underline">
      Hello umar!
    </h1>
    <Header/>
    <Footer/>
    </>
  )
}

export default App
