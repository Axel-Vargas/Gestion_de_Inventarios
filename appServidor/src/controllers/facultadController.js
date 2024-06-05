const connection = require('../db/connection');

exports.getAllFacultades = async (req, res) => {
  try {
    const selectQuery ='SELECT * FROM facultad';
    connection.query(selectQuery, (error, results) => {
      if (error) {
        return res.status(500).json({ mensaje: 'Error interno del servidor' });
      }

      res.status(200).json({ facultades: results });
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

exports.addFacultad = async (req, res) => {
  try {
    const { nombre, siglas } = req.body;

    const insertQuery = 'INSERT INTO facultad (nombre, siglas) VALUES (?, ?)';
    connection.query(insertQuery, [nombre, siglas], (error, results) => {
      if (error) {
        return res.status(500).json({ mensaje: 'Error interno del servidor' });
      }

      res.status(201).json({ mensaje: 'Facultad registrada exitosamente' });
    });

  } catch (error) {
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

exports.editFacultad = async (req, res) => {
  try {
    const id = req.params.id;
    const { nombre, siglas } = req.body;

    const updateQuery = 'UPDATE facultad SET nombre = ?, siglas = ? WHERE id_facultad = ?';
    connection.query(updateQuery, [nombre, siglas, id], (error, results) => {
      if (error) {
        return res.status(500).json({ mensaje: 'Error interno del servidor' });
      }

      res.status(200).json({ mensaje: 'Facultad actualizada exitosamente' });
    });

  } catch (error) {
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};