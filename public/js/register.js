document.getElementById("registerForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value;

    if (!name || !email || !password || !role) {
        alert("All fields are required!");
        return;
    }

    const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role })
    });

    const data = await response.json();

    if (data.success) {
        alert("Account Created Successfully!");
        window.location.href = "/login.html"; // Redirect to login page
    } else {
        alert(data.message);
    }
});