# Scripts de Utilidad para SenaCloud

## Script de Inyección de Usuarios

Este directorio contiene scripts útiles para la administración y pruebas de SenaCloud.

### injectUsers.js

Este script permite crear usuarios de prueba con diferentes roles en la base de datos.

#### Usuarios creados:

1. **SuperAdmin**
   - Correo: superadmin@sena.edu.co
   - Contraseña: superadmin123
   - Acceso total al sistema

2. **Admin**
   - Correo: admin@sena.edu.co
   - Contraseña: admin123
   - Acceso a funciones administrativas

3. **Coordinador**
   - Correo: coordinador@sena.edu.co
   - Contraseña: coordinador123
   - Acceso a funciones de coordinación

4. **Equipo Pedagógico**
   - Correo: pedagogo@sena.edu.co
   - Contraseña: pedagogo123
   - Acceso a funciones pedagógicas

5. **Instructor Aprobado**
   - Correo: instructor.aprobado@sena.edu.co
   - Contraseña: instructor123
   - Acceso a funciones de instructor

6. **Instructor Pendiente**
   - Correo: instructor.pendiente@sena.edu.co
   - Contraseña: instructor123
   - Acceso limitado hasta aprobación

#### Cómo ejecutar el script:

```bash
cd /Users/devharol/SenaCloud/API
node scripts/injectUsers.js
```

## Nuevas Funcionalidades

### Rol SuperAdmin

Se ha agregado el rol de SuperAdmin con acceso completo al sistema. Este rol tiene las siguientes características:

- Acceso a todas las funcionalidades del sistema
- Capacidad para gestionar todos los tipos de usuarios, incluyendo otros administradores
- Ruta exclusiva en `/SuperAdmin`

### Modificaciones en la aplicación

1. Se agregó el rol `SuperAdmin` al modelo de Usuario
2. Se creó una nueva ruta protegida para SuperAdmin en `App.tsx`
3. Se modificó el componente de login para redirigir a los SuperAdmin a su dashboard

### Próximos pasos recomendados

1. Crear componentes específicos para la gestión de SuperAdmin
2. Implementar funcionalidades exclusivas para SuperAdmin
3. Mejorar la seguridad para este rol de alto privilegio