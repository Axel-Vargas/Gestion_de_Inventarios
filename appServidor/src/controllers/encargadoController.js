const connection = require('../db/connection');
/*
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
*/
exports.getAllEncargados = async (req, res) => {
  try {
    const selectQuery = `SELECT * FROM encargados WHERE estado = 1`;
    connection.query(selectQuery, (error, results) => {
      if (error) {
        return res.status(500).json({ mensaje: 'Error interno del servidor' });
      }

      res.json(results);
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

exports.getEncargadoByCedula = async (req, res) => {
  try {
    const { cedula } = req.params;
    const searchTerm = `%${cedula}%`;

    const selectQuery = `SELECT * FROM encargados WHERE cedula LIKE ?`;

    connection.query(selectQuery, [searchTerm], (error, results) => {
      if (error) {
        return res.status(500).json({ mensaje: 'Error interno del servidor' });
      }

      if (results.length === 0) {
        return res.status(404).json({ mensaje: 'Encargado no encontrado' });
      }

      res.status(200).json({ encargados: results });
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

exports.addEncargado = async (req, res) => {
  try {
    const { cedula, nombre, apellido, telefono, direccion, estado } = req.body;

    const insertQuery = `INSERT INTO encargados (cedula, nombre, apellido, telefono, direccion, estado) VALUES (?, ?, ?, ?, ?, ?)`;
    connection.query(insertQuery, [cedula, nombre, apellido, telefono, direccion, estado], (error, results) => {
      if (error) {
        return res.status(500).json({ mensaje: 'Error interno del servidor' });
      }

      res.status(201).json({ mensaje: 'Encargado registrado exitosamente' });
    });

  } catch (error) {
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

exports.editEncargado = async (req, res) => {
  try {
    const id = req.params.id;
    const { cedula, nombre, apellido, telefono, direccion } = req.body;

    const updateQuery = `UPDATE encargados SET cedula = ?, nombre = ?, apellido = ?, telefono = ?, direccion = ? WHERE id_encargado = ? AND estado = 1`;
    connection.query(updateQuery, [cedula, nombre, apellido, telefono, direccion, id], (error, results) => {
      if (error) {
        return res.status(500).json({ mensaje: 'Error interno del servidor' });
      }

      res.status(200).json({ mensaje: 'Encargado actualizado exitosamente' });
    });

  } catch (error) {
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

exports.deleteEncargado = async (req, res) => {
  try {
    const encargadoId = req.params.id;
    const updateMobiliarioQuery = `UPDATE bien_mobiliario SET id_encargado_per = NULL WHERE id_encargado_per = ?`;

    connection.query(updateMobiliarioQuery, [encargadoId], (error, results) => {
      if (error) {
        return res.status(500).json({ mensaje: 'Error interno del servidor al actualizar bien_mobiliario' });
      }

      const updateTecnologicoQuery = `UPDATE bien_tecnologico SET id_encargado_per = NULL WHERE id_encargado_per = ?`;

      connection.query(updateTecnologicoQuery, [encargadoId], (error, results) => {
        if (error) {
          return res.status(500).json({ mensaje: 'Error interno del servidor al actualizar bien_tecnologico' });
        }

        const deleteEncargadoQuery = `UPDATE encargados SET estado = 0 WHERE id_encargado = ?`;

        connection.query(deleteEncargadoQuery, [encargadoId], (error, results) => {
          if (error) {
            return res.status(500).json({ mensaje: 'Error interno del servidor al eliminar el encargado' });
          }

          if (results.affectedRows === 0) {
            return res.status(404).json({ mensaje: 'Encargado no encontrado' });
          }

          res.status(200).json({ mensaje: 'Encargado eliminado exitosamente' });
        });
      });
    //});
  } catch (error) {
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

exports.getBienesMobiliariosByEncargado = async (req, res) => {
  try {
    const { id } = req.params;

    const selectQuery = `
      SELECT bm.*
      FROM bien_mobiliario bm
      INNER JOIN encargados e ON bm.id_encargado_per = e.id_encargado
      WHERE e.id_encargado = ? AND bm.estado != "BODEGA";
    `;

    connection.query(selectQuery, [id], (error, results) => {
      if (error) {
        console.error('Error al obtener bienes mobiliarios asignados:', error);
        return res.status(500).json({ mensaje: 'Error interno del servidor' });
      }

      res.status(200).json(results);
    });
  } catch (error) {
    console.error('Error interno del servidor:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

exports.getBienesTecnologicosByEncargado = async (req, res) => {
  try {
    const { id } = req.params;

    const selectQuery = `
      SELECT bt.*
      FROM bien_tecnologico bt
      INNER JOIN encargados e ON bt.id_encargado_per = e.id_encargado
      WHERE e.id_encargado = ? AND bt.estado != "BODEGA";
    `;

    connection.query(selectQuery, [id], (error, results) => {
      if (error) {
        console.error('Error al obtener bienes tecnológicos asignados:', error);
        return res.status(500).json({ mensaje: 'Error interno del servidor' });
      }

      res.status(200).json(results);
    });
  } catch (error) {
    console.error('Error interno del servidor:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

exports.updateBienEncargado = (req, res) => {
  const { bienes, encargadoId } = req.body;
  
  updateBienesEncargado(bienes, encargadoId)
    .then(response => {
      res.status(200).json({ success: true, data: response });
    })
    .catch(error => {
      res.status(500).json({ success: false, message: 'Error al actualizar bienes', error });
    });
};

function updateBienesEncargado(bienes, encargadoId) {
  const ids = bienes.map(bien => bien.id).join(',');
  const query = `UPDATE Bienes SET encargado_id = ? WHERE id IN (${ids})`;

  return new Promise((resolve, reject) => {
    db.query(query, [encargadoId], (error, results) => {
      if (error) return reject(error);
      resolve(results);
    });
  });
}
exports.getBienesMobiliariosByEncargado = async (req, res) => {
  try {
    const { id } = req.params;

    const selectQuery = `
      SELECT bm.*
      FROM bien_mobiliario bm
      INNER JOIN encargados e ON bm.id_encargado_per = e.id_encargado
      WHERE e.id_encargado = ? AND bm.estado != "BODEGA";
    `;

    connection.query(selectQuery, [id], (error, results) => {
      if (error) {
        console.error('Error al obtener bienes mobiliarios asignados:', error);
        return res.status(500).json({ mensaje: 'Error interno del servidor' });
      }

      res.status(200).json(results);
    });
  } catch (error) {
    console.error('Error interno del servidor:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

exports.getBienesTecnologicosByEncargado = async (req, res) => {
  try {
    const { id } = req.params;

    const selectQuery = `
      SELECT bt.*
      FROM bien_tecnologico bt
      INNER JOIN encargados e ON bt.id_encargado_per = e.id_encargado
      WHERE e.id_encargado = ? AND bt.estado != "BODEGA";
    `;

    connection.query(selectQuery, [id], (error, results) => {
      if (error) {
        console.error('Error al obtener bienes tecnológicos asignados:', error);
        return res.status(500).json({ mensaje: 'Error interno del servidor' });
      }

      res.status(200).json(results);
    });
  } catch (error) {
    console.error('Error interno del servidor:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};


exports.updateEncargadoMobiliario = (req, res) => {
  try {
    const id = req.params.id;
    const { id_encargado_per } = req.body;

    const updateQuery = `UPDATE bien_mobiliario SET id_encargado_per = ? WHERE id_bien = ?`;
    connection.query(updateQuery, [id_encargado_per, id], (error, results) => {
      if (error) {
        return res.status(500).json({ mensaje: 'Error interno del servidor' });
      }

      res.status(200).json({ mensaje: 'Traspado de bien exitoso' });
    });

  } catch (error) {
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

exports.updateEncargadoTecnologico = (req, res) => {
  try {
    const id = req.params.id;
    const { id_encargado_per } = req.body;

    const updateQuery = `UPDATE bien_tecnologico SET id_encargado_per = ? WHERE id_bien = ?`;
    connection.query(updateQuery, [id_encargado_per, id], (error, results) => {
      if (error) {
        return res.status(500).json({ mensaje: 'Error interno del servidor' });
      }

      res.status(200).json({ mensaje: 'Traspado de bien exitoso' });
    });

  } catch (error) {
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

exports.getBienesDisponibles = (req, res) => {
  try {
    const estadoBodega = 'BODEGA';

    const query = `
    SELECT id_bien, nombre, id_encargado_per, estado, codigoUTA, NULL as atributos
    FROM bien_mobiliario
    WHERE id_encargado_per IS NULL AND estado != '${estadoBodega}'
    UNION
    SELECT id_bien, nombre, id_encargado_per, estado, codigoUTA, atributos
    FROM bien_tecnologico
    WHERE id_encargado_per IS NULL AND estado != '${estadoBodega}'`;

    connection.query(query, (error, results) => {
      if (error) {
        console.error('Error al obtener bienes disponibles:', error);
        return res.status(500).json({ mensaje: 'Error interno del servidor' });
      }

      res.status(200).json(results);
    });
  } catch (error) {
    console.error('Error en la función getBienesDisponibles:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

