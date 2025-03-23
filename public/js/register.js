document.addEventListener("DOMContentLoaded", function () {
    // Pre-fill role if selected from role-selection.html
    const selectedRole = localStorage.getItem("selectedRole");
    if (selectedRole) {
        document.getElementById("role").value = selectedRole;
    }
});

document.getElementById("registerForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const role = document.getElementById("role").value.trim();
    const submitButton = document.querySelector("button[type='submit']");

    if (!name || !email || !password || !role) {
        showMessage("All fields are required!", "error");
        return;
    }

    submitButton.disabled = true; // Disable button while processing
    submitButton.innerText = "Registering...";

    try {
        const response = await fetch("http://localhost:3000/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password, role })
        });

        const data = await response.json();

        if (data.success) {
            showMessage("Account Created Successfully!", "success");
            setTimeout(() => {
                window.location.href = "/login.html"; // Redirect to login
            }, 1500);
        } else {
            showMessage(data.message, "error");
        }
    } catch (error) {
        showMessage("Server error. Please try again later.", "error");
    } finally {
        submitButton.disabled = false; // Re-enable button
        submitButton.innerText = "Register";
    }
});

// Function to show messages dynamically
function showMessage(message, type) {
    let messageBox = document.getElementById("messageBox");

    if (!messageBox) {
        messageBox = document.createElement("div");
        messageBox.id = "messageBox";
        document.body.prepend(messageBox);
    }

    messageBox.innerText = message;
    messageBox.className = type === "success" ? "message success" : "message error";

    setTimeout(() => {
        messageBox.remove();
    }, 3000);
}
