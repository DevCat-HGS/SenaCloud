const express = require('express');
const router = express.Router();
const {
  getNotifications,
  getUserNotifications,
  createNotification,
  markAsRead,
  deleteNotification
} = require('../controllers/notificationController');

// Rutas de notificaciones
router.route('/')
  .get(getNotifications)
  .post(createNotification);

router.route('/user/:userId')
  .get(getUserNotifications);

router.route('/:id')
  .put(markAsRead)
  .delete(deleteNotification);

module.exports = router;