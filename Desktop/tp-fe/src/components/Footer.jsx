import React from 'react';
import '../assets/style/footer.css';
function Footer() {
  return (
   <footer className="mi-footer">
        <div className="footer-content">
            <div className="footer-logo">
              <img src="../imagenes/logo 1.png" alt="Logo de Mi Empresa" className="logo-img"/>
            </div>

            <div className="social-icons">
                <a href="https://facebook.com/tupagina" target="_blank">
                    <img src="../imagenes/facebook.png" alt="Facebook" className="social-icon"/>
                </a>
                <a href="https://whatsappm/in/tuperfil" target="_blank">
                    <img src="../imagenes/whatsapp.png" alt="whatsapp" className="social-icon"/>
                </a>
                <a href="https://instagram.com/tuperfil" target="_blank">
                    <img src="../imagenes/instagram.png" alt="Instagram" className="social-icon"/>
                </a>
                <a href="https://tik-tok.com/tuusuario" target="_blank">
                    <img src="../imagenes/tik-tok.png" alt="tiktok" className="social-icon"/>
                </a>
            </div>
        </div>
       <p>&copy;2025 Desarrollado por Ojo Creativo. Todos los derechos reservados.</p>
    </footer>

  )
}
export default Footer