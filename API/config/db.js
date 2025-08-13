const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Eliminar opciones deprecadas
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`📦 MongoDB Conectado: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`❌ Error de conexión a MongoDB: ${error.message}`);
    // No terminamos el proceso para permitir que la aplicación funcione sin BD
    throw error;
  }
};

module.exports = connectDB;