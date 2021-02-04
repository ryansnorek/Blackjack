
// Arrays of card suits and values
const suits = ['Spades','Diamonds','Hearts','Clubs'];
const values = ['2','3','4','5','6','7','8','9','10','J','Q','K','A'];

// Empty arrays to store deck and shuffled deck
let deck = [];
let shuffledDeck = [];

// Counts how many hits the player takes, starting with the 3rd card (2nd index) of players hand
let hitCount = 2;

// Bool condition variables to determine game results
let win = false;
let draw = false;

// Create House player object
const House = {
  name : 'House',
  hand : [],
  points : 0
}
// Array to store all players
const players = [House];

// **************** CREATE PLAYER *****************
function createPlayer() {
  // Prompt player to enter name
  let newName = prompt("Please enter your name: ");
  // Create player object
  players.push(Player = {
    name : newName,
    hand : [],
    points : 0,
    bet : 0
  })
}

// ************** PLACE BET *******************
function gamble() {
  let betPlaced = false;
  // Loop until bet is placed
  while (!betPlaced) {
    // Prompt player for bet amount, check if valid entry
    let betAmount = prompt("Place bet amount: ");

    // Convert input string to a number
    betAmount = Number(betAmount);
    
    // If bet amount is a valid number, update player object
    if (typeof betAmount == 'number' && betAmount > 0) {
      betPlaced = true;
      Player.bet = betAmount;
      console.log(Player.name,' bets $',Player.bet)
      console.log('')
    }
    // Otherwise throw an error message
    else {
      console.log('Invalid entry. Please enter a valid number');
    }
  }
  return deal();
}

// ************* CREATE A DECK OF CARDS ************
function createDeck(){
  // Loop through the values and suits
  for (let i = 0; i < values.length; i++) {
    for (let x = 0; x < suits.length; x++) {
      
      // Convert strings to integers
      let valueWeight = parseInt(values[i]);
        
      // Assign the face cards to 10
      if (values[i] == "J" || values[i] == "Q" || values[i] == "K") valueWeight = 10;
      
      // Assign the Ace to 11
      if (values[i] == "A") valueWeight = 11;

      // Create card object
      let card = { 
        Value : values[i], 
        Suit : suits[x], 
        Weight : valueWeight 
        };

      // Push each card into the deck
      deck.push(card);
    }
  } 
}

// ***************** SHUFFLE DECK ********************
function shuffle(array) {
  // Loop through the deck
  for (let i = 0; i < array.length; i++) {

    // Assign a variable to a random number less than deck
    let randomNum = Math.floor(Math.random() * array.length);

    // Push a random card into a new shuffled deck
    shuffledDeck.push(deck[randomNum]);
  }
}

// ***************** END GAME RESULTS *****************
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
      hitCount = 2;
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
    // If player selects an invalid entry, clarify rules 
    else {
      console.log("Please enter a 'Y' or 'N' ");
      console.log('');
    }
  }
}

// ***************** I'LL STAY **********************
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
      console.log(card);
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

// ********************* HIT ME *************************
function hit() {
      // Player draws a card
      console.log('');
      console.log(Player.name,' hits ***********');
      let hitCard = shuffledDeck.pop();

      // Add card to hand and update point, display card
      Player.hand.push(hitCard);
      Player.points += hitCard.Weight;
      console.log(hitCard);

      // Display total points and increment count
      console.log('Total points: ',Player.points);
      hitCount++;

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

// *********** PROMPT PLAYER TO HIT OR STAY ************
function hitOrStay() {
  // Set a bool to check if player has chosen a valid entry
  let chosen = false;

  // Loop through the prompt to hit or stay
  while (!chosen) {
    console.log('');
    // If player hits, execute the hit function
    let choice = prompt('Would you like to Hit or Stay? ( H / S )');
      if (choice == 'h' || choice == 'H') {
        chosen = true;
        return hit();
    }
      // If player stays, execute the stay function
      else if (choice == 's' || choice == 'S') {
        chosen = true;
        console.log(Player.name,' stays');
        stay();
    }
    // If player has an invalid entry, clarify the rules
    if (!chosen) {
      console.log("Please select either 'H' or 'S'");
    }
  }
}

// **************** PLAYERS SHOW HAND *******************
function showHand() {
  // Display players starting hands
  console.log(House.name);
  console.log(House.hand);
  console.log('Points: ', House.points);
  console.log('');
  console.log('----------------------------------------------');

  console.log(Player.name);
  console.log(Player.hand);
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

// **************** DEAL THE CARDS *******************
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

// ****************** GAME BEGINS *********************
function start() {
    createDeck();
    shuffle(deck);
    createPlayer();
    gamble();
}

//  *********** START BLACKJACK GAME *********
start();
