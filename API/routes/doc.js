const express = require('express');
const router = express.Router();

// Ruta de documentación
router.get('/', (req, res) => {
  res.json({
    title: 'Documentación de la API de SenaCloud',
    description: 'API RESTful para servicios de SenaCloud con Socket.IO en tiempo real',
    version: '1.1.0',
    baseUrl: req && req.get ? `${req.protocol}://${req.get('host')}` : 'http://localhost:3000',
    lastUpdated: new Date().toISOString(),
    
    authentication: {
      type: 'No requerida para endpoints básicos',
      note: 'Algunos endpoints pueden requerir autenticación en futuras versiones'
    },
    
    endpoints: [
      {
        path: '/',
        method: 'GET',
        description: 'Obtiene el estado actual de la API',
        parameters: 'Ninguno',
        realtime: 'Disponible via Socket.IO',
        response: {
          status: 'online',
          service: 'SenaCloud API',
          version: 'string',
          environment: 'string',
          timestamp: 'ISO string',
          uptime: 'object',
          system: 'object',
          endpoints: 'array',
          realtime: 'object',
          contact: 'object',
          features: 'object'
        }
      },
      {
        path: '/doc',
        method: 'GET',
        description: 'Muestra esta documentación completa de la API',
        parameters: 'Ninguno',
        realtime: 'Disponible via Socket.IO',
        response: 'Este objeto JSON con toda la documentación'
      }
    ],
    
    socketEvents: [
      {
        event: 'api-status',
        description: 'Recibe actualizaciones automáticas del estado de la API',
        frequency: 'Cada 5 segundos',
        data: 'Objeto con información del estado del sistema',
        example: 'socket.on("api-status", (data) => console.log(data))'
      },
      {
        event: 'api-documentation',
        description: 'Recibe la documentación completa de la API',
        frequency: 'Al conectar',
        data: 'Objeto con toda la documentación',
        example: 'socket.on("api-documentation", (data) => console.log(data))'
      },
      {
        event: 'system-metrics',
        description: 'Recibe métricas detalladas del sistema en tiempo real',
        frequency: 'Cada 10 segundos',
        data: 'Objeto con métricas de rendimiento',
        example: 'socket.on("system-metrics", (data) => console.log(data))'
      },
      {
        event: 'request-status',
        description: 'Solicita actualización inmediata del estado de la API',
        direction: 'Cliente → Servidor',
        data: 'Ninguno',
        example: 'socket.emit("request-status")'
      },
      {
        event: 'request-documentation',
        description: 'Solicita actualización inmediata de la documentación',
        direction: 'Cliente → Servidor',
        data: 'Ninguno',
        example: 'socket.emit("request-documentation")'
      },
      {
        event: 'request-metrics',
        description: 'Solicita métricas inmediatas del sistema',
        direction: 'Cliente → Servidor',
        data: 'Ninguno',
        example: 'socket.emit("request-metrics")'
      }
    ],
    
    errorCodes: {
      200: 'OK - Solicitud exitosa',
      400: 'Bad Request - Datos de entrada inválidos',
      404: 'Not Found - Recurso no encontrado',
      500: 'Internal Server Error - Error interno del servidor'
    },
    
    rateLimiting: {
      status: 'No implementado en esta versión',
      note: 'Se implementará en futuras versiones para proteger la API'
    },
    
    examples: {
      curl: {
        status: 'curl -X GET http://localhost:3000/',
        documentation: 'curl -X GET http://localhost:3000/doc'
      },
      javascript: {
        status: `fetch('http://localhost:3000/')
  .then(response => response.json())
  .then(data => console.log(data));`,
        documentation: `fetch('http://localhost:3000/doc')
  .then(response => response.json())
  .then(data => console.log(data));`
      },
      socketConnection: `
// Conectar con Socket.IO
const socket = io('http://localhost:3000');

// Escuchar actualizaciones de estado en tiempo real
socket.on('api-status', (data) => {
  console.log('Estado actualizado:', data);
  updateStatusDisplay(data);
});

// Escuchar documentación
socket.on('api-documentation', (data) => {
  console.log('Documentación:', data);
  updateDocumentationDisplay(data);
});

// Escuchar métricas del sistema
socket.on('system-metrics', (data) => {
  console.log('Métricas del sistema:', data);
  updateMetricsDisplay(data);
});

// Solicitar datos inmediatos
socket.emit('request-status');
socket.emit('request-metrics');

// Manejar conexión/desconexión
socket.on('connect', () => {
  console.log('Conectado al servidor');
});

socket.on('disconnect', () => {
  console.log('Desconectado del servidor');
});`,
      htmlExample: `
<!DOCTYPE html>
<html>
<head>
    <title>SenaCloud API Monitor</title>
    <script src="https://cdn.socket.io/4.7.2/socket.io.min.js"></script>
</head>
<body>
    <h1>SenaCloud API - Monitor en Tiempo Real</h1>
    <div id="status"></div>
    <div id="metrics"></div>
    
    <script>
        const socket = io('http://localhost:3000');
        
        socket.on('api-status', (data) => {
            document.getElementById('status').innerHTML = 
                '<h2>Estado: ' + data.status + '</h2>' +
                '<p>Versión: ' + data.version + '</p>' +
                '<p>Uptime: ' + data.uptime.hours + 'h ' + data.uptime.minutes + 'm</p>';
        });
        
        socket.on('system-metrics', (data) => {
            document.getElementById('metrics').innerHTML = 
                '<h2>Métricas del Sistema</h2>' +
                '<p>Memoria RSS: ' + data.memory.rss + ' MB</p>' +
                '<p>Memoria Heap: ' + data.memory.heapUsed + ' MB</p>' +
                '<p>Clientes conectados: ' + data.connections.total + '</p>';
        });
    </script>
</body>
</html>`
    },
    
    contact: {
      email: 'soporte@senacloud.com',
      website: 'https://senacloud.com',
      github: 'https://github.com/senacloud/api',
      documentation: 'https://docs.senacloud.com'
    },
    
    changelog: [
      {
        version: '1.1.0',
        date: new Date().toISOString().split('T')[0],
        changes: [
          '✅ Integración de Socket.IO para tiempo real',
          '✅ Eventos de actualización automática cada 5-10 segundos',
          '✅ Métricas del sistema en tiempo real',
          '✅ Documentación actualizada con ejemplos de Socket.IO',
          '✅ CORS habilitado para WebSockets',
          '✅ Manejo de conexiones múltiples'
        ]
      },
      {
        version: '1.0.0',
        date: '2024-01-01',
        changes: [
          'Implementación inicial de la API',
          'Endpoint de estado del sistema',
          'Documentación automática'
        ]
      }
    ],
    
    upcomingFeatures: [
      'Autenticación JWT',
      'Rate limiting',
      'Logs detallados',
      'Métricas de rendimiento avanzadas',
      'Webhooks',
      'API versioning',
      'Chat en tiempo real',
      'Notificaciones push',
      'Dashboard de administración',
      'Alertas automáticas'
    ],
    
    realtimeFeatures: {
      automaticUpdates: '✅ Estado cada 5 segundos',
      systemMetrics: '✅ Métricas cada 10 segundos',
      multipleClients: '✅ Soporte para múltiples conexiones',
      connectionStatus: '✅ Monitoreo de conexiones',
      errorHandling: '✅ Manejo de errores en tiempo real',
      corsSupport: '✅ Compatible con aplicaciones web'
    }
  });
});

module.exports = router; 