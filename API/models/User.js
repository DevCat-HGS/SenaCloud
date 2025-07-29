const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es requerido']
  },
  tipoDocumento: {
    type: String,
    required: [true, 'El tipo de documento es requerido'],
    enum: ['CC', 'CE', 'TI', 'PASAPORTE']
  },
  documento: {
    type: String,
    required: [true, 'El número de documento es requerido'],
    unique: true
  },
  correoInstitucional: {
    type: String,
    required: [true, 'El correo institucional es requerido'],
    unique: true,
    match: [/^[\w-\.]+@sena\.edu\.co$/, 'El correo debe ser institucional (@sena.edu.co)']
  },
  correoPersonal: {
    type: String,
    required: [true, 'El correo personal es requerido'],
    unique: true,
    match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Formato de correo inválido']
  },
  etiquetas: [{
    type: String
  }],
  rol: {
    type: String,
    required: [true, 'El rol es requerido'],
    enum: ['Instructor', 'EquipoPedagogico', 'Coordinacion', 'Admin']
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

// Middleware para actualizar updatedAt antes de cada actualización
userSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('User', userSchema);