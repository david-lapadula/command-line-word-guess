class Letter {
    constructor(chosenChar) {
        // store underlying character of the word
        this.chosenChar = chosenChar;
  
        //boolean to store whether letter has been guessed. False is default
        this.alreadyGuessed = false;
    }  
} 

    // If letter has bee guessed return it, otherwise return underline
    Letter.prototype.returnCharacter = function() {
        if (!this.alreadyGuessed) {
            return " _ ";
        } else {
            return this.chosenChar;
        }
    }
 
    // Checks if character is same as underlying character and sets alreadyGuessed to true if it did
    Letter.prototype.checkCharacter = function(char) {
        if (this.alreadyGuessed === true) {
            return; 
        } else if (char === this.chosenChar ) {
            this.alreadyGuessed = true 
        }
    }
 

//Export letter constructor for other modules
module.exports = Letter;   