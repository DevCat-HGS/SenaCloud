const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
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
    enum: ['Reunión', 'Capacitación', 'Conferencia', 'Taller', 'Otro']
  },
  modalidad: {
    type: String,
    required: [true, 'La modalidad es requerida'],
    enum: ['Presencial', 'Virtual', 'Híbrido']
  },
  ubicacion: {
    presencial: {
      lugar: String,
      direccion: String,
      ciudad: String
    },
    virtual: {
      plataforma: String,
      link: String,
      instrucciones: String
    }
  },
  fecha: {
    type: Date,
    required: [true, 'La fecha es requerida']
  },
  horaInicio: {
    type: String,
    required: [true, 'La hora de inicio es requerida']
  },
  horaFin: {
    type: String,
    required: [true, 'La hora de fin es requerida']
  },
  organizador: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'El organizador es requerido']
  },
  participantes: [{
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    confirmacion: {
      type: String,
      enum: ['Pendiente', 'Confirmado', 'Rechazado'],
      default: 'Pendiente'
    },
    fechaConfirmacion: Date
  }],
  cupoMaximo: {
    type: Number
  },
  etiquetas: [{
    type: String
  }],
  documentos: [{
    nombre: String,
    url: String,
    tipo: String
  }],
  recordatorios: [{
    tipo: String,
    tiempo: Number, // minutos antes del evento
    enviado: {
      type: Boolean,
      default: false
    }
  }],
  estado: {
    type: String,
    enum: ['Programado', 'En Curso', 'Finalizado', 'Cancelado'],
    default: 'Programado'
  },
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
eventSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Event', eventSchema);