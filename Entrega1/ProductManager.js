class ProductManager{
   
    constructor(){
        this.products = [];
    }

    addProduct(title, description, price, thumbnail, code, stock){
        if(title != "" && description != "" && price != null && thumbnail != "" && code != ""){
            let product = {
                title,
                description,
                price,
                thumbnail,
                code,
                stock,
            };

            if (this.products.length === 0) {
                product['id'] = 1;
                this.products.push(product);
            }else{
                let codeValues = this.products.find(product => product['code'] === code);
                if(!codeValues){
                    product['id'] = this.products[this.products.length - 1]['id'] + 1;
                    this.products.push(product);
                }
                else{
                    console.log("producto repetido");
                }
            
            }
        }
    };   

    getProducts(){
        return this.products;
    };

    getProductById(id){
        let product = this.products.find(product => product['id'] === id);
        if (product != null){
            return product;
        }else{
            console.log("Product not found");
            return null;
        }
    };

};


//Prueba
 
/* 

let productos = new ProductManager();
console.log(productos.getProducts());
let titulo = "producto prueba"
let descripcion = "Este es un producto prueba"
let precio = 200;
let img = "sin imagene"
let code = "abc123"
let stock = 25;
productos.addProduct(titulo, descripcion, precio, img, code, stock);
console.log(productos.getProducts());
productos.addProduct(titulo, descripcion, precio, img, code, stock);
let id = 1;
console.log(productos.getProductById(id));
id = 2;
productos.getProductById(id);

*/