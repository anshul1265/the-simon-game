// starting of the project. Checking if the file is linked properly
console.log("This is game.js");

// array initialized for remembering pattern in the game
let gamePattern = [];
let userClickedPattern = [];

// array initialized for different colours
let buttonColours = ['red', 'blue', 'green', 'yellow'];

// startOver function
function startOver(){
    level = 0;
    gamePattern = [];
    i = false;
}

// checkAnswer function
function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }
    else {
        let audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $('body').addClass('game-over');
        setTimeout(function () {
            $('body').removeClass('game-over');
        }, 200);
        $('#level-title').text('Game Over, Press Any Key to Restart');
        startOver();
    }
}

// animatePress function
function animatePress(currentColour) {
    $('.' + currentColour).addClass('pressed');
    setTimeout(function () {
        $('.' + currentColour).removeClass('pressed');
    }, 100);
}

// playsound function
function playsound(name) {
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
    animatePress(name);
}

// looking for the user to click the button
$(".btn").click(function () {
    console.log("I got clicked");
    // handler function
    let userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    playsound(this.id);
    console.log('start' + userClickedPattern);
    checkAnswer(userClickedPattern.length - 1);
    console.log('end' + userClickedPattern);
    console.log(userClickedPattern.length -1);
});

// if the user press a key from the keyboard, then the game will start
let i = false;
let level = 0;
$(document).keypress(function () {
    if (i == false) {
        $('#level-title').text('Level ' + level);
        nextSequence();
        i = true;
    }
});

// function for generating the next sequence
function nextSequence() {
    userClickedPattern = [];
    level++;
    $('#level-title').text('Level ' + level);
    let randomNumber = Math.floor(4 * Math.random());
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $('#' + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playsound(randomChosenColour);
}