const connection = require('../db/connection');

exports.getAllBienes = async (req, res) => {
  try {
    const selectQuery = `
      SELECT bm.*, 
             e.nombre AS nombre_encargado, 
             e.apellido AS apellido_encargado,
             a.nombre AS nombre_area 
      FROM bien_mobiliario bm
      LEFT JOIN encargados e ON bm.id_encargado_per = e.id_encargado
      LEFT JOIN areas a ON bm.id_area_per = a.id_area
    `;
    connection.query(selectQuery, (error, results) => {
      if (error) {
        return res.status(500).json({ mensaje: 'Error interno del servidor' });
      }

      res.status(200).json({ mobiliarios: results });
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error interno del servidor' });
}
};

exports.addBienes = async (req, res) => {
  try {
    const {bld_bca, nombre, marca, modelo, num_serie, material, color, fecha_adquisicion, estado, localizacion, codigoUTA, valor_contable, id_encargado_per, id_area_per} = req.body;

      const insertQuery = `INSERT INTO bien_mobiliario (nombre, marca, modelo, num_serie, material, color, fecha_adquisicion, estado, localizacion, codigoUTA, id_encargado_per, id_area_per) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      connection.query(insertQuery, [nombre, marca, modelo, num_serie, material, color, fecha_adquisicion, estado, localizacion, codigoUTA, id_encargado_per, id_area_per], (error, results) => {
        if (error) {
          return res.status(500).json({ mensaje: 'Error interno del servidor' });
        }

        res.status(201).json({ mensaje: 'Encargado registrado exitosamente' });
      });

  } catch (error) {
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};
exports.editBienes = async (req, res) => {
    try {
      const id_bien = req.params.id;
      const { nombre, marca, modelo, num_serie, material, color, fecha_adquisicion, estado, localizacion, codigoUTA, id_encargado_per, id_area_per} = req.body;
  
      const updateQuery = `UPDATE bien_mobiliario SET nombre = ?, marca = ?, modelo = ?, num_serie = ?, material = ?, color = ?, fecha_adquisicion = ?, estado = ?, localizacion = ?, codigoUTA = ?, id_encargado_per = ?, id_area_per = ? WHERE id_bien = ?`;
  
      connection.query(updateQuery, [ nombre, marca, modelo, num_serie, material, color, fecha_adquisicion, estado, localizacion, codigoUTA, id_encargado_per, id_area_per, id_bien], (error, results) => {
        if (error) {
          return res.status(500).json({ mensaje: 'Error al actualizar el bien' });
        }
  
        if (results.affectedRows === 0) {
          return res.status(404).json({ mensaje: 'No se encontró el bien con el ID proporcionado' });
        }
  
        res.status(200).json({ mensaje: 'Bien actualizado exitosamente' });
      });
    } catch (error) {
      res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
  };

  exports.deleteBienes = async (req, res) => {
    try {
      const id_bien = req.params.id;
  
      const deleteQuery = `DELETE FROM bien_mobiliario WHERE id_bien = ?`;
  
      connection.query(deleteQuery, [id_bien], (error, results) => {
        if (error) {
          return res.status(500).json({ mensaje: 'Error al eliminar el bien' });
        }
  
        if (results.affectedRows === 0) {
          return res.status(404).json({ mensaje: 'No se encontró el bien con el ID proporcionado' });
        }
  
        res.status(200).json({ mensaje: 'Bien eliminado exitosamente' });
      });
    } catch (error) {
      res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
  }

  
  
  exports.getBuscarBienPorId = async (req, res) => {
    try {
        const { id_bien } = req.params;
        const selectQuery = `SELECT id_bien, nombre, marca, modelo, num_serie, material, color, fecha_adquisicion, estado, localizacion, codigoUTA, id_encargado_per, id_area_per FROM bien_mobiliario WHERE id_bien = ?`;

        connection.query(selectQuery, [id_bien], (error, results) => {
            if (error) {
                return res.status(500).json({ mensaje: 'Error interno del servidor' });
            }

            if (results.length === 0) {
                return res.status(404).json({ mensaje: 'No se encontró ningún bien con ese ID' });
            }

            // Devolver el bien encontrado
            res.status(200).json({ bien: results[0] });
        });

    } catch (error) {
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
};

exports.getMobiliarioByName = async (req, res) => {
  try {
    const { nombre } = req.params;
    const searchTerm = `%${nombre}%`;
    const selectQuery = `SELECT * FROM bien_mobiliario  WHERE nombre LIKE ?`;
    connection.query(selectQuery, [searchTerm], (error, results) => {
      if (error) {
        return res.status(500).json({ mensaje: 'Error interno del servidor' });
      }
      if (results.length === 0) {
        return res.status(404).json({ mensaje: 'Mobiliario no encontrado' });
      }
      res.status(200).json({ mobiliarios: results });
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};


