import express from "express";
import path from "path";
import ProductManager from "./ProductManager.js";

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

const productManager = new ProductManager(
  path.resolve(process.cwd(), "public", "products.json")
);

//Página inicial con mensaje de bienvenida
app.get("/", (req, res) => {
  res.send('<h1>Desafío backend nº3 Gattari Matías: servidor con express</h1>');
});

//Metodo get para obtener lista de productos, con limite query . Ruta
app.get("/products", async (req, res) => {
  try {
    const products = await productManager.getProducts();
    const limit = req.query.limit;
    let limitPerPage;
    if (limit) {
      limitPerPage = products.slice(0, limit);
    }
    res.send(limitPerPage || products);
  } catch (err) {
    res.status(500).send('Error de servidor, contacte con atencion al cliente.');
  }
});

//Mostrar el producto con ID especificado
app.get("/products/:id", async (req, res) => {
  try {

    const id = parseInt(req.params.id);
    const products = await productManager.getProducts();
    
    let productoFiltrado= products.find((product)=>product.id===id);
    if(productoFiltrado) {
      res.send(productoFiltrado);
    }else{res.send('<h2>Producto no encontrado, introduzca otro id.</h2>');}
    
  } catch (err) {
    res.status(500).send('Error de servidor, contacte con atencion al cliente.');
  }
});

// Método post para agregar nuevos productos
app.post("/products", async (req, res) => {
  try {
    const products = await productManager.getProducts();
    const newProduct = req.body;
    await productManager.addProduct(products, newProduct);
    res.send(newProduct);
  } catch (err) {
    res.status(500).send('Error de servidor, contacte con atencion al cliente.');
  }
});

//Levantado de servidor en variable "port".
app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});
