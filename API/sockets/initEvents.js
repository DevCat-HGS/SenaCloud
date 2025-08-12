/**
 * Inicializa todos los eventos de Socket.IO
 * Este archivo centraliza la configuración de todos los eventos de Socket.IO
 */

const eventHandlers = require('./eventHandlers');
const instructorEvents = require('./instructorEvents');

/**
 * Inicializa todos los eventos de Socket.IO
 * @param {Object} io - Instancia de Socket.IO
 */
module.exports = function(io) {
  // Inicializar manejadores de eventos generales
  eventHandlers(io);
  
  // Inicializar eventos específicos de instructores
  instructorEvents(io);
  
  // Eventos globales del sistema
  io.on('connection', (socket) => {
    console.log('Cliente conectado al servidor Socket.IO');
    
    // Evento de desconexión
    socket.on('disconnect', () => {
      console.log('Cliente desconectado del servidor Socket.IO');
    });
    
    // Evento para solicitar estado del API
    socket.on('request-status', () => {
      socket.emit('api-status', { status: 'online', timestamp: new Date() });
    });
  });
  
  console.log('Eventos de Socket.IO inicializados correctamente');
};