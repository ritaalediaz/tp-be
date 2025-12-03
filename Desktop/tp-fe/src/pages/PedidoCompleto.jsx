import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PedidoContext } from '../context/PedidoContext';
import Swal from 'sweetalert2';
import '../assets/style/PedidoCompleto.css';

function PedidoCompleto() {
  const { pedidoLista, setPedidoLista, setPedido } = useContext(PedidoContext);
  const [pago, setPago] = useState('');
  const [envio, setEnvio] = useState('');
  const [direccion, setDireccion] = useState('');
  const [pedidoEnviado, setPedidoEnviado] = useState(false);
  const navigate = useNavigate();

  const totalFinal = pedidoLista.reduce((acc, pizza) => acc + pizza.subtotal, 0);

  const confirmarPedido = async () => {
    if (!pago || !envio || !direccion) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Completá todos los campos antes de confirmar tu pedido',
        confirmButtonColor: '#3085d6',
      });
      return;
    }

    const nombre_usuario = 'rita123'; // Reemplazalo si lo tenés en contexto

    const pedidoBase = {
      monto: totalFinal,
      direccion_envio: direccion,
      cantidad: pedidoLista.length,
      fecha: new Date(),
      nombre_usuario,
      forma_envio: envio,
      medio_pago: pago
    };

    console.log('📦 Pedido a enviar:', pedidoBase);
    console.log('🧾 Carrito actual:', pedidoLista);

    const pizzasSinId = pedidoLista.filter(p => !p.id);
    if (pizzasSinId.length > 0) {
      console.error("❌ Hay pizzas sin id en el carrito:", pizzasSinId);
      Swal.fire({
        icon: 'error',
        title: 'Error en el carrito',
        text: 'Alguna pizza no tiene un ID válido. Revisá la carga de pizzas personalizadas.',
        confirmButtonColor: '#d33',
      });
      return;
    }

    try {
      const resPedido = await fetch('http://localhost:3000/pedidos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pedidoBase)
      });

      if (!resPedido.ok) throw new Error('Error al crear el pedido');
      const pedidoCreado = await resPedido.json();
      const pedidoId = pedidoCreado.id;

      console.log('✅ Pedido creado con ID:', pedidoId);

      for (const pizza of pedidoLista) {
        const detalle = {
          id_pedido: pedidoId,
          id_pizza: pizza.id,
          cantidad: pizza.cantidad,
          subtotal: pizza.subtotal,
          pizza: { // 👈 añadimos el objeto pizza completo
            id: pizza.id,
            nombre: pizza.nombre,
            precio: pizza.precio,
            masa: pizza.masa || null,
            salsa: pizza.salsa || null,
            ingredientes: pizza.toppings || []
          }
        };

        console.log('➡️ Enviando detalle:', detalle);

        const resDetalle = await fetch('http://localhost:3000/detalle-pedido', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(detalle)
        });

        if (!resDetalle.ok) {
          console.error('❌ Error al guardar detalle:', await resDetalle.text());
          throw new Error('Error al guardar detalle');
        }
      }

      setPedido(pedidoBase);
      setPedidoLista([]);
      setPedidoEnviado(true);

      Swal.fire({
        icon: 'success',
        title: '¡Pedido confirmado!',
        text: 'Tu pedido está en preparación 🍕',
        confirmButtonColor: '#3085d6',
      });

    } catch (error) {
      console.error('🚨 Error en confirmarPedido:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al confirmar el pedido',
        confirmButtonColor: '#d33',
      });
    }
  };

  return (
    <div className="pizza-contenedor">
      <div className="tarjeta-pizza">
        {pedidoEnviado ? (
          <>
            <h2>🎉 ¡Pedido confirmado!</h2>
            <p>Has elegido pagar con <strong>{pago}</strong> y recibir tu pedido por <strong>{envio}</strong>.</p>
            <p>Dirección: <strong>{direccion}</strong></p>
            <p>Gracias por tu compra. Tu pedido está en preparación 🍕</p>
            <button className="btn-agregar" onClick={() => navigate('/home')}>
              Volver al inicio
            </button>
          </>
        ) : (
          <>
            <h2>🛒 Tu pedido</h2>

            {pedidoLista.length === 0 ? (
              <p>No hay pizzas en el carrito</p>
            ) : (
              <>
                <ul>
                  {pedidoLista.map((pizza, index) => (
                    <li key={index}>
                      <strong>{pizza.nombre}</strong> - ${pizza.precio} x {pizza.cantidad} = ${pizza.subtotal}<br />
                      {pizza.masa && <span>Masa: {pizza.masa}<br /></span>}
                      {pizza.salsa && <span>Salsa: {pizza.salsa}<br /></span>}
                      {pizza.toppings && <span>Toppings: {pizza.toppings.join(', ')}<br /></span>}
                    </li>
                  ))}
                </ul>

                <p className="precio">💰 Total: ${totalFinal}</p>

                {/* Campos de dirección, pago y envío */}
                <section>
                  <h3>📍 Dirección de envío</h3>
                  <input
                    type="text"
                    placeholder="Ej: Av. Siempre Viva 123"
                    value={direccion}
                    onChange={(e) => setDireccion(e.target.value)}
                  />
                </section>

                <section>
                  <h3>💳 Medio de pago</h3>
                  <label>
                    <input
                      type="radio"
                      name="pago"
                      value="Tarjeta de crédito"
                      checked={pago === 'Tarjeta de crédito'}
                      onChange={(e) => setPago(e.target.value)}
                    />
                    Tarjeta de crédito
                  </label><br />
                  <label>
                    <input
                      type="radio"
                      name="pago"
                      value="Efectivo"
                      checked={pago === 'Efectivo'}
                      onChange={(e) => setPago(e.target.value)}
                    />
                    Efectivo
                  </label><br />
                  <label>
                    <input
                      type="radio"
                      name="pago"
                      value="Transferencia"
                      checked={pago === 'Transferencia'}
                      onChange={(e) => setPago(e.target.value)}
                    />
                    Transferencia
                  </label>
                </section>

                <section>
                  <h3>🚚 Forma de envío</h3>
                  <label>
                    <input
                      type="radio"
                      name="envio"
                      value="Envío a domicilio"
                      checked={envio === 'Envío a domicilio'}
                      onChange={(e) => setEnvio(e.target.value)}
                    />
                    Envío a domicilio
                  </label><br />
                  <label>
                    <input
                      type="radio"
                      name="envio"
                      value="Retiro en local"
                      checked={envio === 'Retiro en local'}
                      onChange={(e) => setEnvio(e.target.value)}
                    />
                    Retiro en local
                  </label><br />
                  <label>
                    <input
                      type="radio"
                      name="envio"
                      value="Envío express"
                      checked={envio === 'Envío express'}
                      onChange={(e) => setEnvio(e.target.value)}
                    />
                    Envío express
                  </label>
                </section>

                <button className="btn-agregar" onClick={confirmarPedido}>
                  Confirmar pedido
                </button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default PedidoCompleto;
