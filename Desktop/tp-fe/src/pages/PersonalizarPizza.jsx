import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ingredientes } from '../data/ingredientes';
import { PedidoContext } from '../context/PedidoContext';
import Swal from 'sweetalert2';
import '../assets/style/PersonalizarPizza.css';

function PersonalizarPizza() {
  const [nombrePizza, setNombrePizza] = useState('');
  const [masa, setMasa] = useState(null);
  const [salsa, setSalsa] = useState(null);
  const [toppings, setToppings] = useState([]);
  const { setPedidoLista } = useContext(PedidoContext);
  const navigate = useNavigate();

  const toggleTopping = (item) => {
    const ya = toppings.find(i => i.id === item.id);
    const nuevos = ya
      ? toppings.filter(i => i.id !== item.id)
      : [...toppings, item];
    setToppings(nuevos);
  };

  const total =
    (masa?.precio || 0) +
    (salsa?.precio || 0) +
    toppings.reduce((acc, i) => acc + i.precio, 0);

  const handleAgregar = async () => {
    if (!nombrePizza || !masa || !salsa) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Completá el nombre, masa y salsa antes de continuar',
        confirmButtonColor: '#d62828',
      });
      return;
    }

    const pizzaPersonalizada = {
      nombre: nombrePizza,
      masa: masa.nombre,
      salsa: salsa.nombre,
      ingredientes: toppings.map(i => i.nombre),
      precio: total
    };

    try {
      const res = await fetch('http://localhost:3000/personalizar-pizzas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pizzaPersonalizada)
      });

      if (!res.ok) {
        throw new Error('Error al guardar la pizza');
      }

      const pizzaGuardada = await res.json();
      console.log("🍕 Pizza guardada:", pizzaGuardada);

      // 👇 Adaptamos para que siempre tenga id y estructura uniforme
      const pizzaConCarrito = {
        id: pizzaGuardada.id,                   // ✅ importante para PedidoCompleto
        nombre: pizzaGuardada.nombre,
        precio: pizzaGuardada.precio,
        cantidad: 1,
        subtotal: pizzaGuardada.precio,
        masa: pizzaGuardada.masa,               // usamos lo que devuelve el backend
        salsa: pizzaGuardada.salsa,
        toppings: pizzaGuardada.ingredientes    // ya viene como array de strings
      };

      setPedidoLista(prev => [...prev, pizzaConCarrito]);

      Swal.fire({
        icon: 'success',
        title: '¡Pizza agregada!',
        text: `Agregaste "${pizzaGuardada.nombre}" al carrito por $${pizzaGuardada.precio}`,
        confirmButtonColor: '#2a9d8f',
      }).then(() => {
        navigate('/pedido');
      });
      
    } catch (error) {
      console.error('🚨 Error al guardar pizza personalizada:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo guardar la pizza personalizada',
        confirmButtonColor: '#d62828',
      });
    }
  };

  return (
    <div className="pizza-contenedor1">
      <div className="tarjeta-pizza1">
        <h2>Personalizá tu pizza 🍕</h2>

        <input
          type="text"
          placeholder="Nombre de tu pizza"
          value={nombrePizza}
          onChange={(e) => setNombrePizza(e.target.value)}
          className="input"
        />

        <div className="seccion-horizontal">
          <div className="bloque-opciones">
            <h3>Elegí tu masa</h3>
            <div className="ingredientes-lista">
              {ingredientes.masa.map(item => (
                <label key={item.id} className="form-group">
                  <input
                    type="radio"
                    name="masa"
                    checked={masa?.id === item.id}
                    onChange={() => setMasa(item)}
                  />
                  {item.nombre} (${item.precio})
                </label>
              ))}
            </div>
          </div>

          <div className="bloque-opciones">
            <h3>Elegí tu salsa</h3>
            <div className="ingredientes-lista">
              {ingredientes.salsa.map(item => (
                <label key={item.id} className="form-group">
                  <input
                    type="radio"
                    name="salsa"
                    checked={salsa?.id === item.id}
                    onChange={() => setSalsa(item)}
                  />
                  {item.nombre} (${item.precio})
                </label>
              ))}
            </div>
          </div>

          <div className="bloque-opciones">
            <h3>Elegí tus toppings</h3>
            <div className="ingredientes-lista">
              {ingredientes.toppings.map(item => (
                <label key={item.id} className="form-group">
                  <input
                    type="checkbox"
                    checked={toppings.some(i => i.id === item.id)}
                    onChange={() => toggleTopping(item)}
                  />
                  {item.nombre} (${item.precio})
                </label>
              ))}
            </div>
          </div>
        </div>

        <p className="precio">Total: ${total}</p>
        <button className="btn-agregar" onClick={handleAgregar}>
          Agregar al carrito
        </button>
      </div>
    </div>
  );
}

export default PersonalizarPizza;
