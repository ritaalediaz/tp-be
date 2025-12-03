import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../assets/style/Header.css";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header>
      <nav className="main-nav">
        <div className="menu-container">
          {/* Botón hamburguesa */}
          <div className="menu-toggle" onClick={toggleMenu}>
            {menuOpen ? "✖" : "☰"} {/* cambia entre ☰ y ✖ */}
          </div>

          {/* Menú izquierdo */}
          <ul className={`menu-izquierda ${menuOpen ? "open" : ""}`}>
            <li><Link to="/iniciar-sesion">Iniciar sesión</Link></li>
            <li><Link to="/registro">Registrarse</Link></li>
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
