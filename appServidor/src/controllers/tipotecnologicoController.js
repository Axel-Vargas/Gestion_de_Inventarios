const connection = require('../db/connection'); 

const getTipoBienesTecnologicos = (req, res) => {
    try {
        const sql = 'SELECT * FROM tipo_bien_tecnologico';
        connection.query(sql, (err, data) => {
            if (err) {
                console.error('Error en la consulta SQL:', err);
                res.status(500).json({ error: 'Error en el servidor' });
            } else {
                res.json(data);
            }
        });
    } catch (error) {
        console.error('Error en la función getTipoBienesTecnologicos:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

const getTipoBienTecnologicoById = (req, res) => {
    const { id } = req.params;
    try {
        const sql = 'SELECT * FROM tipo_bien_tecnologico WHERE id_tipo = ?';
        connection.query(sql, [id], (err, data) => {
            if (err) {
                console.error('Error en la consulta SQL:', err);
                res.status(500).json({ error: 'Error en el servidor' });
            } else if (data.length === 0) {
                res.status(404).json({ error: 'Bien tecnológico no encontrado' });
            } else {
                res.json(data[0]);
            }
        });
    } catch (error) {
        console.error('Error en la función getTipoBienTecnologicoById:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

const createTipoBienTecnologico = (req, res) => {
    const { nombre, atributos } = req.body;
    try {
        const sql = 'INSERT INTO tipo_bien_tecnologico (nombre, atributos) VALUES (?, ?)';
        connection.query(sql, [nombre, JSON.stringify(atributos)], (err, result) => {
            if (err) {
                console.error('Error en la consulta SQL:', err);
                res.status(500).json({ error: 'Error en el servidor' });
            } else {
                res.status(201).json({ id: result.insertId, nombre, atributos });
            }
        });
    } catch (error) {
        console.error('Error en la función createTipoBienTecnologico:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

const updateTipoBienTecnologico = (req, res) => {
    const { id } = req.params;
    const { nombre, atributos } = req.body;
    try {
        const sql = 'UPDATE tipo_bien_tecnologico SET nombre = ?, atributos = ? WHERE id_tipo = ?';
        connection.query(sql, [nombre, JSON.stringify(atributos), id], (err, result) => {
            if (err) {
                console.error('Error en la consulta SQL:', err);
                res.status(500).json({ error: 'Error en el servidor' });
            } else if (result.affectedRows === 0) {
                res.status(404).json({ error: 'Bien tecnológico no encontrado' });
            } else {
                res.json({ id, nombre, atributos });
            }
        });
    } catch (error) {
        console.error('Error en la función updateTipoBienTecnologico:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

const deleteTipoBienTecnologico = (req, res) => {
    const { id } = req.params;
    try {
        const sql = 'DELETE FROM tipo_bien_tecnologico WHERE id_tipo = ?';
        connection.query(sql, [id], (err, result) => {
            if (err) {
                console.error('Error en la consulta SQL:', err);
                res.status(500).json({ error: 'Error en el servidor' });
            } else if (result.affectedRows === 0) {
                res.status(404).json({ error: 'Bien tecnológico no encontrado' });
            } else {
                res.status(204).send();
            }
        });
    } catch (error) {
        console.error('Error en la función deleteTipoBienTecnologico:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

module.exports = {
    getTipoBienesTecnologicos,
    createTipoBienTecnologico,
    getTipoBienTecnologicoById,
    updateTipoBienTecnologico,
    deleteTipoBienTecnologico
};
