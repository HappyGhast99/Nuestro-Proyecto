const db = require('../db');

class MascotaService {
  /**
   * Obtiene un usuario por su ID.
   * @param {number} usuarioId 
   * @returns {object|undefined}
   */
  obtenerUsuarioPorId(usuarioId) {
    return db.prepare('SELECT * FROM usuarios WHERE id = ?').get(usuarioId);
  }

  /**
   * Obtiene la mascota asociada a un usuario.
   * @param {number} usuarioId 
   * @returns {object|undefined}
   */
  obtenerMascotaPorUsuario(usuarioId) {
    return db.prepare('SELECT * FROM mascotas WHERE usuario_id = ?').get(usuarioId);
  }

  /**
   * Crea una nueva mascota asociada a un usuario.
   * @param {number} usuarioId 
   * @param {string} nombreMascota 
   * @param {string} tipoMascota 
   * @returns {object} Detalle de la mascota creada
   */
  crearMascota(usuarioId, nombreMascota, tipoMascota) {
    const info = db.prepare(
      'INSERT INTO mascotas (usuario_id, nombre_mascota, tipo_mascota, nivel, salud) VALUES (?, ?, ?, 1, 100)'
    ).run(usuarioId, nombreMascota, tipoMascota);
    
    return {
      id: info.lastInsertRowid,
      usuario_id: usuarioId,
      nombre_mascota: nombreMascota,
      tipo_mascota: tipoMascota,
      nivel: 1,
      salud: 100
    };
  }
}

module.exports = new MascotaService();
