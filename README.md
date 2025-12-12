 🍕 Pizzaconmigo Backend

Backend de la aplicación **Pizzaconmigo**, desarrollado con **NestJS** y conectado a una base de datos **MySQL**.  
Este servicio gestiona pedidos, usuarios, menús y la integración con el frontend, asegurando seguridad y escalabilidad en producción.

🚀 Tecnologías principales
- **NestJS** (framework backend en Node.js)
- **MySQL** (base de datos relacional)
- **TypeORM** (ORM para modelado de entidades y migraciones)
- **DTOs** (Data Transfer Objects para claridad y mantenibilidad)
- **Render / Railway** (plataformas de despliegue)
- **Thunder Client / (validación de endpoints)

- - ⚙️ Instalación
1.- Clonar el repositorio:
git clone https://github.com/JuanCamposRey/TP-FINAL-BE.git
cd TP-FINAL-BE

📂 Estructura del proyecto
src/ 
├──modules/ # Módulos organizados por dominio (users, pizzas, orders, auth) 
├── dto/ # DTOs para requests/responses 
├── entities/ # Entidades de base de datos 
├── controllers/ # Controladores con endpoints REST 
├── services/ # Lógica de negocio 
├── config/ # Configuración de entorno y base de datos 
└── main.ts # Punto de entrada de la aplicación

🚀 Características principales
- Registro y autenticación de usuarios.
- CRUD de transacciones (crear, leer, actualizar, eliminar).
- Validación de datos mediante DTOs.
- Configuración de entorno con .env.
- Arquitectura modular con separación en src/.

🛠️ Scripts útiles
En `package.json` se incluyen atajos para automatizar tareas:

- `npm run start:dev` → iniciar en modo desarrollo
- `npm run build` → compilar la aplicación
- `npm run start:prod` → iniciar en producción
- `npm run migration:run` → ejecutar migraciones
- `npm run migration:generate` → generar nueva migración
-
 🔒 Seguridad y buenas prácticas
- Uso de **SSL** en despliegues productivos.
- Separación clara de entornos (`.env` para dev/test/prod).
- Validación de datos mediante DTOs.
- Endpoints probados con Thunder Client/Postman antes de cada release.
- Nunca usar directamente la base de datos de producción para pruebas.

 📡 Endpoints principales
Ejemplos de endpoints REST:

- `POST /auth/login` → login de usuario
- `POST /auth/register` → registro de usuario
- `GET /pizzas` → listado de pizzas
- `POST /orders` → crear pedido
- `GET /orders/:id` → obtener detalle de pedido


✅ Checklist de despliegue
1. Configurar `.env` con credenciales correctas.
2. Validar conexión a la base de datos con Thunder Client/Postman.
3. Ejecutar migraciones (`npm run migration:run`).
4. Probar endpoints críticos (auth, pizzas, orders).
5. Deploy en Render/Railway con entorno aislado.
6. Confirmar logs y métricas en producción.


 📖 Notas
- El proyecto está pensado para ser **escalable y seguro**, con entornos aislados.
- Cada integración debe validarse paso a paso para evitar riesgos en producción.
- Se recomienda documentar nuevas rutas en este README conforme se agreguen.










