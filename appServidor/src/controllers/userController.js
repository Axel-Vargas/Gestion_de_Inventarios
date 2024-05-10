const connection = require('../db/connection');

exports.authenticateUser = async (req, res) => {
  try {
    const { usuario, contraseña } = req.body;

    const query = `SELECT * FROM usuarios WHERE usuario = ? AND contraseña = ?`;
    connection.query(query, [usuario, contraseña], (error, results) => {
      if (error) {
        return res.status(500).json({ mensaje: 'Error interno del servidor' });
      }

      if (results.length === 0) {
        return res.status(401).json({ mensaje: 'Credenciales inválidas' });
      }

      const existingUser = results[0];
      if (existingUser.contraseña !== contraseña) {
        return res.status(401).json({ mensaje: 'Credenciales inválidas' });
      }
      
      res.status(200).json({ id: existingUser.id, usuario: existingUser.usuario, contraseña: existingUser.contraseña });
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};