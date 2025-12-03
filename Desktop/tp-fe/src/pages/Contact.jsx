import { useState } from 'react';
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2';
import '../assets/style/contacto.css';

function Contact() {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    telefono: '',
    email: '',
    comentario: ''
  });

  const [, setEnviado] = useState(false);
  const [errores, setErrores] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setErrores(prev => ({
      ...prev,
      [name]: ''
    }));
  };

  const validar = () => {
    const nuevosErrores = {};
    const { nombre, apellido, telefono, email, comentario } = formData;

    if (!nombre.trim()) nuevosErrores.nombre = 'El nombre es obligatorio.';
    if (!apellido.trim()) nuevosErrores.apellido = 'El apellido es obligatorio.';
    if (!/^\d{7,15}$/.test(telefono)) nuevosErrores.telefono = 'Teléfono inválido. Solo números entre 7 y 15 dígitos.';
    if (!/\S+@\S+\.\S+/.test(email)) nuevosErrores.email = 'Email inválido.';
    if (!comentario.trim()) nuevosErrores.comentario = 'El comentario no puede estar vacío.';

    return nuevosErrores;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const erroresValidados = validar();

    if (Object.keys(erroresValidados).length > 0) {
      setErrores(erroresValidados);
      setEnviado(false);

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Por favor corrige los errores antes de enviar.'
      });

      return;
    }

    // Enviar con EmailJS
    emailjs.send(
      'service_t4yey3v',         // Tu Service ID
      'template_g5z927s',        // Tu Template ID
      {
        nombre: formData.nombre,
        apellido: formData.apellido,
        telefono: formData.telefono,
        email: formData.email,
        comentario: formData.comentario
      },
      'yOGfGlzhWIi4o2aLD'         // Tu Public Key
    )
    .then(() => {
      setEnviado(true);
      setFormData({
        nombre: '',
        apellido: '',
        telefono: '',
        email: '',
        comentario: ''
      });

      Swal.fire({
        icon: 'success',
        title: '¡Mensaje enviado!',
        text: 'Gracias por tu consulta, te responderemos muy pronto 🍕'
      });
    })
    .catch((error) => {
      console.error('❌ Error al enviar consulta:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al enviar tu consulta. Intenta nuevamente.'
      });
    });
  };

  return (
    <div className="contenedor-principal">
      <div className="contenedor-formulario">
        <h2 id="titulo"><span>Dejános tu Comentario...</span></h2>

        <form onSubmit={handleSubmit} noValidate>
          {/* Inputs y validaciones */}
          <div className="form-group">
            <label htmlFor="nombre">Nombre:</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              className="input"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Tu Nombre"
              maxLength={20}
              required
            />
            {errores.nombre && <p className="error">{errores.nombre}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="apellido">Apellido:</label>
            <input
              type="text"
              id="apellido"
              name="apellido"
              className="input"
              value={formData.apellido}
              onChange={handleChange}
              placeholder="Tu Apellido"
              maxLength={20}
              required
            />
            {errores.apellido && <p className="error">{errores.apellido}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="telefono">Teléfono:</label>
            <input
              type="tel"
              id="telefono"
              name="telefono"
              className="input"
              value={formData.telefono}
              onChange={handleChange}
              placeholder="Ej: 1123456789"
              maxLength={15}
              required
            />
            {errores.telefono && <p className="error">{errores.telefono}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              className="input"
              value={formData.email}
              onChange={handleChange}
              placeholder="correo@ejemplo.com"
              maxLength={30}
              required
            />
            {errores.email && <p className="error">{errores.email}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="comentario">Mensaje:</label>
            <textarea
              id="comentario"
              name="comentario"
              rows="5"
              cols="50"
              className="input"
              value={formData.comentario}
              onChange={handleChange}
              placeholder="Escribe tu mensaje aquí..."
              maxLength={500}
              required
            />
            {errores.comentario && <p className="error">{errores.comentario}</p>}
          </div>

          <button type="submit" className="btn-enviar">Enviar</button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
