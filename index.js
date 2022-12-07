// set the player object
let player = {
    name: "Geno",
    chips: 100
}

// initialize dealer attributes
let dealerCards = []
let dealerSum = 0
let dealerBlackjack = false
let dealerAlive = false

// initialize player attributes
let cards = []
let sum = 0
let hasBlackJack = false
let isAlive = false

// initialize game state message to empty
let message = ""

// grab the needed elements and store with const
// player elements
const messageEl = document.getElementById("message-el")
const playerSumEl = document.getElementById("player-sum-el")
const playerCardsEl = document.getElementById("player-cards-el")
const playerEl = document.getElementById("player-el")
// dealer elements
const dealerSumEl = document.getElementById("dealer-sum-el")
const dealerCardsEl = document.getElementById("dealer-cards-el")

// render player name and chip count
playerEl.textContent = player.name + " $" + player.chips

function getRandomCard() {
    let randomNumber = Math.floor( Math.random()*13 ) + 1
    if (randomNumber > 10) {
        return 10
    } else if (randomNumber === 1) {
        return 11
    } else {
        return randomNumber
    }
}

function startGame() {
    // set player cards
    isAlive = true
    let firstCard = getRandomCard()
    let secondCard = getRandomCard()
    cards = [firstCard, secondCard]
    sum = firstCard + secondCard
    // set dealer cards
    dealerAlive = true
    let dealerHidden = "?"
    let dealerShown = getRandomCard()
    dealerCards = [dealerHidden, dealerShown]
    renderGame()
}

function renderGame() {
    // render dealer state
    dealerCardsEl.textContent = "Cards: "
    for (let i = 0; i < dealerCards.length; i++) {
        dealerCardsEl.textContent += dealerCards[i] + " "
    }
    dealerSumEl.textContent = "Sum: " + sum
    // render player state
    playerCardsEl.textContent = "Cards: "
    for (let i = 0; i < cards.length; i++) {
        playerCardsEl.textContent += cards[i] + " "
    }
    playerSumEl.textContent = "Sum: " + sum
    // check player sum
    if (sum <= 20) {
        message = "Do you want to draw a new card?"
    } else if (sum === 21) {
        message = "You've got Blackjack!"
        hasBlackJack = true
    } else {
        message = "You're out of the game!"
        isAlive = false
    }
    messageEl.textContent = message
}

function newCard() {
    if (isAlive === true && hasBlackJack === false) {
        let card = getRandomCard()
        sum += card
        cards.push(card)
        renderGame()        
    }
}
