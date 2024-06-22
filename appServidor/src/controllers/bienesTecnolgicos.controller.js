const connection = require('../db/connection');

const QRCode = require('qrcode');
const path = require('path');
const fs = require('fs');

function generateQR(data) {
    return new Promise((resolve, reject) => {
        const qrDirectory = path.join(__dirname, 'public', 'qrcodes');
        const filename = `${Date.now()}.png`;
        const qrPath = path.join(qrDirectory, filename);
        // Crear el directorio si no existe
        fs.mkdirSync(qrDirectory, { recursive: true });
        QRCode.toFile(qrPath, data, {
            color: {
                dark: '#000',  // Black dots
                light: '#0000' // Transparent background
            }
        }, err => {
            if (err) reject(err);
            else {
                // Devolver la URL pública en lugar de la ruta del archivo
                const publicUrl = `http://localhost:4000/public/qrcodes/${filename}`;
                resolve(publicUrl);
            }
        });
    });
}

const getBienesTecnologicos = (req, res) => {
    try {

        const sql = `
            SELECT bt.*, CONCAT(e.nombre, ' ', e.apellido) AS nombre_encargado 
            FROM bien_tecnologico bt
            LEFT JOIN encargados e ON bt.id_encargado_per = e.id_encargado
            WHERE bt.estado != 'BODEGA'
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
      console.error('Error en la función getBienesTecnologicos:', error);
      res.status(500).json({ error: 'Error en el servidor' });
    }
  };

const getBienesTecnologicosPorArea = (req, res) => {
    try {
        const { id } = req.params;
        const sql = 'SELECT * FROM Bien_Tecnologico WHERE nombre = \'COMPUTADORA DE ESCRITORIO\' AND id_area_per = ?';

        connection.query(sql, [id], (err, data) => {
            if (err) {
                console.error('Error en la consulta SQL:', err);
                res.status(500).json({ error: 'Error en el servidor' });
            } else {
                res.json(data);
            }
        });
    } catch (error) {
        console.error('Error en la función getBienesTecnologicosPorArea:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

const obtenerBienesPorBloqueYArea = (req, res) => {
    const { nombreBloque, nombreArea } = req.params;

    try {
        const sql = `
            SELECT BT.*
            FROM BLOQUES B
            JOIN AREAS A ON B.ID_BLOQUE = A.ID_BLOQUE_PER
            JOIN BIEN_TECNOLOGICO BT ON A.ID_AREA = BT.ID_AREA_PER
            WHERE B.NOMBRE = ?
            AND A.NOMBRE = ?
            AND BT.ESTADO != "BODEGA";
        `;
        connection.query(sql, [nombreBloque, nombreArea], (err, data) => {
            if (err) {
                console.error('Error en la consulta SQL:', err);
                res.status(500).json({ error: 'Error en el servidor' });
            } else {
                res.json(data);
            }
        });
    } catch (error) {
        console.error('Error en la función obtenerBienesPorBloqueYArea:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};


const createBienTecnologico = async (req, res) => {
    const { nombre, marca, modelo, num_serie, fecha_adquisicion, estado, codigoUTA, localizacion, atributos, id_area_per, id_proveedor_per, id_encargado_per } = req.body;

    try {
    const sqlInsert = 'INSERT INTO Bien_Tecnologico (nombre, marca, modelo, num_serie, fecha_adquisicion, estado, codigoUTA, localizacion, atributos, id_area_per, id_proveedor_per, id_encargado_per) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        connection.query(sqlInsert, [nombre, marca, modelo, num_serie, fecha_adquisicion, estado, codigoUTA, localizacion, JSON.stringify(atributos), id_area_per, id_proveedor_per, id_encargado_per], async (err, result) => {

            if (err) {
                console.error('Error en la consulta SQL:', err);
                res.status(500).json({ error: 'Error en el servidor' });
            } else {
                const idBienTec = result.insertId;
                // Datos para el QR
                const qrData = `id_bien: ${idBienTec}`;
                // Generar QR y obtener el path relativo
                const imagePath = await generateQR(qrData);
                // SQL para actualizar con path del QR
                const sqlUpdate = 'UPDATE Bien_Tecnologico SET image = ? WHERE id_bien = ?';
                connection.query(sqlUpdate, [imagePath, idBienTec], (err, data) => {
                    if (err) {
                        console.error('Error en la consulta SQL:', err);
                        res.status(500).json({ error: 'Error en el servidor' });
                    } else {
                        res.status(201).json({ message: 'Bien tecnológico creado exitosamente', qrPath: imagePath });
                    }
                });
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
        const sql = 'SELECT * FROM Bien_Tecnologico WHERE estado != "BODEGA" and id_bien = ?';
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
    const { nombre, marca, modelo, num_serie, fecha_adquisicion, estado, codigoUTA, localizacion, atributos, id_area_per, id_proveedor_per, id_encargado_per } = req.body;
    try {
        const sql = 'UPDATE Bien_Tecnologico SET nombre = ?, marca = ?, modelo = ?, num_serie = ?, fecha_adquisicion = ?, estado = ?, codigoUTA = ?, localizacion = ?, atributos = ?, id_area_per = ?, id_proveedor_per = ?, id_encargado_per = ? WHERE id_bien = ?';
        connection.query(sql, [nombre, marca, modelo, num_serie, fecha_adquisicion, estado, codigoUTA, localizacion, JSON.stringify(atributos), id_area_per, id_proveedor_per, id_encargado_per, id], (err, data) => {
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
        const sql = 'UPDATE Bien_Tecnologico SET estado = "BODEGA" WHERE id_bien = ?';
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

module.exports = {
    getBienesTecnologicos,
    createBienTecnologico,
    getBienTecnologicoById,
    updateBienTecnologico,
    deleteBienTecnologico,
    obtenerBienesPorBloqueYArea,
    getBienesTecnologicosPorArea
};
