const fs = require('fs');


class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = [];
  }
  
   addProduct(title, description, price, thumbnail, code, stock) {
      const product = {
        id: this.products.length + 1,
        title,
        description,
        price,
        thumbnail,
        code,
        stock
      };

      //todos son obligatorios
      let condition = this.products.find((product) => product.code === code);
      if (condition) {
        return console.log("El producto ya existe");
      }  if (
        title === undefined ||
        description === undefined ||
        price === undefined ||
        thumbnail === undefined ||
        code === undefined ||
        stock === undefined
      ) {
        return console.log("Todos los campos son obligatorios");
      } else {
        this.products.push(product)
      }


      //creacion de archivo FS(txt) donde se cargan cada  producto agregado
      const productTXT = JSON.stringify(product);

      const existenciaArchivo = fs.existsSync('./products.txt')
      if(existenciaArchivo) {
        fs.appendFileSync('./products.txt',productTXT + "\n" )
            } else {
              // fs.writeFileSync('./products.json',"[]");
              fs.writeFileSync('./products.txt', productTXT+ "\n" )}
    }
  
    getProducts() {
      return this.products;
    }
  

    getProductById(id) {
      let idFilter = Number(parseInt(id));
      let productoFiltrado = null;
      this.products.forEach((product) => {
        if (product.id === idFilter) {
            productoFiltrado = product;
        }
      });
      if (productoFiltrado === null) {
        return console.log("Product NOT found");
      } else {
        return productoFiltrado;
      }
    }


    updateProduct(id, title, description, price, thumbnail, code, stock) {
        let idFilter = Number(parseInt(id));
        let productoFiltrado = null;
        this.products.forEach((product) => {
          if (product.id === idFilter) {
              productoFiltrado = product;
          }
        });
        if (productoFiltrado === null) {
          return console.log("No existe el producto");
        } else {
          if (title !== undefined) {
            productoFiltrado.title = title;
          }
          if (description !== undefined) {
            productoFiltrado.description = description;
          }
          if (price !== undefined) {
            productoFiltrado.price = price;
          }
          if (thumbnail !== undefined) {
            productoFiltrado.thumbnail = thumbnail;
          }
          if (code !== undefined) {
            productoFiltrado.code = code;
          }
          if (stock !== undefined) {
            productoFiltrado.stock = stock;
          }
        }


        const fecha = new Date()
        const productoUpdate = `Producto modificado el dìa ${fecha} `

        fs.appendFileSync('./products.txt',productoUpdate + JSON.stringify(productoFiltrado) + "\n" )
      }


    
    deleteProduct (id){
        let idFilter = Number(parseInt(id));
        let productoFiltrado = null;
        this.products.forEach((product) => {
          if (product.id === idFilter) {
              productoFiltrado = product;
          }
        });
       
        let index = this.products.indexOf(productoFiltrado);
      this.products.splice(index, 1);
    }
  }




//COMANDOS DE PRUEBA DE CLASS CONSTRUCTORA

// const productManager = new ProductManager();
// productManager.addProduct(
//   "Remera",
//   "Remera de algodon",
//   1000,
//   "https://www.google.com/url?sa=i&url=https%3A%2F%2Fes.vecteezy.com%2Ffree-png-es%2Fremera&psig=AOvVaw1ZTU6UeioevU4qe9gMA_FL&ust=1670082090683000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCPD4keCi2_sCFQAAAAAdAAAAABAE",
//   "1234",
//   10
// );
// productManager.addProduct(
//   "Short",
//   "Short para natación",
//   1050,
//   "https://www.google.com/url?sa=i&url=https%3A%2F%2Fes.vecteezy.com%2Ffree-png-es%2Fremera&psig=AOvVaw1ZTU6UeioevU4qe9gMA_FL&ust=1670082090683000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCPD4keCi2_sCFQAAAAAdAAAAABAE",
//   "12334",
//   15
// );
// productManager.addProduct(
//   "Buzo",
//   "Buzo de algodon",
//   3000,
//   "https://www.google.com/url?sa=i&url=https%3A%2F%2Fes.vecteezy.com%2Ffree-png-es%2Fremera&psig=AOvVaw1ZTU6UeioevU4qe9gMA_FL&ust=1670082090683000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCPD4keCi2_sCFQAAAAAdAAAAABAE",
//   "12534",
//   14
// );



// console.log("getProducts: ",productManager.getProducts());

// console.log("producto filtrado",productManager.getProductById(3));

// productManager.updateProduct(3,
//     "Pantufla",
//     "Pantufla de algodon",
//     1500,
//     "https://www.google.com/url?sa=i&url=https%3A%2F%2Fes.vecteezy.com%2Ffree-png-es%2Fremera&psig=AOvVaw1ZTU6UeioevU4qe9gMA_FL&ust=1670082090683000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCPD4keCi2_sCFQAAAAAdAAAAABAE",
//     "12934",
//     15
//     );
    
// console.log("producto modificado",productManager.getProductById(3));

// console.log("producto filtrado luego de modificar",productManager.getProductById(3));

// productManager.deleteProduct(3);

// console.log("producto eliminado",productManager.getProductById(3));


// module.exports = ProductManager;


export default ProductManager;