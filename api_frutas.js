const express = require('express');
// import express from 'express';

const app = express()
const port = 3000

app.use(express.json());

let frutas = [
    "Piña",
    "Kiwi",
    "Zapote",
    "Banano"
]

// Ruta Bienvenida
app.get("/", (req, res) => {
    res.send("Bienvenido a la api de frutas")
})

// Obtener todas las frutas
app.get("/frutas", (req, res) => {
    res.json(frutas);
})

// Obtener una fruta por la ubicación en el array
app.get("/frutas/:id", (req, res) => {
    const id = parseInt(req.params.id)
    frutas[id]
        ? res.json(frutas[id])
        : res.status(404).send("Fruta no encontrada.")
})

// Agregar un objeto
app.post("/frutas", (req, res) => {
    const { nombre } = req.body;
    if(!nombre) {
        res.status(404).send("No definido")
    }
    else{
        frutas.push(nombre);
        res.status(201).send(`Fruta ${nombre} agregada correctamente.`)
    }
})

// Servidor
app.listen(port, () => {
    console.log(`El servidor se está escuchando en: http://localhost:${port}`);
})