import React, { useContext, useState} from 'react'
import { useCarrito } from "../context/CarritoContext";
import { UserContext } from '../context/UsuarioContext';
import { Link, useNavigate } from "react-router-dom";


export default function Carrito() {
    const {carrito,agregarAlCarrito, borrarProducto, vaciarCarrito} = useCarrito();
    const total = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
    const { user }  = useContext(UserContext);
    const navigate = useNavigate();

    const comprar = () => {
        if (!user) {
            navigate('/login', { state : { from: '/pagar'}});
            return;
        } 
        navigate('/pagar');
        };

    return (
        <div className="card-carrito-panel">
            <h3>🛒 Tu Carrito</h3>
            {carrito.length === 0 ? (
                <p>Carrito Vacio</p>
            ) : (
              <>
                {carrito.map((p) => (
                    <div key={p.id}>
                        {p.nombre} (${p.precio.toLocaleString("es-AR", { minimumFractionDigits: 2 })}) * {p.cantidad}
                        <button onClick={() => agregarAlCarrito(p, 1)}>+</button>
                        <button onClick={() => borrarProducto(p.id)}>x</button>
                    </div>
                ))}
                <hr />{/*linea separadora */}
                <p>Total: ${total.toLocaleString("es-AR", { minimumFractionDigits: 2 })}</p>
                <button onClick={vaciarCarrito}>Vaciar Carrito</button>
                <button onClick={comprar}>Comprar</button>
              </>
            )}
        </div>
    );
}