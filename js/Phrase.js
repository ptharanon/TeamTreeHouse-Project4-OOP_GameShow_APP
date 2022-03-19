/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

class Phrase {
    constructor(phrase) {
        this.phrase = phrase.toLowerCase();
    }


    /**
     * Add current active phrase to the DOM
     */
    addPhraseToDisplay() {
        const phraseArr = this.phrase.split('');

        //For each characters in the phrase, create li element and add associated class
        phraseArr.forEach(char => {
            const letterPattern = /[a-z]/i;
            const listElement = document.createElement('li');

            //Assign the character into the text content of the li element
            //(possibly add a check for each character for valid characters i.e. letter and space before proceeding)
            listElement.textContent = char;

            //If the character is a letter [a-z] then assign 'hide', 'letter' and its character class to the element
            if (char.match(letterPattern)) {
                listElement.classList.add('hide');
                listElement.classList.add('letter');
                listElement.classList.add(char);
            }
            //If the character is a space then only assign 'space' class to the element
            else {
                listElement.classList.add('space');
            }

            //Append the 'li' element to the parent 'ul' element
            wordList.appendChild(listElement);
        });
    }


    /**
     * Check whether the input character is a match
     * @param   {char}       input - input character from the player
     * @return  {boolean}    isMatch - check result whether the input match any character in the phrase
     */
    checkLetter(input) {
        const phraseArr = this.phrase.split('');

        //note: Can also use filter instead but longer syntax ??
        //      not sure about the pro / cons between filter and reduce here except reduce is shorter

        //Using reduce on the pharse array to check for a match
        //By iterating through each character and recursively assign check result between previous
        //check result and current check result from 'char === input'
        const isMatch = phraseArr.reduce((result, char) => {
            return result = result || char === input;
        }, false);

        return isMatch;
    }


    /**
     * Show the matched character/s on the DOM
     * @param   {char}       input - input character from the player
     */
    showMatchedLetter(input) {

        //Query the active phrase DOM element
        const boardPhrase = document.querySelectorAll('#phrase ul li');

        //Variable to hold the matched DOM element node
        let matchedNodes = [];

        //Iterate through each active phrase DOM element and check for matched node/s
        boardPhrase.forEach(node => {

            //Iterate through the current node class collection
            let matchClass = Array.from(node.classList)
                .filter(nodeClass => nodeClass === input);

            //If the class contain the input character class then
            //add the node to the matchedNodes array
            if (matchClass.length) matchedNodes.push(node);
        });

        //If there are any match then for the matched nodes
        //remove 'hide' class and add 'show' class
        if (matchedNodes.length) {
            matchedNodes.forEach(node => {
                node.classList.remove('hide');
                node.classList.add('show');
            });
        }
    }
}