 
      document.addEventListener("DOMContentLoaded", function () {
        loadCards();
        updateStats();
      });

      function addCard() {
        let name = document.getElementById("fruitName").value.trim();
        let price = parseFloat(
          document.getElementById("fruitPrice").value.trim()
        );

        if (name === "" || isNaN(price) || price < 0) {
          alert("Please enter a valid fruit name and price!");
          return;
        }

        let cardData = { name, price };
        let cards = JSON.parse(localStorage.getItem("cards")) || [];
        cards.push(cardData);
        localStorage.setItem("cards", JSON.stringify(cards));

        renderCard(cardData);
        updateStats();

        document.getElementById("fruitName").value = "";
        document.getElementById("fruitPrice").value = "";
        document.getElementById("fruitName").focus();
      }

      function renderCard(cardData) {
        let cardContainer = document.getElementById("cardContainer");
        let emptyState = document.getElementById("emptyState");

        // Hide empty state if it's the first card
        if (emptyState) {
          emptyState.style.display = "none";
        }

        let cardDiv = document.createElement("div");
        cardDiv.classList.add("col-md-6", "col-lg-4", "col-xl-3");
        cardDiv.innerHTML = `
          <div class="card">
            <div class="card-header">
              <i class="fas fa-apple-alt me-2"></i>${cardData.name}
            </div>
            <div class="card-body">
              <div>
                <div class="fruit-icon">
                  <i class="fas fa-${getFruitIcon(cardData.name)}"></i>
                </div>
                <div class="price"><span class="currency">$</span>${cardData.price.toFixed(
                  2
                )}</div>
              </div>
              <button class="btn btn-danger w-100" onclick="deleteCard(this, '${
                cardData.name
              }')">
                <i class="fas fa-trash me-1"></i> Remove
              </button>
            </div>
          </div>
        `;
        cardContainer.appendChild(cardDiv);
      }

      function getFruitIcon(fruitName) {
        const fruitIcons = {
          apple: "apple-alt",
          banana: "banana",
          orange: "orange",
          strawberry: "strawberry",
          watermelon: "watermelon",
          grapes: "grapes",
          lemon: "lemon",
          pear: "pear",
          pineapple: "pineapple",
          cherry: "cherry",
          peach: "peach",
          mango: "mango",
        };

        const lowerName = fruitName.toLowerCase();
        for (let fruit in fruitIcons) {
          if (lowerName.includes(fruit)) {
            return fruitIcons[fruit];
          }
        }

        return "apple-alt"; // default icon
      }

      function loadCards() {
        let cards = JSON.parse(localStorage.getItem("cards")) || [];
        let cardContainer = document.getElementById("cardContainer");
        let emptyState = document.getElementById("emptyState");

        if (cards.length === 0) {
          if (emptyState) emptyState.style.display = "block";
          return;
        }

        if (emptyState) emptyState.style.display = "none";
        cardContainer.innerHTML = "";
        cards.forEach(renderCard);
      }

      function deleteCard(button, name) {
        let cardElement = button.closest(".col-md-6");
        cardElement.style.opacity = "0";
        cardElement.style.transform = "translateX(100px)";

        setTimeout(() => {
          cardElement.remove();
          let cards = JSON.parse(localStorage.getItem("cards")) || [];
          cards = cards.filter((card) => card.name !== name);
          localStorage.setItem("cards", JSON.stringify(cards));

          updateStats();

          // Show empty state if no cards left
          if (cards.length === 0) {
            document.getElementById("emptyState").style.display = "block";
          }
        }, 300);
      }

      function updateStats() {
        let cards = JSON.parse(localStorage.getItem("cards")) || [];
        let totalCards = cards.length;
        let totalValue = cards.reduce((sum, card) => sum + card.price, 0);
        let averagePrice = totalCards > 0 ? totalValue / totalCards : 0;

        document.getElementById("totalCards").textContent = totalCards;
        document.getElementById(
          "averagePrice"
        ).textContent = `$${averagePrice.toFixed(2)}`;
        document.getElementById(
          "totalValue"
        ).textContent = `$${totalValue.toFixed(2)}`;
      }
    