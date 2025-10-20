import '../styles/components/navbarcustom.css'
import { Navbar, Nav, Container, NavDropdown, Form, Button, ButtonGroup, InputGroup} from 'react-bootstrap';
import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { useCarrito } from '../context/CarritoContext'
import { ProductContext } from '../context/ProductosContext';
import { UserContext } from '../context/UsuarioContext';

export default function NavbarCustom() {
  const {carrito} = useCarrito();
  const cantidadTotal = carrito.reduce((acc, item) => acc + item.cantidad, 0);//suma cantidad
  const { productos, loading, error } = useContext(ProductContext);

  const {user, logout}  = useContext(UserContext);

  const [expanded, setExpanded] = useState(false);

  const img = "../../public/logo.svg"

  //del context productos obtengo los nombres de estado
  if(loading) return <p>Cargando Productos...</p>;
  if(error) return <p>{error}</p>;
  if (!productos || productos.length === 0) return <p>No hay productos....</p>;

  //cargo las categorias - plataformas
  const plataformas = [...new Set(productos.flatMap(p => p.plataforma))];
  const categorias = [...new Set(productos.flatMap(p => p.categoria))];

  return (
    <>
      {/* 🔹 Navbar principal */}
      <Navbar expand="lg" bg="dark" data-bs-theme="dark" sticky="top" className="py-2" >
        <Container fluid className='align-items-center'>
          {/* Izquierda: buscador */}
          <Form className="d-flex me-auto">
            <InputGroup>
              <Form.Control
                type="search"
                size='sm'
                placeholder="Buscar..."
                aria-label="Search"
              />
              <Button variant="outline-secondary">
                <i className="fa-solid fa-magnifying-glass"></i>
              </Button>
            </InputGroup>
          </Form>
          {/* Centro: logo */}
          <Navbar.Brand className='mx-auto d-flex align-items-center'>
            <Link to="/">
              <img
                src={img}
                width="30"
                height="30"
                alt="logo"
                className="me-2"
              />
            </Link>
          </Navbar.Brand>
          {/* Derecha: Iniciar Sesion - Carrito */}
          <Nav className="ms-auto d-flex align-items-center">
            <ButtonGroup className='card-buttons-right'>

              <Button variant='link' size='lg' className='text-white' as={Link} to={'/login'}>
                <i className="fa-solid fa-user m-2 card-user-icon"></i>
                <span className="card-user-span">{user ? `¡Hola!, ${user.nombre}` : 'Iniciar sesión / Registrarse'}</span>
              </Button>
              {user && (
                <Button variant='link' size='md' className='text-white ms-2' onClick={logout}>Salir</Button>
              )}
              {/*Link carrito */}
              <Button variant="link" size='lg' className='text-white' as={Link} to={'/carrito'}>
                <i className="fa-solid fa-basket-shopping me-1"></i>
                <span className='card-cart-shopping-span'>{cantidadTotal}</span>
              </Button>    
            </ButtonGroup>   
          </Nav>
        </Container>
      </Navbar>


      {/* 🔹 Navbar secundaria (categorías) */}
      <Navbar bg="light" expand="lg" collapseOnSelect expanded={expanded} className="border-bottom">
        <Container fluid>
          {/*boton menu visible en pantalla chica */}
          <Navbar.Toggle aria-controls="navbar-secundario" onClick={() => setExpanded(!expanded)} />
          <Navbar.Collapse id="navbar-secundario" className='justify-content-between'>
            
            {/*izq: dropdown categoria y lista plataforma*/}
            <Nav className='flex-column flex-lg-row'>
              {/*dropdown categoria */}
              <NavDropdown title="Categorias" id="dropdown-categorias">
                {categorias.map((cat) => (
                  <NavDropdown.Item 
                    as={Link} 
                    to={`/categoria/${cat}`} 
                    key={cat}
                    onClick={() => setExpanded(false)}//lo cierra
                  >
                    {cat}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
              {/*lista plataforma */}
              {plataformas.map((plat) => (
                <Nav.Link 
                  as={Link} 
                  key={plat} 
                  to={`/plataforma/${plat}`} 
                  className="card-categorias-link"
                  onClick={() => setExpanded(false)}//lo cierra
                >
                  {plat}
                </Nav.Link>
              ))}            
            </Nav>           
            {/*Links derecha */}
            <Nav>
              <Nav.Link as={Link} to="/contacto" className="d-flex align-items-center" onClick={() => setExpanded(false)}>
                <i className="fa-solid fa-file-signature me-1"></i>
                <span className='card-contact'>Contacto</span>
              </Nav.Link>

              <Nav.Link as={Link} to="/productos" className="d-flex align-items-center" onClick={() => setExpanded(false)}>
                <i className="fa-solid fa-list me-1"></i>
                <span className='card-product-buttom'>Productos</span>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

    </>
  );
}

