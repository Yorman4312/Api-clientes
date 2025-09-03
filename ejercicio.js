/*
Para su proyecto formativo escoger una tabla o colección y crear una API que permita listar todos los objetos, consultar 1 objeto por ID y un objeto. Los objetos se almacenan en un Array de tipo objetos.

Subir a Git
*/

const express = require("express");
const app = express();

const port = 3000;

app.use(express.json());

// Array de objetos
let clientes = [
    {
        id: 1,
        nombre: "Yorman",
        correo: "Alirio@mail.com",
        telefono: "3001234527"
    },
    {
        id: 2,
        nombre: "Jhony",
        correo: "hola@mail.com",
        telefono: "3019876543"
    },
    {
        id: 3,
        nombre: "Carlos",
        correo: "poiuytrewq@mail.com",
        telefono: "3024565550"
    }
];

app.get("/", (req, res) => {
    res.send("Bienvenido a la API de Clientes");
});

// Listar todos los clientes
app.get("/clientes", (req, res) => {
    res.json(clientes);
});

// Consultar un cliente por ID
app.get("/clientes/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const cliente = clientes.find(c => c.id === id);

    if (cliente) {
        res.json(cliente);
    } else {
        res.status(404).send("Cliente no encontrado.");
    }
});

// Agregar un nuevo cliente
app.post("/clientes", (req, res) => {
    const { nombre, correo, telefono } = req.body;

    if (!nombre || !correo || !telefono) {
        return res.status(400).send("Faltan datos obligatorios (nombre, correo, telefono).");
    }

    // Generar un ID nuevo (el siguiente al último)
    const nuevoId = clientes.length > 0 ? clientes[clientes.length - 1].id + 1 : 1;
    const nuevoCliente = {
        id: nuevoId,
        nombre,
        correo,
        telefono
    };

    clientes.push(nuevoCliente);
    res.status(201).json(nuevoCliente);
});

// Servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en: http://localhost:${port}`);
});
