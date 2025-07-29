const express = require('express');
const router = express.Router();
const {
  getEvents,
  getEvent,
  createEvent,
  updateEvent,
  updateParticipantStatus,
  deleteEvent
} = require('../controllers/eventController');

// Rutas de eventos
router.route('/')
  .get(getEvents)
  .post(createEvent);

router.route('/:id')
  .get(getEvent)
  .put(updateEvent)
  .delete(deleteEvent);

// Ruta para actualizar estado de participante
router.route('/:id/participant/:userId')
  .put(updateParticipantStatus);

module.exports = router;