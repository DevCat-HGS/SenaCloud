const User = require('../models/User');
const Notification = require('../models/Notification');
const Activity = require('../models/Activity');
const Event = require('../models/Event');

module.exports = function(io) {
  // Namespace para usuarios
  const userNamespace = io.of('/users');
  userNamespace.on('connection', (socket) => {
    console.log('Cliente conectado a namespace de usuarios');

    // Escuchar cambios en usuarios
    socket.on('user-created', async (userData) => {
      const users = await User.find();
      userNamespace.emit('users-updated', users);
    });

    socket.on('user-updated', async (userData) => {
      const users = await User.find();
      userNamespace.emit('users-updated', users);
    });

    socket.on('user-deleted', async (userId) => {
      const users = await User.find();
      userNamespace.emit('users-updated', users);
    });
  });

  // Namespace para notificaciones
  const notificationNamespace = io.of('/notifications');
  notificationNamespace.on('connection', (socket) => {
    console.log('Cliente conectado a namespace de notificaciones');

    // Escuchar cambios en notificaciones
    socket.on('notification-created', async (notificationData) => {
      const notifications = await Notification.find().populate('destinatario');
      notificationNamespace.emit('notifications-updated', notifications);
    });

    socket.on('notification-read', async (notificationId) => {
      const notifications = await Notification.find().populate('destinatario');
      notificationNamespace.emit('notifications-updated', notifications);
    });

    socket.on('notification-deleted', async (notificationId) => {
      const notifications = await Notification.find().populate('destinatario');
      notificationNamespace.emit('notifications-updated', notifications);
    });
  });

  // Namespace para actividades
  const activityNamespace = io.of('/activities');
  activityNamespace.on('connection', (socket) => {
    console.log('Cliente conectado a namespace de actividades');

    // Escuchar cambios en actividades
    socket.on('activity-created', async (activityData) => {
      const activities = await Activity.find()
        .populate('responsable')
        .populate('participantes');
      activityNamespace.emit('activities-updated', activities);
    });

    socket.on('activity-updated', async (activityData) => {
      const activities = await Activity.find()
        .populate('responsable')
        .populate('participantes');
      activityNamespace.emit('activities-updated', activities);
    });

    socket.on('activity-deleted', async (activityId) => {
      const activities = await Activity.find()
        .populate('responsable')
        .populate('participantes');
      activityNamespace.emit('activities-updated', activities);
    });
  });

  // Namespace para eventos
  const eventNamespace = io.of('/events');
  eventNamespace.on('connection', (socket) => {
    console.log('Cliente conectado a namespace de eventos');

    // Escuchar cambios en eventos
    socket.on('event-created', async (eventData) => {
      const events = await Event.find()
        .populate('organizador')
        .populate('participantes.usuario');
      eventNamespace.emit('events-updated', events);
    });

    socket.on('event-updated', async (eventData) => {
      const events = await Event.find()
        .populate('organizador')
        .populate('participantes.usuario');
      eventNamespace.emit('events-updated', events);
    });

    socket.on('event-deleted', async (eventId) => {
      const events = await Event.find()
        .populate('organizador')
        .populate('participantes.usuario');
      eventNamespace.emit('events-updated', events);
    });

    socket.on('participant-status-updated', async (data) => {
      const events = await Event.find()
        .populate('organizador')
        .populate('participantes.usuario');
      eventNamespace.emit('events-updated', events);
    });
  });
};