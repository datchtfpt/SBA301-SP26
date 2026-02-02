import './App.css'
import { Route } from 'react-router-dom'
import { Routes } from 'react-router-dom'
import NavBar from './components/Navbar.jsx'
import ListOfOrchids from './components/ListOfOrchids.jsx'
import EditOrchid from './components/EditOrchid.jsx'

function App() {
  return (
    <>
      <NavBar/>
      <Routes>
        <Route path='/' element={<ListOfOrchids/>}/>
        <Route path='/edit/:id' element={<EditOrchid/>}/>
      </Routes>
    </>
  )
}

export default App
