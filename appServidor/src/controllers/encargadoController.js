const connection = require('../db/connection');

exports.getAllEncargados = async (req, res) => {
  try {
    const selectQuery = `SELECT * FROM encargados`;
    connection.query(selectQuery, (error, results) => {
      if (error) {
        return res.status(500).json({ mensaje: 'Error interno del servidor' });
      }

      res.status(200).json({ encargados: results });
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

exports.getEncargadoByCedula = async (req, res) => {
  try {
    const { cedula } = req.params;
    const searchTerm = `%${cedula}%`;

    const selectQuery = `SELECT * FROM encargados WHERE cedula LIKE ?`;

    connection.query(selectQuery, [searchTerm], (error, results) => {
      if (error) {
        return res.status(500).json({ mensaje: 'Error interno del servidor' });
      }

      if (results.length === 0) {
        return res.status(404).json({ mensaje: 'Encargado no encontrado' });
      }

      res.status(200).json({ encargados: results });
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

exports.addEncargado = async (req, res) => {
  try {
    const { cedula, nombre, apellido, telefono, direccion } = req.body;

    const insertQuery = `INSERT INTO encargados (cedula, nombre, apellido, telefono, direccion) VALUES (?, ?, ?, ?, ?)`;
    connection.query(insertQuery, [cedula, nombre, apellido, telefono, direccion], (error, results) => {
      if (error) {
        return res.status(500).json({ mensaje: 'Error interno del servidor' });
      }

      res.status(201).json({ mensaje: 'Encargado registrado exitosamente' });
    });

  } catch (error) {
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

exports.editEncargado = async (req, res) => {
  try {
    const id = req.params.id;
    const { cedula, nombre, apellido, telefono, direccion } = req.body;

    const updateQuery = `UPDATE encargados SET cedula = ?, nombre = ?, apellido = ?, telefono = ?, direccion = ? WHERE id_encargado = ?`;
    connection.query(updateQuery, [cedula, nombre, apellido, telefono, direccion, id], (error, results) => {
      if (error) {
        return res.status(500).json({ mensaje: 'Error interno del servidor' });
      }

      res.status(200).json({ mensaje: 'Encargado actualizado exitosamente' });
    });

  } catch (error) {
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

exports.deleteEncargado = async (req, res) => {
  try {
    const encargadoId = req.params.id;

    const updateBienesQuery = `UPDATE bien_mobiliario SET id_encargado_per = NULL WHERE id_encargado_per = ?`;

    connection.query(updateBienesQuery, [encargadoId], (error, results) => {
      if (error) {
        return res.status(500).json({ mensaje: 'Error interno del servidor al eliminar el encarado de los bienes' });
      }

      const deleteEncargadoQuery = `DELETE FROM encargados WHERE id_encargado = ?`;

      connection.query(deleteEncargadoQuery, [encargadoId], (error, results) => {
        if (error) {
          return res.status(500).json({ mensaje: 'Error interno del servidor al eliminar el encargado' });
        }

        if (results.affectedRows === 0) {
          return res.status(404).json({ mensaje: 'Encargado no encontrado' });
        }

        res.status(200).json({ mensaje: 'Encargado eliminado exitosamente' });
      });
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

