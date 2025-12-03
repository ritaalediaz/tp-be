import React, { useEffect, useState } from 'react';
import '../assets/style/registro.css';

function CrudUsuarios() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const datos = JSON.parse(localStorage.getItem('usuarios')) || [];
    setUsuarios(datos);
  }, []);

  const eliminarUsuario = (index) => {
    const nuevos = [...usuarios];
    nuevos.splice(index, 1);
    localStorage.setItem('usuarios', JSON.stringify(nuevos));
    setUsuarios(nuevos);
  };

  return (
    <div className="container mt-4">
      <h2>Usuarios registrados</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Usuario</th>
            <th>Correo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u, index) => (
            <tr key={index}>
              <td>{u.usuario}</td>
              <td>{u.correo}</td>
              <td>
                <button className="btn btn-danger btn-sm" onClick={() => eliminarUsuario(index)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default CrudUsuarios;