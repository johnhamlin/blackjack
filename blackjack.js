'use strict';

// TODO
// aceHi/aceLow logic
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

// A single deck with four of every card
const BASE_DECK = Object.keys(CARDS).reduce((deck, card) => {
  deck.push([card, 4]);
  return deck;
}, []);

const NUMBER_OF_DECKS = 1;
const NUMBER_OF_PLAYERS = 4;

class Player {
  constructor(playerNum) {
    this.playerNum = playerNum;
    this.hand = [];
    this.score = 0;
    this.bet = 0;
    this.money;
    this.busted = false;
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
  let cardsAvailable = BASE_DECK.map(([card, count]) => [
    card,
    count * numberOfDecks,
  ]);
  let maxIndexPlusOne = 13; // input for Math.random multiplier

  // generate shuffled deck for output
  while (numberOfCards > 0) {
    // generate a random index from 0 to (maxIndexPlusOne - 1) -- confusing!
    let index = Math.floor(Math.random() * maxIndexPlusOne);
    // destructure array of arrays for easier reference
    let [currentCard, currentCardCount] = cardsAvailable[index];
    // add random card to shuffledDeck and update counters
    shuffledDeck.push(currentCard);
    currentCardCount--;
    numberOfCards--;

    // If that was the last card available of the type, remove it from cardsAvailable
    if (currentCardCount === 0) {
      cardsAvailable.splice(index, 1);
      maxIndexPlusOne--;
    }
  }
  // TODO: Add cut card
  return shuffledDeck;
}

function createPlayers(numberOfPlayers) {
  const players = [];
  for (let i = 0; i < numberOfPlayers; i++) {
    players.push(new Player(i));
  }
  players.push(new Dealer());
  return players;
}

let shoe = shuffleDeck(NUMBER_OF_DECKS);
const players = createPlayers(NUMBER_OF_PLAYERS);
console.table(players);
