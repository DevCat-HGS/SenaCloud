const User = require('../models/User');
const mongoose = require('mongoose');

module.exports = function(io, socket) {
  // Obtener todos los instructores
  socket.on('get-instructors', async () => {
    try {
      const instructors = await User.find({ rol: 'Instructor' })
        .select('_id nombre correoInstitucional correoPersonal documento tipoDocumento etiquetas estadoInstructor');
      
      socket.emit('instructors-list', instructors);
    } catch (error) {
      console.error('Error al obtener instructores:', error);
      socket.emit('error', { message: 'Error al obtener instructores' });
    }
  });

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
      io.of('/instructors').emit('user-created', instructor);
      
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
      io.of('/instructors').emit('user-updated', instructor);
      
      // Responder al cliente que hizo la solicitud
      socket.emit('instructor-updated', instructor);
    } catch (error) {
      console.error('Error al actualizar instructor:', error);
      socket.emit('error', { message: error.message || 'Error al actualizar instructor' });
    }
  });
};