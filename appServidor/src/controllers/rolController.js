const connection = require('../db/connection');

exports.getAllRols = async (req, res) => {
  try {
    const selectQuery = `SELECT * FROM roles`;
    connection.query(selectQuery, (error, results) => {
      if (error) {
        return res.status(500).json({ mensaje: 'Error interno del servidor' });
      }

      res.status(200).json({ roles: results });
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};
