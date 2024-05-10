const connection = require('../db/connection');

const getZonas = (req, res) => {
    try {
        const sql = 'SELECT * FROM MAESTRO_ZONA';
        connection.query(sql, (err, data) => {
            if (err) {
                console.error('Error en la consulta SQL:', err);
                res.status(500).json({ error: 'Error en el servidor' });
            } else {
                res.json(data);
            }
        });
    } catch (error) {
        console.error('Error en la función getZonas:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

const createZona = (req, res) => {
    const { ZONA_NOMBRE, IP_ZONA, MASCARA_SUBRED, PASARELA, ESTADO } = req.body;
    try {
        const sql = 'INSERT INTO MAESTRO_ZONA (ZONA_NOMBRE, IP_ZONA, MASCARA_SUBRED, PASARELA, ESTADO) VALUES (?, ?, ?, ?, ?)';
        connection.query(sql, [ZONA_NOMBRE, IP_ZONA, MASCARA_SUBRED, PASARELA, ESTADO], (err, data) => {
            if (err) {
                console.error('Error en la consulta SQL:', err);
                res.status(500).json({ error: 'Error en el servidor' });
            } else {
                res.status(201).json({ message: 'Zona creada exitosamente' });
            }
        });
    } catch (error) {
        console.error('Error en la función createZona:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

const getZonaById = (req, res) => {
    const { id } = req.params;
    try {
        const sql = 'SELECT * FROM MAESTRO_ZONA WHERE ID_ZONA = ?';
        connection.query(sql, [id], (err, data) => {
            if (err) {
                console.error('Error en la consulta SQL:', err);
                res.status(500).json({ error: 'Error en el servidor' });
            } else {
                if (data.length === 0) {
                    res.status(404).json({ error: 'Zona no encontrada' });
                } else {
                    res.json(data[0]);
                }
            }
        });
    } catch (error) {
        console.error('Error en la función getZonaById:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

const updateZona = (req, res) => {
    const { id } = req.params;
    const { ZONA_NOMBRE, IP_ZONA, MASCARA_SUBRED, PASARELA, ESTADO } = req.body;
    try {
        const sql = 'UPDATE MAESTRO_ZONA SET ZONA_NOMBRE = ?, IP_ZONA = ?, MASCARA_SUBRED = ?, PASARELA = ?, ESTADO = ? WHERE ID_ZONA = ?';
        connection.query(sql, [ZONA_NOMBRE, IP_ZONA, MASCARA_SUBRED, PASARELA, ESTADO, id], (err, data) => {
            if (err) {
                console.error('Error en la consulta SQL:', err);
                res.status(500).json({ error: 'Error en el servidor' });
            } else {
                res.json({ message: 'Zona actualizada exitosamente' });
            }
        });
    } catch (error) {
        console.error('Error en la función updateZona:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

const deleteZona = (req, res) => {
    const { id } = req.params;
    try {
        const sql = 'DELETE FROM MAESTRO_ZONA WHERE ID_ZONA = ?';
        connection.query(sql, [id], (err, data) => {
            if (err) {
                console.error('Error en la consulta SQL:', err);
                res.status(500).json({ error: 'Error en el servidor' });
            } else {
                if (data.affectedRows === 0) {
                    res.status(404).json({ error: 'Zona no encontrada' });
                } else {
                    res.json({ message: 'Zona eliminada exitosamente' });
                }
            }
        });
    } catch (error) {
        console.error('Error en la función deleteZona:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

module.exports = {
    getZonas,
    createZona,
    getZonaById,
    updateZona,
    deleteZona
};