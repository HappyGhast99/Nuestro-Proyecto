const express = require('express');
const router = express.Router();
const mascotaController = require('../controllers/mascota.controller');

/**
 * @swagger
 * /api/usuarios/{usuarioId}/mascota:
 *   get:
 *     summary: Obtiene la mascota asociada a un usuario
 *     parameters:
 *       - in: path
 *         name: usuarioId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detalle de la mascota
 *       404:
 *         description: Usuario no encontrado o usuario no tiene mascota
 *       500:
 *         description: Error de servidor
 */
router.get('/usuarios/:usuarioId/mascota', mascotaController.obtenerMascota);

/**
 * @swagger
 * /api/usuarios/{usuarioId}/mascota:
 *   post:
 *     summary: Crea y asocia una nueva mascota virtual a un usuario
 *     parameters:
 *       - in: path
 *         name: usuarioId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre_mascota
 *               - tipo_mascota
 *             properties:
 *               nombre_mascota:
 *                 type: string
 *               tipo_mascota:
 *                 type: string
 *                 enum: [Perro, Gato, Hámster]
 *     responses:
 *       201:
 *         description: Mascota creada exitosamente
 *       400:
 *         description: Datos inválidos o el usuario ya posee mascota
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error de servidor
 */
router.post('/usuarios/:usuarioId/mascota', mascotaController.registrarMascota);

/**
 * @swagger
 * /api/usuarios/{usuarioId}/mascota:
 *   delete:
 *     summary: Elimina la mascota asociada a un usuario
 *     parameters:
 *       - in: path
 *         name: usuarioId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Mascota eliminada exitosamente
 *       404:
 *         description: Usuario no encontrado o usuario no tiene mascota
 *       500:
 *         description: Error de servidor
 */
router.delete('/usuarios/:usuarioId/mascota', mascotaController.eliminarMascota);

module.exports = router;
