function loadHTML(id, file, callback) {
    fetch(file)
        .then(response => response.text())
        .then(data => {
            document.getElementById(id).innerHTML = data;
            initThemeToggle(); // Initialize theme toggle after loading navbar
            if (callback) callback();
        })
        .catch(error => console.log("Error loading file:", file));
    function initThemeToggle() {
        const themeToggleBtn = document.getElementById("themeToggle");
        if (!themeToggleBtn) return;
        
        const savedTheme = localStorage.getItem("theme") || "dark";
        document.body.setAttribute("data-theme", savedTheme);
        themeToggleBtn.textContent = savedTheme === "light" ? "🌞" : "🌙";
        
        themeToggleBtn.addEventListener("click", () => {
            const currentTheme = document.body.getAttribute("data-theme");
            const newTheme = currentTheme === "light" ? "dark" : "light";
            document.body.setAttribute("data-theme", newTheme);
            localStorage.setItem("theme", newTheme);
            themeToggleBtn.textContent = newTheme === "light" ? "☀️" : "🌙";
        });
    }
}

loadHTML("navbar", "navbar.html", () => {
    document.dispatchEvent(new Event("navbarLoaded"));
});

loadHTML("footer", "footer.html");
