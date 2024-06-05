const connection = require('../db/connection');

// Obtener todas las áreas
const getAreas = (req, res) => {
    try {
      const sql = `
        SELECT areas.*, bloques.nombre AS nombre_bloque
        FROM areas
        INNER JOIN bloques ON areas.id_bloque_per = bloques.id_bloque
      `;
      connection.query(sql, (err, data) => {
        if (err) {
          console.error('Error en la consulta SQL:', err);
          res.status(500).json({ error: 'Error en el servidor' });
        } else {
          res.json(data);
        }
      });
    } catch (error) {
      console.error('Error en la función getAreas:', error);
      res.status(500).json({ error: 'Error en el servidor' });
    }
  };

const getAreasFisei = (req, res) => {
  const { id_bloque_per } = req.params; // O req.query dependiendo de cómo envíes el parámetro
  try {
      const sql = 'SELECT * FROM areas WHERE id_bloque_per = ?';
      connection.query(sql, [id_bloque_per], (err, data) => {
          if (err) {
              console.error('Error en la consulta SQL:', err);
              res.status(500).json({ error: 'Error en el servidor' });
          } else {
              res.json(data);
          }
      });
  } catch (error) {
      console.error('Error en la función getAreasFisei:', error);
      res.status(500).json({ error: 'Error en el servidor' });
  }
};

// Obtener un área por ID
const getAreaById = (req, res) => {
    const { id } = req.params;
    try {
        const sql = 'SELECT * FROM areas WHERE id_area = ?';
        connection.query(sql, [id], (err, data) => {
            if (err) {
                console.error('Error en la consulta SQL:', err);
                res.status(500).json({ error: 'Error en el servidor' });
            } else if (data.length === 0) {
                res.status(404).json({ error: 'Área no encontrada' });
            } else {
                res.json(data[0]);
            }
        });
    } catch (error) {
        console.error('Error en la función getAreaById:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

// Crear una nueva área
const createArea = (req, res) => {
    const { nombre, num_piso, id_bloque_per } = req.body;
    try {
        const sql = 'INSERT INTO areas (nombre, num_piso, id_bloque_per) VALUES (?, ?, ?)';
        connection.query(sql, [nombre, num_piso, id_bloque_per], (err, result) => {
            if (err) {
                console.error('Error en la consulta SQL:', err);
                res.status(500).json({ error: 'Error en el servidor' });
            } else {
                res.status(201).json({ id: result.insertId, nombre, num_piso, id_bloque_per });
            }
        });
    } catch (error) {
        console.error('Error en la función createArea:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

// Actualizar un área
const updateArea = (req, res) => {
    const { id } = req.params;
    const { nombre, num_piso, id_bloque_per } = req.body;
    try {
        const sql = 'UPDATE areas SET nombre = ?, num_piso = ?, id_bloque_per = ? WHERE id_area = ?';
        connection.query(sql, [nombre, num_piso, id_bloque_per, id], (err, result) => {
            if (err) {
                console.error('Error en la consulta SQL:', err);
                res.status(500).json({ error: 'Error en el servidor' });
            } else if (result.affectedRows === 0) {
                res.status(404).json({ error: 'Área no encontrada' });
            } else {
                res.json({ id, nombre, num_piso, id_bloque_per });
            }
        });
    } catch (error) {
        console.error('Error en la función updateArea:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};


// Eliminar un área
const deleteArea = (req, res) => {
    const { id } = req.params;
    try {
        // Actualizar campos id_area_per a NULL en bien_mobiliario y bien_tecnologico
        const updateBienMobiliarioQuery = 'UPDATE bien_mobiliario SET id_area_per = NULL WHERE id_area_per = ?';
        const updateBienTecnologicoQuery = 'UPDATE bien_tecnologico SET id_area_per = NULL WHERE id_area_per = ?';

        connection.query(updateBienMobiliarioQuery, [id], (err, result) => {
            if (err) {
                console.error('Error en la consulta SQL para bien_mobiliario:', err);
                return res.status(500).json({ error: 'Error en el servidor al actualizar bien_mobiliario' });
            }

            connection.query(updateBienTecnologicoQuery, [id], (err, result) => {
                if (err) {
                    console.error('Error en la consulta SQL para bien_tecnologico:', err);
                    return res.status(500).json({ error: 'Error en el servidor al actualizar bien_tecnologico' });
                }

                // Después de actualizar, eliminar el área
                const deleteAreaQuery = 'DELETE FROM areas WHERE id_area = ?';
                connection.query(deleteAreaQuery, [id], (err, result) => {
                    if (err) {
                        console.error('Error en la consulta SQL para eliminar área:', err);
                        res.status(500).json({ error: 'Error en el servidor' });
                    } else if (result.affectedRows === 0) {
                        res.status(404).json({ error: 'Área no encontrada' });
                    } else {
                        res.status(204).send();
                    }
                });
            });
        });
    } catch (error) {
        console.error('Error en la función deleteArea:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

module.exports = {
    getAreas,
    getAreasFisei,
    getAreaById,
    createArea,
    updateArea,
    deleteArea
};
