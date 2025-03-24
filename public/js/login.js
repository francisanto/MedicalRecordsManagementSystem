document.addEventListener("DOMContentLoaded", function () {
    const role = localStorage.getItem("selectedRole");

    if (role) {
        document.getElementById("role-title").textContent = `Login as ${capitalize(role)}`;
        document.getElementById("role").value = role;
        document.getElementById("createAccount").href = `register.html?role=${role}`;
    }
});

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

document.getElementById("loginForm").addEventListener("submit", async function(event) {
    event.preventDefault(); // Prevent default form submission

    const email = document.querySelector("input[name='email']").value;
    const password = document.querySelector("input[name='password']").value;

    if (!email || !password) {
        alert("All fields are required!");
        return;
    }

    const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (data.success) {
        alert("Login Successful!");

        // Store user info in localStorage
        localStorage.setItem("user", JSON.stringify(data.user));

        // Redirect based on role
        if (data.user.role === "admin") {
            window.location.href = "admin_dashboard.html";
        } else if (data.user.role === "doctor") {
            window.location.href = "doctor_dashboard.html";
        } else if (data.user.role === "patient") {
            window.location.href = "patient_dashboard.html";
        }
    } else {
        alert(data.message);
    }
});
