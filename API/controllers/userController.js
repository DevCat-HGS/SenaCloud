const User = require('../models/User');
const io = require('../sockets/io');

// Obtener todos los usuarios
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener un usuario específico
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear un nuevo usuario
exports.createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    
    // Emitir evento de usuario creado
    io.of('/users').emit('user-created', user);
    
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Actualizar un usuario
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    
    Object.assign(user, req.body);
    await user.save();
    
    // Emitir evento de usuario actualizado
    io.of('/users').emit('user-updated', user);
    
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Actualizar estado de instructor
exports.updateInstructorStatus = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    
    if (user.rol !== 'Instructor') {
      return res.status(400).json({ message: 'El usuario no es un instructor' });
    }
    
    if (!['pendiente', 'aprobado'].includes(req.body.estadoInstructor)) {
      return res.status(400).json({ message: 'Estado inválido. Debe ser "pendiente" o "aprobado"' });
    }
    
    user.estadoInstructor = req.body.estadoInstructor;
    await user.save();
    
    // Emitir evento de usuario actualizado
    io.of('/users').emit('user-updated', user);
    
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Eliminar un usuario
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    
    await user.remove();
    
    // Emitir evento de usuario eliminado
    io.of('/users').emit('user-deleted', req.params.id);
    
    res.json({ message: 'Usuario eliminado' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};