import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Footer from './components/Footer.jsx'
import Header from './components/Header.jsx'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />

      <main className="main-content">
        <p>Come with me to have a look at HDPE Industry </p>
        <p>You put 4 billtion dong in HDPE with me, you sleep and you have 8 billion </p>
      </main>

      <Footer />
    </>
  )
}

export default App
