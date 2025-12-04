import { useState } from 'react';
import Swal from 'sweetalert2'; // 👈 importamos SweetAlert2

function PizzaCardItem({ pizza, onAgregar }) {
  const [cantidad, setCantidad] = useState(0);

  const handleChange = (e) => {
    setCantidad(Number(e.target.value));
  };

  const handleClick = () => {
    if (cantidad > 0) {
      onAgregar(pizza, cantidad);
      setCantidad(0);
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Cantidad inválida',
        text: 'Seleccioná una cantidad válida',
      });
    }
  };

  return (
    <div className="tarjeta-pizza">
      {/* 🖼️ Imagen de la pizza */}
      <div className="imagen-contenedor">
        <img
          src={`/imagenes/${pizza.imagen || "default.png"}`}
          alt={pizza.nombre || "Pizza genérica"}
          className="pizza-imagen"
        />
      </div>

      <h3>{pizza.nombre || "Sin nombre"}</h3>
      {/* ❌ Eliminamos la descripción */}
      
      <p className="precio">Precio: ${pizza.precio || "?"}</p>

      <div className="cantidad">
        <label htmlFor={`cant-${pizza.id}`}>Cantidad:</label>
        <input
          type="number"
          id={`cant-${pizza.id}`}
          min="1"
          value={cantidad}
          onChange={handleChange}
        />
      </div>

      <button onClick={handleClick} className="btn-agregar">
        Agregar al carrito
      </button>
    </div>
  );
}

export default PizzaCardItem;

