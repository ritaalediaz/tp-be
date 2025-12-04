import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";

function ProtectedRoute({ children }) {
  const cliente = localStorage.getItem("cliente");

  if (!cliente) {
    Swal.fire({
      icon: "error",
      title: "Debes iniciar sesión",
      text: "Por favor inicia sesión para confirmar tu pedido",
    }).then(() => {
      window.location.href = "/iniciar-sesion"; // 👈 redirige después del alert
    });
    return null; // no renderiza nada mientras tanto
  }

  return children;
}

export default ProtectedRoute;