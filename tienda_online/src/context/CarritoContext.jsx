import React from "react";
import {createContext, useContext, useState, useEffect} from "react";

const CarritoContext = createContext();

export function CarritoProvider({children}) {
  
    const [carrito, setCarrito] = useState(() => {
        const guardado = localStorage.getItem("carrito");
        return guardado ? JSON.parse(guardado) : [];
    });

    useEffect(() => {
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }, [carrito]);

    const agregarAlCarrito = (producto, cantidad) =>{
      const exists = carrito.some(item => item.id === producto.id);

      if (!exists) {
        setCarrito([...carrito, {...producto, cantidad}]);
      } else {
        const nuevoCarrito = carrito.map(item => {
          if (item.id === producto.id) {
            return {...item, cantidad: item.cantidad + cantidad};
          } else {
            return item;
          }
        });

        setCarrito(nuevoCarrito);
      }
    }

    const borrarProducto = (id) => {
    setCarrito(carrito.filter(item => item.id !== id));
    };

    const vaciarCarrito = () => setCarrito([]);


    return (
        <CarritoContext.Provider value={{carrito, agregarAlCarrito, borrarProducto, vaciarCarrito}} >
            {children}
        </CarritoContext.Provider>
    );
}

export function useCarrito() {
    return useContext(CarritoContext);
}