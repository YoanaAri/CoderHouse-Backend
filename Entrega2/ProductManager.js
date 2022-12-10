const fs = require('fs');

class ProductManager{
   
    constructor(fileName){
        if(fs.existsSync(fileName)){
            this.path = fileName;
            this.products = JSON.parse(fs.readFileSync(fileName), 'utf-8');
        }else{
            this.path = fileName;
            this.products = [];
        }
    };

    async addProduct(title, description, price, thumbnail, code, stock){
        if(title != "" && description != "" && price != null && thumbnail != "" && code != ""){
            let product = {
                title,
                description,
                price,
                thumbnail,
                code,
                stock, 
            };

            //console.log(this.products.length);

            if (this.products.length === 0) {
                product['id'] = 1;
                this.products.push(product);
                await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, '\t'));
            }else{
                let codeValues = this.products.find(product => product['code'] === code);
                if(!codeValues){
                    product['id'] = this.products[this.products.length - 1]['id'] + 1;
                    this.products.push(product);
                    await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, '\t'));
                }
                else{
                    console.log("producto repetido");
                }
            
            }

        };
    };

    async getProducts(){
        if(fs.existsSync(this.path)){
            return JSON.parse( await fs.promises.readFile(this.path, 'utf-8'));
        }else{
            return this.products;
        }
    };

    async getProductById(id){
        let product = await this.products.find(product => product['id'] === id);
        if (product != null){
            console.log(product);
            return product;
        }else{
            console.log("Product not found");
            return null;
        }
    };

    async updateProduct(id, title, description, price, thumbnail, code, stock){
        let product = await this.getProductById(id);
        if(product!= null){
            product.title = title;
            product.description = description;
            product.price = price;
            product.thumbnail = thumbnail;
            product.code = code;
            product.stock = stock;
        }
    };

    async deleteProduct(id){
        let product = await this.getProductById(id);
        if(product!= null){
            this.products.splice(this.products.indexOf(product), 1);
            console.log('soy los nuevos productos', this.products);
            await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, '\t'));
        }
    }
};


//Prueba
 

let fileName = "./Products.JSON";
let productos = new ProductManager(fileName);

productos.getProducts().then(res => console.log('primero', res))
    .then(
        () => {
            let titulo = "producto prueba"
            let descripcion = "Este es un producto prueba"
            let precio = 200;
            let img = "sin imagene"
            let code = "abc123"
            let stock = 25;
            
            productos.addProduct(titulo, descripcion, precio, img, code, stock);
            productos.getProducts().then(res => console.log('agregado',res));
        }
    )
        .then(
            () => {
                let id = 1;
                productos.getProductById('id', id);
                id = 2;
                productos.getProductById('id', id);
            }
        )
            .then(
                () => {
                    titulo = "producto prueba2"
                    descripcion = "Este es un producto prueba2"
                    precio = 300;
                    img = "sin imagene"
                    code = "bca123"
                    stock = 30;
                    productos.addProduct(titulo, descripcion, precio, img, code, stock);
                    productos.getProducts().then(res => console.log('agregado', res));
                }
            )
               .then(
                    () => {
                        titulo = "update producto prueba2"
                        descripcion = "Este es un producto prueba2"
                        precio = 300;
                        img = "sin imagene"
                        code = "bca123"
                        stock = 30;
                        productos.updateProduct(2, titulo, descripcion, precio, img, code, stock);
                        productos.getProducts().then(res => console.log('update', res));
                    }
                    
                )
                   .then(
                        () => {
                            productos.deleteProduct(1);
                            productos.getProducts().then(res => console.log('delete', res));
                        }
                        
                    );
