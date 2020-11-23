const SUITS = ["♠", "♣", "♥", "♦"];
const VALUES = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

//card deck class
export default class Deck {
    constructor(cards = freshDeck()) {
            this.cards = cards;
        }
        //gitter to return length of deck
    get numberOfCards() {
            return this.cards.length;
        }
        //to pop cards from top of deck

    pop() {
            return this.cards.shift();
        }
        //push cards to back of deck
    push(card) {
            this.cards.push(card);
        }
        //method to shuffle the cards
    shuffle() {
        for (let i = this.numberOfCards - 1; i > 0; i--) {
            const newIndex = Math.floor(Math.random() * (i + 1));
            const cardInNewIndex = this.cards[newIndex]
                //swap current card with card in newIndex
            this.cards[newIndex] = this.cards[i];
            this.cards[i] = cardInNewIndex;
        }
    }
}
// single card class
class Card {
    constructor(suit, value) {
        this.suit = suit;
        this.value = value;
    }
    get color() {
        return this.suit === '♠' || this.suit === '♣' ? 'black' : 'red';
    }
    getHTML() {
        const cardDiv = document.createElement('div');
        cardDiv.innerText = this.suit;
        cardDiv.classList.add("card", this.color);
        cardDiv.dataset.value = `${this.value}${this.suit}`;
        return cardDiv;
    }
}
//function to create new deck
function freshDeck() {
    return SUITS.flatMap(suit => {
        return VALUES.map(value => {
            return new Card(suit, value);
        })
    })
}