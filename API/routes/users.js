const express = require('express');
const router = express.Router();
const User = require('../models/User');
const io = require('../sockets/io');
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  updateInstructorStatus
} = require('../controllers/userController');

// Rutas de usuarios
router.route('/')
  .get(getUsers)
  .post(createUser);

router.route('/:id')
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);

// Ruta para actualizar estado de instructor
router.route('/:id/instructor-status')
  .put(updateInstructorStatus);

// Ruta para actualizar etiquetas de usuario
router.route('/:id/etiquetas')
  .put(async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      
      // Actualizar etiquetas
      user.etiquetas = req.body.etiquetas;
      await user.save();
      
      // Emitir evento de usuario actualizado
      io.of('/users').emit('user-updated', user);
      
      res.json(user);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

module.exports = router;