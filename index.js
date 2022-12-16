// set the player object
let player = {
  name: "Geno",
  chips: 100,
};

// initialize dealer attributes
let dealerCards = [];
let dealerSum = 0;
let dealerBlackjack = false;
let dealerAlive = false;

// initialize player attributes
let cards = [];
let sum = 0;
let hasBlackJack = false;
let isAlive = false;
// initialize game attributes
let gameActive = false;

// initialize game state message to empty
let message = "";

// grab the needed elements
// player elements
const messageEl = document.getElementById("message-el");
const playerSumEl = document.getElementById("player-sum-el");
const playerCardsEl = document.getElementById("player-cards-el");
const playerEl = document.getElementById("player-el");
// dealer elements
const dealerSumEl = document.getElementById("dealer-sum-el");
const dealerCardsEl = document.getElementById("dealer-cards-el");
// UI elements
const controlBox = document.getElementById("control-box");

// Render UI elements
playerEl.textContent = player.name + " $" + player.chips;
buttonToggle()

function getRandomCard() {
  let randomNumber = Math.floor(Math.random() * 13) + 1;
  if (randomNumber > 10) {
    return 10;
  } else if (randomNumber === 1) {
    return 11;
  } else {
    return randomNumber;
  }
}

function startGame() {
  shuffle();
  gameActive = true;
  dealPlayer();
  // set dealer cards
  dealerAlive = true;
  let dealerHidden = "?";
  let dealerShown = getRandomCard();
  dealerCards = [dealerHidden, dealerShown];
  // render game
  renderPlayer();
  renderDealer();
  if (sum === 21) {
    hasBlackJack = true;
    callWinner();
  } else {
    renderDealer();
    buttonToggle();
  }
}

function dealPlayer() {
  isAlive = true;
  let firstCard = getRandomCard();
  let secondCard = getRandomCard();
  cards = [firstCard, secondCard];
  sum = firstCard + secondCard;
}

function renderDealer() {
  dealerCardsEl.textContent = "Cards: ";
  for (let i = 0; i < dealerCards.length; i++) {
    dealerCardsEl.textContent += `${dealerCards[i]} `;
  }
  if (dealerSum === 0) {
    dealerSumEl.textContent = "Sum: ??";
  } else if (dealerSum <= 20) {
    dealerSumEl.textContent = `Sum: ${dealerSum}`;
  } else if (dealerSum === 21) {
    dealerBlackjack = true;
    dealerSumEl.textContent = `Sum: ${dealerSum}`;
  } else {
    dealerAlive = false;
    dealerSumEl.textContent = `Sum: ${dealerSum}`;
  }
}

function renderPlayer() {
  playerCardsEl.textContent = "Cards: ";
  for (let i = 0; i < cards.length; i++) {
    playerCardsEl.textContent += cards[i] + " ";
  }
  playerSumEl.textContent = "Sum: " + sum;
  message = "Do you want to hit or stand?";

  if (sum === 21) {
    hasBlackJack = true;
    dealerPlays();
    callWinner();
    buttonToggle();
  } else if (sum > 21) {
    isAlive = false;
    message = "You busted! The dealer wins";
    gameActive = false;
    buttonToggle();
  }
  renderMessage();
}

function newCard() {
  if (isAlive === true && hasBlackJack === false) {
    let card = getRandomCard();
    sum += card;
    cards.push(card);
    renderPlayer();
  }
}

function dealerPlays() {
  let dealerTotal = 0;
  dealerCards.shift();
  dealerCards.unshift(getRandomCard());
  dealerSum = dealerCards[0] + dealerCards[1];
  while (dealerAlive === true && dealerBlackjack === false) {
    if (dealerSum < 17) {
      dealerCards.push(getRandomCard());
    } else if (dealerSum < 21) {
      dealerAlive = false;
    } else if (dealerSum === 21) {
      dealerBlackjack = true;
    } else {
      dealerAlive = false;
    }
    dealerTotal = 0;
    for (let i = 0; i < dealerCards.length; i++) {
      dealerTotal += dealerCards[i];
    }
    dealerSum = dealerTotal;
  }
  renderDealer();
}

function stand() {
  dealerPlays();
  callWinner();
  buttonToggle();
}

function callWinner() {
  if (hasBlackJack === true) {
    message = "Blackjack! You win!";
  } else if (sum === dealerSum) {
    message = "It's a draw, you get your chips back";
  } else if (dealerBlackjack === true) {
    message = "Dealer has 21, better luck next time";
  } else if (dealerAlive === false && dealerSum > 21) {
    message = `Dealer busts with ${dealerSum}, you win!`;
  } else if (sum < dealerSum) {
    message = `Dealer wins with ${dealerSum}, better luck next time`;
  } else if (sum > dealerSum) {
    message = `Awesome! You win with ${sum}!`;
  }
  renderMessage();
  gameActive = false;
}

function renderMessage() {
  messageEl.textContent = message;
}

function buttonToggle() {
  if (gameActive === true) {
    controlBox.innerHTML = `
    <button id="hit-btn" onclick="newCard()">HIT ME!</button>
    <button id="stand-btn" onclick="stand()">STAND</button>
    `
  } else if (gameActive === false) {
    controlBox.innerHTML = `
    <button id="deal-btn" onclick="startGame()">DEAL</button>
    `
  }
}

function shuffle() {
  // player resets
  isAlive = false;
  hasBlackJack = false;
  cards = [];
  sum = 0;

  // dealer resets
  dealerAlive = false;
  dealerBlackjack = false;
  dealerCards = [];
  dealerSum = 0;

  // game resets
  gameActive = false;
}
