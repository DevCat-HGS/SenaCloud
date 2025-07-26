# SENA Cloud

Sistema de gestión para SENA que facilita la administración de guías, reportes, eventos y actividades académicas.

## Descripción

SENA Cloud es una aplicación web integral diseñada para optimizar la organización académica y administrativa mediante un sistema intuitivo que permite a instructores, administradores y superadministradores coordinar eficientemente sus responsabilidades.

---

## 🛠️ Tecnologías Utilizadas

- **Backend Principal:** Node.js + Express.js  
- **APIs Adicionales (Microservicios):**
  - **Flask API (Python)** para integración modular
  - **Auth API:** Gestión de autenticación y autorización basada en roles (JWT + Auth0)
  - **CRUD API:** Servicios RESTful para operaciones sobre guías, actividades y reportes
  - **Resources API:** Servicio de Recursos videos, fotos, audio, PDF, Excel, Entre otros.
- **Base de Datos:** MongoDB  
- **Frontend:** React.js + Context API  
- **Estilos:** Tailwind CSS  
- **Comunicación en Tiempo Real:** Socket.io  
- **Autenticación y Seguridad:** Auth0 + JWT  

---

### 📬 Notificaciones y Comunicaciones

- **Correo Electrónico:**
  - [`Nodemailer`](https://nodemailer.com/about/) (Node.js): Envío de correos por SMTP (Gmail)
  - [`Flask-Mail`](https://pythonhosted.org/Flask-Mail/) (Python): Para microservicios con Flask

- **Notificaciones en la Interfaz:**
  - [`react-toastify`](https://fkhadra.github.io/react-toastify/): Toasts interactivos para mensajes instantáneos al usuario
  - [`SweetAlert2`](https://sweetalert2.github.io/): Modales personalizados para alertas, confirmaciones o errores

- **Socket.io:** Notificaciones en tiempo real entre usuarios activos

---

## Estructura

- **API:** Backend con Express y MongoDB
- **Admin:** Panel para administradores y superadministradores
- **EquipoPedagogico:** Para el equipo Pedagogico 
- **InstructorPanel:** Panel para instructores

## Funcionalidades

- Sistema de autenticación con roles (Superadmin, Administrador, Equipo Pedagogico, Instructor)
- Gestión de guías con sistema de versionado
- Administración de actividades, eventos y reportes
- Notificaciones en tiempo real con Socket.io
- Generación de reportes(Excel)
