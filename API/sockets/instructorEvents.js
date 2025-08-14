/**
 * Eventos de Socket.IO para la gestión de instructores
 */

const User = require('../models/User');
const mongoose = require('mongoose');

module.exports = function(io) {
  // Namespace específico para eventos relacionados con instructores
  const instructorNamespace = io.of('/instructors');
  
  // Middleware para autenticación (ejemplo)
  instructorNamespace.use((socket, next) => {
    // Aquí se podría implementar autenticación
    // const token = socket.handshake.auth.token;
    // Verificar token...
    next();
  });

  instructorNamespace.on('connection', (socket) => {
    console.log(`Nuevo cliente conectado al namespace de instructores: ${socket.id}`);
    
    // Obtener un instructor específico
    socket.on('get-instructor', async ({ id }) => {
      try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
          return socket.emit('error', { message: 'ID de instructor inválido' });
        }

        const instructor = await User.findOne({ _id: id, rol: 'Instructor' });
        
        if (!instructor) {
          return socket.emit('error', { message: 'Instructor no encontrado' });
        }
        
        socket.emit('instructor-data', instructor);
      } catch (error) {
        console.error('Error al obtener instructor:', error);
        socket.emit('error', { message: 'Error al obtener instructor' });
      }
    });

    // Crear un nuevo instructor
    socket.on('create-instructor', async (instructorData) => {
      try {
        // Validar datos
        if (!instructorData.nombre || !instructorData.correoInstitucional) {
          return socket.emit('error', { message: 'Datos incompletos' });
        }
        
        // Validar correo institucional
        if (!instructorData.correoInstitucional.endsWith('@sena.edu.co')) {
          return socket.emit('error', { message: 'El correo institucional debe terminar en @sena.edu.co' });
        }
        
        // Crear instructor
        const instructor = new User({
          ...instructorData,
          rol: 'Instructor',
          estadoInstructor: 'pendiente'
        });
        
        await instructor.save();
        
        // Emitir evento a todos los clientes conectados al namespace
        instructorNamespace.emit('user-created', instructor);
        
        // Responder al cliente que hizo la solicitud
        socket.emit('instructor-created', instructor);
      } catch (error) {
        console.error('Error al crear instructor:', error);
        socket.emit('error', { message: error.message || 'Error al crear instructor' });
      }
    });

    // Actualizar un instructor
    socket.on('update-instructor', async ({ id, ...instructorData }) => {
      try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
          return socket.emit('error', { message: 'ID de instructor inválido' });
        }
        
        // Validar correo institucional
        if (instructorData.correoInstitucional && !instructorData.correoInstitucional.endsWith('@sena.edu.co')) {
          return socket.emit('error', { message: 'El correo institucional debe terminar en @sena.edu.co' });
        }
        
        const instructor = await User.findById(id);
        
        if (!instructor) {
          return socket.emit('error', { message: 'Instructor no encontrado' });
        }
        
        if (instructor.rol !== 'Instructor') {
          return socket.emit('error', { message: 'El usuario no es un instructor' });
        }
        
        // Actualizar campos
        Object.assign(instructor, instructorData);
        await instructor.save();
        
        // Emitir evento a todos los clientes conectados al namespace
        instructorNamespace.emit('user-updated', instructor);
        
        // Responder al cliente que hizo la solicitud
        socket.emit('instructor-updated', instructor);
      } catch (error) {
        console.error('Error al actualizar instructor:', error);
        socket.emit('error', { message: error.message || 'Error al actualizar instructor' });
      }
    });
    
    // Eliminar un instructor
    socket.on('delete-instructor', async ({ id }) => {
      try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
          return socket.emit('error', { message: 'ID de instructor inválido' });
        }
        
        const instructor = await User.findById(id);
        
        if (!instructor) {
          return socket.emit('error', { message: 'Instructor no encontrado' });
        }
        
        if (instructor.rol !== 'Instructor') {
          return socket.emit('error', { message: 'El usuario no es un instructor' });
        }
        
        // Eliminar instructor
        await User.findByIdAndDelete(id);
        
        // Emitir evento a todos los clientes conectados al namespace
        instructorNamespace.emit('user-deleted', { id });
        
        // Responder al cliente que hizo la solicitud
        socket.emit('instructor-deleted', { id });
      } catch (error) {
        console.error('Error al eliminar instructor:', error);
        socket.emit('error', { message: error.message || 'Error al eliminar instructor' });
      }
    });
    
    // Evento para actualizar el estado de un instructor
    socket.on('update-instructor-status', async (data) => {
      try {
        const { instructorId, status } = data;
        
        if (!instructorId || !status) {
          return socket.emit('error', { message: 'Datos incompletos' });
        }
        
        if (status !== 'pendiente' && status !== 'aprobado') {
          return socket.emit('error', { message: 'Estado no válido' });
        }
        
        // Actualizar en la base de datos
        const updatedUser = await User.findByIdAndUpdate(
          instructorId,
          { estadoInstructor: status },
          { new: true }
        );
        
        if (!updatedUser) {
          return socket.emit('error', { message: 'Instructor no encontrado' });
        }
        
        // Emitir evento a todos los clientes conectados
        instructorNamespace.emit('instructor-status-updated', {
          instructorId,
          status,
          timestamp: new Date().toISOString()
        });
        
        // Emitir evento al namespace general para notificaciones
        io.of('/notifications').emit('notifications-updated', [
          {
            id: Date.now().toString(),
            tipo: 'info',
            mensaje: `El estado del instructor ${updatedUser.nombre} ha sido actualizado a ${status}`,
            fecha: new Date().toISOString(),
            leida: false,
            destinatario: {
              id: 'admin-123', // ID del administrador o coordinador
              nombre: 'Administrador'
            }
          }
        ]);
        
        // Confirmar al emisor
        socket.emit('status-update-success', {
          message: 'Estado actualizado correctamente',
          instructor: {
            id: updatedUser._id,
            nombre: updatedUser.nombre,
            email: updatedUser.email,
            estadoInstructor: updatedUser.estadoInstructor
          }
        });
        
      } catch (error) {
        console.error('Error al actualizar estado de instructor:', error);
        socket.emit('error', { message: 'Error interno del servidor' });
      }
    });
    
    // Evento para solicitar la lista de instructores
    socket.on('get-instructors', async () => {
      try {
        const instructors = await User.find({ rol: 'Instructor' })
          .select('_id nombre correoInstitucional correoPersonal documento tipoDocumento etiquetas estadoInstructor')
          .lean();
        
        socket.emit('instructors-list', instructors);
      } catch (error) {
        console.error('Error al obtener instructores:', error);
        socket.emit('error', { message: 'Error al obtener instructores' });
      }
    });
    
    socket.on('disconnect', () => {
      console.log(`Cliente desconectado del namespace de instructores: ${socket.id}`);
    });
  });
  
  return instructorNamespace;
};