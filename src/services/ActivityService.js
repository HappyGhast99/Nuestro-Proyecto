const db = require('../../db');

class ActivityService {
  async getAllActivities() {
    const res = await db.query('SELECT * FROM cursos ORDER BY id ASC');
    return res.rows;
  }

  async getActivityById(id) {
    const res = await db.query('SELECT * FROM cursos WHERE id = $1', [id]);
    return res.rows[0] || null;
  }

  async createActivity(nombre, instructor, creditos, difficulty) {
    const finalDifficulty = difficulty || 'Medium';
    const res = await db.query(
      'INSERT INTO cursos (nombre, instructor, creditos, difficulty) VALUES ($1, $2, $3, $4) RETURNING id',
      [nombre, instructor, creditos, finalDifficulty]
    );
    return { id: res.rows[0].id, nombre, instructor, creditos, difficulty: finalDifficulty };
  }

  async updateActivity(id, nombre, instructor, creditos) {
    const res = await db.query(
      'UPDATE cursos SET nombre=$1, instructor=$2, creditos=$3 WHERE id=$4',
      [nombre, instructor, creditos, id]
    );
    return res.rowCount;
  }

  async deleteActivity(id) {
    const res = await db.query('DELETE FROM cursos WHERE id=$1', [id]);
    return res.rowCount;
  }
}

module.exports = new ActivityService();