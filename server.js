
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const PORT = 3000;

// --- Middlewares ---
// Habilitar CORS para permitir peticiones desde el frontend
app.use(cors());
// Habilitar el parseo de JSON en el body de las peticiones
app.use(express.json());

// --- Conexión a la Base de Datos SQLite ---
const db = new sqlite3.Database('./galleteria.db', (err) => {
    if (err) {
        console.error("Error al conectar con la base de datos:", err.message);
    } else {
        console.log("Conectado a la base de datos 'galleteria.db'.");
    }
});

// --- Creación de la Tabla de Pedidos ---
// Se asegura de que la tabla 'pedidos' exista al iniciar el servidor.
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS pedidos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            cliente TEXT NOT NULL,
            fecha TEXT NOT NULL,
            detalles_galletas TEXT,
            total_dolares REAL,
            abono_dolares REAL,
            pendiente_dolares REAL,
            total_bolivares REAL
        )
    `, (err) => {
        if (err) {
            console.error("Error al crear la tabla 'pedidos':", err.message);
        } else {
            console.log("Tabla 'pedidos' lista.");
        }
    });
});


// --- Rutas de la API ---

/**
 * @route   POST /api/guardar-pedido
 * @desc    Guarda un nuevo pedido en la base de datos.
 * @access  Public
 */
app.post('/api/guardar-pedido', (req, res) => {
    const {
        cliente,
        fecha,
        detalles_galletas,
        total_dolares,
        abono_dolares,
        pendiente_dolares,
        total_bolivares
    } = req.body;

    // Los detalles de las galletas (array de objetos) se convierten a un string JSON para guardarlos.
    const detallesJSON = JSON.stringify(detalles_galletas);

    const sql = `INSERT INTO pedidos (cliente, fecha, detalles_galletas, total_dolares, abono_dolares, pendiente_dolares, total_bolivares)
                 VALUES (?, ?, ?, ?, ?, ?, ?)`;
    
    const params = [cliente, fecha, detallesJSON, total_dolares, abono_dolares, pendiente_dolares, total_bolivares];

    db.run(sql, params, function(err) {
        if (err) {
            console.error("Error al insertar el pedido:", err.message);
            return res.status(500).json({ error: "Error al guardar el pedido." });
        }
        res.status(201).json({
            message: "Pedido guardado exitosamente.",
            pedidoId: this.lastID
        });
    });
});


/**
 * @route   GET /api/obtener-pedidos
 * @desc    Obtiene todos los pedidos de la base de datos.
 * @access  Public
 */
app.get('/api/obtener-pedidos', (req, res) => {
    const sql = "SELECT * FROM pedidos ORDER BY fecha DESC";

    db.all(sql, [], (err, rows) => {
        if (err) {
            console.error("Error al obtener los pedidos:", err.message);
            return res.status(500).json({ error: "Error al obtener los pedidos." });
        }
        
        // Convertimos el string JSON de 'detalles_galletas' de nuevo a un objeto.
        const pedidos = rows.map(row => ({
            ...row,
            detalles_galletas: JSON.parse(row.detalles_galletas || '[]')
        }));

        res.status(200).json(pedidos);
    });
});


// --- Iniciar el Servidor ---
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

