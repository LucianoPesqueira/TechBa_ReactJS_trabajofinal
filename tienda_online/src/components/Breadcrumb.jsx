import "../styles/components/breadcrumb.css"
import { Link } from "react-router-dom";

export default function Breadcrumb({ categorias = [], plataformas = [], productoNombre }) {

    return (
        
        <nav className="breadcrumb">
            <Link to="/">Inicio</Link> 

            {/* Si hay plataforma, la muestra; si no, muestra categorías */}
            {categorias.length > 0 && (
                <span>
                    {" > "}
                    <Link to={`/categoria/${categorias[0]} `}> {categorias[0]}</Link>
                </span>
            )}
            {!categorias?.length && plataformas.length > 0 && (
                <span>
                    {" > "}
                    <Link to={`/plataforma/${plataformas[0]}`}> {plataformas[0]}</Link>
                </span>
            )}
            {productoNombre && <span>{" > "}{productoNombre}</span>}
        </nav>
    );
}
