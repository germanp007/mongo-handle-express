const webSocket = io();
const productContainer = document.getElementById("productContainer");
const realTimeForm = document.getElementById("realtime-form");

realTimeForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const form = new FormData(realTimeForm);

  const productJson = {};

  for (const [key, value] of form.entries()) {
    productJson[key] = value;
  }
  productJson.price = productJson.price;
  productJson.thumbnail = productJson.thumbnail.name;
  console.log(productJson);
  webSocket.emit("addProduct", productJson);
  realTimeForm.reset();
});

document.addEventListener("click", function (event) {
  console.log(event.target.classList.contains("delete-product"));
  if (event.target && event.target.classList.contains("delete-product")) {
    const confirmed = confirm("Estas seguro que quieres borrar este producto");
    if (confirmed) {
      const productId = event.target.dataset.productid;
      console.log(productId);
      webSocket.emit("deleteProduct", productId);
    }
  }
});
webSocket.on("productList", (info) => {
  productContainer.innerHTML = info.map((a) => {
    return `
  <div class="card">
  <img src="public/images/${a.thumbnail}" alt="${a.title}">
  <h1>${a.title}</h1>
  <h3>${a.description}</h3>
  <div class="category">
    <h5>category: ${a.category}</h5>
    <h3>${a.price}usd$</h3>
  </div>
  <button class="delete-product" data-productid="${a._id}" >Eliminar
    Producto</button>
</div>
`;
  });
});
