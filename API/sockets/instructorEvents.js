/**
 * Eventos de Socket.IO para la gestión de instructores
 */

const User = require('../models/User');

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
          .select('_id nombre email especialidad estado estadoInstructor')
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