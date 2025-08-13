/**
 * Rutas de la API de SenaCloud
 * Este archivo contiene todas las rutas de la API utilizadas en el frontend
 */

// URL base de la API
export const API_URL = 'http://localhost:3001';

// Rutas de estado y documentación
export const STATUS_ROUTES = {
  STATUS: '/',
  DOCUMENTATION: '/doc'
};

// Rutas de autenticación
export const AUTH_ROUTES = {
  LOGIN: '/api/auth/login',
  REGISTER: '/api/auth/register',
  PROFILE: '/api/auth/profile'
};

// Rutas de usuarios
export const USER_ROUTES = {
  GET_ALL: '/api/users',
  GET_BY_ID: (id: string) => `/api/users/${id}`,
  CREATE: '/api/users',
  UPDATE: (id: string) => `/api/users/${id}`,
  DELETE: (id: string) => `/api/users/${id}`,
  UPDATE_INSTRUCTOR_STATUS: (id: string) => `/api/users/${id}/instructor-status`,
  UPDATE_TAGS: (id: string) => `/api/users/${id}/etiquetas`
};

// Rutas de notificaciones
export const NOTIFICATION_ROUTES = {
  GET_ALL: '/api/notifications',
  GET_BY_USER: (userId: string) => `/api/notifications/user/${userId}`,
  CREATE: '/api/notifications',
  MARK_AS_READ: (id: string) => `/api/notifications/${id}`,
  DELETE: (id: string) => `/api/notifications/${id}`
};

// Rutas de actividades
export const ACTIVITY_ROUTES = {
  GET_ALL: '/api/activities',
  GET_BY_ID: (id: string) => `/api/activities/${id}`,
  CREATE: '/api/activities',
  UPDATE: (id: string) => `/api/activities/${id}`,
  DELETE: (id: string) => `/api/activities/${id}`
};

// Rutas de eventos
export const EVENT_ROUTES = {
  GET_ALL: '/api/events',
  GET_BY_ID: (id: string) => `/api/events/${id}`,
  CREATE: '/api/events',
  UPDATE: (id: string) => `/api/events/${id}`,
  DELETE: (id: string) => `/api/events/${id}`,
  UPDATE_PARTICIPANT: (eventId: string, userId: string) => `/api/events/${eventId}/participant/${userId}`
};

// Rutas de guías
export const GUIDE_ROUTES = {
  GET_ALL: '/api/guides',
  GET_BY_ID: (id: string) => `/api/guides/${id}`,
  CREATE: '/api/guides',
  UPDATE: (id: string) => `/api/guides/${id}`,
  UPDATE_STATUS: (id: string) => `/api/guides/${id}/status`,
  DELETE: (id: string) => `/api/guides/${id}`
};

// Eventos de Socket.IO
export const SOCKET_EVENTS = {
  // Eventos del servidor al cliente
  SERVER_TO_CLIENT: {
    API_STATUS: 'api-status',
    API_DOCUMENTATION: 'api-documentation',
    SYSTEM_METRICS: 'system-metrics',
    NOTIFICATIONS_UPDATED: 'notifications-updated',
    INSTRUCTOR_STATUS_UPDATED: 'instructor-status-updated'
  },
  // Eventos del cliente al servidor
  CLIENT_TO_SERVER: {
    REQUEST_STATUS: 'request-status',
    REQUEST_DOCUMENTATION: 'request-documentation',
    REQUEST_METRICS: 'request-metrics',
    NOTIFICATION_READ: 'notification-read',
    NOTIFICATION_CREATED: 'notification-created',
    UPDATE_INSTRUCTOR_STATUS: 'update-instructor-status'
  }
};

// Namespaces de Socket.IO
export const SOCKET_NAMESPACES = {
  NOTIFICATIONS: '/notifications',
  INSTRUCTORS: '/instructors'
};