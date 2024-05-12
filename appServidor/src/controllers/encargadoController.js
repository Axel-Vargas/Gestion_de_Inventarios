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