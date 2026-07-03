// notifications.js - WebSocket notifications

const socket = new WebSocket("ws://localhost:3000");

socket.addEventListener("message", (event) => {
    const notificationContainer = document.getElementById("notificationContainer");

    if (notificationContainer) {
        const notification = document.createElement("div");
        notification.classList.add("notification");
        notification.textContent = event.data;
        notificationContainer.appendChild(notification);
    }
});
