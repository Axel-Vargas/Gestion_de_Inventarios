const connection = require('../db/connection');

const getTotalBienes = (req, res) => {
    try {
        console.log('Ejecutando getTotalBienes');
        const sql = 'SELECT COUNT(*) AS total FROM bien_tecnologico;';
        connection.query(sql, (err, data) => {
            if (err) {
                console.error('Error en la consulta SQL:', err);
                res.status(500).json({ error: 'Error en el servidor' });
            } else {
                console.log('Resultado de la consulta:', data);
                res.json(data[0].total);
            }
        });
    } catch (error) {
        console.error('Error en la función getTotalBienes:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

const getTotalAreas = (req, res) => {
    try {
        console.log('Ejecutando getTotalAreas');
        const sql = 'SELECT COUNT(*) AS total FROM areas;';
        connection.query(sql, (err, data) => {
            if (err) {
                console.error('Error en la consulta SQL:', err);
                res.status(500).json({ error: 'Error en el servidor' });
            } else {
                console.log('Resultado de la consulta:', data);
                res.json(data[0].total);
            }
        });
    } catch (error) {
        console.error('Error en la función getTotalAreas:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

const getTotalProveedores = (req, res) => {
    try {
        console.log('Ejecutando getTotalProveedores');
        const sql = 'SELECT COUNT(*) AS total FROM proveedores;';
        connection.query(sql, (err, data) => {
            if (err) {
                console.error('Error en la consulta SQL:', err);
                res.status(500).json({ error: 'Error en el servidor' });
            } else {
                console.log('Resultado de la consulta:', data);
                res.json(data[0].total);
            }
        });
    } catch (error) {
        console.error('Error en la función getTotalProveedores:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

const getTotalUsuarios = (req, res) => {
    try {
        console.log('Ejecutando getTotalUsuarios');
        const sql = 'SELECT COUNT(*) AS total FROM usuarios;';
        connection.query(sql, (err, data) => {
            if (err) {
                console.error('Error en la consulta SQL:', err);
                res.status(500).json({ error: 'Error en el servidor' });
            } else {
                console.log('Resultado de la consulta:', data);
                res.json(data[0].total);
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
