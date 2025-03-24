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