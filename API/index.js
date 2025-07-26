const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.json({
    status: 'online',
    message: 'API de SenaCloud funcionando correctamente',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

app.get('/doc', (req, res) => {
  res.json({
    title: 'Documentación de la API de SenaCloud',
    description: 'Bienvenido a la documentación de la API de SenaCloud',
    endpoints: [
      {
        path: '/',
        method: 'GET',
        description: 'Obtiene el estado actual de la API'
      },
      {
        path: '/doc',
        method: 'GET',
        description: 'Muestra esta documentación'
      }
    ],
    version: '1.0.0',
    contact: {
      email: 'soporte@senacloud.com'
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});