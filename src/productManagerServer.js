import fs from "fs";

class ProductManager {
    constructor() {
        this.products = []
        this.path = "products.json";
        this.createLocalFile()
    }

    createLocalFile = () => {
        if (fs.existsSync(this.path)) {
            console.log("El archivo local en la ruta products.json ya fue creado, por lo que no se creará nuevamente.")
        }
        else {
            this.saveLocalFile()
        }
    }
    saveLocalFile = () => {
        fs.writeFileSync(this.path, JSON.stringify(this.products));
    }

    getProducts = () => {
        this.products = JSON.parse(fs.readFileSync(this.path, "utf-8"));
        return this.products;
    }




    addProduct = (title, description, price, thumbnail, code, stock) => {

        const isDuplicate = this.products.some((product) => product.code === code);
        if (isDuplicate) {
            console.error("ERROR: Este producto ya existe");
            return;
        }
        if (!title || !description || !price || !thumbnail || !code || stock === undefined) {
            console.error("Por favor completar todos los datos");
            return;
        }


        const product = {
            id: this.products.length + 1,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }

        if (this.products.length === 0) {
            product.id = 1;
        }
        else {
            product.id = this.products[this.products.length - 1].id + 1;
        }
        this.products.push(product);
        this.saveLocalFile()
    }


    getProductById = (id) => {
        const productsTranslated = this.getProducts()
        let productFinderById = productsTranslated.find((obj) => obj.id === id);
        if (productFinderById) {
            return productFinderById
        }
        else if (productFinderById == undefined) {
            console.error("Producto no encontrado por ID")
        }
    }



    deleteProduct = (id) => {
        this.products = this.getProducts()
        const productFoundById = this.getProductById(id)
        if (productFoundById === undefined) {
            console.error("Producto no encontrado por ID")
        }
        else {
            this.products = this.products.filter((obj) => obj.id != productFoundById.id)
            this.saveLocalFile()
            console.log("Archivo Eliminado")
        }
    }

    updateProduct = (id, data) => {
        this.products = this.getProducts();
        const index = this.products.findIndex((obj) => obj.id === id)

        if (index !== -1) {
            this.products[index] = data
            this.products[index].id = id
            this.saveLocalFile()
            console.log("Cambios Realizados en el producto con id: " + id)
        }
        else {
            console.log("Producto no encontrado por ID")
        }
    }
}

export default ProductManager