const connection = require('../db/connection');

const getProveedores = (req, res) => {
    try {
        const sql = 'SELECT * FROM proveedores';
        connection.query(sql, (err, data) => {
            if (err) {
                console.error('Error en la consulta SQL:', err);
                res.status(500).json({ error: 'Error en el servidor' });
            } else {
                res.json(data);
            }
        });
    } catch (error) {
        console.error('Error en la función getProveedores:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

const getProveedorById = (req, res) => {
    const { id } = req.params;
    try {
        const sql = 'SELECT * FROM proveedores WHERE id_proveedor = ?';
        connection.query(sql, [id], (err, data) => {
            if (err) {
                console.error('Error en la consulta SQL:', err);
                res.status(500).json({ error: 'Error en el servidor' });
            } else if (data.length === 0) {
                res.status(404).json({ error: 'Proveedor no encontrado' });
            } else {
                res.json(data[0]);
            }
        });
    } catch (error) {
        console.error('Error en la función getProveedorById:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

const createProveedor = (req, res) => {
    const { nombre, direccion, telefono } = req.body;
    try {
        const sql = 'INSERT INTO proveedores (nombre, direccion, telefono) VALUES (?, ?, ?)';
        connection.query(sql, [nombre, direccion, telefono], (err, result) => {
            if (err) {
                console.error('Error en la consulta SQL:', err);
                res.status(500).json({ error: 'Error en el servidor' });
            } else {
                res.status(201).json({ id: result.insertId, nombre, direccion, telefono });
            }
        });
    } catch (error) {
        console.error('Error en la función createProveedor:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

const updateProveedor = (req, res) => {
    const { id } = req.params;
    const { nombre, direccion, telefono } = req.body;
    try {
        const sql = 'UPDATE proveedores SET nombre = ?, direccion = ?, telefono = ? WHERE id_proveedor = ?';
        connection.query(sql, [nombre, direccion, telefono, id], (err, result) => {
            if (err) {
                console.error('Error en la consulta SQL:', err);
                res.status(500).json({ error: 'Error en el servidor' });
            } else if (result.affectedRows === 0) {
                res.status(404).json({ error: 'Proveedor no encontrado' });
            } else {
                res.json({ id, nombre, direccion, telefono });
            }
        });
    } catch (error) {
        console.error('Error en la función updateProveedor:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

const deleteProveedor = (req, res) => {
    const { id } = req.params;
    try {
        const sql = 'DELETE FROM proveedores WHERE id_proveedor = ?';
        connection.query(sql, [id], (err, result) => {
            if (err) {
                console.error('Error en la consulta SQL:', err);
                res.status(500).json({ error: 'Error en el servidor' });
            } else if (result.affectedRows === 0) {
                res.status(404).json({ error: 'Proveedor no encontrado' });
            } else {
                res.status(204).send();
            }
        });
    } catch (error) {
        console.error('Error en la función deleteProveedor:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

module.exports = {
    getProveedores,
    getProveedorById,
    createProveedor,
    updateProveedor,
    deleteProveedor
};
