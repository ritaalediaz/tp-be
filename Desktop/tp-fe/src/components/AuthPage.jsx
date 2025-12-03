import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm'; // Importa tu componente de login
import RegisterForm from './RegisterForm';
import '../assets/style/Registro.css'; // Asegurate que el nombre del archivo sea correcto
import 'bootstrap/dist/css/bootstrap.min.css';

function AuthPage() {
  const navigate = useNavigate();

  const volver = () => {
    navigate('/'); // Redirige a la página principal (ajustá si querés ir a otra ruta como "/home")
  };

  return (
    <main className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <LoginForm />
        </div>
        <div className="col-md-6">
          <RegisterForm />
        </div>
      </div>
      <div className="text-center mt-4">
        <button className="btn btn-secondary" onClick={volver}>⬅ Volver</button>
      </div>
    </main>
  );
}

export default AuthPage;
