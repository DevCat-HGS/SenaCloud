const express = require('express');
const router = express.Router();
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

module.exports = router;