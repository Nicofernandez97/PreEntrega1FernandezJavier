import express from "express"; // Para este medio de importación, colocar en package.json luego de una , "type": "module"
import ProductManager from "../src/productManagerServer.js"

// Nodemon: Start del server vía nodemon app.js (checkear terminal que esté parada en la carpeta src). 
//En diferencia al entregable 2, en este caso los productos fueron creados previamente, por lo que saldrá en el console.log que ya fueron creados.
const app = express();
app.use(express.urlencoded({ extended: true })) //Para uso correcto de Queries en express
const newManager = new ProductManager()
const productosPrecreados = newManager.getProducts()

app.get("/", (req, res) => {
    res.send("Bienvenido al server local en el puerto 8080. Actualmente se encuentran utilizables las rutas /products (solo o con query ?limit) y /products/:pid (id que exista) ");
});

app.get("/products", (req, res) => {
    let { limit } = req.query
    if (limit !== undefined) {
        res.send(productosPrecreados.filter((prod) => prod.id <= limit))

    }
    else {
        res.send(productosPrecreados)
    }
});

app.get("/products/:pid", (req, res) => {
    let idUser = req.params.pid;
    let productoPorId = productosPrecreados.find((prod) => prod.id == idUser)
    if (productoPorId !== undefined) {
        res.send(productoPorId)
    }
    else {
        res.send("Producto no encontrado por id, por favor elegir un ID del 1 al 10")
    }
});

app.listen(8080, () => console.log("Corriendo server en http://localhost:8080/ ")); // 8080 Puerto por defecto liberado para dev.
