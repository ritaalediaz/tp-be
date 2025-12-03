import { useEffect, useState } from 'react';
import logo from '../assets/imagenes/logo 1.png';
import '../assets/style/home.css';

const Home = () => {
  const [mostrarLogo, setMostrarLogo] = useState(true);

  useEffect(() => {
    // Bloquear scroll mientras se muestra el logo
    document.body.style.overflow = "hidden";

    const timer = setTimeout(() => {
      setMostrarLogo(false);
      // Liberar scroll cuando desaparece el logo
      document.body.style.overflow = "auto";
    }, 3500);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="home-background">
      {mostrarLogo && (
        <div className="logo-splash">
          <img src={logo} alt="Logo Pizzería" className="logo-animado" />
        </div>
      )}

      {!mostrarLogo && (
        <section className="Intro">
          <div className="Intro-recuadro">
            <div className="Intro-contenido">
              <h1>PEDI TU</h1>
              <h2>PIZZA AHORA</h2>
              <h3>y disfrutala como quieras</h3>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;
