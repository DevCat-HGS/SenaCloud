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
  password: {
    type: String,
    required: [true, 'La contraseña es requerida'],
    minlength: [6, 'La contraseña debe tener al menos 6 caracteres']
  },
  etiquetas: [{
    type: String,
    // Ya no se categorizan las etiquetas por nivel académico, profesión o especialidad
    // Ahora son etiquetas generales que el usuario puede agregar libremente
  }],
  rol: {
    type: String,
    required: [true, 'El rol es requerido'],
    enum: ['Instructor', 'EquipoPedagogico', 'Coordinacion', 'Admin']
  },
  estadoInstructor: {
    type: String,
    enum: ['pendiente', 'aprobado'],
    default: 'pendiente',
    required: function() { return this.rol === 'Instructor'; }
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