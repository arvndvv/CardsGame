import Deck from "./deck.js";

const cardStrength = {
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "10": 10,
    "J": 11,
    "Q": 12,
    "K": 13,
    "A": 14

}


const computerCardSlot = document.querySelector('.computer-card-slot');
const playerCardSlot = document.querySelector('.player-card-slot');
const computerDeckElement = document.querySelector(".computer-deck");
const playerDeckElement = document.querySelector(".player-deck");
const result = document.querySelector('.result');
let playerDeck, computerDeck, inRound, gameStopped;
//inRound check if cards are already drawn
document.addEventListener('click', () => {
        if (gameStopped) {
            startGame();
        }
        if (inRound) {
            cleanUp();
        } else {
            flipCards();
        }
    })
    //game begin function

startGame();

function startGame() {
    const deck = new Deck();
    deck.shuffle();
    const deckMidpoint = Math.ceil(deck.numberOfCards / 2);
    playerDeck = new Deck(deck.cards.slice(0, deckMidpoint));
    computerDeck = new Deck(deck.cards.slice(deckMidpoint, deck.numberOfCards));
    inRound = false;
    gameStopped = false;
    cleanUp();

}
//to clear the current displayed values
function cleanUp() {
    inRound = false;
    result.innerHTML = '';
    computerCardSlot.innerHTML = '';
    playerCardSlot.innerHTML = '';
    updateDeckCount();
}

function flipCards() {
    inRound = true;
    const playerCard = playerDeck.pop();
    const computerCard = computerDeck.pop();
    playerCardSlot.appendChild(playerCard.getHTML());
    computerCardSlot.appendChild(computerCard.getHTML());
    updateDeckCount();
    if (isRoundWinner(playerCard, computerCard)) {
        result.innerText = "You won the round!";
        playerDeck.push(playerCard);
        playerDeck.push(computerCard);
    } else if (isRoundWinner(computerCard, playerCard)) {
        result.innerText = "You lost the round!";
        computerDeck.push(playerCard);
        computerDeck.push(computerCard);

    } else {
        result.innerText = "Its a Draw!";
        playerDeck.push(playerCard);
        computerDeck.push(computerCard);

    }
    if (isDeckEmpty(playerDeck)) {
        result.innerText = "You Lost the Game!";
        gameStopped = true;
    } else if (isDeckEmpty(computerDeck)) {
        result.innerText = "You Won the Game!";
        gameStopped = true;
    }
}
//updates the remaining number of cards in the deck
function updateDeckCount() {
    computerDeckElement.innerText = computerDeck.numberOfCards;
    playerDeckElement.innerText = playerDeck.numberOfCards;

}

//check winner of each round

function isRoundWinner(cardOne, cardTwo) {

    return cardStrength[cardOne.value] > cardStrength[cardTwo.value];

}

//check if deck is empty

function isDeckEmpty(deck) {
    return deck.numberOfCards === 0;

}