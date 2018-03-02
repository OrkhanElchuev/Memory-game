// List containing all the cards
var deck =  ["fa-leaf", "fa-leaf","fa-bicycle", "fa-bicycle", "fa-bomb", "fa-bomb","fa-diamond", "fa-diamond", "fa-paper-plane-o", "fa-paper-plane-o", "fa-anchor", "fa-anchor"
"fa-bolt", "fa-bolt", "fa-cube", "fa-cube"];

// Defining variables
var matchedCards = 0;
var quantityOfMoves = 0;
var numOfStars = 3;
var timer = {seconds: 0, minutes: 0, resetTime: -1};
var open = [];
var expert = 12;
var amateur = 18;
var beginner = 25;
var winPopUp = $("#popup-win-id");

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

// Starts the timer, ensures valid format of time in terms of sec. and min.
function timerSet(){

    // Make sure that amount of seconds wont be > than 59
    if(timer.seconds === 59){
      timer.seconds = 0;
      timer.minutes +=1;
    }else if(timer.seconds < 59){
      timer.seconds +=1;
    }
    var currentTime = String(timer.minutes) + ":" + String(timer.seconds);
    $(.timer).text(currentTime);
};

// Restarts the time settings
function timerReset() {

    // clears a timer set value
    clearInterval(timer.resetTime);
    timer.seconds = 0;
    timer.minutes = 0;

    // Updates the timer in HTML
    $(".set-timer").text("0:00");
    timer.resetTime = setInterval(timerSet, 2000);
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

// Triggers winning condition
function displayWinningMsg(){
    popUpWin.css("display", "block");
};

// Updates number of moves in the HTML
function updateNumOfMoves() {
    $(".moves").text(quantityOfMoves);
};

// Checks whether cards are matching each other
function matchingCheck() {
    if (open[0].children().attr("class") === open[1].children().attr("class")) {
        return true;
    } else {
        return false;
    }
};

// Check whether "card" is correct move
function isCorrectMove(card) {
    return !(card.hasClass("open") || card.hasClass("match"));
};

