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
// initialize game attributes
let gameActive = false

// initialize game state message to empty
let message = ""

// grab the needed elements
// player elements
const messageEl = document.getElementById("message-el")
const playerSumEl = document.getElementById("player-sum-el")
const playerCardsEl = document.getElementById("player-cards-el")
const playerEl = document.getElementById("player-el")
// dealer elements
const dealerSumEl = document.getElementById("dealer-sum-el")
const dealerCardsEl = document.getElementById("dealer-cards-el")
// UI elements
const dealBtn = document.getElementById("deal-btn")
const hitBtn = document.getElementById("hit-btn")
const standBtn = document.getElementById("stand-btn")

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
    gameActive = true
    dealPlayer()
    // set dealer cards
    dealerAlive = true
    dealerBlackjack = false
    let dealerHidden = "?"
    let dealerShown = getRandomCard()
    dealerCards = [dealerHidden, dealerShown]
    dealerSum = 0
    // render game
    renderPlayer()
    renderDealer()
    buttonToggle()
}

function dealPlayer() {
    isAlive = true
    let firstCard = getRandomCard()
    let secondCard = getRandomCard()
    cards = [firstCard, secondCard]
    sum = firstCard + secondCard
}


function renderDealer(){
    dealerCardsEl.textContent = "Cards: "
    for (let i = 0; i < dealerCards.length; i++) {
        dealerCardsEl.textContent += `${dealerCards[i]} `
    }
    if (dealerSum === 0) {
        dealerSumEl.textContent = "Sum: ??"
    } else if (dealerSum <= 20) {
        dealerSumEl.textContent = `Sum: ${dealerSum}`
    } else if (dealerSum === 21) {
        dealerBlackjack = true
        dealerSumEl.textContent = `Sum: ${dealerSum}`
    } else {
        dealerAlive = false
        dealerSumEl.textContent = `Sum: ${dealerSum}`
    }
}


function renderPlayer() {
    playerCardsEl.textContent = "Cards: "
    for (let i = 0; i < cards.length; i++) {
        playerCardsEl.textContent += cards[i] + " "
    }
    playerSumEl.textContent = "Sum: " + sum
    message = "Do you want to hit or stand?"

    if (sum === 21) {
        hasBlackJack = true
        dealerPlays()
    } else if (sum > 21) {
        isAlive = false
        message = "You busted! The dealer wins"
        gameActive = false
        buttonToggle()
    }
    renderMessage()
}

function newCard() {
    if (isAlive === true && hasBlackJack === false) {
        let card = getRandomCard()
        sum += card
        cards.push(card)
        renderPlayer()        
    }
}

function dealerPlays(){
  let dealerTotal = 0
    dealerCards.shift()
    dealerCards.unshift(getRandomCard())
    while (dealerAlive === true && dealerBlackjack === false) {
      if (dealerSum < 17) {
        dealerCards.push(getRandomCard())
      } else if (dealerSum < 21) {
        dealerAlive = false
      } else if (dealerSum === 21) {
        dealerBlackjack = true
      } else {
        dealerAlive = false
      }
      dealerTotal = 0
      for (let i = 0; i < dealerCards.length; i++) {
        dealerTotal += dealerCards[i]
      }
      dealerSum = dealerTotal
      console.log(dealerSum)
    }
    renderDealer()
}

function stand() {
    dealerPlays()
    callWinner()
    buttonToggle()
}

function callWinner() {
    if (sum === dealerSum) {
        message = "It's a draw, you get your chips back"
    } else if (dealerBlackjack === true) {
        message = "Dealer has 21, better luck next time"
    } else if (dealerAlive === false) {
      message = `Dealer busts with ${dealerSum}, you win!`
    } else if (sum < dealerSum) {
        message = `Dealer wins with ${dealerSum}, better luck next time`
    } else if (sum > dealerSum) {
        message = `Awesome! You win with ${sum}!`
    }
    renderMessage()
    gameActive = false
}

function renderMessage() {
    messageEl.textContent = message
}

function buttonToggle() {
  if (gameActive === true) {
    hitBtn.style.display = "block"
    standBtn.style.display = "block"
    dealBtn.style.display = "none"
  } else {
    hitBtn.style.display = "none"
    standBtn.style.display = "none"
    dealBtn.style.display = "block"
  }
}