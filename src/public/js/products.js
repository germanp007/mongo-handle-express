function changeLimit() {
  const limit = document.getElementById("limit").value;

  window.location.href = `/products?limit=${limit}`;
}

const addToCart = async (productId) => {
  console.log(productId);
  try {
    let cartId = "656514d3029fadadd97ba497";
    await fetch(`/api/carts/${cartId}/product/${productId}`, {
      method: "PUT",
    }).then((response) => {
      if (response.status === 200) {
        Swal.fire({
          title: "Genial!",
          text: "Se agrego correctamente al carrito",
          icon: "success",
        });
      } else {
        console.error("Error al agregar el producto al carrito");
      }
    });
  } catch (error) {
    console.error("Error al agregar el producto al carrito", error.message);
  }
};
