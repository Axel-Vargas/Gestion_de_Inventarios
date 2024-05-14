const connection = require('../db/connection');

exports.getAllEncargados = async (req, res) => {
    try {
      const selectQuery = `SELECT nombre FROM encargados`;
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