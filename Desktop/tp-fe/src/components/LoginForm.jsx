import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/style/Registro.css';

function LoginForm() {
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');
  const navigate = useNavigate();

  const iniciarSesion = () => {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const existe = usuarios.find(u => u.usuario === usuario.trim() && u.clave === clave);

    if (existe) {
      alert('Inicio de sesión correcto');
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } else {
      alert('Usuario o clave incorrectos');
    }
  };

  return (
    <main>
      <div className="formulario">
        <h3>Iniciar sesión</h3>
        <input
          type="text"
          placeholder="Usuario"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          className="form-control mb-2"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={clave}
          onChange={(e) => setClave(e.target.value)}
          className="form-control mb-3"
        />
        <button className="boton-login" onClick={iniciarSesion}>
          Entrar
        </button>
        <button id="volver" onClick={() => navigate('/')}>
          Volver
        </button>
      </div>
    </main>
  );
}

export default LoginForm;
