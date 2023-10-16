function changeLimit() {
  const limit = document.getElementById("limit").value;
 
  window.location.href = `/products?limit=${limit}`;
  
}
