import { createContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export const UserContext = createContext();

export const UsuarioProvider = ({children}) => {
    const [user, setUser] = useState(null); // null = no logueado
    const [loadingUser, setLoadingUser] = useState(false);
    const [errorUser, setErrorUser] = useState(null);
    const MOCKAPI_URL = "https://68d48305214be68f8c696be9.mockapi.io/api/usuarios";
    const LOCAL_JSON = "data/listaUsuarios.json";

    const login = async({ nombre, contrasena}) => {
      setLoadingUser(true);
      let usuarioEncontrado = null;
      let response;

      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 3000);

        response = await fetch(MOCKAPI_URL, { signal: controller.signal});
        clearTimeout(timeout);

        if (!response.ok) throw new Error(`MockAPI respondio ${response.status}`);

        const data = await response.json();

        if (Array.isArray(data) && data.length > 0) {
          usuarioEncontrado = data.find((u) => u.nombre === nombre && u.contrasena === contrasena);
        }

        if(!usuarioEncontrado) {
          const localResponse = await fetch(LOCAL_JSON);
          const localData = await localResponse.json();

          usuarioEncontrado = localData.find(
            (u) => u.nombre === nombre && u.contrasena === contrasena);
        }
        
        if (usuarioEncontrado) {
          setUser(usuarioEncontrado);
        } else {
          console.warn("Usuario no encontrado");
          setUser(null);
        }
      } catch (err) {
        console.log("Error al cargar usuarios:", err);
        setErrorUser(err.message || "Error al cargar usuarios");
        
        try {
          const localResponse = await fetch(LOCAL_JSON);
          const localData = await localResponse.json();

          usuarioEncontrado = localData.find(
            (u) => u.nombre === nombre && u.contrasena === contrasena);

          setUser(usuarioEncontrado || null);
        } catch (errLocal) {
          console.error("No se pudo cargar el JSON local:", errLocal);
          setErrorUser(errLocal.message || "No se pudo cargar el JSON local");
          setUser(null);
        }
      } finally {
        setLoadingUser(false);
      }
    };

    const logout = () => {
      setUser(null);
      Navigate("/productos");
    };


    return (
        <UserContext.Provider value={{ user, loadingUser, errorUser, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

//const { user, login, logout } = useUser();

/*
if (!user) {
  alert("Debes iniciar sesión para completar la compra");
} else {
  alert(`Compra realizada por ${user.nombre}`);
}
*/