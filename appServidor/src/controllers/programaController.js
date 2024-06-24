const connection = require('../db/connection');

exports.getAllProgramas = async (req, res) => {
    try {
        const selectQuery = `SELECT * FROM programas`;
        connection.query(selectQuery, (error, results) => {
            if (error) {
                return res.status(500).json({ mensaje: 'Error interno del servidor' });
            }

            res.status(200).json({ programas: results });
        });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
};

exports.addPrograma = async (req, res) => {
    try {
        const { software, version, tipo_licencia, fecha_adquisicion, laboratorio } = req.body;

        const insertQuery = `INSERT INTO programas (software, version, tipo_licencia, fecha_adquisicion, laboratorio) VALUES (?, ?, ?, ?, ?)`;
        connection.query(insertQuery, [software, version, tipo_licencia, fecha_adquisicion, laboratorio], (error, results) => {
            if (error) {
                return res.status(500).json({ mensaje: 'Error interno del servidor' });
            }

            res.status(201).json({ mensaje: 'Programa registrado exitosamente' });
        });

    } catch (error) {
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
};

exports.editPrograma = async (req, res) => {
    try {
        const id = req.params.id;
        const { software, version, tipo_licencia, fecha_adquisicion, laboratorio } = req.body;

        const updateQuery = `UPDATE programas SET software = ?, version = ?, tipo_licencia = ?, fecha_adquisicion = ?, laboratorio = ? WHERE id_programa = ?`;
        connection.query(updateQuery, [software, version, tipo_licencia, fecha_adquisicion, laboratorio, id], (error, results) => {
            if (error) {
                return res.status(500).json({ mensaje: 'Error interno del servidor' });
            }

            res.status(200).json({ mensaje: 'Programa actualizado exitosamente' });
        });

    } catch (error) {
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
};

exports.deletePrograma = async (req, res) => {
    try {
        const id = req.params.id;
        const deleteQuery = `DELETE FROM programas WHERE id_programa = ?`;

        connection.query(deleteQuery, [id], (error, results) => {
            if (error) {
                return res.status(500).json({ mensaje: 'Error interno del servidor al eliminar el programa' });
            }

            if (results.affectedRows === 0) {
                return res.status(404).json({ mensaje: 'Programa no encontrado' });
            }

            res.status(200).json({ mensaje: 'Programa eliminado exitosamente' });
        });
} catch (error) {
    res.status(500).json({ mensaje: 'Error interno del servidor' });
}
};

