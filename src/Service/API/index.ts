/**
 * Índice de servicios de API
 * Este archivo exporta todos los servicios de API para facilitar su importación
 */

// Exportar rutas de API
export * from './apiRoutes';

// Exportar servicio HTTP
export * from './httpService';

// Exportar servicios de entidades
export * from './userService';
export * from './notificationService';
export * from './activityService';
export * from './eventService';
export * from './guideService';

// Re-exportar servicio de Socket.IO
export * from './socketService';
export * from './SocketContext';