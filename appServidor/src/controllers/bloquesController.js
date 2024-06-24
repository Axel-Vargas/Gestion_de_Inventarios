const connection = require('../db/connection');

// Obtener todos los bloques
const getBloques = (req, res) => {
    try {
        const sql = `
        SELECT bloques.*, facultad.nombre AS nombre_facultad
        FROM bloques
        INNER JOIN facultad ON bloques.id_facu_per = facultad.id_facultad
      `;
        connection.query(sql, (err, data) => {
            if (err) {
                res.status(500).json({ error: 'Error en el servidor' });
            } else {
                res.json(data);
            }
        });
    } catch (error) {
        console.error('Error en la función getBloques:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

const getBloquesFacultad = (req, res) => {
    try {
        const facultadNombre = req.params.nombre || req.body.nombre;  
        const sql = `
        SELECT bloques.*, facultad.nombre AS nombre_facultad
        FROM bloques
        INNER JOIN facultad ON bloques.id_facu_per = facultad.id_facultad
        WHERE facultad.nombre = ?
        `;
        connection.query(sql, [facultadNombre], (err, data) => {
            if (err) {
                res.status(500).json({ error: 'Error en el servidor' });
            } else {
                res.json(data);
            }
        });
    } catch (error) {
        console.error('Error en la función getBloquesFacultad:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};


const getBloquesFisei = (req, res) => {
    const { id_facu_per } = req.params;
    try {
        const sql = 'SELECT * FROM bloques WHERE id_facu_per = ?';
        connection.query(sql, [id_facu_per], (err, data) => {
            if (err) {
                console.error('Error en la consulta SQL:', err);
                res.status(500).json({ error: 'Error en el servidor' });
            } else {
                res.json(data);
            }
        });
    } catch (error) {
        console.error('Error en la función getBloquesFisei:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

// Obtener un bloque por ID
const getBloqueById = (req, res) => {
    const { id } = req.params;
    try {
        const sql = 'SELECT * FROM bloques WHERE id_bloque = ?';
        connection.query(sql, [id], (err, data) => {
            if (err) {
                console.error('Error en la consulta SQL:', err);
                res.status(500).json({ error: 'Error en el servidor' });
            } else if (data.length === 0) {
                res.status(404).json({ error: 'Bloque no encontrado' });
            } else {
                res.json(data[0]);
            }
        });
    } catch (error) {
        console.error('Error en la función getBloqueById:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

// Crear un nuevo bloque
const createBloque = (req, res) => {
    const { nombre, id_facu_per } = req.body;
    try {
        const sql = 'INSERT INTO bloques (nombre, id_facu_per) VALUES (?, ?)';
        connection.query(sql, [nombre, id_facu_per], (err, result) => {
            if (err) {
                console.error('Error en la consulta SQL:', err);
                res.status(500).json({ error: 'Error en el servidor' });
            } else {
                res.status(201).json({ id: result.insertId, nombre, id_facu_per });
            }
        });
    } catch (error) {
        console.error('Error en la función create Bloque:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

// Actualizar un bloque
const updateBloque = (req, res) => {
    const { id } = req.params;
    const { nombre, id_facu_per } = req.body;
    try {
        const sql = 'UPDATE bloques SET nombre = ?, id_facu_per = ? WHERE id_bloque = ?';
        connection.query(sql, [nombre, id_facu_per, id], (err, result) => {
            if (err) {
                console.error('Error en la consulta SQL:', err);
                res.status(500).json({ error: 'Error en el servidor' });
            } else if (result.affectedRows === 0) {
                res.status(404).json({ error: 'Bloque no encontrado' });
            } else {
                res.json({ id, nombre, id_facu_per });
            }
        });
    } catch (error) {
        console.error('Error en la función updateBloque:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

// Eliminar un bloque
const deleteBloque = (req, res) => {
    try {
        const bloqueId = req.params.id;

        // Consulta para actualizar los campos id_area_per a NULL en bien_mobiliario y bien_tecnologico
        const updateBienMobiliarioQuery = 'UPDATE bien_mobiliario SET id_area_per = NULL WHERE id_area_per IN (SELECT id_area FROM areas WHERE id_bloque_per = ?)';
        const updateBienTecnologicoQuery = 'UPDATE bien_tecnologico SET id_area_per = NULL WHERE id_area_per IN (SELECT id_area FROM areas WHERE id_bloque_per = ?)';

        connection.query(updateBienMobiliarioQuery, [bloqueId], (error, results) => {
            if (error) {
                return res.status(500).json({ mensaje: 'Error interno del servidor al actualizar bien_mobiliario' });
            }

            connection.query(updateBienTecnologicoQuery, [bloqueId], (error, results) => {
                if (error) {
                    return res.status(500).json({ mensaje: 'Error interno del servidor al actualizar bien_tecnologico' });
                }

                // Consulta para eliminar las áreas relacionadas con el bloque
                const updateAreasQuery = 'DELETE FROM areas WHERE id_bloque_per = ?';

                connection.query(updateAreasQuery, [bloqueId], (error, results) => {
                    if (error) {
                        return res.status(500).json({ mensaje: 'Error interno del servidor al eliminar el bloque de las áreas' });
                    }

                    // Consulta para eliminar el bloque
                    const deleteBloqueQuery = 'DELETE FROM bloques WHERE id_bloque = ?';

                    connection.query(deleteBloqueQuery, [bloqueId], (error, results) => {
                        if (error) {
                            return res.status(500).json({ mensaje: 'Error interno del servidor al eliminar el bloque' });
                        }

                        if (results.affectedRows === 0) {
                            return res.status(404).json({ mensaje: 'Bloque no encontrado' });
                        }

                        res.status(200).json({ mensaje: 'Bloque eliminado exitosamente' });
                    });
                });
            });
        });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error interno del servidor' });
}
};

module.exports = {
    getBloques,
    getBloqueById,
    createBloque,
    updateBloque,
    deleteBloque,
    getBloquesFisei,
    getBloquesFacultad
};