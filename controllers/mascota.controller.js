const mascotaService = require('../services/mascota.service');

class MascotaController {
  /**
   * Obtiene la mascota asociada al usuario.
   */
  obtenerMascota(req, res) {
    try {
      const usuarioId = parseInt(req.params.usuarioId, 10);
      if (isNaN(usuarioId)) {
        return res.status(400).json({ error: 'El ID de usuario debe ser un número entero válido' });
      }

      // Validar si el usuario existe
      const usuario = mascotaService.obtenerUsuarioPorId(usuarioId);
      if (!usuario) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      const mascota = mascotaService.obtenerMascotaPorUsuario(usuarioId);
      if (!mascota) {
        return res.status(404).json({ 
          hasPet: false, 
          mensaje: 'El usuario no tiene una mascota asignada actualmente.' 
        });
      }

      res.status(200).json({ 
        hasPet: true, 
        mascota 
      });
    } catch (error) {
      console.error('Error al obtener la mascota:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  /**
   * Registra una nueva mascota para el usuario.
   */
  registrarMascota(req, res) {
    try {
      const usuarioId = parseInt(req.params.usuarioId, 10);
      if (isNaN(usuarioId)) {
        return res.status(400).json({ error: 'El ID de usuario debe ser un número entero válido' });
      }

      const { nombre_mascota, tipo_mascota } = req.body;

      // Validar si el usuario existe
      const usuario = mascotaService.obtenerUsuarioPorId(usuarioId);
      if (!usuario) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      // Validaciones de datos
      if (!nombre_mascota || typeof nombre_mascota !== 'string' || nombre_mascota.trim() === '') {
        return res.status(400).json({ error: 'El nombre de la mascota no puede estar vacío' });
      }

      const tiposValidos = ['Perro', 'Gato', 'Hámster'];
      if (!tipo_mascota || !tiposValidos.includes(tipo_mascota)) {
        return res.status(400).json({ error: 'El tipo de mascota debe ser uno de los siguientes: Perro, Gato, Hámster' });
      }

      // Validar si el usuario ya tiene mascota
      const mascotaExistente = mascotaService.obtenerMascotaPorUsuario(usuarioId);
      if (mascotaExistente) {
        return res.status(400).json({ error: 'El usuario ya tiene una mascota asignada' });
      }

      // Crear la mascota
      const nuevaMascota = mascotaService.crearMascota(
        usuarioId,
        nombre_mascota.trim(),
        tipo_mascota
      );

      res.status(201).json(nuevaMascota);
    } catch (error) {
      console.error('Error al registrar la mascota:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  /**
   * Elimina la mascota asociada al usuario.
   */
  eliminarMascota(req, res) {
    try {
      const usuarioId = parseInt(req.params.usuarioId, 10);
      if (isNaN(usuarioId)) {
        return res.status(400).json({ error: 'El ID de usuario debe ser un número entero válido' });
      }

      // Validar si el usuario existe
      const usuario = mascotaService.obtenerUsuarioPorId(usuarioId);
      if (!usuario) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      // Validar si el usuario tiene una mascota
      const mascota = mascotaService.obtenerMascotaPorUsuario(usuarioId);
      if (!mascota) {
        return res.status(404).json({ error: 'El usuario no tiene una mascota asignada' });
      }

      // Eliminar la mascota
      mascotaService.eliminarMascota(usuarioId);

      res.status(200).json({ mensaje: 'Mascota eliminada exitosamente' });
    } catch (error) {
      console.error('Error al eliminar la mascota:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
}

module.exports = new MascotaController();
