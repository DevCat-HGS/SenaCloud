# Servicios de SenaCloud

Este directorio contiene todos los servicios utilizados en la aplicación SenaCloud para comunicarse con el backend.

## Estructura

```
Service/
├── API/                      # Servicios relacionados con la API
│   ├── apiRoutes.ts         # Rutas de la API
│   ├── httpService.ts       # Servicio HTTP para peticiones REST
│   ├── socketService.ts     # Servicio para comunicación en tiempo real
│   ├── SocketContext.tsx    # Contexto de React para Socket.IO
│   ├── userService.ts       # Servicio para gestionar usuarios
│   ├── notificationService.ts # Servicio para gestionar notificaciones
│   ├── activityService.ts   # Servicio para gestionar actividades
│   ├── eventService.ts      # Servicio para gestionar eventos
│   ├── guideService.ts      # Servicio para gestionar guías
│   └── index.ts             # Exportaciones de servicios de API
├── Notificaciones/          # Servicios relacionados con notificaciones
│   └── NotificacionesService.ts # Servicio para notificaciones en tiempo real
├── Informes/                # Servicios relacionados con informes (futuro)
└── index.ts                 # Exportaciones de todos los servicios
```

## Servicios disponibles

### Servicio HTTP

El servicio HTTP (`httpService`) proporciona métodos para realizar peticiones REST a la API:

- `get<T>(endpoint, options)`: Realiza una petición GET
- `post<T>(endpoint, options)`: Realiza una petición POST
- `put<T>(endpoint, options)`: Realiza una petición PUT
- `patch<T>(endpoint, options)`: Realiza una petición PATCH
- `delete<T>(endpoint, options)`: Realiza una petición DELETE

### Servicio Socket.IO

El servicio Socket.IO (`socketService`) proporciona métodos para la comunicación en tiempo real:

- `connect()`: Conecta con el servidor Socket.IO
- `disconnect()`: Desconecta del servidor Socket.IO
- `emit(event, data)`: Emite un evento al servidor
- `on(event, callback)`: Escucha un evento del servidor
- `connectToNamespace(namespace)`: Conecta a un namespace específico

### Servicios de entidades

Cada entidad tiene su propio servicio con métodos para realizar operaciones CRUD:

- `userService`: Gestión de usuarios
- `notificationService`: Gestión de notificaciones
- `activityService`: Gestión de actividades
- `eventService`: Gestión de eventos
- `guideService`: Gestión de guías

## Uso

```typescript
// Importar servicios
import { userService, notificationService, socketService } from '../Service';

// Ejemplo de uso del servicio de usuarios
const users = await userService.getAllUsers();

// Ejemplo de uso del servicio de notificaciones
const notifications = await notificationService.getNotificationsByUser('user-id');

// Ejemplo de uso del servicio Socket.IO
socketService.connect();
socketService.on('notification', (data) => {
  console.log('Nueva notificación:', data);
});
```

## Rutas de API

Todas las rutas de la API están definidas en `apiRoutes.ts` y se agrupan por entidad:

- `USER_ROUTES`: Rutas para usuarios
- `NOTIFICATION_ROUTES`: Rutas para notificaciones
- `ACTIVITY_ROUTES`: Rutas para actividades
- `EVENT_ROUTES`: Rutas para eventos
- `GUIDE_ROUTES`: Rutas para guías
- `SOCKET_EVENTS`: Eventos de Socket.IO
- `SOCKET_NAMESPACES`: Namespaces de Socket.IO