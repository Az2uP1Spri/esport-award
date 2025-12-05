// Script de navigation commune pour toutes les pages
// Gère la mise en évidence du lien actif dans la navigation

document.addEventListener("DOMContentLoaded", () => {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach((link) => {
    const linkPath = link.getAttribute("href");
    
    // Vérifier si le lien correspond à la page actuelle
    if (
      currentPath.endsWith(linkPath) ||
      (currentPath === "/" && linkPath === "./index.html") ||
      (currentPath.endsWith("/") && linkPath === "./index.html") ||
      (currentPath.endsWith("index.html") && linkPath === "./index.html")
    ) {
      link.style.color = "#38bdf8";
      link.style.fontWeight = "600";
    }
  });
});

