let prev = document.getElementById("prevButton");
let next = document.getElementById("nextButton");

prev.addEventListener("click", () => handlePagination(prev.dataset.link));
next.addEventListener("click", () => handlePagination(next.dataset.link));
console.log(next.dataset.link);
async function handlePagination(link) {
  if (link) {
    console.log(link);
    try {
      const response = await fetch(link);
      const data = await response.json();
      console.log(data.data);
      // Actualizar la sección de productos
    } catch (error) {
      console.error("Error al obtener datos de paginación:", error);
    }
  }
}
