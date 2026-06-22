const db = require('../db');

class MascotaService {
  /**
   * Obtiene un usuario por su ID.
   * @param {number} usuarioId 
   * @returns {Promise<object|null>}
   */
  async obtenerUsuarioPorId(usuarioId) {
    const res = await db.query('SELECT * FROM usuarios WHERE id = $1', [usuarioId]);
    return res.rows[0] || null;
  }

  /**
   * Obtiene la mascota asociada a un usuario.
   * @param {number} usuarioId 
   * @returns {Promise<object|null>}
   */
  async obtenerMascotaPorUsuario(usuarioId) {
    const res = await db.query('SELECT * FROM mascotas WHERE usuario_id = $1', [usuarioId]);
    return res.rows[0] || null;
  }

  /**
   * Crea una nueva mascota asociada a un usuario.
   * @param {number} usuarioId 
   * @param {string} nombreMascota 
   * @param {string} tipoMascota 
   * @returns {Promise<object>} Detalle de la mascota creada
   */
  async crearMascota(usuarioId, nombreMascota, tipoMascota) {
    const res = await db.query(
      'INSERT INTO mascotas (usuario_id, nombre_mascota, tipo_mascota, nivel, salud) VALUES ($1, $2, $3, 1, 100) RETURNING id',
      [usuarioId, nombreMascota, tipoMascota]
    );
    
    return {
      id: res.rows[0].id,
      usuario_id: usuarioId,
      nombre_mascota: nombreMascota,
      tipo_mascota: tipoMascota,
      nivel: 1,
      salud: 100
    };
  }

  /**
   * Elimina la mascota asociada a un usuario.
   * @param {number} usuarioId 
   * @returns {Promise<number>} Número de filas eliminadas
   */
  async eliminarMascota(usuarioId) {
    const res = await db.query('DELETE FROM mascotas WHERE usuario_id = $1', [usuarioId]);
    return res.rowCount;
  }
}

module.exports = new MascotaService();
