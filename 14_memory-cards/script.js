const cardsContainer = document.getElementById("cards-container"),
  prevBtn = document.getElementById("prev"),
  nextBtn = document.getElementById("next"),
  currentEl = document.getElementById("current"),
  showBtn = document.getElementById("show"),
  hideBtn = document.getElementById("hide"),
  questionEl = document.getElementById("question"),
  answerEl = document.getElementById("answer"),
  addCardBtn = document.getElementById("add-card"),
  clearBtn = document.getElementById("clear"),
  addContainer = document.getElementById("add-container");

// Keep track of current card
let currentActiveCard = 0;

// Store DOM cards
const cardsEl = [];

// Store card data
const cardsData = getCardsData();

// const cardsData = [
//   {
//     question: "What must a variable begin with?",
//     answer: "A letter, $ or _",
//   },
//   {
//     question: "What is a variable",
//     answer: "Container for a piece of data",
//   },
//   {
//     question: "Example of Case Sensitive Variable",
//     answerEl: "thisIsAVariable",
//   },
// ];

// Create all cards
function createCards() {
  cardsData.forEach((data, index) => {
    createCard(data, index);
  });
}

// Create a single card in the DOM
function createCard(data, index) {
  const card = document.createElement("div");
  card.classList.add("card");

  if (index === 0) {
    card.classList.add("active");
  }

  card.innerHTML = `
  <div class="inner-card">
    <div class="inner-card-front">
      <p>${data.question}</p>
    </div>
    <div class="inner-card-back">
      <p>${data.answer}</p>
    </div>
  </div>
`;

  card.addEventListener("click", () => {
    card.classList.toggle("show-answer");
  });

  // Add to DOM cards
  cardsEl.push(card);

  cardsContainer.appendChild(card);

  updateCurrentText();
}

function updateCurrentText() {
  currentEl.innerText = `${currentActiveCard + 1}/${cardsEl.length}`;
}

// Get cards from local storage
function getCardsData() {
  const cards = JSON.parse(localStorage.getItem("cards"));
  return cards === null ? [] : cards;
}

// Add card to local storage
function setCardsData(cards) {
  localStorage.setItem("cards", JSON.stringify(cards));
  window.location.reload();
}

createCards();

// Event Listeners

// Next button
nextBtn.addEventListener("click", () => {
  cardsEl[currentActiveCard].className = "card left";

  currentActiveCard++;

  if (currentActiveCard > cardsEl.length - 1) {
    currentActiveCard = cardsEl.length - 1;
  }

  cardsEl[currentActiveCard].className = "card active";

  updateCurrentText();
});

// Previous button
prevBtn.addEventListener("click", () => {
  cardsEl[currentActiveCard].className = "card right";

  currentActiveCard--;

  if (currentActiveCard < 0) {
    currentActiveCard = 0;
  }

  cardsEl[currentActiveCard].className = "card active";

  updateCurrentText();
});

// Show add container
showBtn.addEventListener("click", () => {
  addContainer.classList.add("show");
});

// Hide add container
hideBtn.addEventListener("click", () => {
  addContainer.classList.remove("show");
});

// Add card button
addCardBtn.addEventListener("click", () => {
  const question = questionEl.value;
  const answer = answerEl.value;

  if (question.trim() && answer.trim()) {
    const newCard = { question, answer };

    createCard(newCard);

    questionEl.value = "";
    answerEl.value = "";

    addContainer.classList.remove("show");

    cardsData.push(newCard);

    setCardsData(cardsData);
  }
});

// Clear cards button
clearBtn.addEventListener("click", () => {
  localStorage.clear();
  cardsContainer.innerHTML = "";
  window.location.reload();
});
