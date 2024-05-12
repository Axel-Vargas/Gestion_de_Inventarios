const connection = require('../db/connection');

exports.getAllUsers = async (req, res) => {
  try {
    const selectQuery = `SELECT * FROM usuarios`;
    connection.query(selectQuery, (error, results) => {
      if (error) {
        return res.status(500).json({ mensaje: 'Error interno del servidor' });
      }

      res.status(200).json({ usuarios: results });
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

exports.authenticateUser = async (req, res) => {
  try {
    const { usuario, contraseña } = req.body;

    const query = `SELECT * FROM usuarios WHERE correo = ? AND contraseña = ?`;
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

exports.addUser = async (req, res) => {
  try {
    const { cedula, nombre, apellido, telefono, correo, contraseña, rol } = req.body;

    const emailExistsQuery = `SELECT * FROM usuarios WHERE correo = ?`;
    connection.query(emailExistsQuery, [correo], (error, results) => {
      if (error) {
        return res.status(500).json({ mensaje: 'Error interno del servidor' });
      }

      if (results.length > 0) {
        return res.status(400).json({ mensaje: 'El correo ya está en uso' });
      }

      const insertQuery = `INSERT INTO usuarios (ced_usuario, nom_usuario, ape_usuario, tel_usuario, correo, contraseña, Id_rol) VALUES (?, ?, ?, ?, ?, ?, ?)`;
      connection.query(insertQuery, [cedula, nombre, apellido, telefono, correo, contraseña, rol], (error, results) => {
        if (error) {
          return res.status(500).json({ mensaje: 'Error interno del servidor' });
        }

        res.status(201).json({ mensaje: 'Usuario registrado exitosamente' });
      });
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};