const connection = require('../db/connection');

// Obtener todas las dependencias que no están en estado "BODEGA"
const getDependencias = (req, res) => {
    try {
        const sql = 'SELECT * FROM dependencia ';
        connection.query(sql, (err, data) => {
            if (err) {
                console.error('Error en la consulta SQL:', err);
                res.status(500).json({ error: 'Error en el servidor' });
            } else {
                res.json(data);
            }
        });
    } catch (error) {
        console.error('Error en la función getDependencias:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

// Obtener una dependencia por ID
const getDependenciaById = (req, res) => {
    const { id_dep } = req.params;
    try {
        const sql = 'SELECT * FROM dependencia WHERE id_dep = ?';
        connection.query(sql, [id_dep], (err, data) => {
            if (err) {
                console.error('Error en la consulta SQL:', err);
                res.status(500).json({ error: 'Error en el servidor' });
            } else if (data.length === 0) {
                res.status(404).json({ error: 'Dependencia no encontrada' });
            } else {
                res.json(data[0]);
            }
        });
    } catch (error) {
        console.error('Error en la función getDependenciaById:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

// Crear una nueva dependencia
const createDependencia = (req, res) => {
    const { nombre_dep, descripcion_dep, estado_dep } = req.body;
    try {
        const sql = 'INSERT INTO dependencia (nombre_dep, descripcion_dep, estado_dep) VALUES (?, ?, ?)';
        connection.query(sql, [nombre_dep, descripcion_dep, estado_dep], (err, result) => {
            if (err) {
                console.error('Error en la consulta SQL:', err);
                res.status(500).json({ error: 'Error en el servidor' });
            } else {
                res.status(201).json({ message: 'Dependencia creada exitosamente', id_dep: result.insertId });
            }
        });
    } catch (error) {
        console.error('Error en la función createDependencia:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

// Actualizar una dependencia existente
const updateDependencia = (req, res) => {
    const { id_dep } = req.params;
    const { nombre_dep, descripcion_dep, estado_dep } = req.body;
    try {
        const sql = 'UPDATE dependencia SET nombre_dep = ?, descripcion_dep = ?, estado_dep = ? WHERE id_dep = ?';
        connection.query(sql, [nombre_dep, descripcion_dep, estado_dep, id_dep], (err, result) => {
            if (err) {
                console.error('Error en la consulta SQL:', err);
                res.status(500).json({ error: 'Error en el servidor' });
            } else if (result.affectedRows === 0) {
                res.status(404).json({ error: 'Dependencia no encontrada' });
            } else {
                res.json({ message: 'Dependencia actualizada exitosamente' });
            }
        });
    } catch (error) {
        console.error('Error en la función updateDependencia:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

// Eliminar una dependencia
const deleteDependencia = (req, res) => {
    const { id_dep } = req.params;
    try {
        const sql = 'DELETE FROM dependencia WHERE id_dep = ?';
        connection.query(sql, [id_dep], (err, result) => {
            if (err) {
                console.error('Error en la consulta SQL:', err);
                res.status(500).json({ error: 'Error en el servidor' });
            } else if (result.affectedRows === 0) {
                res.status(404).json({ error: 'Dependencia no encontrada' });
            } else {
                res.json({ message: 'Dependencia eliminada exitosamente' });
            }
        });
    } catch (error) {
        console.error('Error en la función deleteDependencia:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

module.exports = {
    getDependencias,
    getDependenciaById,
    createDependencia,
    updateDependencia,
    deleteDependencia
};
