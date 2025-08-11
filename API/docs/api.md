# API de SenaCloud - Documentación

## Descripción General

La API de SenaCloud es una API RESTful que proporciona servicios para la plataforma SenaCloud. Esta documentación describe cómo usar los endpoints disponibles.

## Información Básica

- **Versión**: 1.0.0
- **Base URL**: `http://localhost:3000` (desarrollo)
- **Formato de respuesta**: JSON
- **Autenticación**: No requerida para endpoints básicos

## Endpoints Disponibles

### 1. Estado de la API

**GET /** - Obtiene el estado actual de la API

### 2. Gestión de Usuarios

#### Obtener todos los usuarios
**GET /api/users**

Retorna una lista de todos los usuarios registrados.

#### Obtener un usuario específico
**GET /api/users/:id**

Retorna la información de un usuario específico por su ID.

#### Crear un nuevo usuario
**POST /api/users**

Crea un nuevo usuario. Requiere los siguientes campos en el cuerpo de la petición:

```json
{
  "nombre": "String (requerido)",
  "tipoDocumento": "String (CC, CE, TI, PASAPORTE)",
  "documento": "String (único, requerido)",
  "correoInstitucional": "String (@sena.edu.co, único)",
  "correoPersonal": "String (único)",
  "etiquetas": ["String"],
  "rol": "String (Instructor, EquipoPedagogico, Coordinacion, Admin)"
}
```

#### Actualizar un usuario
**PUT /api/users/:id**

Actualiza la información de un usuario existente. Acepta los mismos campos que la creación.

#### Actualizar estado de instructor
**PUT /api/users/:id/instructor-status**

Actualiza el estado de un instructor. Solo aplicable para usuarios con rol 'Instructor'. Requiere el siguiente campo en el cuerpo de la petición:

```json
{
  "estadoInstructor": "String (pendiente, aprobado)"
}
```

#### Eliminar un usuario
**DELETE /api/users/:id**

Elimina un usuario específico por su ID.

#### Respuesta

```json
{
  "status": "online",
  "service": "SenaCloud API",
  "version": "1.0.0",
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
  "endpoints": {
    "available": [
      {
        "path": "/",
        "method": "GET",
        "description": "Estado de la API"
      },
      {
        "path": "/doc",
        "method": "GET",
        "description": "Documentación de la API"
      }
    ]
  },
  "contact": {
    "email": "soporte@senacloud.com",
    "website": "https://senacloud.com",
    "documentation": "/doc"
  }
}
```

### 2. Documentación de la API

**GET /doc** - Obtiene la documentación completa de la API

#### Respuesta

Retorna un objeto JSON con toda la documentación de la API, incluyendo:
- Lista de endpoints disponibles
- Ejemplos de uso
- Códigos de error
- Información de contacto
- Changelog

## Códigos de Estado HTTP

| Código | Descripción |
|--------|-------------|
| 200 | OK - Solicitud exitosa |
| 400 | Bad Request - Datos de entrada inválidos |
| 404 | Not Found - Recurso no encontrado |
| 500 | Internal Server Error - Error interno del servidor |

## Ejemplos de Uso

### cURL

```bash
# Obtener estado de la API
curl -X GET http://localhost:3000/

# Obtener documentación
curl -X GET http://localhost:3000/doc
```

### JavaScript (Fetch API)

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

### Python (requests)

```python
import requests

# Obtener estado de la API
response = requests.get('http://localhost:3000/')
data = response.json()
print(data)

# Obtener documentación
response = requests.get('http://localhost:3000/doc')
data = response.json()
print(data)
```

## Información de Contacto

- **Email**: soporte@senacloud.com
- **Website**: https://senacloud.com
- **GitHub**: https://github.com/senacloud/api
- **Documentación**: https://docs.senacloud.com

## Changelog

### v1.0.0 (2024-01-01)
- Implementación inicial de la API
- Endpoint de estado del sistema
- Documentación automática

## Próximas Características

- Autenticación JWT
- Rate limiting
- Logs detallados
- Métricas de rendimiento
- Webhooks
- API versioning

## Instalación y Configuración

### Requisitos

- Node.js 16.0.0 o superior
- npm o yarn

### Instalación

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
# Desarrollo
npm run dev

# Producción
npm start
```

### Variables de Entorno

- `PORT`: Puerto del servidor (por defecto: 3000)
- `NODE_ENV`: Entorno de ejecución (development/production)

## Contribución

Para contribuir al proyecto:

1. Fork el repositorio
2. Crea una rama para tu feature
3. Realiza tus cambios
4. Envía un pull request

## Licencia

Este proyecto está bajo la licencia MIT. Ver el archivo LICENSE para más detalles.