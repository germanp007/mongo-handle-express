const deleteProduct = async (productId) => {
  console.log(productId);

  try {
    let cartId = "656514d3029fadadd97ba497";
    const response = await fetch(`/api/carts/${cartId}/products/${productId}`, {
      method: "DELETE",
    });

    if (response.status === 200) {
      const result = await response.json();
      console.log(result);
      Swal.fire({
        title: "Eliminado",
        text: "Se ha borrado el Producto del Carrito",
        icon: "success",
      });
      setTimeout(() => {
        location.reload();
      }, 3000);

      console.log("Producto eliminado del carrito");
    } else {
      console.error("Error al eliminar el producto del carrito");
    }
  } catch (error) {
    console.error("Error al eliminar un producto:", error.message);
  }
};

const totalAmount = async () => {
  try {
    let cartId = "656514d3029fadadd97ba497";
    let total = 0;

    const response = await fetch(`/api/carts/${cartId}/`);
    const result = await response.json();
    console.log(JSON.stringify(result.data.products, null, 2));
    result.data.products.forEach((product) => {
      const { quantity, productId } = product;
      const { price } = productId;
      total += quantity * price;
    });

    document.getElementById("totalAmount").textContent = total;
  } catch (error) {
    console.log(error);
  }
};
totalAmount();
