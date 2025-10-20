import "../styles/pages/productocategoria.css"
import { Link, useLocation, useParams } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import { ProductContext } from "../context/ProductosContext";
import { useContext } from "react";

export default function ProductoCategoria() {
    const { productos, loading, error } = useContext(ProductContext);
    const { nombre } = useParams();
    const location = useLocation();
    const esPlataforma = location.pathname.includes('/plataforma/');

    if(loading) return <p>Cargando Productos...</p>;
    if(error) return <p>{error}</p>;

    //filtrar productos
    // const productosFiltrados = productos.filter((p) =>
    //     p.categoria.some(
    //         (cat) => cat.toLowerCase() === nombre.toLowerCase()
    //     )
    // );
    const productosFiltrados = productos.filter(p =>
        esPlataforma ? p.plataforma?.some(plat => plat.toLowerCase() === nombre.toLowerCase())
        : p.categoria?.some(cat => cat.toLowerCase() === nombre.toLowerCase())
    );

    return (
        <div className="card-category-product">

            {/* --- Breadcrumb Superior Izquierdo --- */}
            <div className="breadcrumb-left">
                <Breadcrumb categorias={[nombre]} plataformas={[nombre]} productoNombre={""} />
            </div>

            {/* --- Barra superior: nombre de categoría y botón ordenar --- */}
            <div className="category-top-bar">
                <div className="category-top-left">
                    <h2>{nombre}</h2>
                </div>
                <div className="category-top-right">
                    <p className="btn-order"><i className="fa-solid fa-sort"></i>Ordenar</p>
                </div>
            </div>

            {/* --- Contenido principal: filtros (izquierda) + productos (derecha) --- */}
            <div className="category-content">
                {/* Filtros de precio */}
                <div className="details-filters">{/*detalle-filtros*/}
                    <h3>Precio</h3>
                    <div className="price-filters">
                        <div className="price-filters-item">
                            <label>Desde</label>
                            <input type="number" placeholder="0"/>
                        </div>
                        <div className="price-filters-item">
                            <label>Hasta</label>
                            <input type="number" placeholder="99000" />
                        </div>
                        <button className="price-btn" type="submit" disabled>Aplicar</button>
                    </div>
                </div>

                {/* Lista de productos */}
                <div className="details-products">
                    {productosFiltrados.length > 0 ? (
                        <ul className="product-list">
                            {productosFiltrados.map((producto) => (
                                <li key={producto.id} className="product-item">
                                    <Link
                                        to={esPlataforma ? `/productos/${producto.plataforma || 'sin-plataforma'}`:
                                    `/productos/${producto.categoria || 'sin-categoria'}/${producto.id}`}
                                        state={{ producto }}
                                    >
                                        <img src={producto.imagen} alt={producto.nombre} className="product-img" />
                                        <div className="product-body">
                                            <h3 className="product-title">{producto.nombre}</h3>
                                            <p className="product-price">
                                                ${Number(producto.precio).toLocaleString("es-AR", {
                                                    minimumFractionDigits: 2,
                                                })}
                                            </p>
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No hay productos en esta categoría</p>
                    )}
                </div>
            </div>
        </div>
    );
}; 