/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

/*********************************
 * List of DOM element constants *
 *********************************/
const resultHeader = document.getElementById('game-over-message');
const overlay = document.getElementById('overlay');

const startBtn = document.getElementById('btn__reset');
const keys = document.querySelectorAll('.key');

const hearts = document.querySelectorAll('#scoreboard ol li img');

const wordList = document.querySelector('#phrase ul');


/************************
 * Game object variable *
 ************************/
let game = null;


/*******************
 * Event listeners *
 *******************/

//Event listener for 'click' event on the start button
startBtn.addEventListener('click', e => {

    //If the game object is not instantiated, create a new one
    //If the game object is already instantiated, use the existing one
    (game === null) ? game = new Game() : null;

    //Start the game
    game.startGame();
})

//Event listener for 'click' event on the on-screen keyboard
keys.forEach(key => {
    key.addEventListener('click', e => {

        //Handle the click interaction on the on-screen keyboard
        game.handleInteraction(e.target);
    })
})