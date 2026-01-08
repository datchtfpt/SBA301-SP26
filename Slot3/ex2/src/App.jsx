import './App.css'
import Footer from './components/Footer.jsx'
import Header from './components/Header.jsx'
import ListOfOrchid from './components/ListOfOrchid.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {

    return (
        <>
           <Header />
         
          <ListOfOrchid/>
            <Footer avatar="/images/image.png" name="Le Thanh Dat" contact="lethanhdat20072005@gmail.com"/>

        
        </>
    )
}

export default App
