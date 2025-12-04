
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/style/IniciarSesion.css";
import Swal from "sweetalert2";

function IniciarSesion() {
  const [isLogin, setIsLogin] = useState(true);
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLogin) {
      // LOGIN
    try {
      const res = await fetch("https://tp-be.onrender.com/clientes/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre_usuario: email,   // 👈 usamos email como nombre_usuario
          contraseña: password,
        }),
      });

        const data = await res.json();

        if (res.ok) {
          // 👇 guardamos siempre con la clave "cliente"
          localStorage.setItem("cliente", JSON.stringify(data.cliente));

          Swal.fire({
            icon: "success",
            title: "¡Bienvenido!",
            text: "Has iniciado sesión correctamente",
            confirmButtonColor: "#ff7300",
          });
          navigate("/");
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: data.message || "Usuario o contraseña incorrectos",
            confirmButtonColor: "#ff7300",
          });
        }
      } catch {
        Swal.fire({
          icon: "error",
          title: "Error de conexión",
          text: "No se pudo conectar al servidor",
        });
      }
    } else {
      // REGISTRO
      
       try {
      const res = await fetch("https://tp-be.onrender.com/clientes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre_usuario: email,   // 👈 unificamos con login
          email,
          contraseña: password,
        }),
      });

        const data = await res.json();

        if (res.ok) {
          // 👇 opcional: guardar sesión automáticamente al registrarse
          localStorage.setItem("cliente", JSON.stringify(data.cliente));

          Swal.fire({
            icon: "success",
            title: "¡Registro exitoso!",
            text: "Tu cuenta fue creada correctamente",
            confirmButtonColor: "#ff7300",
          });
          setIsLogin(true);
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: data.message || "No se pudo registrar",
          });
        }
      } catch {
        Swal.fire({
          icon: "error",
          title: "Error de conexión",
          text: "No se pudo conectar al servidor",
        });
      }
    }
  };

  return (
    <main>
      <div className="formulario">
        <h3>{isLogin ? "Iniciar Sesión" : "Registrarse"}</h3>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              placeholder="Nombre completo"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          )}
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="boton-login">
            {isLogin ? "Entrar" : "Crear cuenta"}
          </button>
        </form>

        <button id="volver" onClick={() => navigate("/")}>
          Volver
        </button>

        <div style={{ marginTop: "15px", textAlign: "center" }}>
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="toggle-text"
          >
            {isLogin
              ? "¿No tienes cuenta? Regístrate aquí"
              : "¿Ya tienes cuenta? Inicia sesión"}
          </button>
        </div>
      </div>
    </main>
  );
}

export default IniciarSesion;
