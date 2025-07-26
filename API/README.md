# SenaCloud API

API RESTful para servicios de SenaCloud con documentación automática y monitoreo de estado.

## 🚀 Características

- **Socket.IO en tiempo real**: Comunicación bidireccional con WebSockets
- **Estado en tiempo real**: Monitoreo del estado de la API con métricas del sistema
- **Documentación automática**: Endpoint `/doc` con documentación completa de la API
- **Estructura modular**: Rutas organizadas en archivos separados
- **Manejo de errores**: Respuestas de error consistentes y útiles
- **CORS habilitado**: Compatible con aplicaciones frontend
- **Documentación en Markdown**: Archivo de documentación completo en `docs/api.md`
- **Dashboard web**: Interfaz de monitoreo en tiempo real en `/`

## 📁 Estructura del Proyecto

```
API/
│
├── index.js          # Archivo principal del servidor con Socket.IO
├── routes/
│   ├── status.js     # Ruta raíz "/" - Estado de la API
│   └── doc.js        # Ruta "/doc" - Documentación de la API
├── public/
│   └── index.html    # Dashboard web en tiempo real
├── docs/
│   └── api.md        # Documentación escrita en markdown
├── package.json      # Dependencias y scripts
└── README.md         # Este archivo
```

## 🛠️ Instalación

### Requisitos

- Node.js 16.0.0 o superior
- npm o yarn

### Pasos de instalación

1. Clona el repositorio:
```bash
git clone https://github.com/senacloud/api.git
cd api
```

2. Instala las dependencias:
```bash
npm install
```

3. Ejecuta el servidor:
```bash
# Desarrollo (con nodemon)
npm run dev

# Producción
npm start
```

## 📡 Endpoints

### GET /
Obtiene el estado actual de la API con información detallada del sistema.

**Respuesta:**
```json
{
  "status": "online",
  "service": "SenaCloud API",
  "version": "1.1.0",
  "environment": "development",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "uptime": {
    "seconds": 3600,
    "minutes": 60,
    "hours": 1,
    "days": 0
  },
  "system": {
    "platform": "win32",
    "nodeVersion": "v18.0.0",
    "memory": {
      "rss": "45 MB",
      "heapTotal": "20 MB",
      "heapUsed": "15 MB",
      "external": "2 MB"
    }
  },
  "realtime": {
    "enabled": true,
    "technology": "Socket.IO",
    "events": ["api-status", "api-documentation", "system-metrics"],
    "updateInterval": {
      "status": "5 segundos",
      "metrics": "10 segundos"
    }
  }
}
```

### GET /doc
Obtiene la documentación completa de la API en formato JSON.

**Incluye:**
- Lista de endpoints disponibles
- Eventos de Socket.IO
- Ejemplos de uso en diferentes lenguajes
- Códigos de error
- Información de contacto
- Changelog
- Próximas características

## 🔌 Socket.IO Events

### Eventos de Escucha (Servidor → Cliente)

| Evento | Descripción | Frecuencia |
|--------|-------------|------------|
| `api-status` | Estado actualizado de la API | Cada 5 segundos |
| `api-documentation` | Documentación completa | Al conectar |
| `system-metrics` | Métricas del sistema | Cada 10 segundos |

### Eventos de Emisión (Cliente → Servidor)

| Evento | Descripción | Datos |
|--------|-------------|-------|
| `request-status` | Solicitar estado inmediato | Ninguno |
| `request-documentation` | Solicitar documentación | Ninguno |
| `request-metrics` | Solicitar métricas | Ninguno |

## 🔧 Configuración

### Variables de Entorno

- `PORT`: Puerto del servidor (por defecto: 3000)
- `NODE_ENV`: Entorno de ejecución (development/production)

### Ejemplo de configuración

Crea un archivo `.env` en la raíz del proyecto:

```env
PORT=3000
NODE_ENV=development
```

## 📚 Documentación

La documentación completa está disponible en:

- **Endpoint JSON**: `http://localhost:3000/doc`
- **Archivo Markdown**: `docs/api.md`

## 🧪 Pruebas

### Dashboard Web
Visita `http://localhost:3000` para ver el dashboard en tiempo real con Socket.IO.

### Con cURL

```bash
# Obtener estado de la API
curl -X GET http://localhost:3000/

# Obtener documentación
curl -X GET http://localhost:3000/doc
```

### Con JavaScript (REST)

```javascript
// Obtener estado de la API
fetch('http://localhost:3000/')
  .then(response => response.json())
  .then(data => console.log(data));

// Obtener documentación
fetch('http://localhost:3000/doc')
  .then(response => response.json())
  .then(data => console.log(data));
```

### Con Socket.IO

```javascript
// Conectar con Socket.IO
const socket = io('http://localhost:3000');

// Escuchar actualizaciones de estado en tiempo real
socket.on('api-status', (data) => {
  console.log('Estado actualizado:', data);
});

// Escuchar métricas del sistema
socket.on('system-metrics', (data) => {
  console.log('Métricas:', data);
});

// Solicitar datos inmediatos
socket.emit('request-status');
socket.emit('request-metrics');
```

## 🚀 Despliegue

### Heroku

1. Crea una aplicación en Heroku
2. Conecta tu repositorio
3. Configura las variables de entorno
4. Despliega automáticamente

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

## 🤝 Contribución

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Changelog

### v1.1.0 (2024-01-25)
- ✅ Integración de Socket.IO para tiempo real
- ✅ Eventos de actualización automática cada 5-10 segundos
- ✅ Métricas del sistema en tiempo real
- ✅ Dashboard web con interfaz moderna
- ✅ CORS habilitado para WebSockets
- ✅ Manejo de conexiones múltiples

### v1.0.0 (2024-01-01)
- ✅ Implementación inicial de la API
- ✅ Endpoint de estado del sistema
- ✅ Documentación automática
- ✅ Estructura modular de rutas
- ✅ Manejo de errores
- ✅ CORS habilitado

## 🔮 Próximas Características

- [ ] Autenticación JWT
- [ ] Rate limiting
- [ ] Logs detallados
- [ ] Métricas de rendimiento avanzadas
- [ ] Webhooks
- [ ] API versioning
- [ ] Tests automatizados
- [ ] Swagger/OpenAPI integration
- [ ] Chat en tiempo real
- [ ] Notificaciones push
- [ ] Dashboard de administración
- [ ] Alertas automáticas

## 📞 Contacto

- **Email**: soporte@senacloud.com
- **Website**: https://senacloud.com
- **GitHub**: https://github.com/senacloud/api

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Ver el archivo `LICENSE` para más detalles.

---

Desarrollado con ❤️ por el equipo de SenaCloud 