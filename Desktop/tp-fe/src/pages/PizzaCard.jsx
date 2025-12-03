import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { pizzas } from '../data/pizzas';
import PizzaCardItem from '../components/PizzaCardItem';
import { PedidoContext } from '../context/PedidoContext';
import Swal from 'sweetalert2';
import '../assets/style/PizzaCard.css';

function PizzaCard() {
  const { pedidoLista, setPedidoLista } = useContext(PedidoContext);
  const navigate = useNavigate();

  // 👇 Calculamos el total directamente desde pedidoLista
  const total = pedidoLista.reduce((acc, pizza) => acc + pizza.subtotal, 0);

  const handleAgregar = (pizza, cantidad) => {
    const cantidadNum = Number(cantidad);

    if (!cantidadNum || cantidadNum <= 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Cantidad inválida',
        text: 'Por favor, ingresá una cantidad válida.',
        confirmButtonColor: '#f36f17',
      });
      return;
    }

    const subtotal = pizza.precio * cantidadNum;

    const pizzaConCantidad = {
      ...pizza,
      cantidad: cantidadNum,
      subtotal
    };

    setPedidoLista(prev => [...prev, pizzaConCantidad]);

    Swal.fire({
      icon: 'success',
      title: '¡Agregado!',
      text: `Agregaste ${cantidad} ${pizza.nombre} al carrito`,
      confirmButtonColor: '#50ad58',
    });
  };

  const handleVaciarCarrito = () => {
    Swal.fire({
      title: '¿Vaciar carrito?',
      text: '¿Estás segura de que querés vaciar el carrito?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#ff0800',
      cancelButtonColor: '#999',
      confirmButtonText: 'Sí, vaciar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        setPedidoLista([]);
        Swal.fire({
          icon: 'success',
          title: 'Carrito vaciado',
          confirmButtonColor: '#ff4213',
        });
      }
    });
  };

  return (
    <>
      <div className="pizza-contenedor">
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
    </>
  );
}

export default PizzaCard;
