import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/style/Registro.css';

function RegisterForm() {
  const [usuario, setUsuario] = useState('');
  const [correo, setCorreo] = useState('');
  const [clave, setClave] = useState('');
  const navigate = useNavigate();

  const registrarUsuario = async () => {
    if (usuario && correo && clave) {
      try {
        await axios.post('https://tp-be.onrender.com/clientes', {
          nombre_usuario: usuario.trim(),
          email: correo,
          contraseña: clave,
        });
        alert('Registro completo');
        navigate('/usuarios');
      } catch (error) {
        const mensaje = error.response?.data?.message || 'Error al registrar';
        alert(mensaje);
      }
    } else {
      alert('Por favor completá todos los campos');
    }
  };

  return (
    <main>
      <div className="formulario">
        <h3>Registrarse</h3>
        <input
          type="text"
          placeholder="Nuevo usuario"
          className="form-control"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
        />
        <input
          type="email"
          placeholder="Correo"
          className="form-control"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="form-control"
          value={clave}
          onChange={(e) => setClave(e.target.value)}
        />
        <button className="boton-login" onClick={registrarUsuario}>
          Registrarme
        </button>
        <button id="volver" onClick={() => navigate('/')}>
          Volver
        </button>
      </div>
    </main>
  );
}

export default RegisterForm;
