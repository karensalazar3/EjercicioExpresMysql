const Product = require('../models/Product');

const ProductController = {
    getAll: (req, res) => {
        Product.getAll((err, results) => {
            if (err) {
                return res.status(500).send('Error al obtener productos');
            }
            res.json(results);
        });
    },
    create: (req, res) => {
        const { name, description, price } = req.body;
        Product.create(name, description, price, (err, result) => {
            if (err) {
                return res.status(500).send('Error al crear producto');
            }
            res.status(201).send('Producto creado');
        });
    },
    getById: (req, res) => {
        const { id } = req.params;
        Product.getById(id, (err, result) => {
            if (err || result.length === 0) {
                return res.status(404).send('Producto no encontrado');
            }
            res.json(result[0]);
        });
    },
    update: (req, res) => {
        const { id } = req.params;
        const { name, description, price } = req.body;
        Product.update(id, name, description, price, (err, result) => {
            if (err) {
                return res.status(500).send('Error al actualizar producto');
            }
            res.send('Producto actualizado');
        });
    },
    delete: (req, res) => {
        const { id } = req.params;
        Product.delete(id, (err, result) => {
            if (err) {
                return res.status(500).send('Error al eliminar producto');
            }
            res.send('Producto eliminado');
        });
    }
};

module.exports = ProductController;
