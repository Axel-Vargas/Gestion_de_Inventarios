const connection = require('../db/connection');

exports.getAllModelos = async (req, res) => {
  try {
    const selectQuery ='SELECT * FROM modelos';
    connection.query(selectQuery, (error, results) => {
      if (error) {
        return res.status(500).json({ mensaje: 'Error interno del servidor' });
      }

      res.status(200).json({ modelos: results });
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

exports.createModelo = async (req, res) => {
  try {
    const { nom_modelo } = req.body;

    const insertQuery = 'INSERT INTO modelos (nom_modelo) VALUES (?)';
    connection.query(insertQuery, [nom_modelo], (error, results) => {
      if (error) {
        return res.status(500).json({ mensaje: 'Error interno del servidor' });
      }

      res.status(201).json({ mensaje: 'Modelo creado exitosamente', id: results.insertId });
    });

  } catch (error) {
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

exports.getModeloById = async (req, res) => {
  try {
    const id = req.params.id;

    const selectQuery = 'SELECT * FROM modelos WHERE id = ?';
    connection.query(selectQuery, [id], (error, results) => {
      if (error) {
        return res.status(500).json({ mensaje: 'Error interno del servidor' });
      }

      if (results.length === 0) {
        return res.status(404).json({ mensaje: 'Modelo no encontrado' });
      }

      res.status(200).json({ modelo: results[0] });
    });

  } catch (error) {
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

exports.updateModelo = async (req, res) => {
  try {
    const id = req.params.id;
    const { nom_modelo } = req.body;

    const updateQuery = 'UPDATE modelos SET nom_modelo = ? WHERE id = ?';
    connection.query(updateQuery, [nom_modelo, id], (error, results) => {
      if (error) {
        return res.status(500).json({ mensaje: 'Error interno del servidor' });
      }

      res.status(200).json({ mensaje: 'Modelo actualizado exitosamente' });
    });

  } catch (error) {
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

exports.deleteModelo = async (req, res) => {
  try {
    const id = req.params.id;

    const deleteQuery = 'DELETE FROM modelos WHERE id = ?';
    connection.query(deleteQuery, [id], (error, results) => {
      if (error) {
        return res.status(500).json({ mensaje: 'Error interno del servidor' });
      }

      res.status(200).json({ mensaje: 'Modelo eliminado exitosamente' });
    });

  } catch (error) {
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};
