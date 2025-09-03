const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Conexión a MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("Conexión a MongoDB"))

// Definir el modelo de Fruta
const frutaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  precio: {type: Number, required: true },
  estatus: { type: Boolean, required: true }
});

const Fruta = mongoose.model("Fruta", frutaSchema);

// Método GET (Obtener todas las frutas)
app.get("/frutas", async (req, res) => {
  const frutas = await Fruta.find();
  res.json(frutas);
});

// Método GET (Obtener una fruta especifica)
app.get("/productos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const producto = productos.find(p => p.id === id);
  producto ? res.json(producto) : res.status(404).send("Producto no encontrado");
});

// Método POST( Crear nueva fruta)
app.post("/frutas", async (req, res) => {
  const nuevaFruta = new 
  Fruta(req.body);
  await nuevaFruta.save();
  res.json(nuevaFruta);
});

// Método PUT (Actualizar fruta)
app.put("/frutas/:id", async (req, res) => {
  const frutaActualizada = await Fruta.findByIdAndUpdate(
  req.params.id, req.body, { new: true });
  res.json(frutaActualizada);
});

// Delete (Eliminar fruta)
app.delete("/frutas/:id", async (req, res) => {
  await Fruta.findByIdAndDelete(req.params.id);
  res.json({ mensaje: "Fruta eliminada" });
});

// Iniciar servidor
const PORT = 4312;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});