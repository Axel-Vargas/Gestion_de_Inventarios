const connection = require('../db/connection');

// Obtener todos los bloques
const getBloques = (req, res) => {
    try {
        const sql = 'SELECT * FROM bloques';
        connection.query(sql, (err, data) => {
            if (err) {
                console.error('Error en la consulta SQL:', err);
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
    const { nombre, num_bloque, id_facu_per } = req.body;
    try {
        const sql = 'INSERT INTO bloques (nombre, num_bloque, id_facu_per) VALUES (?, ?, ?)';
        connection.query(sql, [nombre, num_bloque, id_facu_per], (err, result) => {
            if (err) {
                console.error('Error en la consulta SQL:', err);
                res.status(500).json({ error: 'Error en el servidor' });
            } else {
                res.status(201).json({ id: result.insertId, nombre, num_bloque, id_facu_per });
            }
        });
    } catch (error) {
        console.error('Error en la función createBloque:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

// Actualizar un bloque
const updateBloque = (req, res) => {
    const { id } = req.params;
    const { nombre, num_bloque, id_facu_per } = req.body;
    try {
        const sql = 'UPDATE bloques SET nombre = ?, num_bloque = ?, id_facu_per = ? WHERE id_bloque = ?';
        connection.query(sql, [nombre, num_bloque, id_facu_per, id], (err, result) => {
            if (err) {
                console.error('Error en la consulta SQL:', err);
                res.status(500).json({ error: 'Error en el servidor' });
            } else if (result.affectedRows === 0) {
                res.status(404).json({ error: 'Bloque no encontrado' });
            } else {
                res.json({ id, nombre, num_bloque, id_facu_per });
            }
        });
    } catch (error) {
        console.error('Error en la función updateBloque:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

// Eliminar un bloque
const deleteBloque = (req, res) => {
    const { id } = req.params;
    try {
        const sql = 'DELETE FROM bloques WHERE id_bloque = ?';
        connection.query(sql, [id], (err, result) => {
            if (err) {
                console.error('Error en la consulta SQL:', err);
                res.status(500).json({ error: 'Error en el servidor' });
            } else if (result.affectedRows === 0) {
                res.status(404).json({ error: 'Bloque no encontrado' });
            } else {
                res.status(204).send();
            }
        });
    } catch (error) {
        console.error('Error en la función deleteBloque:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

module.exports = {
    getBloques,
    getBloqueById,
    createBloque,
    updateBloque,
    deleteBloque,
    getBloquesFisei
};
