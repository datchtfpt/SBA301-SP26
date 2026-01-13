import './App.css'
import Footer from './components/Footer.jsx'
import Header from './components/Header.jsx'
import ListOfOrchid from './components/ListOfOrchid.jsx'
import TestCount from './components/TestCount.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import React from "react";


function App() {

    const [searchTerm, setSearchTerm] = React.useState("");
    return (
        <>
           <Header onSearchChange={setSearchTerm} />
         
          <ListOfOrchid searchTerm={searchTerm}/>
          <TestCount/>
        <Footer avatar="/images/image.png" name="Le Thanh Dat" contact="lethanhdat20072005@gmail.com"/>
        
        </>
    )
}

export default App
