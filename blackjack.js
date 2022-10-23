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

const NUMBER_OF_DECKS = 1;
const NUMBER_OF_PLAYERS = 4;
const BLACKJACK = 21;

// A single deck with four of every card
const BASE_DECK = Object.keys(CARDS).reduce((deck, card) => {
  deck.push([card, 4]);
  return deck;
}, []);

class Player {
  constructor(playerNum) {
    this.playerNum = playerNum;
    this.hand = [];
    this.score = 0;
    this.bet = 0;
    this.money = 500;
    this.stand = false;
    this.busted = false;
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
  let ranks = Object.keys(CARDS).length; // input for Math.random multiplier

  // generate shuffled deck for output
  while (numberOfCards > 0) {
    // generate a random index from 0 to (maxIndexPlusOne - 1) -- confusing!
    let index = Math.floor(Math.random() * ranks);
    // destructure array of arrays for easier reference
    let [currentCard, currentCardCount] = cardsAvailable[index];
    // add random card to shuffledDeck and update counters
    shuffledDeck.push(currentCard);
    currentCardCount--;
    numberOfCards--;

    // If that was the last card available of the type, remove it from cardsAvailable
    if (currentCardCount === 0) {
      cardsAvailable.splice(index, 1);
      ranks--;
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
      player.hand.push(card);
      // add card value to score
      player.updateScore();
    });
  }
}

let shoe = shuffleDeck(NUMBER_OF_DECKS);
const players = createPlayers(NUMBER_OF_PLAYERS);
// console.log(players);
deal(players, shoe);

// // test for players with aces
// const playersWithAces = players.filter(
//   player => player.hand[0] === 'ace' || player.hand[1] === 'ace'
// );
// // console.log(CARDS['ace']['aceHigh']);
// console.table(playersWithAces);
