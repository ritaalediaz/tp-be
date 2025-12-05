import React, { useState, useContext } from 'react';
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

  // Estados adicionales para pago
  const [numeroTarjeta, setNumeroTarjeta] = useState('');
  const [vencimiento, setVencimiento] = useState('');
  const [cvv, setCvv] = useState('');
  const [comprobanteTransferencia, setComprobanteTransferencia] = useState('');

  const navigate = useNavigate();
  const totalFinal = pedidoLista.reduce((acc, pizza) => acc + pizza.subtotal, 0);

  const confirmarPedido = async () => {
    if (!pago || !envio) {
      Swal.fire({ icon: 'warning', title: 'Campos incompletos', text: 'Seleccioná pago y envío' });
      return;
    }

    // Validaciones según medio de pago
    if (pago === "Tarjeta" && (!numeroTarjeta || !vencimiento || !cvv)) {
      Swal.fire({ icon: 'warning', title: 'Datos incompletos', text: 'Completá todos los datos de la tarjeta' });
      return;
    }

    if (pago === "Transferencia" && !comprobanteTransferencia) {
      Swal.fire({ icon: 'warning', title: 'Falta comprobante', text: 'Ingresá el número de comprobante de la transferencia' });
      return;
    }

    // Validar dirección si corresponde
    if ((envio === "Envío a domicilio" || envio === "Envío express") && !direccion) {
      Swal.fire({ icon: 'warning', title: 'Falta dirección', text: 'Ingresá tu dirección de entrega' });
      return;
    }

    const cliente = JSON.parse(localStorage.getItem("cliente"));
    if (!cliente) {
      Swal.fire({ icon: 'error', title: 'Debes iniciar sesión', text: 'Por favor inicia sesión para confirmar tu pedido' });
      navigate("/iniciar-sesion");
      return;
    }

  const cantidadTotal = pedidoLista.reduce((acc, p) => acc + p.cantidad, 0);

const pedidoBase = {
  monto: totalFinal,
  cantidad: cantidadTotal,
  fecha: new Date().toISOString(),
  clienteId: Number(cliente.id),          // 👈 corregido
  formaEnvio: envio,              // 👈 corregido
  medioPago: pago,                // 👈 corregido
  direccionEnvio: direccion || "" // 👈 corregido
};

console.log("📦 Pedido a enviar:", pedidoBase);

  try {
  const resPedido = await fetch('https://tp-be.onrender.com/pedidos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(pedidoBase)
  });

      if (!resPedido.ok) throw new Error('Error al crear el pedido');
      const pedidoCreado = await resPedido.json();
      const pedidoId = pedidoCreado.id;

      for (const pizza of pedidoLista) {
        const detalle = {
          pedidoId,
          cantidad: pizza.cantidad,
          ...(pizza.tipo === "personalizada"
            ? { pizzaPersonalizadaId: pizza.id }
            : { pizzaId: pizza.id })
        };

       const resDetalle = await fetch('https://tp-be.onrender.com/detalle-pedido', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(detalle)
});

        if (!resDetalle.ok) throw new Error('Error al guardar detalle');
      }

      setPedido(pedidoBase);
      setPedidoLista([]);
      setPedidoEnviado(true);

      Swal.fire({
        icon: 'success',
        title: '¡Pedido confirmado!',
        text: 'Tu pedido está en preparación 🍕',
        confirmButtonText: 'Volver al inicio'
      }).then(() => navigate('/'));

    } catch (error) {
      console.error('🚨 Error en confirmarPedido:', error);
      Swal.fire({ icon: 'error', title: 'Error', text: 'Hubo un problema al confirmar el pedido' });
    }
  };

  return (
    <div className="pizza-contenedor">
      <div className="tarjeta-pizza">
        {!pedidoEnviado ? (
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
                      <span>Masa:</span> {pizza.masa}<br />
                      <span>Salsa:</span> {pizza.salsa}<br />
                      <span>Toppings:</span> {pizza.toppings?.join(', ')}
                    </li>
                  ))}
                </ul>

                <p className="precio">💰 Total: ${totalFinal}</p>

                {/* Medio de pago */}
                <section>
                  <h3>💳 Medio de pago</h3>
                  <label>
                    <input
                      type="radio"
                      name="pago"
                      value="Tarjeta"
                      checked={pago === 'Tarjeta'}
                      onChange={(e) => setPago(e.target.value)}
                    />
                    Tarjeta de crédito / débito
                  </label><br />
                  <label>
                    <input
                      type="radio"
                      name="pago"
                      value="Transferencia"
                      checked={pago === 'Transferencia'}
                      onChange={(e) => setPago(e.target.value)}
                    />
                    Transferencia bancaria
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
                  </label>

                  {/* Campos dinámicos según el pago */}
                  {pago === "Tarjeta" && (
                    <div style={{ marginTop: "10px" }}>
                      <input
                        type="text"
                        placeholder="Número de tarjeta"
                        value={numeroTarjeta}
                        onChange={(e) => setNumeroTarjeta(e.target.value)}
                      />
                      <input
                        type="text"
                        placeholder="Fecha de vencimiento (MM/AA)"
                        value={vencimiento}
                        onChange={(e) => setVencimiento(e.target.value)}
                      />
                      <input
                        type="text"
                        placeholder="CVV"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                      />
                    </div>
                  )}

                  {pago === "Transferencia" && (
                    <div style={{ marginTop: "10px" }}>
                      <p>Alias: <strong>pizza-conmigo</strong></p>
                      <p>CBU: <strong>1234567890123456789012</strong></p>
                      <input
                        type="text"
                        placeholder="Número de comprobante"
                        value={comprobanteTransferencia}
                        onChange={(e) => setComprobanteTransferencia(e.target.value)}
                      />
                    </div>
                  )}

                  {pago === "Efectivo" && (
                    <p style={{ marginTop: "10px" }}>💵 Pagás al recibir tu pedido.</p>
                  )}
                </section>

                {/* Forma de envío */}
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

                  {/* Campo dinámico de dirección */}
                  {(envio === "Envío a domicilio" || envio === "Envío express") && (
                    <div style={{ marginTop: "10px" }}>
                      <input
                        type="text"
                        placeholder="Dirección de entrega"
                        value={direccion}
                        onChange={(e) => setDireccion(e.target.value)}
                      />
                    </div>
                  )}

                  {/* Aviso para envío express */}
                  {envio === "Envío express" && (
                    <p style={{ color: "red", marginTop: "10px" }}>
                      ⚡ El envío express tiene un costo adicional y llega en menos de 30 minutos.
                    </p>
                  )}
                </section>

                <button className="btn-agregar" onClick={confirmarPedido}>
                  Confirmar pedido
                </button>
              </>
            )}
          </>
        ) : (
          <>
            <h2>🎉 ¡Pedido confirmado!</h2>
            <p>
              Has elegido pagar con <strong>{pago}</strong> y recibir tu pedido por <strong>{envio}</strong>.
            </p>
            {direccion && <p>Será entregado en: <strong>{direccion}</strong></p>}
            <p>Gracias por tu compra. Tu pedido está en preparación 🍕</p>
            <button className="btn-agregar" onClick={() => navigate('/')}>
              Volver al inicio
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default PedidoCompleto;
