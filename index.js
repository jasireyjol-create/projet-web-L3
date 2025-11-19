// Fonction pour afficher/masquer les catégories
function setupCategoryFilters() {
    // Ajoute les boutons de filtre dynamiquement
    const filterContainer = document.createElement("div");
    filterContainer.className = "filter-buttons";
    filterContainer.innerHTML = `
        <button class="filter-btn active" data-filter="toutes">Toutes</button>
        <button class="filter-btn" data-filter="livres">Livres</button>
        <button class="filter-btn" data-filter="films">Films</button>
        <button class="filter-btn" data-filter="spectacle">Spectacle vivant</button>
    `;

    // Insère les boutons avant la première catégorie
    const firstCategory = document.querySelector(".category");
    firstCategory.parentNode.insertBefore(filterContainer, firstCategory);

    // Ajoute les événements de clic
    document.querySelectorAll(".filter-btn").forEach(button => {
        button.addEventListener("click", () => {
            // Met à jour l'état actif des boutons
            document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
            button.classList.add("active");

            // Filtre les catégories
            const filter = button.dataset.filter;
            document.querySelectorAll(".category").forEach(category => {
                const categoryType = category.querySelector("h2").textContent.toLowerCase();
                if (filter === "toutes") {
                    category.style.display = "block";
                } else {
                    const isVisible = (filter === "livres" && categoryType.includes("livre")) ||
                                      (filter === "films" && categoryType.includes("film")) ||
                                      (filter === "spectacle" && categoryType.includes("spectacle"));
                    category.style.display = isVisible ? "block" : "none";
                }
            });
        });
    });
}

// Animation d'apparition des recommandations
function animateRecommendations() {
    const recommendations = document.querySelectorAll(".recommendation");
    recommendations.forEach((recommendation, index) => {
        setTimeout(() => {
            recommendation.style.opacity = "1";
            recommendation.style.transform = "translateY(0)";
        }, index * 100);
    });
}

// Initialisation
document.addEventListener("DOMContentLoaded", () => {
    // Masque les catégories pour l'animation initiale
    document.querySelectorAll(".recommendation").forEach(card => {
        card.style.opacity = "0";
        card.style.transform = "translateY(20px)";
        card.style.transition = "opacity 0.5s, transform 0.5s";
    });

    // Active les filtres et les animations
    setupCategoryFilters();
    animateRecommendations();
});

document.addEventListener("DOMContentLoaded", function() {
    const recommendationImages = document.querySelectorAll(".recommendation img");

    recommendationImages.forEach(img => {
        // Crée un conteneur pour gérer le zoom
        const zoomContainer = document.createElement("div");
        zoomContainer.className = "zoom-container";
        img.parentNode.insertBefore(zoomContainer, img);
        zoomContainer.appendChild(img);

        // Ajoute une classe pour le style de base
        img.classList.add("recommendation-img");

        // Crée un élément pour l'image zoomée (au premier plan)
        const zoomedImg = document.createElement("div");
        zoomedImg.className = "zoomed-img";
        zoomedImg.style.position = "absolute";
        zoomedImg.style.zIndex = "100";
        zoomedImg.style.display = "none";
        zoomedImg.style.borderRadius = "8px";
        zoomedImg.style.boxShadow = "0 10px 20px rgba(0, 0, 0, 0.3)";
        zoomedImg.style.transition = "all 0.3s ease";
        document.body.appendChild(zoomedImg);

        // Au survol : affiche l'image zoomée au premier plan
        img.addEventListener("mouseenter", function(e) {
            // Clone l'image pour l'afficher en grand
            const imgClone = this.cloneNode(true);
            imgClone.style.width = "300px";
            imgClone.style.height = "auto";
            imgClone.style.transform = "scale(1)";
            zoomedImg.innerHTML = "";
            zoomedImg.appendChild(imgClone);
            zoomedImg.style.display = "block";

            // Positionne l'image zoomée près de la souris
            zoomedImg.style.left = `${e.pageX + 10}px`;
            zoomedImg.style.top = `${e.pageY + 10}px`;

            // Ajoute un fond blanc semi-transparent
            zoomedImg.style.backgroundColor = "rgba(255, 255, 255, 0.9)";
            zoomedImg.style.padding = "10px";
        });

        // Déplace l'image zoomée avec la souris
        img.addEventListener("mousemove", function(e) {
            if (zoomedImg.style.display === "block") {
                zoomedImg.style.left = `${e.pageX + 10}px`;
                zoomedImg.style.top = `${e.pageY + 10}px`;
            }
        });

        // Cache l'image zoomée quand la souris quitte
        img.addEventListener("mouseleave", function() {
            zoomedImg.style.display = "none";
        });
    });
});
