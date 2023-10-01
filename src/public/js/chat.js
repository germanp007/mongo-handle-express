chatSocket = io();

const chat = document.getElementById("chat-container");
const mensaje = document.getElementById("realtime-form");
document.getElementById("realtime-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const mensaje2 = document.getElementById("input-message").value;
  const jsonMessage = {
    message: mensaje2,
  };
  // Obtiene el valor del campo de texto
  console.log(jsonMessage);
  chatSocket.emit("sendMessage", jsonMessage);
});

chatSocket.on("messagesHistory", (socket) => {
  console.log(socket);
});
