// use the letter function from the letter.js file
let Letter = require('./letter');
 
class Word {
    constructor(wordChosen) {
        //word that has been chosen from the array
        this.wordChosen = wordChosen;
        //Array of new letter objects that represents the underlying word
        this.wordLetters = []; 
    }
}   

// Make an array of letter objects for each letter of the word that has been chosen
Word.prototype.wordObjectArray = function() {
    let wordsplit = this.wordChosen.split("");
    for (let letter in wordsplit) {
        let newLetter = new Letter(wordsplit[letter]);
        this.wordLetters.push(newLetter);
    } 
}; 

//Call return character method for each letter to return either an underline or the letter guessed
Word.prototype.displayWord = function() {
    let wordString = ""; 
    this.wordLetters.forEach(letter => {
        wordString += letter.returnCharacter() + ''; 
    }); 

    return wordString; 
}; 

// call guessed letter method for each letter object to change the flag of 'already guessed' to true if the guess is correct
Word.prototype.guessedLetter = function(guess) {
    this.wordLetters.forEach(letter => {
    letter.checkCharacter(guess);  
    }); 
}; 
 
//Export letter constructor for other modules
module.exports = Word;    
 
