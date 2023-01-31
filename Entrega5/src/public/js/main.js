const socket = io();

const form = document.getElementById("productForm");
const titleInput = document.getElementById("title");
const priceInput = document.getElementById("price");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const newProduct = {
        title: titleInput.value,
        price: priceInput.value,
    };
    socket.emit("products", newProduct);
    titleInput.value = "";
    priceInput.value = "";
});

socket.on('products', (data) => {
    const products = data.map(prod => {
      return `title: ${prod.title} -> price: ${prod.price}`
    }).join('<br>')
    document.querySelector('p').innerHTML = products;
  })
