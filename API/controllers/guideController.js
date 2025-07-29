const Guide = require('../models/Guide');
const io = require('../sockets/io');

// Obtener todas las guías
exports.getGuides = async (req, res) => {
  try {
    const guides = await Guide.find()
      .populate('autor')
      .populate('historialVersiones.autor');
    res.json(guides);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener una guía específica
exports.getGuide = async (req, res) => {
  try {
    const guide = await Guide.findById(req.params.id)
      .populate('autor')
      .populate('historialVersiones.autor');
    if (!guide) {
      return res.status(404).json({ message: 'Guía no encontrada' });
    }
    res.json(guide);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear una nueva guía
exports.createGuide = async (req, res) => {
  try {
    const guide = new Guide(req.body);
    await guide.save();
    
    const populatedGuide = await guide
      .populate('autor')
      .populate('historialVersiones.autor');
    
    // Emitir evento de guía creada
    io.of('/guides').emit('guide-created', populatedGuide);
    
    res.status(201).json(populatedGuide);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Actualizar una guía
exports.updateGuide = async (req, res) => {
  try {
    const guide = await Guide.findById(req.params.id);
    if (!guide) {
      return res.status(404).json({ message: 'Guía no encontrada' });
    }
    
    // Si hay cambios en el contenido, agregar al historial de versiones
    if (req.body.contenido && req.body.contenido !== guide.contenido) {
      const nuevaVersion = incrementarVersion(guide.versionActual);
      guide.historialVersiones.push({
        version: nuevaVersion,
        fecha: new Date(),
        cambios: req.body.cambios || 'Actualización de contenido',
        autor: req.body.autor
      });
      guide.versionActual = nuevaVersion;
    }
    
    Object.assign(guide, req.body);
    await guide.save();
    
    const populatedGuide = await guide
      .populate('autor')
      .populate('historialVersiones.autor');
    
    // Emitir evento de guía actualizada
    io.of('/guides').emit('guide-updated', populatedGuide);
    
    res.json(populatedGuide);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Cambiar estado de una guía
exports.changeGuideStatus = async (req, res) => {
  try {
    const guide = await Guide.findById(req.params.id);
    if (!guide) {
      return res.status(404).json({ message: 'Guía no encontrada' });
    }
    
    guide.estado = req.body.estado;
    await guide.save();
    
    const populatedGuide = await guide
      .populate('autor')
      .populate('historialVersiones.autor');
    
    // Emitir evento de estado de guía actualizado
    io.of('/guides').emit('guide-status-updated', {
      guideId: guide._id,
      status: req.body.estado
    });
    
    res.json(populatedGuide);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Eliminar una guía
exports.deleteGuide = async (req, res) => {
  try {
    const guide = await Guide.findById(req.params.id);
    if (!guide) {
      return res.status(404).json({ message: 'Guía no encontrada' });
    }
    
    await guide.remove();
    
    // Emitir evento de guía eliminada
    io.of('/guides').emit('guide-deleted', req.params.id);
    
    res.json({ message: 'Guía eliminada' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Función auxiliar para incrementar la versión
function incrementarVersion(version) {
  const partes = version.split('.');
  partes[2] = (parseInt(partes[2]) + 1).toString();
  return partes.join('.');
}