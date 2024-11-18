const Category = require('../models/Category');

const CategoryController = {
    getAll: (req, res) => {
        Category.getAll((err, results) => {
            if (err) {
                return res.status(500).send('Error al obtener categorías');
            }
            res.json(results);
        });
    },
    create: (req, res) => {
        const { name, description } = req.body;
        Category.create(name, description, (err, result) => {
            if (err) {
                return res.status(500).send('Error al crear categoría');
            }
            res.status(201).send('Categoría creada');
        });
    },
    getById: (req, res) => {
        const { id } = req.params;
        Category.getById(id, (err, result) => {
            if (err || result.length === 0) {
                return res.status(404).send('Categoría no encontrada');
            }
            res.json(result[0]);
        });
    },
    update: (req, res) => {
        const { id } = req.params;
        const { name, description } = req.body;
        Category.update(id, name, description, (err, result) => {
            if (err) {
                return res.status(500).send('Error al actualizar categoría');
            }
            res.send('Categoría actualizada');
        });
    },
    delete: (req, res) => {
        const { id } = req.params;
        Category.delete(id, (err, result) => {
            if (err) {
                return res.status(500).send('Error al eliminar categoría');
            }
            res.send('Categoría eliminada');
        });
    }
};

module.exports = CategoryController;
