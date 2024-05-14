const connection = require('../db/connection');

exports.getAllUsers = async (req, res) => {
  try {
    const selectQuery = `SELECT * FROM usuarios WHERE estado = 'Activo'`;
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

exports.getUserByCedula = async (req, res) => {
  try {
    const { cedula } = req.params;
    const searchTerm = `%${cedula}%`;

    const selectQuery = `SELECT * FROM usuarios WHERE ced_usuario LIKE ? AND estado = 'Activo'`;

    connection.query(selectQuery, [searchTerm], (error, results) => {
      if (error) {
        return res.status(500).json({ mensaje: 'Error interno del servidor' });
      }

      if (results.length === 0) {
        return res.status(404).json({ mensaje: 'Usuario no encontrado' });
      }

      res.status(200).json({ usuarios: results });
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

exports.addUser = async (req, res) => {
  try {
    const { cedula, nombre, apellido, telefono, correo, contrasena, rol, estado } = req.body;

    const emailExistsQuery = `SELECT * FROM usuarios WHERE correo = ?`;
    connection.query(emailExistsQuery, [correo], (error, results) => {
      if (error) {
        return res.status(500).json({ mensaje: 'Error interno del servidor' });
      }

      if (results.length > 0) {
        return res.status(400).json({ mensaje: 'El correo ya está en uso' });
      }

      const insertQuery = `INSERT INTO usuarios (ced_usuario, nom_usuario, ape_usuario, tel_usuario, correo, contrasena, Id_rol, estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
      connection.query(insertQuery, [cedula, nombre, apellido, telefono, correo, contrasena, rol, estado], (error, results) => {
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

exports.editUser = async (req, res) => {
  try {
    const { id, cedula, nombre, apellido, telefono, correo, contrasena, rol } = req.body;

    const emailExistsQuery = `SELECT * FROM usuarios WHERE correo = ? AND Id_usuario != ?`;
    connection.query(emailExistsQuery, [correo, id], (error, results) => {
      if (error) {
        return res.status(500).json({ mensaje: 'Error interno del servidor' });
      }

      if (results.length > 0) {
        return res.status(400).json({ mensaje: 'El correo ya está en uso por otro usuario' });
      }

      const updateQuery = `UPDATE usuarios SET ced_usuario = ?, nom_usuario = ?, ape_usuario = ?, tel_usuario = ?, correo = ?, contrasena = ?, Id_rol = ? WHERE Id_usuario = ?`;
      connection.query(updateQuery, [cedula, nombre, apellido, telefono, correo, contrasena, rol, id], (error, results) => {
        if (error) {
          return res.status(500).json({ mensaje: 'Error interno del servidor' });
        }

        res.status(200).json({ mensaje: 'Información de usuario actualizada exitosamente' });
      });
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

exports.desactivateUser = async (req, res) => {
  try {
    const updateQuery = `UPDATE usuarios SET estado = 'Inactivo' WHERE Id_usuario = ?`;
    const { id } = req.body;

    connection.query(updateQuery, [id], (error, results) => {
      if (error) {
        return res.status(500).json({ mensaje: 'Error interno del servidor' });
      }

      res.status(200).json({ mensaje: 'Usuario dado de baja exitosamente' });
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

exports.authenticateUser = async (req, res) => {
  try {
    const { usuario, contrasena } = req.body;

    const query = `SELECT * FROM usuarios WHERE correo = ? AND contrasena = ?`;
    connection.query(query, [usuario, contrasena], (error, results) => {
      if (error) {
        return res.status(500).json({ mensaje: 'Error interno del servidor' });
      }

      if (results.length === 0) {
        return res.status(401).json({ mensaje: 'Credenciales inválidas' });
      }

      const existingUser = results[0];
      if (existingUser.contrasena !== contrasena) {
        return res.status(401).json({ mensaje: 'Credenciales inválidas' });
      }
      
      res.status(200).json({ id: existingUser.id, usuario: existingUser.correo, contrasena: existingUser.contrasena });
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};