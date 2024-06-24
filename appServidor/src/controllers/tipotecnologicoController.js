const connection = require('../db/connection');

const getBienesTecnologicos = (req, res) => {
    try {
        const sql = 'SELECT * FROM tipo_tecnologicos';
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

const getBienTecnologicoById = (req, res) => {
    const { id } = req.params;
    try {
        const sql = 'SELECT * FROM tipo_tecnologicos WHERE id = ?';
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

const createBienTecnologico = (req, res) => {
    const { nom_tecnologico, atributos } = req.body;
    try {
        const sql = 'INSERT INTO tipo_tecnologicos (nom_tecnologico, atributos) VALUES (?, ?)';
        connection.query(sql, [nom_tecnologico, JSON.stringify(atributos)], (err, result) => {
            if (err) {
                console.error('Error en la consulta SQL:', err);
                res.status(500).json({ error: 'Error en el servidor' });
            } else {
                res.status(201).json({ id: result.insertId, nom_tecnologico, atributos });
            }
        });
    } catch (error) {
        console.error('Error en la función createBienTecnologico:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};



const updateBienTecnologico = (req, res) => {
    const { id } = req.params;
    const { nom_tecnologico, atributos } = req.body;
    try {
        const sql = 'UPDATE tipo_tecnologicos SET nom_tecnologico = ?, atributos = ? WHERE id = ?';
        connection.query(sql, [nom_tecnologico, JSON.stringify(atributos), id], (err, result) => {
            if (err) {
                console.error('Error en la consulta SQL:', err);
                res.status(500).json({ error: 'Error en el servidor' });
            } else if (result.affectedRows === 0) {
                res.status(404).json({ error: 'Bien tecnológico no encontrado' });
            } else {
                res.json({ id, nom_tecnologico, atributos });
            }
        });
    } catch (error) {
        console.error('Error en la función updateTipoBienTecnologico:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

const deleteBienTecnologico = (req, res) => {
    const { id } = req.params;
    try {
        const sql = 'DELETE FROM tipo_tecnologicos WHERE id = ?';
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
    getBienesTecnologicos,
    createBienTecnologico,
    getBienTecnologicoById,
    updateBienTecnologico,
    deleteBienTecnologico
};
