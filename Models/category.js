const db = require('../config/database');

const Category = {
    getAll: (callback) => {
        const query = 'SELECT * FROM Categories';
        db.query(query, callback);
    },
    create: (name, description, callback) => {
        const query = 'INSERT INTO Categories (name, description) VALUES (?, ?)';
        db.query(query, [name, description], callback);
    },
    getById: (id, callback) => {
        const query = 'SELECT * FROM Categories WHERE id = ?';
        db.query(query, [id], callback);
    },
    update: (id, name, description, callback) => {
        const query = 'UPDATE Categories SET name = ?, description = ? WHERE id = ?';
        db.query(query, [name, description, id], callback);
    },
    delete: (id, callback) => {
        const query = 'DELETE FROM Categories WHERE id = ?';
        db.query(query, [id], callback);
    }
};

module.exports = Category;
