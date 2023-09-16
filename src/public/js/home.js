document.addEventListener("click", function (event) {
  if (event.target && event.target.classList.contains("delete-product")) {
    const productId = event.target.dataset.productid;

    if (confirm("¿Estás seguro de que quieres eliminar este producto?")) {
      fetch(`/api/products/${productId}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          console.log("Producto eliminado correctamente", data);
          alert("Producto eliminado correctamente");
        })
        .catch((error) => {
          console.error("Error al eliminar el producto:", error);
        });
    }
  }
});
