
const suits = ['♠️ Spades','♦️ Diamonds','❤ Hearts','♣️ Clubs'];
const values = ['2','3','4','5','6','7','8','9','10','Jack','Queen','King','Ace'];

let deck = [];
let shuffledDeck = [];

let win = false;
let draw = false;

const House = {
  name : 'House',
  hand : [],
  points : 0
}

const players = [House];

// **************** Create Player *****************
function createPlayer() {
  let newName = prompt("Please enter your name: ");

  players.push(Player = {
    name : newName,
    hand : [],
    points : 0,
    bet : 0
  })
}

// ****************** Start Game *********************
function start() {
    createDeck();
    shuffle(deck);
    createPlayer();
    gamble();
}

// ************* Create a Deck of Cards ************
function createDeck(){
  for (let i = 0; i < values.length; i++) {
    for (let x = 0; x < suits.length; x++) {
      
      let valueWeight = parseInt(values[i]);
    
      if (values[i] == "Jack" || values[i] == "Queen" || values[i] == "King") valueWeight = 10;
      if (values[i] == "Ace") valueWeight = 11;

      let card = { 
        Value : values[i], 
        Suit : suits[x], 
        Weight : valueWeight 
        };
      deck.push(card);
    }
  } 
}

// ***************** Shuffle Deck ********************
function shuffle(array) {
  for (let i = 0; i < array.length; i++) {
    let randomNum = Math.floor(Math.random() * array.length);
    shuffledDeck.push(deck[randomNum]);
  }
}
// ************** Place Bet *******************
function gamble() {
  let betPlaced = false;

  while (!betPlaced) {
    let betAmount = prompt("Place bet amount: ");
    betAmount = Number(betAmount);
    
    // If bet amount is a valid number, update player object
    if (typeof betAmount == 'number' && betAmount > 0) {
      betPlaced = true;
      Player.bet = betAmount;
      console.log(Player.name,' bets $',Player.bet)
      console.log('')
    }
    else {
      console.log('Invalid entry. Please enter a valid number');
    }
  }
  return deal();
}

// **************** Deal the Cards *******************
function deal() {
  console.log("Let's play Blackjack")
  console.log('----------------------------------------------');
  // Deal 2 cards alternating between players
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < players.length; j++) {

      // Pop a card out of the shuffled deck into player hand
      let card = shuffledDeck.pop();
      players[j].hand.push(card);
      players[j].points += card.Weight;
    }
  }
  // Show player hands
  return showHand();
}

// **************** Players Show Hands *******************
function showHand() {
  console.log(House.name);
  console.log(House.hand[0].Value,' of ',House.hand[0].Suit);
  console.log(House.hand[1].Value,' of ',House.hand[1].Suit);

  console.log('Points: ', House.points);
  console.log('');
  console.log('----------------------------------------------');

  console.log(Player.name);
  console.log(Player.hand[0].Value,' of ',Player.hand[0].Suit);
  console.log(Player.hand[1].Value,' of ',Player.hand[1].Suit);
  console.log('Points: ', Player.points);
  console.log('');
  
  // If player is dealt a 21, then it's house's turn
  if (Player.points == 21) {
    console.log("Blackjack! You hit 21.");
    return stay();
  }
  // Ask player to hit or stay
  return hitOrStay();
}

// *********** Prompt Player to Hit or Stay ************
function hitOrStay() {
  let chosen = false;

  while (!chosen) {
    console.log('');

    let choice = prompt('Would you like to Hit or Stay? ( H / S )');
      if (choice == 'h' || choice == 'H') {
        chosen = true;
        return hit();
    }
      else if (choice == 's' || choice == 'S') {
        chosen = true;
        console.log(Player.name,' stays');
        stay();
    }
    if (!chosen) {
      console.log("Please select either 'H' or 'S'");
    }
  }
}

// ********************* Hit Me *************************
function hit() {
      // Player draws a card
      console.log('');
      console.log(Player.name,' hits ***********');
      let card = shuffledDeck.pop();

      // Add card to hand and update points, display card
      Player.hand.push(card);
      Player.points += card.Weight;
      console.log(card.Value,' of ',card.Suit);
      console.log('Total points: ',Player.points);

      // If player's points exceeds 21, player loses
      if (Player.points > 21) {
          console.log('');
          console.log('Bust!');
          console.log('');
          return gameEnd();
      }
      // If player hits 21, end turn
      if (Player.points == 21) {
        return stay();
      }
      // Return prompt for player to hit or stay
      return hitOrStay();
}

// ***************** I'll Stay **********************
function stay() {
  // House draws a card until it exceeds 21 points
  if (House.points < 18) {
    while (House.points < 21) {
      console.log('');
      console.log(House.name,' hits ***********');
      let card = shuffledDeck.pop();

      // Add card to hand and update point, display card
      House.hand.push(card);
      House.points += card.Weight;
      console.log(card.Value,' of ',card.Suit);
      console.log('');

      // If house points exceed 21 or get close, stop hitting
      if (House.points > 18 || House.points > 21) {
        break;
      }
    }
  }
  // If house has less points or exceeds 21, player wins
  if (House.points < Player.points || House.points > 21){
    win = true;
    return gameEnd();
  }
   // If house has more points, house wins
  else if (House.points > Player.points) {
    return gameEnd();
  }
  // If players have equal points, it's a draw
  else if (House.points == Player.points) {
    draw = true;
    return gameEnd();
  }
}

// ***************** End Game Results *****************
function gameEnd() {
    let selected = false;

    // Display names and final hands
    console.log('----------------------------------------------');
    console.log(House.name,' Points: ',House.points);
    console.log(Player.name,' Points: ',Player.points);
    console.log('----------------------------------------------');
 

    // If it's a draw
    if (draw) {
      console.log("Draw");
    }
    // If player wins, double bet amount
    else if (win) {
      console.log(Player.name,' Wins!');
      Player.bet += Player.bet;
    }
    // If house wins, subtract bet amount
    else {
      console.log(House.name,' Wins');
      Player.bet -= Player.bet;
    }
  // Greeting
  console.log('');
  console.log('Thanks for playing Blackjack,',Player.name);
  console.log('You now have $',Player.bet);
  console.log('');

  // Loop through the prompt to play again
  while (!selected) {
    let newGame = prompt('Play again? ( Y / N ) ');

    // If player selects yes, reset everything
    if (newGame == 'y' || newGame == 'Y') {
      selected = true;
      Player.hand = [];
      Player.points = 0;
      House.hand = [];
      House.points = 0;
      // hitCount = 2;
      win = false;
      draw = false;
      deck = [];
      shuffledDeck = [];
      createDeck();
      shuffle(deck);
      if (Player.bet <= 0) {
        gamble();
      }
      return deal();
    }
    // If player selects no, end program
    else if (newGame == 'n' || newGame == 'N') {
      console.log('');
      console.log('Your limousine will be here in 10,',Player.name);
      console.log('While you wait would you like to...')
      console.log('');
    }
    else {
      console.log("Please enter a 'Y' or 'N' ");
      console.log('');
    }
  }
}
//  *********** Start Blackjack Game *********
start();
