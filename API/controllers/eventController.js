const Event = require('../models/Event');
const io = require('../sockets/io');

// Obtener todos los eventos
exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find()
      .populate('organizador')
      .populate('participantes.usuario');
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener un evento específico
exports.getEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate('organizador')
      .populate('participantes.usuario');
    if (!event) {
      return res.status(404).json({ message: 'Evento no encontrado' });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear un nuevo evento
exports.createEvent = async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    
    const populatedEvent = await event
      .populate('organizador')
      .populate('participantes.usuario');
    
    // Emitir evento de evento creado
    io.of('/events').emit('event-created', populatedEvent);
    
    res.status(201).json(populatedEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Actualizar un evento
exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Evento no encontrado' });
    }
    
    Object.assign(event, req.body);
    await event.save();
    
    const populatedEvent = await event
      .populate('organizador')
      .populate('participantes.usuario');
    
    // Emitir evento de evento actualizado
    io.of('/events').emit('event-updated', populatedEvent);
    
    res.json(populatedEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Actualizar estado de participante
exports.updateParticipantStatus = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Evento no encontrado' });
    }
    
    const participante = event.participantes.find(
      p => p.usuario.toString() === req.params.userId
    );
    
    if (!participante) {
      return res.status(404).json({ message: 'Participante no encontrado en el evento' });
    }
    
    participante.confirmacion = req.body.confirmacion;
    await event.save();
    
    const populatedEvent = await event
      .populate('organizador')
      .populate('participantes.usuario');
    
    // Emitir evento de estado de participante actualizado
    io.of('/events').emit('participant-status-updated', {
      eventId: event._id,
      userId: req.params.userId,
      status: req.body.confirmacion
    });
    
    res.json(populatedEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Eliminar un evento
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Evento no encontrado' });
    }
    
    await event.remove();
    
    // Emitir evento de evento eliminado
    io.of('/events').emit('event-deleted', req.params.id);
    
    res.json({ message: 'Evento eliminado' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};