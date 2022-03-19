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

        //Get random phrases and assign it to the active phrase for the current game
        this.activePhrase = this.getRandomPhrase();
        
        //Setup the DOM element for the active phrase
        this.activePhrase.addPhraseToDisplay();
    }


    /**
     * Get a random phrase from the available phrase array
     * @return  {string}    random phrase string
     */
    getRandomPhrase(){
        return this.phrases[Math.floor(Math.random()*this.phrases.length)];
    }


    /**
     * Handle player input from on-screen keyboard
     * @param   {DOM element}       input - DOM element node of the clicked on-screen keyboard
     */
    handleInteraction(input){
        //Extract the input character from the on-screen keyboard element
        const inputKey = input.textContent;

        //Check whether the input character is a match
        const isMatch = this.activePhrase.checkLetter(inputKey);
        
        //Disable the input DOM element
        input.disabled = true;
        
        //If the input is a match, add 'chosen' class to the element and check for the win conditions
        if(isMatch){

            //Show the matched character/s on the phrase
            this.activePhrase.showMatchedLetter(inputKey);

            //Add 'chosen' class to the element
            input.classList.add('chosen');

            //Check for the win, if the player win call the 'gameOver' method with true
            //else do nothing
            this.checkForWin() ? this.gameOver(true) : null;
        } 

        //If the input isn't a match, add 'wrong' class to the element and subtract a life
        else {
            //Add 'wrong' class to the element
            input.classList.add('wrong');

            //Remove a life
            this.removeLife();
        }
    }


    /**
     * Remove a player life
     */
    removeLife(){
        //Replace live heart with lost heart
        hearts[this.missed].src = 'images/lostHeart.png';
        
        //Increment missed count
        this.missed++;

        //If the missed count is more than max life then call 'gameOver' method with false meaning game over
        //else do nothing
        (this.missed >= this.maxLife) ? this.gameOver(false) : null;
    }


    /**
     * Check for win conditions
     * @return  {boolean}    return true if the player win else return false
     */
    checkForWin(){
        //Query the phrase DOM element
        const boardPhrase = document.querySelectorAll('#phrase ul li');

        //Variable to hold the character DOM elemenet node which are hidden
        //This will be used to check whether all characters are revealed or not
        //If all characters were revealed then it meant the player won
        let hideNodes = [];

        //Iterate through the active phrase and look for any with 'hide' class
        //If any, add them into the 'hideNodes' array
        boardPhrase.forEach(node => {
            let matchClass = Array.from(node.classList)
                                    .filter(nodeClass => nodeClass === 'hide');

            if(matchClass.length) hideNodes.push(node);
        });

        //Check whether 'hideNodes' array has any item, if there isn't any then it means the player win and return true
        //else do nothing
        return (!hideNodes.length) ? true : false;
    }


    /**
     * Process the ending of the game whether the player win or loss
     * @param   {boolean}    isWin   - if the play win then the parameter is true and vice versa
     */
    gameOver(isWin){
        const overlayClass = overlay.classList;

        //Reset the overlay back
        overlay.style.display = 'inherit';
        overlayClass.remove('start');

        //If the player won, add 'win' class to the overlay and display a congratuation message
        if(isWin){
            overlayClass.add('win');
            resultHeader.textContent = 'Congratz, you LIVE !';
        }

        //If the player lose, add 'lose' class to the overlay and display a loss message
        else {
            overlayClass.add('lose');
            resultHeader.textContent = 'YOU DED !';
        }
    }

    /**
     * Reset the game states back to the initial states
     */
    resetGameStates(){

        //Function to handle various reset types
        function reset(type){
            switch(type){

                case 'hearts':
                    //Resetting hearts back to live hearts
                    hearts.forEach(heart => {
                        heart.src = 'images/liveHeart.png'
                    })
                    break;

                case 'keys':
                    //Variable to hold DOM nodes which need to be reset
                    let resetKeyNode = [];
        
                    //Resetting all on-screen keys back to initial states
                    //via iterating through all DOM nodes and add them to the array of nodes to be reset
                    keys.forEach(key => {

                        //Check whether the current node has more than 1 class
                        //Add it into the array of nodes to be reset if there is more than 1 class
                        if(key.classList.length > 1) resetKeyNode.push(key);
                        
                        //Reset disabled property to true
                        key.disabled = false;
                    });

                    //Iterate through the array of nodes to be reset and remove extra class
                    resetKeyNode.forEach(node => {

                        //Check whether the node has 'chosen' class or not
                        //If yes, remove the 'chosen' class
                        //If not, remove the 'wrong' class
                        (Array.from(node.classList).filter(c => c === 'chosen').length)? 
                            removeClass(node, 'chosen') : removeClass(node, 'wrong')
                    });
                    break;

                //Reset the phrase DOM li element
                case 'phrases':
                    wordList.innerHTML = '';
                    break;
                    
                //Reset the headers
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

        //Helper function to remove target class from the input node
        function removeClass(node, target){
            node.classList.remove(target);
        }

        reset('hearts');
        reset('keys');
        reset('phrases');
        reset('headers');
    }
}