const connection = require('../db/connection');

const getBienesTecnologicos = (req, res) => {
    try {
        const sql = 'SELECT * FROM Bien_Tecnologico';
        connection.query(sql, (err, data) => {
            if (err) {
                console.error('Error en la consulta SQL:', err);
                res.status(500).json({ error: 'Error en el servidor' });
            } else {
                res.json(data);
            }
        });
    } catch (error) {
        console.error('Error en la función getBienesTecnologicos:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

const createBienTecnologico = (req, res) => {
    const { marca, modelo, num_serie, fecha_adquisicion, estado, codigoUTA, localizacion, repotenciado, id_tipo_per, id_area_per, id_proveedor_per } = req.body;
    try {
        const sql = 'INSERT INTO Bien_Tecnologico (marca, modelo, num_serie, fecha_adquisicion, estado, codigoUTA, localizacion, repotenciado, id_tipo_per, id_area_per, id_proveedor_per) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        connection.query(sql, [marca, modelo, num_serie, fecha_adquisicion, estado, codigoUTA, localizacion, repotenciado, id_tipo_per, id_area_per, id_proveedor_per], (err, data) => {
            if (err) {
                console.error('Error en la consulta SQL:', err);
                res.status(500).json({ error: 'Error en el servidor' });
            } else {
                res.status(201).json({ message: 'Bien tecnológico creado exitosamente' });
            }
        });
    } catch (error) {
        console.error('Error en la función createBienTecnologico:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

const getBienTecnologicoById = (req, res) => {
    const { id } = req.params;
    try {
        const sql = 'SELECT * FROM Bien_Tecnologico WHERE id_bien_tec = ?';
        connection.query(sql, [id], (err, data) => {
            if (err) {
                console.error('Error en la consulta SQL:', err);
                res.status(500).json({ error: 'Error en el servidor' });
            } else {
                if (data.length === 0) {
                    res.status(404).json({ error: 'Bien tecnológico no encontrado' });
                } else {
                    res.json(data[0]);
                }
            }
        });
    } catch (error) {
        console.error('Error en la función getBienTecnologicoById:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

const updateBienTecnologico = (req, res) => {
    const { id } = req.params;
    const { marca, modelo, num_serie, fecha_adquisicion, estado, codigoUTA, localizacion, repotenciado, id_tipo_per, id_area_per, id_proveedor_per } = req.body;
    try {
        const sql = 'UPDATE Bien_Tecnologico SET marca = ?, modelo = ?, num_serie = ?, fecha_adquisicion = ?, estado = ?, codigoUTA = ?, localizacion = ?, repotenciado = ?, id_tipo_per = ?, id_area_per = ?, id_proveedor_per = ? WHERE id_bien_tec = ?';
        connection.query(sql, [marca, modelo, num_serie, fecha_adquisicion, estado, codigoUTA, localizacion, repotenciado, id_tipo_per, id_area_per, id_proveedor_per, id], (err, data) => {
            if (err) {
                console.error('Error en la consulta SQL:', err);
                res.status(500).json({ error: 'Error en el servidor' });
            } else {
                res.json({ message: 'Bien tecnológico actualizado exitosamente' });
            }
        });
    } catch (error) {
        console.error('Error en la función updateBienTecnologico:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

const deleteBienTecnologico = (req, res) => {
    const { id } = req.params;
    try {
        const sql = 'DELETE FROM Bien_Tecnologico WHERE id_bien_tec = ?';
        connection.query(sql, [id], (err, data) => {
            if (err) {
                console.error('Error en la consulta SQL:', err);
                res.status(500).json({ error: 'Error en el servidor' });
            } else {
                if (data.affectedRows === 0) {
                    res.status(404).json({ error: 'Bien tecnológico no encontrado' });
                } else {
                    res.json({ message: 'Bien tecnológico eliminado exitosamente' });
                }
            }
        });
    } catch (error) {
        console.error('Error en la función deleteBienTecnologico:', error);
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
