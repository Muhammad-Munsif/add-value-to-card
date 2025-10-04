document.addEventListener("DOMContentLoaded", loadCards);

function addCard() {
  let name = document.getElementById("fruitName").value.trim();
  let price = document.getElementById("fruitPrice").value.trim();

  if (name === "" || price === "") {
    alert("Please enter both fruit name and price!");
    return;
  }

  let cardData = { name, price };
  let cards = JSON.parse(localStorage.getItem("cards")) || [];
  cards.push(cardData);
  localStorage.setItem("cards", JSON.stringify(cards));

  renderCard(cardData);
  document.getElementById("fruitName").value = "";
  document.getElementById("fruitPrice").value = "";
}

function renderCard(cardData) {
  let cardContainer = document.getElementById("cardContainer");

  let cardDiv = document.createElement("div");
  cardDiv.classList.add("col-md-4");

  cardDiv.innerHTML = `
        <div class="card p-3">
            <h4>${cardData.name}</h4>
            <p>Price: $<span>${cardData.price}</span></p>
            <button class="btn btn-danger btn-sm" onclick="deleteCard(this, '${cardData.name}')">Remove</button>
        </div>
    `;
  cardContainer.appendChild(cardDiv);
}

function loadCards() {
  let cards = JSON.parse(localStorage.getItem("cards")) || [];
  cards.forEach(renderCard);
}

function deleteCard(button, name) {
  let cardElement = button.closest(".col-md-4");
  cardElement.remove();

  let cards = JSON.parse(localStorage.getItem("cards")) || [];
  cards = cards.filter((card) => card.name !== name);
  localStorage.setItem("cards", JSON.stringify(cards));
}
