import express from 'express';
import cors from 'cors';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';

const app = express();
const PORT = 3000;

// --- Configuración de la Base de Datos (lowdb) ---
const adapter = new JSONFile('db.json');
const defaultData = { pedidos: [] };
const db = new Low(adapter, defaultData);

// Cargar la base de datos
await db.read();

// --- Middlewares ---
app.use(cors());
app.use(express.json());

// Serve static files (HTML, CSS, JS)
app.use(express.static('.'));

// --- Root Route ---
app.get('/', (req, res) => {
    res.sendFile('index.html', { root: '.' });
});

// --- Rutas de la API ---

/**
 * @route   POST /api/guardar-pedido
 * @desc    Guarda un nuevo pedido en la base de datos.
 * @access  Public
 */
app.post('/api/guardar-pedido', async (req, res) => {
    try {
        const nuevoPedido = req.body;
        
        // Añade un ID único y una fecha de guardado al pedido
        nuevoPedido.id = Date.now();
        nuevoPedido.fechaGuardado = new Date().toISOString();

        db.data.pedidos.push(nuevoPedido);
        await db.write(); // Guarda los cambios en el archivo db.json

        res.status(201).json({
            message: "Pedido guardado exitosamente.",
            pedido: nuevoPedido
        });

    } catch (error) {
        console.error("Error al guardar el pedido:", error);
        res.status(500).json({ error: "Error interno al guardar el pedido." });
    }
});

/**
 * @route   GET /api/obtener-pedidos
 * @desc    Obtiene todos los pedidos de la base de datos.
 * @access  Public
 */
app.get('/api/obtener-pedidos', (req, res) => {
    try {
        const pedidos = db.data.pedidos;
        res.status(200).json(pedidos);
    } catch (error) {
        console.error("Error al obtener los pedidos:", error);
        res.status(500).json({ error: "Error interno al obtener los pedidos." });
    }
});

// --- Iniciar el Servidor ---
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});