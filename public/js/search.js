// search.js - Live search functionality

document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("searchInput");
    const searchResults = document.getElementById("searchResults");

    if (searchInput) {
        searchInput.addEventListener("keyup", async () => {
            const query = searchInput.value.trim();

            if (query.length > 2) {
                const response = await fetch(`/api/search?query=${query}`);
                const results = await response.json();

                searchResults.innerHTML = "";
                results.forEach((result) => {
                    const item = document.createElement("div");
                    item.classList.add("search-item");
                    item.textContent = result.name;
                    searchResults.appendChild(item);
                });
            } else {
                searchResults.innerHTML = "";
            }
        });
    }
});
