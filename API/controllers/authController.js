const User = require('../models/User');
const jwt = require('jsonwebtoken');
// Eliminamos bcrypt para no encriptar contraseñas

// Iniciar sesión
exports.login = async (req, res) => {
  try {
    const { correo, password } = req.body;

    // Verificar si el correo existe (puede ser institucional o personal)
    const user = await User.findOne({
      $or: [
        { correoInstitucional: correo },
        { correoPersonal: correo }
      ]
    });

    if (!user) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Verificar contraseña en texto plano
    if (password !== user.password) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Generar token JWT
    const token = jwt.sign(
      { id: user._id, rol: user.rol },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Responder con usuario y token
    res.json({
      user: {
        id: user._id,
        nombre: user.nombre,
        correoInstitucional: user.correoInstitucional,
        correoPersonal: user.correoPersonal,
        rol: user.rol,
        etiquetas: user.etiquetas,
        estadoInstructor: user.estadoInstructor
      },
      token
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

// Registrar usuario
exports.register = async (req, res) => {
  try {
    const { nombre, tipoDocumento, documento, correoInstitucional, correoPersonal, password, rol } = req.body;

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({
      $or: [
        { documento },
        { correoInstitucional },
        { correoPersonal }
      ]
    });

    if (existingUser) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    // Validar que el correo institucional tenga el dominio @sena.edu.co
    if (correoInstitucional && !correoInstitucional.endsWith('@sena.edu.co')) {
      return res.status(400).json({ message: 'El correo institucional debe ser @sena.edu.co' });
    }

    // Validar que la contraseña tenga al menos 6 caracteres
    if (password && password.length < 6) {
      return res.status(400).json({ message: 'La contraseña debe tener al menos 6 caracteres' });
    }
    
    // Crear nuevo usuario
    const user = new User({
      nombre,
      tipoDocumento,
      documento,
      correoInstitucional,
      correoPersonal,
      password, // Contraseña en texto plano
      rol,
      etiquetas: req.body.etiquetas || [],
      estadoInstructor: rol === 'Instructor' ? 'pendiente' : undefined
    });
    
    // Manejar el caso cuando estadoInstructor es requerido pero no se proporciona
    if (rol === 'Instructor' && !user.estadoInstructor) {
      user.estadoInstructor = 'pendiente';
    }

    await user.save();

    // Generar token JWT
    const token = jwt.sign(
      { id: user._id, rol: user.rol },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Responder con usuario y token
    res.status(201).json({
      user: {
        id: user._id,
        nombre: user.nombre,
        correoInstitucional: user.correoInstitucional,
        correoPersonal: user.correoPersonal,
        rol: user.rol,
        etiquetas: user.etiquetas,
        estadoInstructor: user.estadoInstructor
      },
      token
    });
  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

// Obtener perfil del usuario autenticado
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error al obtener perfil:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};