const connection = require('../db/connection');

// Obtener todos los registros del historial
const getHistorialActividades = (req, res) => {
    try {
        const sql = `
            SELECT * FROM historial_actividades
        `;
        connection.query(sql, (err, data) => {
            if (err) {
                console.error('Error en la consulta SQL:', err);
                res.status(500).json({ error: 'Error en el servidor' });
            } else {
                res.json(data);
            }
        });
    } catch (error) {
        console.error('Error en la función getHistorialActividades:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

// Obtener un registro del historial por su ID
const getHistorialActividadById = (req, res) => {
    const { id } = req.params;
    try {
        const sql = `
            SELECT * FROM historial_actividades WHERE id = ?
        `;
        connection.query(sql, id, (err, data) => {
            if (err) {
                console.error('Error en la consulta SQL:', err);
                res.status(500).json({ error: 'Error en el servidor' });
            } else {
                if (data.length === 0) {
                    res.status(404).json({ error: 'Registro no encontrado' });
                } else {
                    res.json(data[0]);
                }
            }
        });
    } catch (error) {
        console.error('Error en la función getHistorialActividadById:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

// Agregar un nuevo registro al historial
const agregarHistorialActividad = (req, res) => {
    const { tipo_actividad, usuario, detalle } = req.body;
    try {
        const sql = `
            INSERT INTO historial_actividades (tipo_actividad, usuario, detalle) VALUES (?, ?, ?)
        `;
        connection.query(sql, [tipo_actividad, usuario, detalle], (err, result) => {
            if (err) {
                console.error('Error en la consulta SQL:', err);
                res.status(500).json({ error: 'Error en el servidor' });
            } else {
                res.json({ mensaje: 'Registro agregado correctamente', id: result.insertId });
            }
        });
    } catch (error) {
        console.error('Error en la función agregarHistorialActividad:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

// Actualizar un registro del historial por su ID
const actualizarHistorialActividad = (req, res) => {
    const { id } = req.params;
    const { tipo_actividad, usuario, detalle } = req.body;
    try {
        const sql = `
            UPDATE historial_actividades SET tipo_actividad = ?, usuario = ?, detalle = ? WHERE id = ?
        `;
        connection.query(sql, [tipo_actividad, usuario, detalle, id], (err, result) => {
            if (err) {
                console.error('Error en la consulta SQL:', err);
                res.status(500).json({ error: 'Error en el servidor' });
            } else {
                if (result.affectedRows === 0) {
                    res.status(404).json({ error: 'Registro no encontrado' });
                } else {
                    res.json({ mensaje: 'Registro actualizado correctamente' });
                }
            }
        });
    } catch (error) {
        console.error('Error en la función actualizarHistorialActividad:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

// Eliminar un registro del historial por su ID
const eliminarHistorialActividad = (req, res) => {
    const { id } = req.params;
    try {
        const sql = `
            DELETE FROM historial_actividades WHERE id = ?
        `;
        connection.query(sql, id, (err, result) => {
            if (err) {
                console.error('Error en la consulta SQL:', err);
                res.status(500).json({ error: 'Error en el servidor' });
            } else {
                if (result.affectedRows === 0) {
                    res.status(404).json({ error: 'Registro no encontrado' });
                } else {
                    res.json({ mensaje: 'Registro eliminado correctamente' });
                }
            }
        });
    } catch (error) {
        console.error('Error en la función eliminarHistorialActividad:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

module.exports = {
    getHistorialActividades,
    getHistorialActividadById,
    agregarHistorialActividad,
    actualizarHistorialActividad,
    eliminarHistorialActividad
};
