/*const socket = io();
socket.emit('msg', 'este es el mensaje de socket');

socket.on('msg_individual', data => {
    console.log(data);
});

socket.on('msg_todos_menos_el_socket', data => {
    console.log(data);
});

socket.on('msg_todos', data => {
    console.log(data);
});*/


const socket = io();

const form = document.getElementById("productForm");
const titleInput = document.getElementById("title");
const priceInput = document.getElementById("price");
console.log('hola');

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const newProduct = {
        title: titleInput.value,
        price: priceInput.value,
    };
    console.log('escuchando', newProduct);
    socket.emit("products", newProduct.value);
    titleInput.value = "";
    priceInput.value = "";
});

/*
socket.on('products', (products) =>{
    fetch('products.hbs')
        .then((data) =>data.text())
        .then((serverTemplate) =>{
            const template = Handlebars.compile(serverTemplate);
            const html = template({products});
            tabla.innerHTML = html;
        });  
});*/
/*
socket.on('product', (data) => {
    document.querySelector('div').innerHTML = data
  })*/
  

socket.on('products', (data) => {
    const products = data.map(prod => {
      return `title: ${prod.title} -> price: ${prod.price}`
    }).join('<br>')
    console.log('prendido', products);
    document.querySelector('p').innerHTML = products;
  })
