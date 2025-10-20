import "../styles/pages/productos.css"
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from '../context/ProductosContext';


export default function Productos() {
  // const [productos, setProductos] = useState([]);
  // const [cargando, setCargando] = useState(true);
  // const [error, setError] = useState(null);
  const { productos, loading, error } = useContext(ProductContext);

  // useEffect(() => {
  //   fetch("https://68d48305214be68f8c696be9.mockapi.io/api/productos")
  //     .then((respuesta) => respuesta.json())
  //     .then((datos) => {
  //       const productoModificado = datos.map(item => ({
  //         ...item,
  //         nombre: item.nombre.toUpperCase(),
  //         precio: Number(item.precio)
  //       }));
  //       setProductos(productoModificado);//almacena en el estado local de productos
  //       setCargando(false);
  //     })
  //     .catch((error) => {
  //       {console.error("Error!,", error)}
  //       setError("Hubo un problema al cargar los productos.");
  //       setCargando(false);
  //     });
  // }, []);

  // if (cargando) return <p>Cargando productos...</p>;
  // if (error) return <p>{error}</p>;
  if(loading) return <p>Cargando Productos...</p>;
  if(error) return <p>{error}</p>;

  return (
    <ul className="card-product-list">
      {productos.map((producto) => (
        <li key={producto.id} className="card-product">
          <Link to={`/productos/${producto.categoria || 'sin-categoria'}/${producto.id}`} state={{producto}}>
          <img src={producto.imagen} alt={producto.nombre} className="card-product-img"></img>
          <div className="card-body">
            <h3 className="card-title">{producto.nombre}</h3>
            <p className="card-price">${producto.precio.toLocaleString('es-AR', {minimumFractionDigits: 2})}</p>
          </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

{/*schema productos 
  id
  nombre
  descripcion
  precio
  avatar
  categoria
  stock
  detalles
  
  otra api: https://fakestoreapi.com/products
  mockfly

  mockapi.io: https://http2.mlstatic.com/D_Q_NP_2X_787674-MLA93930889982_102025-E.webp (url profe)
  */}
