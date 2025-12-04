import React from 'react';
import '../assets/style/footer.css';

function Footer() {
  const phoneNumber = "542284499990"; 
  const message = "Hola, quiero pedir una pizza 🍕";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <footer className="mi-footer">
      <div className="footer-content">
        <div className="footer-logo">
          <img src="../imagenes/logo 1.png" alt="Logo de Mi Empresa" className="logo-img"/>
        </div>

        <div className="social-icons">
          <a href="https://facebook.com/tupagina" target="_blank" rel="noopener noreferrer">
            <img src="../imagenes/facebook.png" alt="Facebook" className="social-icon"/>
          </a>

          {/* WhatsApp con tu número */}
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            <img src="../imagenes/whatsapp.png" alt="WhatsApp" className="social-icon"/>
          </a>

          <a href="https://instagram.com/tuperfil" target="_blank" rel="noopener noreferrer">
            <img src="../imagenes/instagram.png" alt="Instagram" className="social-icon"/>
          </a>

          <a href="https://tik-tok.com/tuusuario" target="_blank" rel="noopener noreferrer">
            <img src="../imagenes/tik-tok.png" alt="TikTok" className="social-icon"/>
          </a>
        </div>
      </div>

      <p style={{ fontSize: "18px", fontWeight: "bold" }}>
        Urquiza 2982 - Olavarría - Pcia de Buenos Aires
      </p>
      <p>&copy;2025 Desarrollado por Ojo Creativo. Todos los derechos reservados.</p>
    </footer>
  );
}

export default Footer;
