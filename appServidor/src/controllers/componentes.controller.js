const connection = require('../db/connection');

const getComponentes = (req, res) => {
    try {
        const sql = 'SELECT * FROM Componentes WHERE estado != "BODEGA"';
        connection.query(sql, (err, data) => {
            if (err) {
                console.error('Error en la consulta SQL:', err);
                res.status(500).json({ error: 'Error en el servidor' });
            } else {
                res.json(data);
            }
        });
    } catch (error) {
        console.error('Error en la función getComponentes:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

const getComponentesLibres = (req, res) => {
    try {
        const sql = `
                SELECT C.*
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
                res.json(data);
            }
        });
    } catch (error) {
        console.error('Error en la función getComponentes:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

const createComponente = (req, res) => {
    const { nombre, marca, modelo, num_serie,estado,repotenciado, codigoUTA, id_bien_per, id_proveedor_per,id_dependencia_per } = req.body;
    try {
        const sql = 'INSERT INTO Componentes (nombre, marca, modelo, num_serie,estado,repotenciado, codigoUTA, id_bien_per, id_proveedor_per, id_dependencia_per) VALUES (?, ?, ?, ?, ?, ?, ?, ?,?,?)';
        connection.query(sql, [nombre, marca, modelo, num_serie,estado,repotenciado, codigoUTA, id_bien_per, id_proveedor_per, id_dependencia_per], (err, data) => {
            if (err) {
                console.error('Error en la consulta SQL:', err);
                res.status(500).json({ error: 'Error en el servidor' });
            } else {
                res.json({ message: 'Componente creado exitosamente', id: data.insertId });
            }
        });
    } catch (error) {
        console.error('Error en la función createComponente:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

const getComponenteById = (req, res) => {
    const { id } = req.params;
    try {
        const sql = 'SELECT * FROM Componentes WHERE id_componente = ?';
        connection.query(sql, [id], (err, data) => {
            if (err) {
                console.error('Error en la consulta SQL:', err);
                res.status(500).json({ error: 'Error en el servidor' });
            } else {
                if (data.length === 0) {
                    res.status(404).json({ error: 'Componente no encontrado' });
                } else {
                    res.json(data[0]);
                }
            }
        });
    } catch (error) {
        console.error('Error en la función getComponenteById:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

const updateComponente = (req, res) => {
    const { id } = req.params;
    const { nombre, marca, modelo, num_serie,estado,repotenciado, codigoUTA, id_bien_per, id_proveedor_per, id_dependencia_per } = req.body;
    try {
        const sql = 'UPDATE Componentes SET nombre = ?, marca = ?, modelo = ?, num_serie = ?,estado=?,repotenciado=?, codigoUTA = ?, id_bien_per = ?, id_proveedor_per = ?, id_dependencia_per = ? WHERE id_componente = ?';
        connection.query(sql, [nombre, marca, modelo, num_serie,estado,repotenciado, codigoUTA, id_bien_per, id_proveedor_per,id_dependencia_per, id], (err, data) => {
            if (err) {
                console.error('Error en la consulta SQL:', err);
                res.status(500).json({ error: 'Error en el servidor' });
            } else {
                res.json({ message: 'Componente actualizado exitosamente' });
            }
        });
    } catch (error) {
        console.error('Error en la función updateComponente:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

const deleteComponente = (req, res) => {
    const { id } = req.params;
    try {
        const sql = 'UPDATE Componentes SET estado = "BODEGA" WHERE id_componente = ?';
        connection.query(sql, [id], (err, data) => {
            if (err) {
                console.error('Error en la consulta SQL:', err);
                res.status(500).json({ error: 'Error en el servidor' });
            } else {
                if (data.affectedRows === 0) {
                    res.status(404).json({ error: 'Bien tecnológico no encontrado' });
                } else {
                    res.json({ message: 'Bien tecnológico actualizado exitosamente' });
                }
            }
        });
    } catch (error) {
        console.error('Error en la función deleteBienTecnologico:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

const asignarComponenteLibre = (req, res) => {
    const { id_componente } = req.params;
    const { id_bien_per } = req.body; // id_bien_per desde el cuerpo de la solicitud

    try {
        const sql = 'UPDATE Componentes SET id_bien_per = ? WHERE id_componente = ?';
        connection.query(sql, [id_bien_per, id_componente], (err, data) => {
            if (err) {
                console.error('Error en la consulta SQL:', err);
                res.status(500).json({ error: 'Error en el servidor' });
            } else {
                if (data.affectedRows === 0) {
                    res.status(404).json({ error: 'Componente no encontrado' });
                } else {
                    res.json({ message: 'Componente asignado exitosamente' });
                }
            }
        });
    } catch (error) {
        console.error('Error en la función asignarComponenteLibre:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

const getBienesAsignar = (req, res) => {
    try {
        const sql = `
                SELECT 
                    BT.*,
                    B.ID_BLOQUE, 
                    B.NOMBRE AS nombre_bloque, 
                    A.ID_AREA, 
                    A.NOMBRE AS nombre_area
                FROM 
                    BIEN_TECNOLOGICO BT
                JOIN 
                    AREAS A ON A.ID_AREA = BT.ID_AREA_PER
                JOIN 
                    BLOQUES B ON B.ID_BLOQUE = A.ID_BLOQUE_PER
                WHERE 
                    BT.ESTADO != 'BODEGA';
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
        console.error('Error en la función getComponentes:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};


/*const deleteBienTecnologico = (req, res) => {
    
};*/ 


module.exports = {
    getComponentes,
    createComponente,
    getComponenteById,
    updateComponente,
    deleteComponente,
    getComponentesLibres,
    asignarComponenteLibre,
    getBienesAsignar
};
