const socket = new WebSocket("wss://echo-ws-service.herokuapp.com");

const chatWindow = document.getElementById("chat-window");
const messageInput = document.getElementById("message-input");
const sendButton = document.getElementById("send-button");
const geoButton = document.getElementById("geo-button");

function addMessage(text, className) {
    const message = document.createElement("div");
    message.classList.add("message", className);
    message.textContent = text;
    chatWindow.appendChild(message);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

sendButton.addEventListener("click", () => {
    const messageText = messageInput.value.trim();
    if (messageText) {
        addMessage(messageText, "user"); 
        socket.send(messageText); 
        messageInput.value = ""; 
    }
});

socket.addEventListener("message", (event) => {
    addMessage(event.data, "server"); 
});

geoButton.addEventListener("click", () => {
    if (!navigator.geolocation) {
        alert("Геолокация не поддерживается вашим браузером");
        return;
    }

    navigator.geolocation.getCurrentPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            const geoUrl = `https://www.openstreetmap.org/#map=15/${latitude}/${longitude}`;

        
            const geoMessage = document.createElement("div");
            geoMessage.classList.add("message", "user", "geo");
            geoMessage.innerHTML = `<a href="${geoUrl}" target="_blank">📍 Моя гео-локация</a>`;
            chatWindow.appendChild(geoMessage);
            chatWindow.scrollTop = chatWindow.scrollHeight;

        
            socket.send(`Гео-локация: ${latitude}, ${longitude}`);
        },
        () => {
            alert("Не удалось получить геолокацию");
        }
    );
});