
const connection = require('../db/connection');

exports.getAllAreas = async (req, res) => {
    try {
      const selectQuery = `SELECT * FROM areas`;
      connection.query(selectQuery, (error, results) => {
        if (error) {
          return res.status(500).json({ mensaje: 'Error interno del servidor' });
        }
  
        res.status(200).json({ areas: results });
      });
    } catch (error) {
      res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
  };