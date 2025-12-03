import { useState } from 'react';
import Swal from 'sweetalert2'; // 👈 importamos SweetAlert2

// PizzaCardItem: representa una sola tarjeta de pizza
function PizzaCardItem({ pizza, onAgregar }) { 
  const [cantidad, setCantidad] = useState(0);

  const handleClick = () => {
    if (cantidad > 0) {
      onAgregar(pizza, cantidad);
      setCantidad(0); // opcional: reinicia el input
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Cantidad inválida',
        text: 'Seleccioná una cantidad válida antes de agregar al carrito',
        confirmButtonColor: '#f36f17', // mismo estilo que tus botones
      });
    }
  };

  return (
    <div className="tarjeta-pizza">
      <img src={pizza.imagen} alt={`Pizza ${pizza.nombre}`} className="pizza-imagen" />
      <h3>{pizza.nombre}</h3>
      <p className="precio">${pizza.precio}</p>
      <div className="cantidad">
        <label htmlFor={`cant-${pizza.id}`}>Cantidad:</label>
        <input
          type="number"
          id={`cant-${pizza.id}`}
          min="1"
          value={cantidad}
          onChange={(e) => setCantidad(Number(e.target.value))}
        />
      </div>
      <button className="btn-agregar" onClick={handleClick}>
        Agregar al carrito
      </button>
    </div>
  );
}

export default PizzaCardItem;
