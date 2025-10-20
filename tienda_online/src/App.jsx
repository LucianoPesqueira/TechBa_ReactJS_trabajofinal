import './styles/index.css'
import { Routes, Route} from 'react-router-dom'
import Inicio from './pages/Inicio'
import Contacto from './pages/Contacto'
import Navbar from './components/NavbarCustom'
import Productos from './pages/Productos'
import DetalleProducto from './pages/DetalleProducto'
import ProductoCategoria from './pages/ProductoCategoria'
import Carrito from './pages/Carrito'
import Pagar from './pages/Pagar'
import Login from './pages/Login'
import Footer from './components/Footer'

import { CarritoProvider } from './context/CarritoContext'
import { ProductosProvider } from './context/ProductosContext'
import { UsuarioProvider } from './context/UsuarioContext'

function App() {

  return (
    <>
        <UsuarioProvider>
          <ProductosProvider>
            <CarritoProvider>
              <Navbar />
              <div className='main-container'>
              <Routes>
                <Route path='/' element={<Inicio/>} />
                <Route path='/contacto' element={<Contacto />} />
                <Route path='/productos' element={<Productos />} />
                <Route path='/productos/:categoria/:id' element={<DetalleProducto />}/>
                <Route path='/productos/:plataforma/:id' element={<DetalleProducto />}/>
                <Route path='/categoria/:nombre' element={<ProductoCategoria/>}/>
                <Route path='/plataforma/:nombre' element={<ProductoCategoria/>}/>
                <Route path='/login' element={<Login />}/>
                <Route path='/carrito' element={<Carrito />} />
                <Route path='/pagar' element={<Pagar />} />
              </Routes>
              </div>
              
            </CarritoProvider>
          </ProductosProvider>
        </UsuarioProvider>
      <Footer />
    </>
  )
}

export default App
