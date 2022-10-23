'use strict';

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

// TODO: Allow user to choose the number of decks
const NUMBER_OF_DECKS = 1;

// console.log(CARDS[DECK[9][0]]);

// console.table(DECK);

// TODO: aceHigh vs aceLow logic

function shuffleDeck(numberOfDecks) {
  let numberOfCards = 52 * numberOfDecks;
  const shuffledDeck = [];
  let cardsAvailable = BASE_DECK.map(([card, count]) => [
    card,
    count * numberOfDecks,
  ]);

  // generate shuffled deck for output
  // current version is very inefficient because it checks indexes that are empty
  while (numberOfCards > 0) {
    // generate a random index from 0-12
    let index = Math.floor(Math.random() * 13);
    let [currentCard, currentCardCount] = cardsAvailable[index];
    if (currentCardCount > 0) {
      shuffledDeck.push(currentCard);
      currentCardCount--;
      numberOfCards--;
    }
  }
  return shuffledDeck;
}

let deck = shuffleDeck(NUMBER_OF_DECKS);
console.table(deck);
