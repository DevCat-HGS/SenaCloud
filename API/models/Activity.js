const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: [true, 'El título es requerido']
  },
  descripcion: {
    type: String,
    required: [true, 'La descripción es requerida']
  },
  tipo: {
    type: String,
    required: [true, 'El tipo es requerido'],
    enum: ['Tarea', 'Proyecto', 'Evaluación', 'Práctica']
  },
  estado: {
    type: String,
    required: [true, 'El estado es requerido'],
    enum: ['Pendiente', 'En Progreso', 'Completada', 'Cancelada'],
    default: 'Pendiente'
  },
  fechaInicio: {
    type: Date,
    required: [true, 'La fecha de inicio es requerida']
  },
  fechaFin: {
    type: Date,
    required: [true, 'La fecha de fin es requerida']
  },
  responsable: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'El responsable es requerido']
  },
  participantes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  etiquetas: [{
    type: String
  }],
  archivosAdjuntos: [{
    nombre: String,
    url: String,
    tipo: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Middleware para actualizar updatedAt
activitySchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Activity', activitySchema);