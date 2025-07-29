const mongoose = require('mongoose');

const guideSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: [true, 'El título es requerido'],
    trim: true
  },
  descripcion: {
    type: String,
    required: [true, 'La descripción es requerida']
  },
  contenido: {
    type: String,
    required: [true, 'El contenido es requerido']
  },
  autor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'El autor es requerido']
  },
  categoria: {
    type: String,
    required: [true, 'La categoría es requerida'],
    enum: ['Técnica', 'Pedagógica', 'Administrativa', 'General']
  },
  etiquetas: [{
    type: String,
    trim: true
  }],
  archivosAdjuntos: [{
    nombre: String,
    url: String,
    tipo: String
  }],
  estado: {
    type: String,
    enum: ['Borrador', 'Publicada', 'Archivada'],
    default: 'Borrador'
  },
  versionActual: {
    type: String,
    default: '1.0.0'
  },
  historialVersiones: [{
    version: String,
    fecha: Date,
    cambios: String,
    autor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
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

// Middleware para actualizar updatedAt antes de guardar
guideSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model('Guide', guideSchema);