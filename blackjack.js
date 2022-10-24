'use strict';

// TODO
// add suits to cards
// aceHi/aceLow logic (maybe done?)
// add cut card to shoe
// chips for betting (instead of raw numbers)

// map of the values of every card in a deck
const CARDS = {
  ace: {
    aceLow: 1,
    aceHigh: 11,
  },
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
  jack: 10,
  queen: 10,
  king: 10,
};

const SUITS_MAP = {
  clubs: '♣️',
  diamonds: '♦️',
  hearts: '♥️',
  spades: '♠️',
};

// Constants
const NUMBER_OF_DECKS = 2;
const CARDS_PER_DECK = 52;
const SUITS = ['clubs', 'diamonds', 'hearts', 'spades'];
const NUMBER_OF_PLAYERS = 4;
const BLACKJACK = 21;

// State variables
let gameOver = false;

// A single deck with one of every card
const BASE_DECK = Object.keys(CARDS).reduce((deck, card) => {
  SUITS.forEach(suit => {
    deck.push({
      card: card,
      suit: suit,
      count: 1,
    });
  });

  return deck;
}, []);

class Player {
  constructor(playerNum) {
    this.num = playerNum;
    this.hand = [];
    this.score = 0;
    this.bet = 0;
    this.money = 500;
    this.blackjack = false;
    this.stand = false;
    this.busted = false;

    // DOM Selectors
    console.log(playerNum);

    this.handDisplay = document.querySelector(`.hand--${playerNum}`);
  }
  isActive() {
    return !(this.blackjack || this.stand || this.busted);
  }
  updateScore() {
    let tempAceStack = [];

    // reset score by looping through entire hand and calculate total score (allows me to account for aceHigh vs aceLow)
    this.score = this.hand.reduce((score, card) => {
      if (card === 'ace') {
        tempAceStack.push(card);
      } else score += CARDS[card];
      return score;
    }, 0);

    // handle aces
    while (tempAceStack.length > 0) {
      // Assumption: Only one ace could ever be high without causing a bust
      // if an 11 wouldn't cause a bust, count it as an 11 and continue
      if (this.score + CARDS.ace.aceHigh <= BLACKJACK) {
        this.score += CARDS.ace.aceHigh;
        tempAceStack.shift();
        continue;
      }
      // otherwise, count the ace as aceLow
      this.score += CARDS.ace.aceLow;
      tempAceStack.shift();
    }

    // check for bust
    if (this.score > 21) {
    }
  }
  displayCard(card) {
    let cardsImg = document.createElement('img');
    cardsImg.src = `./cards/${card.card}_of_${card.suit}.svg`;
    cardsImg.className = 'card';
    let currentHand = document.getElementById(`hand--${this.num}`);
    currentHand.appendChild(cardsImg);
  }
}

class Dealer extends Player {
  constructor() {
    super('dealer');
  }
}

function shuffleDeck(numberOfDecks) {
  let numberOfCards = 52 * numberOfDecks;
  const shuffledDeck = [];
  // create a deep copy of BASE_DECK to avoid mutating it
  // This whole section seems inefficient... there should be a better way to update the counts
  let cardsAvailable = JSON.parse(JSON.stringify(BASE_DECK));
  cardsAvailable.forEach(card => (card.count *= numberOfDecks));

  let uniqueCardsRemaining = CARDS_PER_DECK; // input for Math.random multiplier

  // generate shuffled deck for output
  while (numberOfCards > 0) {
    // generate a random index from 0 to 51 -- one for each unique card
    let index = Math.floor(Math.random() * uniqueCardsRemaining);
    // temp variable for easier reference
    let currentCard = cardsAvailable[index];

    // add random card to shuffledDeck and update counters
    shuffledDeck.push({
      card: currentCard.card,
      suit: currentCard.suit,
    });

    // update counters
    currentCard.count--;
    numberOfCards--;

    // If that was the last card available of the type, remove it from cardsAvailable
    if (currentCard.count === 0) {
      cardsAvailable.splice(index, 1);
      uniqueCardsRemaining--;
    }
  }
  // TODO: Add cut card
  return shuffledDeck;
}

function createPlayers(numberOfPlayers) {
  const players = [];
  // create new players and add them to array
  for (let i = 0; i < numberOfPlayers; i++) players.push(new Player(i));
  // add a dealer at the end
  players.push(new Dealer());
  return players;
}

function deal(players, shoe) {
  // burn card
  shoe.shift();
  // deal two cards to each player
  for (let i = 0; i < 2; i++) {
    players.forEach(player => {
      // deal a card
      const card = shoe.shift();
      // push card to player's hand
      console.log(card);
      player.hand.push(card);
      player.displayCard(card);
      // add card value to score
      player.updateScore();
    });
  }
}

// TODO:
function newGame() {
  gameOver = false;
  let shoe = shuffleDeck(NUMBER_OF_DECKS);
  const players = createPlayers(NUMBER_OF_PLAYERS);
  deal(players, shoe);
}

const btnNewGame = document.querySelector('.new-game');
newGame();

// console.table(BASE_DECK);

// print player hands
// players.forEach(player =>
//   console.table([player.number, player.hand[0], player.hand[1]])
// );

// // test for players with aces
// const playersWithAces = players.filter(
//   player => player.hand[0] === 'ace' || player.hand[1] === 'ace'
// );
// // console.log(CARDS['ace']['aceHigh']);
// console.table(playersWithAces);
