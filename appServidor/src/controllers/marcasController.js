const connection = require('../db/connection');

exports.getAllMarcas = async (req, res) => {
  try {
    const sql = 'SELECT * FROM marcas';
    connection.query(sql, (err, data) => {
        if (err) {
            console.error('Error en la consulta SQL:', err);
            res.status(500).json({ error: 'Error en el servidor' });
        } else {
            res.json(data);
        }
    });
} catch (error) {
    console.error('Error en la función getMarcas:', error);
    res.status(500).json({ error: 'Error en el servidor' });
}

};

exports.geMarcasTecnologicos = async (req, res) => {
  try {
    const sql = 'SELECT * FROM marcas WHERE tipo_marca = "TECNOLOGICO"';
    connection.query(sql, (err, data) => {
        if (err) {
            console.error('Error en la consulta SQL:', err);
            res.status(500).json({ error: 'Error en el servidor' });
        } else {
            res.json(data);
        }
    });
} catch (error) {
    console.error('Error en la función getMarcas:', error);
    res.status(500).json({ error: 'Error en el servidor' });
}
};

exports.geMarcasMobiliarios = async (req, res) => {
  try {
    const sql = 'SELECT * FROM marcas WHERE tipo_marca = "MOBILIARIO"';
    connection.query(sql, (err, data) => {
        if (err) {
            console.error('Error en la consulta SQL:', err);
            res.status(500).json({ error: 'Error en el servidor' });
        } else {
            res.json(data);
        }
    });
} catch (error) {
    console.error('Error en la función getMarcas:', error);
    res.status(500).json({ error: 'Error en el servidor' });
}
};

exports.createMarcas = async (req, res) => {
  try {
    const { nom_marca,tipo_marca } = req.body;

    const insertQuery = 'INSERT INTO marcas (nom_marca, tipo_marca) VALUES (?,?)';
    connection.query(insertQuery, [nom_marca, tipo_marca ], (error, results) => {
      if (error) {
        return res.status(500).json({ mensaje: 'Error interno del servidor' });
      }

      res.status(201).json({ mensaje: 'Marca creado exitosamente', id: results.insertId });
    });

  } catch (error) {
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

exports.getMarcasById = async (req, res) => {
  try {
    const id = req.params.id;

    const selectQuery = 'SELECT * FROM marcas WHERE id = ?';
    connection.query(selectQuery, [id], (error, results) => {
      if (error) {
        return res.status(500).json({ mensaje: 'Error interno del servidor' });
      }

      if (results.length === 0) {
        return res.status(404).json({ mensaje: 'Marca no encontrado' });
      }

      res.status(200).json({ marcas: results[0] });
    });

  } catch (error) {
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

exports.updateMarcas = async (req, res) => {
  try {
    const id = req.params.id;
    const { nom_marca, tipo_marca } = req.body;

    const updateQuery = 'UPDATE marcas  SET nom_marca = ?, tipo_marca = ? WHERE id = ?';
    connection.query(updateQuery, [nom_marca, tipo_marca, id], (error, results) => {
      if (error) {
        return res.status(500).json({ mensaje: 'Error interno del servidor' });
      }

      res.status(200).json({ mensaje: 'Marca actualizado exitosamente' });
    });

  } catch (error) {
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

exports.deleteMarcas = async (req, res) => {
  try {
    const id = req.params.id;

    const deleteQuery = 'DELETE FROM marcas WHERE id = ?';
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