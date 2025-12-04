import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PizzaCardItem from '../components/PizzaCardItem';
import { PedidoContext } from '../context/PedidoContext';
import Swal from 'sweetalert2'; // 👈 importamos SweetAlert2
import '../assets/style/PizzaCard.css';

function PizzaCard() {
  const [total, setTotal] = useState(0);
  const [pizzas, setPizzas] = useState([]); // ahora vienen del BE
  const { pedidoLista, setPedidoLista } = useContext(PedidoContext);
  const navigate = useNavigate();

  // 🔗 Traer pizzas del backend
  useEffect(() => {
    axios.get("http://localhost:3000/pizzas") // endpoint 
      .then((res) => {
        setPizzas(res.data);
      })
      .catch((err) => {
        console.error("Error al cargar pizzas:", err);
      });
  }, []);

  const handleAgregar = (pizza, cantidad) => {
    const cantidadNum = Number(cantidad);

    if (!cantidadNum || cantidadNum <= 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Cantidad inválida',
        text: 'Por favor, ingresá una cantidad válida.',
      });
      return;
    }

    const subtotal = pizza.precio * cantidadNum;
    setTotal(prev => prev + subtotal);

    const pizzaConCantidad = {
      ...pizza,
      cantidad: cantidadNum,
      subtotal
    };

    setPedidoLista(prev => [...prev, pizzaConCantidad]);

    Swal.fire({
      icon: 'success',
      title: 'Pizza agregada',
      text: `Agregaste ${cantidad} ${pizza.nombre} al carrito 🍕`,
      timer: 1500,
      showConfirmButton: false
    });
  };

  const handleVaciarCarrito = () => {
    Swal.fire({
      title: '¿Estás segura?',
      text: "Se vaciará todo el carrito",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, vaciar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        setPedidoLista([]);
        setTotal(0);
        Swal.fire({
          icon: 'success',
          title: 'Carrito vacio',
          timer: 1200,
          showConfirmButton: false
        });
      }
    });
  };

return (
  <main className="page-pizzas">
    <div className="pizzas-wrapper">
      <div className="pizza-contenedor3">
        {pizzas.map(pizza => (
          <PizzaCardItem
            key={pizza.id}
            pizza={pizza}
            onAgregar={handleAgregar}
          />
        ))}
      </div>

      <div className="total-compra">
        <h2>Total de compra: ${total}</h2>

        <div className="botones-acciones">
          <button
            onClick={handleVaciarCarrito}
            disabled={pedidoLista.length === 0}
            className="btn-vaciar"
          >
            Vaciar carrito
          </button>

          <button
            onClick={() => navigate('/pedido')}
            disabled={pedidoLista.length === 0}
            className="btn-confirmar"
          >
            Confirmar pedido
          </button>

          <button
            onClick={() => navigate('/')}
            className="btn-seguir"
          >
            Seguir comprando
          </button>
        </div>
      </div>
    </div>
  </main>
);

}

export default PizzaCard;
