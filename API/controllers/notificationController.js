const Notification = require('../models/Notification');
const io = require('../sockets/io');

// Obtener todas las notificaciones
exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find().populate('destinatario');
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener notificaciones de un usuario
exports.getUserNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ destinatario: req.params.userId })
      .populate('destinatario');
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear una nueva notificación
exports.createNotification = async (req, res) => {
  try {
    const notification = new Notification(req.body);
    await notification.save();
    
    const populatedNotification = await notification.populate('destinatario');
    
    // Emitir evento de notificación creada
    io.of('/notifications').emit('notification-created', populatedNotification);
    
    res.status(201).json(populatedNotification);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Marcar notificación como leída
exports.markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification) {
      return res.status(404).json({ message: 'Notificación no encontrada' });
    }
    
    notification.leida = true;
    notification.fechaLectura = new Date();
    await notification.save();
    
    const populatedNotification = await notification.populate('destinatario');
    
    // Emitir evento de notificación leída
    io.of('/notifications').emit('notification-read', populatedNotification);
    
    res.json(populatedNotification);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Eliminar una notificación
exports.deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification) {
      return res.status(404).json({ message: 'Notificación no encontrada' });
    }
    
    await notification.remove();
    
    // Emitir evento de notificación eliminada
    io.of('/notifications').emit('notification-deleted', req.params.id);
    
    res.json({ message: 'Notificación eliminada' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};