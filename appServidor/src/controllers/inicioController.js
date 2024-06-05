const connection = require('../db/connection');

const getTotalBienes = (req, res) => {
    try {
        const sql = 'SELECT COUNT(*) FROM bien_tecnologico;';
        connection.query(sql, (err, data) => {
            if (err) {
                console.error('Error en la consulta SQL:', err);
                res.status(500).json({ error: 'Error en el servidor' });
            } else {
                res.json(data);
            }
        });
    } catch (error) {
        console.error('Error en la función getTotalBienes:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

const getTotalAreas = (req, res) => {
    try {
        const sql = 'SELECT COUNT(*) FROM areas';
        connection.query(sql, (err, data) => {
            if (err) {
                console.error('Error en la consulta SQL:', err);
                res.status(500).json({ error: 'Error en el servidor' });
            } else {
                res.json(data);
            }
        });
    } catch (error) {
        console.error('Error en la función getTotalAreas:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

const getTotalProveedores = (req, res) => {
    try {
        const sql = 'SELECT COUNT(*) FROM proveedores';
        connection.query(sql, (err, data) => {
            if (err) {
                console.error('Error en la consulta SQL:', err);
                res.status(500).json({ error: 'Error en el servidor' });
            } else {
                res.json(data);
            }
        });
    } catch (error) {
        console.error('Error en la función getTotalProveedores:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

const getTotalUsuarios = (req, res) => {
    try {
        const sql = 'SELECT COUNT(*) FROM usuarios';
        connection.query(sql, (err, data) => {
            if (err) {
                console.error('Error en la consulta SQL:', err);
                res.status(500).json({ error: 'Error en el servidor' });
            } else {
                res.json(data);
            }
        });
    } catch (error) {
        console.error('Error en la función getTotalUsuarios:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

module.exports = {
    getTotalBienes, 
    getTotalAreas, 
    getTotalProveedores, 
    getTotalUsuarios
};