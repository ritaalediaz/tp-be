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

    // Objeto principal del pedido
    const pedidoBase = {
      monto: totalFinal,
      cantidad: cantidadTotal,
      fecha: new Date().toISOString(),
      clienteId: Number(cliente.id),
      formaEnvio: envio,
      medioPago: pago,
      direccionEnvio: envio === "Retiro en local" ? "Retiro en local" : direccion
    };

    console.log("📦 Pedido a enviar:", JSON.stringify(pedidoBase, null, 2));

    try {
      // Crear pedido
      const resPedido = await fetch('https://tp-be.onrender.com/pedidos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pedidoBase)
      });

      if (!resPedido.ok) throw new Error('Error al crear el pedido');
      const pedidoCreado = await resPedido.json();
      const pedidoId = pedidoCreado.id;

      // Guardar detalles de cada pizza
      for (const pizza of pedidoLista) {
        const detalle = {
          id_pedido: pedidoId,
          cantidad: pizza.cantidad,
          id_pizza: Number(pizza.id)
        };

        console.log("🧾 Detalle a enviar:", detalle);

        const resDetalle = await fetch('https://tp-be.onrender.com/detalle-pedido', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(detalle)
        });

        if (!resDetalle.ok) throw new Error('Error al guardar detalle');
      }

      // Actualizar estado
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
    <div className="total-compra">
      <h2>Total de compra: ${totalFinal}</h2>

      {/* Opciones de pago */}
      <div className="opciones-pago">
        <label>
          Medio de pago:
          <select value={pago} onChange={(e) => setPago(e.target.value)}>
            <option value="">Seleccionar</option>
            <option value="Tarjeta">Tarjeta</option>
            <option value="Transferencia">Transferencia</option>
            <option value="Efectivo">Efectivo</option>
          </select>
        </label>

        {pago === "Tarjeta" && (
          <div className="datos-tarjeta">
            <input
              type="text"
              placeholder="Número de tarjeta"
              value={numeroTarjeta}
              onChange={(e) => setNumeroTarjeta(e.target.value)}
            />
            <input
              type="text"
              placeholder="Vencimiento (MM/AA)"
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
          <div className="datos-transferencia">
            <input
              type="text"
              placeholder="Comprobante de transferencia"
              value={comprobanteTransferencia}
              onChange={(e) => setComprobanteTransferencia(e.target.value)}
            />
          </div>
        )}
      </div>

      {/* Opciones de envío */}
      <div className="opciones-envio">
        <label>
          Forma de envío:
          <select value={envio} onChange={(e) => setEnvio(e.target.value)}>
            <option value="">Seleccionar</option>
            <option value="Envío a domicilio">Envío a domicilio</option>
            <option value="Envío express">Envío express</option>
            <option value="Retiro en local">Retiro en local</option>
          </select>
        </label>

        {(envio === "Envío a domicilio" || envio === "Envío express") && (
          <input
            type="text"
            placeholder="Dirección de entrega"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
          />
        )}
      </div>

      {/* Botones de acción */}
      <div className="botones-acciones">
        <button className="btn-vaciar" onClick={() => setPedidoLista([])}>
          Vaciar carrito
        </button>
        <button className="btn-confirmar" onClick={confirmarPedido}>
          Confirmar pedido
        </button>
        <button className="btn-seguir" onClick={() => navigate('/')}>
          Seguir comprando
        </button>
      </div>
    </div>
  );
}

export default PedidoCompleto;
