import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import "../assets/style/Header.css";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cliente, setCliente] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Cargar sesión al montar y cuando cambia la ruta
  useEffect(() => {
    try {
      const raw = localStorage.getItem("cliente");
      setCliente(raw ? JSON.parse(raw) : null);
    } catch {
      setCliente(null);
    }
  }, [location.pathname]);

  // Escuchar cambios de localStorage (por si otra parte de la app modifica la sesión)
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === "cliente") {
        setCliente(e.newValue ? JSON.parse(e.newValue) : null);
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const cerrarSesion = () => {
    localStorage.removeItem("cliente");
    setCliente(null);
    navigate("/iniciar-sesion");
  };

  return (
    <header>
      <nav className="main-nav">
        <div className="menu-container">
          {/* Botón hamburguesa */}
          <div className="menu-toggle" onClick={toggleMenu}>
            {menuOpen ? "✖" : "☰"}
          </div>

          {/* Menú izquierdo */}
          <ul className={`menu-izquierda ${menuOpen ? "open" : ""}`}>
            {cliente ? (
              <>
                <li className="bienvenida">Hola, {cliente.nombre_usuario} 🍕</li>
                <li>
                  <button onClick={cerrarSesion} className="logout-btn">
                    Cerrar sesión
                  </button>
                </li>
              </>
            ) : (
              <li><Link to="/iniciar-sesion">Iniciar sesión</Link></li>
            )}
          </ul>

          {/* Menú derecho */}
          <ul className={`menu-derecha ${menuOpen ? "open" : ""}`}>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/quienes-somos">Quiénes Somos</Link></li>
            <li><Link to="/pizzas">Pizzas</Link></li>
            <li><Link to="/personalizarpizzas">Personalizar Pizza</Link></li>
            <li><Link to="/contacto">Contacto</Link></li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;

