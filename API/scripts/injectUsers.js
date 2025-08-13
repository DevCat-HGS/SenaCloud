/**
 * Script para inyectar usuarios por roles en la base de datos
 * Este script crea usuarios con diferentes roles para pruebas
 */

const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB conectado'))
.catch(err => {
  console.error('Error conectando a MongoDB:', err);
  process.exit(1);
});

// Usuarios de prueba por roles
const usersToCreate = [
  // SuperAdmin
  {
    nombre: 'Super Administrador',
    tipoDocumento: 'CC',
    documento: '1000000001',
    correoInstitucional: 'superadmin@sena.edu.co',
    correoPersonal: 'superadmin@gmail.com',
    password: 'superadmin123',
    etiquetas: ['Desarrollo', 'Administración', 'Sistemas'],
    rol: 'SuperAdmin'
  },
  // Admin
  {
    nombre: 'Administrador',
    tipoDocumento: 'CC',
    documento: '1000000002',
    correoInstitucional: 'admin@sena.edu.co',
    correoPersonal: 'admin@gmail.com',
    password: 'admin123',
    etiquetas: ['Desarrollo', 'Administración'],
    rol: 'Admin'
  },
  // Coordinación
  {
    nombre: 'Coordinador',
    tipoDocumento: 'CC',
    documento: '1000000003',
    correoInstitucional: 'coordinador@sena.edu.co',
    correoPersonal: 'coordinador@gmail.com',
    password: 'coordinador123',
    etiquetas: ['Coordinación', 'Gestión'],
    rol: 'Coordinacion'
  },
  // Equipo Pedagógico
  {
    nombre: 'Pedagogo',
    tipoDocumento: 'CC',
    documento: '1000000004',
    correoInstitucional: 'pedagogo@sena.edu.co',
    correoPersonal: 'pedagogo@gmail.com',
    password: 'pedagogo123',
    etiquetas: ['Pedagogía', 'Formación'],
    rol: 'EquipoPedagogico'
  },
  // Instructor Aprobado
  {
    nombre: 'Instructor Aprobado',
    tipoDocumento: 'CC',
    documento: '1000000005',
    correoInstitucional: 'instructor.aprobado@sena.edu.co',
    correoPersonal: 'instructor.aprobado@gmail.com',
    password: 'instructor123',
    etiquetas: ['Programación', 'Desarrollo Web'],
    rol: 'Instructor',
    estadoInstructor: 'aprobado'
  },
  // Instructor Pendiente
  {
    nombre: 'Instructor Pendiente',
    tipoDocumento: 'CC',
    documento: '1000000006',
    correoInstitucional: 'instructor.pendiente@sena.edu.co',
    correoPersonal: 'instructor.pendiente@gmail.com',
    password: 'instructor123',
    etiquetas: ['Diseño', 'UX/UI'],
    rol: 'Instructor',
    estadoInstructor: 'pendiente'
  }
];

// Función para crear usuarios
async function createUsers() {
  try {
    // Eliminar usuarios existentes con los mismos documentos o correos
    const documentos = usersToCreate.map(user => user.documento);
    const correosInstitucionales = usersToCreate.map(user => user.correoInstitucional);
    const correosPersonales = usersToCreate.map(user => user.correoPersonal);
    
    await User.deleteMany({
      $or: [
        { documento: { $in: documentos } },
        { correoInstitucional: { $in: correosInstitucionales } },
        { correoPersonal: { $in: correosPersonales } }
      ]
    });
    
    console.log('Usuarios existentes eliminados');
    
    // Crear nuevos usuarios
    for (const userData of usersToCreate) {
      const user = new User(userData);
      await user.save();
      console.log(`Usuario creado: ${userData.nombre} (${userData.rol})`);
    }
    
    console.log('Todos los usuarios han sido creados exitosamente');
    mongoose.disconnect();
  } catch (error) {
    console.error('Error creando usuarios:', error);
    mongoose.disconnect();
    process.exit(1);
  }
}

// Ejecutar la función
createUsers();