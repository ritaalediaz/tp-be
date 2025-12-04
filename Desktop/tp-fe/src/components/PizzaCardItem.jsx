import { useState } from 'react';
import Swal from 'sweetalert2';

function PizzaCardItem({ pizza, onAgregar }) {
  const [cantidad, setCantidad] = useState(0);

  const handleClick = () => {
    if (cantidad > 0) {
      onAgregar(pizza, cantidad);
      setCantidad(0);
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Cantidad inválida',
        text: 'Seleccioná una cantidad válida antes de agregar al carrito',
        confirmButtonColor: '#f36f17',
      });
    }
  };

  return (
    <div className="tarjeta-pizza">
      <img
        src={`/imagenes/${pizza.imagen || 'default.png'}`}
        alt={`Pizza ${pizza.nombre}`}
        className="pizza-imagen"
        onError={(e) => (e.currentTarget.src = '/imagenes/default.png')}
      />
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
