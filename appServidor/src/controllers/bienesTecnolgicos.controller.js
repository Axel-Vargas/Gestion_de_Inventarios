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
        const sql = 'SELECT * FROM bien_tecnologico'
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

const createBienTecnologico = async (req, res) => {
    const {marca, modelo, num_serie, fecha_adquisicion, estado, codigoUTA, localizacion,ip_tecnologico,codigo_adicional, image, id_tipo_per, id_area_per, id_proveedor_per } = req.body;

    try {

        // Datos para el QR
        const qrData = `num_serie: ${num_serie}`;
        // Generar QR y obtener el path relativo
        const imagePath = await generateQR(qrData);
        // SQL para insertar con path del QR
        const sql = 'INSERT INTO Bien_Tecnologico (marca, modelo, num_serie, fecha_adquisicion, estado, codigoUTA, localizacion,ip_tecnologico,codigo_adicional, image, id_tipo_per, id_area_per, id_proveedor_per) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)';
        connection.query(sql, [marca, modelo, num_serie, fecha_adquisicion, estado, codigoUTA, localizacion,ip_tecnologico,codigo_adicional, imagePath, id_tipo_per, id_area_per, id_proveedor_per], (err, data) => {
            if (err) {
                console.error('Error en la consulta SQL:', err);
                res.status(500).json({ error: 'Error en el servidor' });
            } else {
                res.status(201).json({ message: 'Bien tecnológico creado exitosamente', qrPath: imagePath });
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
    const { marca, modelo, num_serie, fecha_adquisicion, estado, codigoUTA, localizacion,ip_tecnologico,codigo_adicional, repotenciado, image, id_tipo_per, id_area_per, id_proveedor_per } = req.body;
    try {
        const sql = 'UPDATE Bien_Tecnologico SET marca = ?, modelo = ?, num_serie = ?, fecha_adquisicion = ?, estado = ?, codigoUTA = ?, localizacion = ?,ip_tecnologico=?,codigo_adicional=?, repotenciado = ?,image=?, id_tipo_per = ?, id_area_per = ?, id_proveedor_per = ? WHERE id_bien_tec = ?';
        connection.query(sql, [marca, modelo, num_serie, fecha_adquisicion, estado, codigoUTA, localizacion,ip_tecnologico,codigo_adicional, repotenciado, image, id_tipo_per, id_area_per, id_proveedor_per, id], (err, data) => {
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
