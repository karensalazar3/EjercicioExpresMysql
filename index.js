const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = 3000;

app.use(bodyParser.json());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

db.connect(err => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
    } else {
        console.log('Conexión exitosa a la base de datos');
    }
});

app.post('/products', (req, res) => {
    const { name, description, price } = req.body;
    const query = 'INSERT INTO Products (name, description, price) VALUES (?, ?, ?)';
    db.query(query, [name, description, price], (err, result) => {
        if (err) {
            res.status(500).send('Error al añadir producto');
        } else {
            res.status(201).send('Producto añadido correctamente');
        }
    });
});

app.post('/categories', (req, res) => {
    const { name, description } = req.body;
    const query = 'INSERT INTO Categories (name, description) VALUES (?, ?)';
    db.query(query, [name, description], (err, result) => {
        if (err) {
            res.status(500).send('Error al añadir categoría');
        } else {
            res.status(201).send('Categoría añadida correctamente');
        }
    });
});

app.put('/products/:id', (req, res) => {
    const { id } = req.params;
    const { name, description, price } = req.body;
    const query = 'UPDATE Products SET name = ?, description = ?, price = ? WHERE id = ?';
    db.query(query, [name, description, price, id], (err, result) => {
        if (err) {
            res.status(500).send('Error al actualizar producto');
        } else {
            res.send('Producto actualizado correctamente');
        }
    });
});

app.put('/categories/:id', (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    const query = 'UPDATE Categories SET name = ?, description = ? WHERE id = ?';
    db.query(query, [name, description, id], (err, result) => {
        if (err) {
            res.status(500).send('Error al actualizar categoría');
        } else {
            res.send('Categoría actualizada correctamente');
        }
    });
});

app.get('/products', (req, res) => {
    const query = 'SELECT * FROM Products';
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).send('Error al obtener productos');
        } else {
            res.json(results);
        }
    });
});


app.get('/products-with-categories', (req, res) => {
    const query = `
        SELECT p.id AS product_id, p.name AS product_name, c.id AS category_id, c.name AS category_name 
        FROM Products p
        LEFT JOIN ProductCategories pc ON p.id = pc.product_id
        LEFT JOIN Categories c ON pc.category_id = c.id
    `;
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).send('Error al obtener productos con categorías');
        } else {
            res.json(results);
        }
    });
});


app.get('/products/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM Products WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            res.status(500).send('Error al obtener producto');
        } else {
            res.json(result);
        }
    });
});


app.get('/products/desc', (req, res) => {
    const query = 'SELECT * FROM Products ORDER BY price DESC';
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).send('Error al obtener productos');
        } else {
            res.json(results);
        }
    });
});

app.get('/products/search/:name', (req, res) => {
    const { name } = req.params;
    const query = 'SELECT * FROM Products WHERE name LIKE ?';
    db.query(query, [`%${name}%`], (err, results) => {
        if (err) {
            res.status(500).send('Error al buscar producto');
        } else {
            res.json(results);
        }
    });
});


app.delete('/products/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM Products WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            res.status(500).send('Error al eliminar producto');
        } else {
            res.send('Producto eliminado correctamente');
        }
    });
});


app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
