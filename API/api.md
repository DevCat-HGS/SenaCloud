# Documentación de la API

## Módulos

### Gestión de Usuarios

#### GET /api/users
Obtiene todos los usuarios registrados.

#### GET /api/users/:id
Obtiene un usuario específico por su ID.

#### POST /api/users
Crea un nuevo usuario. Requiere los siguientes campos:
- nombre: Nombre del usuario
- tipoDocumento: Tipo de documento (CC, CE, etc.)
- documento: Número de documento
- correoInstitucional: Correo institucional
- correoPersonal: Correo personal
- etiquetas: Array de etiquetas
- rol: Rol del usuario (Instructor, Equipo Pedagógico, Coordinación, Admin)

#### PUT /api/users/:id
Actualiza la información de un usuario específico.

#### PUT /api/users/:id/instructor-status
Actualiza el estado de un instructor. Solo aplicable para usuarios con rol 'Instructor'. Requiere el siguiente campo:
- estadoInstructor: Estado del instructor (pendiente, aprobado)

#### DELETE /api/users/:id
Elimina un usuario específico.

### Gestión de Notificaciones

#### GET /api/notifications
Obtiene todas las notificaciones.

#### GET /api/notifications/user/:userId
Obtiene todas las notificaciones de un usuario específico.

#### POST /api/notifications
Crea una nueva notificación. Requiere los siguientes campos:
- titulo: Título de la notificación
- mensaje: Contenido de la notificación
- tipo: Tipo de notificación
- destinatario: ID del usuario destinatario

#### PUT /api/notifications/:id
Marca una notificación como leída.

#### DELETE /api/notifications/:id
Elimina una notificación específica.

### Gestión de Actividades

#### GET /api/activities
Obtiene todas las actividades.

#### GET /api/activities/:id
Obtiene una actividad específica por su ID.

#### POST /api/activities
Crea una nueva actividad. Requiere los siguientes campos:
- titulo: Título de la actividad
- descripcion: Descripción detallada
- tipo: Tipo de actividad
- estado: Estado actual
- fechaInicio: Fecha de inicio
- fechaFin: Fecha de finalización
- responsable: ID del usuario responsable
- participantes: Array de IDs de usuarios participantes
- etiquetas: Array de etiquetas
- archivosAdjuntos: Array de URLs de archivos

#### PUT /api/activities/:id
Actualiza la información de una actividad específica.

#### DELETE /api/activities/:id
Elimina una actividad específica.

### Gestión de Eventos

#### GET /api/events
Obtiene todos los eventos.

#### GET /api/events/:id
Obtiene un evento específico por su ID.

#### POST /api/events
Crea un nuevo evento. Requiere los siguientes campos:
- titulo: Título del evento
- descripcion: Descripción detallada
- tipo: Tipo de evento
- modalidad: Presencial o Virtual
- ubicacion: Objeto con detalles de ubicación
- fecha: Fecha del evento
- horaInicio: Hora de inicio
- horaFin: Hora de finalización
- organizador: ID del usuario organizador
- participantes: Array de participantes
- cupoMaximo: Número máximo de participantes
- etiquetas: Array de etiquetas
- documentos: Array de URLs de documentos
- recordatorios: Array de configuraciones de recordatorios

#### PUT /api/events/:id
Actualiza la información de un evento específico.

#### PUT /api/events/:id/participant/:userId
Actualiza el estado de confirmación de un participante en el evento.

#### DELETE /api/events/:id
Elimina un evento específico.