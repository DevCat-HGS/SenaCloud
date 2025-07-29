const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: [true, 'El título es requerido']
  },
  mensaje: {
    type: String,
    required: [true, 'El mensaje es requerido']
  },
  tipo: {
    type: String,
    required: [true, 'El tipo es requerido'],
    enum: ['Info', 'Advertencia', 'Error', 'Éxito']
  },
  destinatario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'El destinatario es requerido']
  },
  leida: {
    type: Boolean,
    default: false
  },
  fechaEnvio: {
    type: Date,
    default: Date.now
  },
  fechaLectura: {
    type: Date
  }
});

module.exports = mongoose.model('Notification', notificationSchema);