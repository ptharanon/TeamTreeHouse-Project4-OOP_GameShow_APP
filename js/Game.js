/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

class Game{
    constructor(){
        this.maxLife = 5;   //Max tries is 5
        this.missed = 0;    //Track current number of miss
        this.phrases = [ new Phrase('Hello world'),
                         new Phrase('Treehouse'),
                         new Phrase('Amazing OOP'),
                         new Phrase('Is this game hard'),
                         new Phrase('You are already dead')
                        ];
        this.activePhrase = null;
        this.isFirstGame = true;    //Track whether this is the first game
    }

    /**
     * Start the game
     */
    startGame(){
        //If this isn't the first game then reset the game states and missed
        if(!this.isFirstGame) {
            this.resetGameStates();
            this.missed = 0;
        } 
        //If this is the first game, assign isFirstGame to false
        else this.isFirstGame = false;

        //Remove the overlay
        overlay.style.display = 'none';

        //
        this.activePhrase = this.getRandomPhrase();
        
        //Setup the DOM element for the active phrase
        this.activePhrase.addPhraseToDisplay();
    }



    //this method randomly retrieves one of the phrases stored 
    //in the phrases array and returns it.
    getRandomPhrase(){
        return this.phrases[Math.floor(Math.random()*this.phrases.length)];
    }



    //this method controls most of the game logic
    //It checks to see if the button clicked by the player matches a letter in the phrase, 
    //and then directs the game based on a correct or incorrect guess. This method should:
    //  - Disable the selected letter’s onscreen keyboard button.

    //  - If the phrase does not include the guessed letter, 
    //  add the wrong CSS class to the selected letter's keyboard button and 
    //  call the removeLife() method.

    //  - If the phrase includes the guessed letter, add the chosen CSS class to the 
    //  selected letter's keyboard button, call the showMatchedLetter() method on the phrase, 
    //  and then call the checkForWin() method. If the player has won the game, 
    //  also call the gameOver() method.
    handleInteraction(input){
        const inputKey = input.textContent;
        const isMatch = this.activePhrase.checkLetter(inputKey);
        
        input.disabled = true;
        
        if(isMatch){
            this.activePhrase.showMatchedLetter(inputKey);

            input.classList.add('chosen');

            this.checkForWin() ? this.gameOver(true) : null;
        } 
        else {
            input.classList.add('wrong');
            this.removeLife();
        }
    }


    //this method removes a life from the scoreboard, 
    //by replacing one of the liveHeart.png images with a lostHeart.png image 
    //(found in the images folder) and increments the missed property. 
    //If the player has five missed guesses (i.e they're out of lives), 
    //then end the game by calling the gameOver() method.
    removeLife(){
        hearts[this.missed].src = 'images/lostHeart.png';
        
        this.missed++;

        (this.missed >= this.maxLife) ? this.gameOver(false) : null;
    }

    //this method checks to see if the player has revealed all of the letters in the active phrase.
    checkForWin(){
        const boardPhrase = document.querySelectorAll('#phrase ul li');

        let matchedNodes = [];

        boardPhrase.forEach(node => {
            let matchClass = Array.from(node.classList)
                                    .filter(nodeClass => nodeClass === 'hide');

            if(matchClass.length) matchedNodes.push(node);
        });

        return (!matchedNodes.length) ? true : false;
    }

    //this method displays the original start screen overlay, 
    //and depending on the outcome of the game, 
    //updates the overlay h1 element with a friendly win or loss message, 
    //and replaces the overlay’s start CSS class with either the win or lose CSS class.
    gameOver(isWin){
        const overlayClass = overlay.classList;

        overlay.style.display = 'inherit';
        overlayClass.remove('start');

        if(isWin){
            overlayClass.add('win');
            resultHeader.textContent = 'Congratz, you LIVE !';
        }
        else {
            overlayClass.add('lose');
            resultHeader.textContent = 'YOU DED !';
        }
    }


    resetGameStates(){
        function reset(type){
            switch(type){
                case 'hearts':
                    hearts.forEach(heart => {
                        heart.src = 'images/liveHeart.png'
                    })
                    break;

                case 'keys':
                    let resetKeyNode = [];
        
                    keys.forEach(key => {
                        if(key.classList.length > 1) resetKeyNode.push(key);
                        key.disabled = false;
                    });
                    resetKeyNode.forEach(node => {
                        (Array.from(node.classList).filter(c => c === 'chosen').length)? 
                            removeClass(node, 'chosen') : removeClass(node, 'wrong')
                    });
                    break;

                case 'phrases':
                    wordList.innerHTML = '';
                    break;
                    
                case 'headers':
                    const overlayClass = overlay.classList;
                    overlayClass.add('start');
                    removeClass(overlayClass, 'win');
                    removeClass(overlayClass, 'lose');
                    break;

                default:
                    break;
            }
        }

        function removeClass(node, target){
            node.classList.remove(target);
        }
        reset('hearts');
        reset('keys');
        reset('phrases');
        reset('headers');
    }
}