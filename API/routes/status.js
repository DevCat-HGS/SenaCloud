const express = require('express');
const router = express.Router();

// Ruta raíz - Estado de la API
router.get('/', (req, res) => {
  const uptime = process.uptime();
  const memoryUsage = process.memoryUsage();
  
  res.json({
    status: 'online',
    service: 'SenaCloud API',
    version: '1.1.0',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
    uptime: {
      seconds: Math.floor(uptime),
      minutes: Math.floor(uptime / 60),
      hours: Math.floor(uptime / 3600),
      days: Math.floor(uptime / 86400)
    },
    system: {
      platform: process.platform,
      nodeVersion: process.version,
      memory: {
        rss: `${Math.round(memoryUsage.rss / 1024 / 1024)} MB`,
        heapTotal: `${Math.round(memoryUsage.heapTotal / 1024 / 1024)} MB`,
        heapUsed: `${Math.round(memoryUsage.heapUsed / 1024 / 1024)} MB`,
        external: `${Math.round(memoryUsage.external / 1024 / 1024)} MB`
      }
    },
    endpoints: {
      available: [
        { path: '/', method: 'GET', description: 'Estado de la API' },
        { path: '/doc', method: 'GET', description: 'Documentación de la API' }
      ]
    },
    realtime: {
      enabled: true,
      technology: 'Socket.IO',
      events: [
        'api-status',
        'api-documentation', 
        'system-metrics'
      ],
      updateInterval: {
        status: '5 segundos',
        metrics: '10 segundos'
      },
      connectionInfo: {
        protocol: 'WebSocket',
        cors: 'Habilitado',
        origins: 'Todas (*)'
      }
    },
    contact: {
      email: 'soporte@senacloud.com',
      website: 'https://senacloud.com',
      documentation: '/doc'
    },
    features: {
      realtime: '✅ Habilitado',
      documentation: '✅ Automática',
      monitoring: '✅ Métricas del sistema',
      cors: '✅ Habilitado',
      errorHandling: '✅ Implementado'
    }
  });
});

module.exports = router; 