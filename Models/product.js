const db = require('../config/database');

const Product = {
    getAll: (callback) => {
        const query = 'SELECT * FROM Products';
        db.query(query, callback);
    },
    create: (name, description, price, callback) => {
        const query = 'INSERT INTO Products (name, description, price) VALUES (?, ?, ?)';
        db.query(query, [name, description, price], callback);
    },
    getById: (id, callback) => {
        const query = 'SELECT * FROM Products WHERE id = ?';
        db.query(query, [id], callback);
    },
    update: (id, name, description, price, callback) => {
        const query = 'UPDATE Products SET name = ?, description = ?, price = ? WHERE id = ?';
        db.query(query, [name, description, price, id], callback);
    },
    delete: (id, callback) => {
        const query = 'DELETE FROM Products WHERE id = ?';
        db.query(query, [id], callback);
    }
};

module.exports = Product;
