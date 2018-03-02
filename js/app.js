// List containing all the cards
var deck =  ["fa-leaf", "fa-leaf","fa-bicycle", "fa-bicycle", "fa-bomb",
"fa-bomb","fa-diamond", "fa-diamond", "fa-paper-plane-o", "fa-paper-plane-o",
"fa-anchor", "fa-anchor","fa-bolt", "fa-bolt", "fa-cube", "fa-cube"];

// Defining variables
var matchedCards = 0;
var quantityOfMoves = 0;
var numOfStars = 3;
var timer = {seconds: 0, minutes: 0, resetTime: -1};
var open = [];
var winPopUp = $("#popup-win");

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
};

// Mixing cards on the board by using (shuffle function)
function shuffleCards() {
    var index = 0;
    deck = shuffle(deck);

    // Iterate through array of shuffled cards
    $.each($(".card i"), function() {
      $(this).attr("class", "fa " + deck[index]);
      index += 1;
    });
    timerReset();
};

// Triggers winning condition
function displayWinningMsg(){
    winPopUp.css("display", "block");
};

// Starts the timer, ensures valid format of time in terms of sec. and min.
var timerSet = function(){

    // Make sure that amount of seconds wont be > than 59
    if(timer.seconds === 59){
      timer.seconds = 0;
      timer.minutes +=1;
    } else {
      timer.seconds +=1;
    }

    // Update HTML file with timer count
    var currentTime = String(timer.minutes) + ":" + String(timer.seconds);
    $(".set-timer").text(currentTime);
};

// Restarts the time settings
function timerReset() {

    // clears a timer set value
    clearInterval(timer.resetTime);
    timer.seconds = 0;
    timer.minutes = 0;

    // Updates the timer in HTML
    $(".set-timer").text("0:0");
    timer.resetTime = setInterval(timerSet, 1000);
};

// Removes stars from list of stars
function removeStar() {

    // last() for removing last object from list of stars
    $(".fa-star").last().attr("class", "fa fa-star-o");
    numOfStars -= 1;

    // Update the quantity of stars in HTML
    $(".stars-quantity").text(String(numOfStars));
};

// Set the amount of stars to the default value (3)
function resetStars() {
    $(".fa-star-o").attr("class", "fa fa-star");
    numOfStars = 3;

    // Update the quantity of stars in HTML
    $(".stars-quantity").text(String(numOfStars));
};

// Checks whether cards are matching each other
function matchingCheck() {
    if (open[0].children().attr("class") === open[1].children().attr("class")){
        return true;
    } else {
        return false;
    }
};

// Updates number of moves in the HTML
function updateNumOfMoves() {
    $(".moves").text(quantityOfMoves);

    // Remove stars after certain quantity of moves
    if (quantityOfMoves === 14 || quantityOfMoves === 18
      || quantityOfMoves === 25) {
        removeStar();
    }
};

// Check whether "card" is correct move
function isCorrectMove(card) {
    return !(card.hasClass("open") || card.hasClass("match"));
};

// Checks for winning condition
function winningCondition() {

    /* 16 is the quantity of all cards on the board
    * If all of them are opened then return true, otherwise false
    */
    if (matchedCards === 16) {
        return true;
    } else {
        return false;
    }
};

// Sets currently opened cards to the matched condition
var setAsMatched = function() {
    open.forEach(function(card) {
        card.addClass("match");
    });

    // matchedCards +2 because two cards will reveal after matching
    matchedCards += 2;
    open = [];

    // if winningCondition() returns true, display winning message, reset time
    if (winningCondition()) {
        clearInterval(timer.resetTime);
        displayWinningMsg();
    }
};

// Resets all game state variables and resets all required HTML to default state
var restartGame = function() {
    matchedCards = 0;
    quantityOfMoves = 0;
    open = [];
    timerReset();
    updateNumOfMoves();
    $(".card").attr("class", "card");
    shuffleCards();
    resetStars();
};

// Reveals cards on the board
function revealCards(card) {

    // if card doesnt have class "open", add it and show it
    if (!card.hasClass("open")) {
        card.addClass("open");
        card.addClass("show");

        // add a new item to the array of opened cards
        open.push(card);
    }
};

// Resets the board and closes all the opened cards
var resetBoard = function() {

    // For each element in card array remove open and show cases
    open.forEach(function(card) {
        card.toggleClass("open");
        card.toggleClass("show");
    });

    // Set the defualt value to the array "open[]"
    open = [];
};

// The game algorithm and logic
var gameBody = function() {
    if (isCorrectMove( $(this) )) {
        if (open.length === 0) {
            revealCards( $(this) );
        } else if (open.length === 1) {
            revealCards( $(this) );
            quantityOfMoves += 1;
            updateNumOfMoves();
            if (matchingCheck()) {
                setTimeout(setAsMatched, 200);
            } else {
                setTimeout(resetBoard, 600);
            }
        }
    }
};

// Resets game state and closes winning message(window)
var playAgain = function() {
    restartGame();
    winPopUp.css("display", "none");
};

// Event listeners
$(".card").click(gameBody);
$(".restart").click(restartGame);
$(".play-again").click(playAgain);

// Provides a randomized game board
$(shuffleCards);
