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

const getBienesPorBloque = (req, res) => {
    const idFacultad = req.query.idFacultad;
    const idBloque = req.query.idBloque;
    
    if (!idFacultad || !idBloque) {
        return res.status(400).json({ error: 'Falta idFacultad o idBloque' });
    }

    const sql = `
        SELECT 
            b.nombre AS tipo_bien, COUNT(*) AS total 
        FROM 
            bien_tecnologico bt
        JOIN
            areas a ON bt.id_area_per = a.id_area
        JOIN
            bloques b ON a.id_bloque_per = b.id_bloque
        WHERE 
            b.id_facultad_per = ? AND a.id_bloque_per = ?
        GROUP BY 
            tipo_bien
        UNION
        SELECT 
            'bien_mobiliario' AS tipo_bien, COUNT(*) AS total 
        FROM 
            bien_mobiliario bm
        JOIN
            areas a ON bm.id_area_per = a.id_area
        JOIN
            bloques b ON a.id_bloque_per = b.id_bloque
        WHERE 
            b.id_facultad_per = ? AND a.id_bloque_per = ?
        GROUP BY 
            tipo_bien;
    `;

    connection.query(sql, [idFacultad, idBloque, idFacultad, idBloque], (err, data) => {
        if (err) {
            console.error('Error en la consulta SQL:', err);
            res.status(500).json({ error: 'Error en el servidor' });
        } else {
            res.json(data);
        }
    });
};

const getFacultades = (req, res) => {
    const sql = 'SELECT id_facultad, nombre FROM facultades';
    connection.query(sql, (err, data) => {
        if (err) {
            console.error('Error en la consulta SQL:', err);
            res.status(500).json({ error: 'Error en el servidor' });
        } else {
            res.json(data);
        }
    });
};

const getBloques = (req, res) => {
    const idFacultad = req.query.idFacultad;
    const sql = 'SELECT id_bloque, nombre FROM bloques WHERE id_facultad_per = ?';
    connection.query(sql, [idFacultad], (err, data) => {
        if (err) {
            console.error('Error en la consulta SQL:', err);
            res.status(500).json({ error: 'Error en el servidor' });
        } else {
            res.json(data);
        }
    });
};


module.exports = {
    getTotalBienes, 
    getTotalAreas, 
    getTotalProveedores, 
    getTotalUsuarios,
    getBienesPorBloque,
    getFacultades,
    getBloques
};
