document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".nominee-card");
  const modal = document.getElementById("vote-modal");
  const modalMessage = document.getElementById("modal-message");
  const modalClose = document.getElementById("modal-close");
  const filterButtons = document.querySelectorAll(".filter-btn");
  const gameSections = document.querySelectorAll(".game-section");
  const confettiCanvas = document.getElementById("confetti-canvas");
  const modeButtons = document.querySelectorAll(".mode-btn");
  const categoriesView = document.getElementById("categories-view");
  const tierlistView = document.getElementById("tierlist-view");

  // Charger les votes sauvegardés depuis localStorage
  const savedVotes = JSON.parse(localStorage.getItem("esportAwardVotes")) || {};
  const savedTierList = JSON.parse(localStorage.getItem("esportAwardTierList")) || {};

  // Restaurer l'état des votes sauvegardés
  Object.keys(savedVotes).forEach((categoryId) => {
    const nomineeId = savedVotes[categoryId];
    const card = document.querySelector(
      `.nominee-card[data-category-id="${categoryId}"][data-nominee-id="${nomineeId}"]`
    );
    if (card) {
      card.classList.add("selected");
      const btn = card.querySelector(".vote-btn");
      if (btn) {
        btn.textContent = "Sélectionné ✅";
      }
    }
  });

  // Gérer le switch entre modes
  modeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      modeButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const mode = btn.dataset.mode;

      if (mode === "categories") {
        categoriesView.classList.remove("hidden");
        tierlistView.classList.add("hidden");
      } else {
        categoriesView.classList.add("hidden");
        tierlistView.classList.remove("hidden");
        restoreTierList();
      }
    });
  });

  // Gérer les filtres par jeu
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Mettre à jour l'état actif
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const gameId = btn.dataset.game;

      // Filtrer les sections de jeu
      gameSections.forEach((section) => {
        if (gameId === "all" || section.dataset.gameId === gameId) {
          section.classList.remove("hidden");
          // Animation d'apparition
          section.style.opacity = "0";
          setTimeout(() => {
            section.style.transition = "opacity 0.4s ease";
            section.style.opacity = "1";
          }, 10);
        } else {
          section.classList.add("hidden");
        }
      });

      // Scroll vers le haut des résultats
      document.querySelector(".vote-container").scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  });

  // Gérer les clics sur les boutons de vote
  cards.forEach((card) => {
    const btn = card.querySelector(".vote-btn");
    if (!btn) return;

    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const categoryId = card.dataset.categoryId;
      const nomineeId = card.dataset.nomineeId;

      // Désélectionner toutes les cartes de cette catégorie
      document
        .querySelectorAll(`.nominee-card[data-category-id="${categoryId}"]`)
        .forEach((c) => {
          c.classList.remove("selected");
          const b = c.querySelector(".vote-btn");
          if (b) b.textContent = "Sélectionner ce nominé";
        });

      // Sélectionner la carte cliquée
      card.classList.add("selected");
      btn.textContent = "Sélectionné ✅";

      // Sauvegarder dans localStorage
      savedVotes[categoryId] = nomineeId;
      localStorage.setItem("esportAwardVotes", JSON.stringify(savedVotes));

      // Mettre à jour le résumé
      updateVotesSummary();

      // Afficher la modal avec message générique
      modal.classList.remove("hidden");
      setTimeout(() => {
        modal.classList.add("show");
      }, 10);

      // Lancer les confettis
      launchConfetti();
    });
  });

  // Fermer la modal
  modalClose.addEventListener("click", () => {
    modal.classList.remove("show");
    setTimeout(() => {
      modal.classList.add("hidden");
    }, 300);
  });

  // Fermer la modal en cliquant en dehors
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("show");
      setTimeout(() => {
        modal.classList.add("hidden");
      }, 300);
    }
  });

  // Fonction pour lancer les confettis
  function launchConfetti() {
    const ctx = confettiCanvas.getContext("2d");
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;

    const confetti = [];
    const colors = ["#38bdf8", "#a855f7", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

    // Créer les confettis
    for (let i = 0; i < 150; i++) {
      confetti.push({
        x: Math.random() * confettiCanvas.width,
        y: -10,
        width: Math.random() * 10 + 5,
        height: Math.random() * 10 + 5,
        speed: Math.random() * 3 + 2,
        rotation: Math.random() * 360,
        rotationSpeed: Math.random() * 10 - 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        shape: Math.random() > 0.5 ? "rect" : "circle",
      });
    }

    function animate() {
      ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

      confetti.forEach((particle, index) => {
        ctx.save();
        ctx.translate(particle.x, particle.y);
        ctx.rotate((particle.rotation * Math.PI) / 180);
        ctx.fillStyle = particle.color;

        if (particle.shape === "circle") {
          ctx.beginPath();
          ctx.arc(0, 0, particle.width / 2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillRect(-particle.width / 2, -particle.height / 2, particle.width, particle.height);
        }

        ctx.restore();

        // Mettre à jour la position
        particle.y += particle.speed;
        particle.x += Math.sin(particle.y * 0.01) * 2;
        particle.rotation += particle.rotationSpeed;

        // Supprimer les particules hors écran
        if (particle.y > confettiCanvas.height + 20) {
          confetti.splice(index, 1);
        }
      });

      if (confetti.length > 0) {
        requestAnimationFrame(animate);
      } else {
        ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
      }
    }

    animate();
  }

  // Gestion de la tier list
  let draggedElement = null;

  function initTierList() {
    const gameCards = document.querySelectorAll(".tier-game-card");
    const tierGames = document.querySelectorAll(".tier-games");

    // Drag and drop pour les cartes de jeux
    gameCards.forEach((card) => {
      card.addEventListener("dragstart", (e) => {
        draggedElement = card;
        card.classList.add("dragging");
        e.dataTransfer.effectAllowed = "move";
      });

      card.addEventListener("dragend", () => {
        card.classList.remove("dragging");
        draggedElement = null;
      });
    });

    // Gestion des zones de drop
    tierGames.forEach((tier) => {
      tier.addEventListener("dragover", (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
        tier.classList.add("drag-over");
      });

      tier.addEventListener("dragleave", () => {
        tier.classList.remove("drag-over");
      });

      tier.addEventListener("drop", (e) => {
        e.preventDefault();
        tier.classList.remove("drag-over");

        if (draggedElement) {
          tier.appendChild(draggedElement);
          saveTierList();
          
          // Feedback visuel après classement
          setTimeout(() => {
            launchConfetti();
            // Afficher la modal de confirmation
            modal.classList.remove("hidden");
            setTimeout(() => {
              modal.classList.add("show");
            }, 10);
          }, 100);
        }
      });
    });
  }

  function saveTierList() {
    const tierList = {};
    document.querySelectorAll(".tier-row").forEach((row) => {
      const tier = row.dataset.tier;
      const games = Array.from(row.querySelectorAll(".tier-game-card")).map(
        (card) => card.dataset.gameId
      );
      tierList[tier] = games;
    });
    localStorage.setItem("esportAwardTierList", JSON.stringify(tierList));
  }

  function restoreTierList() {
    if (Object.keys(savedTierList).length === 0) return;

    Object.keys(savedTierList).forEach((tier) => {
      const tierGames = document.querySelector(`.tier-games[data-tier="${tier}"]`);
      if (tierGames) {
        savedTierList[tier].forEach((gameId) => {
          const card = document.querySelector(`.tier-game-card[data-game-id="${gameId}"]`);
          if (card) {
            tierGames.appendChild(card);
          }
        });
      }
    });
  }

  // Initialiser la tier list
  initTierList();

  // Fonction pour mettre à jour le résumé des votes
  function updateVotesSummary() {
    const summaryContent = document.getElementById("summary-content");
    const summaryEditBtn = document.getElementById("summary-edit-btn");
    const votes = Object.keys(savedVotes);

    if (votes.length === 0) {
      summaryContent.innerHTML = '<p class="summary-empty">Aucun vote enregistré pour le moment.</p>';
      summaryEditBtn.style.display = "none";
      return;
    }

    // Créer la liste des votes
    let html = '<div class="summary-list">';
    votes.forEach((categoryId) => {
      const nomineeId = savedVotes[categoryId];
      const card = document.querySelector(
        `.nominee-card[data-category-id="${categoryId}"][data-nominee-id="${nomineeId}"]`
      );
      if (card) {
        const categoryName = card.closest(".category").querySelector(".category-title").textContent;
        const nomineeName = card.querySelector(".nominee-name").textContent;
        html += `
          <div class="summary-item">
            <span class="summary-item-category">${categoryName}</span>
            <span class="summary-item-nominee">${nomineeName}</span>
          </div>
        `;
      }
    });
    html += "</div>";
    summaryContent.innerHTML = html;
    summaryEditBtn.style.display = "block";
  }

  // Bouton modifier les votes
  const summaryEditBtn = document.getElementById("summary-edit-btn");
  if (summaryEditBtn) {
    summaryEditBtn.addEventListener("click", () => {
      // Scroll vers le haut
      document.querySelector(".vote-container").scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }

  // Initialiser le résumé au chargement
  updateVotesSummary();

  // Redimensionner le canvas confetti
  window.addEventListener("resize", () => {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
  });
});
