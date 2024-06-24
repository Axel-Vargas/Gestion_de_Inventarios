const connection = require('../db/connection');

const getTotalBienes = (req, res) => {
    try {
        //CAMBIO DE QUE SEAN DIFERNTES DE BODEGA
        const sql = 'SELECT COUNT(*) AS total FROM bien_tecnologico WHERE ESTADO != "BODEGA" ;';
        connection.query(sql, (err, data) => {
            if (err) {
                console.error('Error en la consulta SQL:', err);
                res.status(500).json({ error: 'Error en el servidor' });
            } else {
                res.json(data[0].total);
            }
        });
    } catch (error) {
        console.error('Error en la función getTotalBienes:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

 //CREAR NUEVO PARA FILTRAR QUE ESTAN EN BODEGA
 const getTotalComponentesLibres = (req, res) => {
    try {
        const sql = `
        SELECT COUNT(*) AS total
        FROM BIEN_TECNOLOGICO BT, COMPONENTES C
        WHERE BT.ID_BIEN = C.ID_BIEN_PER
        AND BT.ESTADO = 'BODEGA'
        AND C.ESTADO != 'BODEGA'
        `;
        connection.query(sql, (err, data) => {
            if (err) {
                console.error('Error en la consulta SQL:', err);
                res.status(500).json({ error: 'Error en el servidor' });
            } else {
                res.json(data[0].total );
            }
        });
    } catch (error) {
        console.error('Error en la función getTotalBienes:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

//cambio de total de mobiliarios
const getTotalBienesMobiliarios = (req, res) => {
    try {
        //CAMBIO DE QUE SEAN DIFERNTES DE BODEGA
        const sql = 'SELECT COUNT(*) AS total FROM bien_mobiliario ;';
        connection.query(sql, (err, data) => {
            if (err) {
                console.error('Error en la consulta SQL:', err);
                res.status(500).json({ error: 'Error en el servidor' });
            } else {
                res.json(data[0].total);
            }
        });
    } catch (error) {
        console.error('Error en la función getTotalBienes:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

//cambio de total de repotencia
const getTotalRepotencias = (req, res) => {
    try {
        //CAMBIO DE QUE SEAN DIFERNTES DE BODEGA
        const sql = 'SELECT COUNT(*) AS total FROM componentes WHERE repotenciado = "si" AND estado= "Funcional";';
        connection.query(sql, (err, data) => {
            if (err) {
                console.error('Error en la consulta SQL:', err);
                res.status(500).json({ error: 'Error en el servidor' });
            } else {
                res.json(data[0].total);
            }
        });
    } catch (error) {
        console.error('Error en la función getTotalBienes:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

//cambio de total de repotencia
const getTotalBienesTecnologicosBodega = (req, res) => {
    try {
        const sql = 'SELECT COUNT(*) AS total FROM bien_tecnologico WHERE  estado = "BODEGA";';
        connection.query(sql, (err, data) => {
            if (err) {
                console.error('Error en la consulta SQL:', err);
                res.status(500).json({ error: 'Error en el servidor' });
            } else {
                res.json(data[0].total);
            }
        });
    } catch (error) {
        console.error('Error en la función getTotalBienes:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};
//cambio de total de repotencia
const getTotalBienesTecnologicosNoFuncional = (req, res) => {
    try {
        const sql = 'SELECT COUNT(*) AS total FROM bien_tecnologico WHERE  estado = "no funcional";';
        connection.query(sql, (err, data) => {
            if (err) {
                console.error('Error en la consulta SQL:', err);
                res.status(500).json({ error: 'Error en el servidor' });
            } else {
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
        const sql = 'SELECT COUNT(*) AS total FROM areas;';
        connection.query(sql, (err, data) => {
            if (err) {
                console.error('Error en la consulta SQL:', err);
                res.status(500).json({ error: 'Error en el servidor' });
            } else {
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
        const sql = 'SELECT COUNT(*) AS total FROM proveedores;';
        connection.query(sql, (err, data) => {
            if (err) {
                console.error('Error en la consulta SQL:', err);
                res.status(500).json({ error: 'Error en el servidor' });
            } else {
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
        const sql = 'SELECT COUNT(*) AS total FROM usuarios;';
        connection.query(sql, (err, data) => {
            if (err) {
                console.error('Error en la consulta SQL:', err);
                res.status(500).json({ error: 'Error en el servidor' });
            } else {
                res.json(data[0].total);
            }
        });
    } catch (error) {
        console.error('Error en la función getTotalUsuarios:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

//cuantos bienes por area
//repotencias por area 

const getBienesPorArea = (req, res) => {
    try {
        const sql = `
        SELECT A.NOMBRE, COUNT(*) AS total_bienes
            FROM BLOQUES B, AREAS A, BIEN_TECNOLOGICO BT
            WHERE B.ID_BLOQUE = A.ID_BLOQUE_PER
            AND A.ID_AREA = BT.ID_AREA_PER
            AND B.ID_FACU_PER = 1
            AND BT.ESTADO != "BODEGA"
            GROUP BY A.NOMBRE
            ORDER BY total_bienes DESC
            LIMIT 5;
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
        console.error('Error en la función getTop5BienesPorArea:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};


const getRepotenciadosPorArea = (req, res) => {
    try {
        const sql = `
        SELECT A.NOMBRE, COUNT(*) AS total_bienes
        FROM BLOQUES B
        JOIN AREAS A ON B.ID_BLOQUE = A.ID_BLOQUE_PER
        JOIN BIEN_TECNOLOGICO BT ON A.ID_AREA = BT.ID_AREA_PER
        JOIN COMPONENTES C ON BT.ID_BIEN = C.id_bien_per
        WHERE C.ESTADO != 'BODEGA'
        AND C.repotenciado = 'SI'
        AND B.ID_FACU_PER = 1
        AND BT.ESTADO != 'BODEGA'
        GROUP BY A.NOMBRE
        ORDER BY total_bienes DESC
        LIMIT 5;
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
        console.error('Error en la función getTop5BienesRepotenciadosPorArea:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};


const getFacultades = (req, res) => {
    const sql = 'SELECT id_facultad, nombre FROM facultad';
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
    const sql = 'SELECT id_bloque, nombre FROM bloques WHERE id_facu_per = ?';
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
    getBienesPorArea,
    getFacultades,
    getBloques,

    //cambios
    getTotalComponentesLibres,
    getTotalBienesMobiliarios,
    getTotalRepotencias,
    getTotalBienesTecnologicosBodega,
    getTotalBienesTecnologicosNoFuncional,
    getRepotenciadosPorArea
};