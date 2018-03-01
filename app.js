// List containing all the cards
var deck =  ["fa-leaf", "fa-leaf","fa-bicycle", "fa-bicycle", "fa-bomb", "fa-bomb","fa-diamond", "fa-diamond", "fa-paper-plane-o", "fa-paper-plane-o", "fa-anchor", "fa-anchor"
"fa-bolt", "fa-bolt", "fa-cube", "fa-cube"];

// Defining variables
var matchedCards = 0;
var quantityOfMoves = 0;
var numOfStars = 3;
var timer = {seconds: 0, minutes: 0};
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
}

// Mixing cards on the board by using (shuffle function)
function updateCards() {
    var index = 0;
    deck = shuffle(deck);
    $.each($(".card i"), function() { 
      $(this).attr("class", "fa " + deck[index]);
      index += 1; 
    });
    
    timerRestart();
};

// Incrementing time , also checking for correct format of time
function timerSet(){
    if(timer.seconds === 59){
      timer.seconds = 0;
      timer.minutes +=1;
    }else if(timer.seconds < 59){
      timer.seconds +=1;
    }
}

// Restarts the time settings
function timeRestart() {
    clearInterval(timer.clearTime);
    timer.seconds = 0;
    timer.minutes = 0;
    $(".set-timer").text("0:00");

    timer.clearTime = setInterval(timeSet, 2000);
};
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
