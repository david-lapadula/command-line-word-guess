// bring in functionality of Word.js file
let Word = require("./word.js");

//Inquirer package to prompt user
let inquirer = require("inquirer");

//give the text of the game color
let clc = require('cli-color');

//allows starting the game with a drawing
let figlet = require('figlet');

//package for creating boxes in the terminal
const boxen = require('boxen');

//variables for the colors the game is going to use
let wrongGuessColor = clc.red.bold;
let correctGuessColor = clc.green.bold;
let gameText = clc.cyan.magenta;

// array of word objects, with boolean to determine if it has been chosen already or not
let listofWords = [
    {
        instrument: 'FLUTE',
        used: false
    },
    {
        instrument: 'HARMONICA',
        used: false
    },
    {
        instrument: 'PIANO',
        used: false
    },
    {
        instrument: 'DRUMS',
        used: false
    },
    {
        instrument: 'GUITAR',
        used: false
    },
    {
        instrument: 'VIOLIN',
        used: false
    },
    {
        instrument: 'SAXOPHONE',
        used: false
    },
    {
        instrument: 'CHELO',
        used: false
    },
    {
        instrument: 'XYLOPHONE',
        used: false
    },
    {
        instrument: 'MARACAS',
        used: false
    },
]

// counters for how the user has scored in the game
let wins = 0;
let losses = 0;

let guessesRemaining;
let lettersUsed = [];
let result;
let activeRound;

// Draw the text to start the game 
figlet("Word Guess CLI", function (err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data);
    //Welcome screen text.
    console.log(gameText("Welcome, your theme is...instruments! \r\n"));
    //Game instructions.
    let instructions =
        `\n Here are the rules
        \n A random word is generated when you agree to play the game.
        \n The amount of guesses you get is double the length of the word.
        \n Your goal is to guess letters and fill in the word before your guesses run out.
        \n After every word, you get the chance to choose another word.
        \n If you play until the words run out, your wins and losses are tabulated.
        \n Get more than 80% on the questions and you win the game.
        \n If at any point you want to exit the game, push 'CTRL' + 'c' \n`
    console.log(gameText(instructions));
    gameConfirm();
});


//Get the game started
function gameConfirm() {
    inquirer.prompt([
        {
            type: 'text',
            name: 'userName',
            message: 'Pick a Username',
            validate: function (value) {
                if (value.length != 0) {
                    return true;
                } else {
                    console.log('You cannot enter a blank username!')
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'startConfirmed',
            message: 'Select Yes to begin',
            default: true
        },
    ]).then(response => {

        //Set username
        userName = response.userName;

        // If the user selects yes to start the game, then display starting message and pick a new word. 
        if (response.startConfirmed) {
            console.log(gameText(`\r\nWelcome ${userName}, time to have some fun.\r\n`));
            newGame();
        } else {
            console.log(gameText(`Well ${userName}, you missed out on some fun`));
        }
    });
};

// function runs through the list of words array. Set's 'used' flag after word is chosen to prevent duplcaute choices in the same game
function getRandomWord() {
    do {
        randomInstrumentWord = listofWords[Math.floor(Math.random() * listofWords.length)];
    }
    while (randomInstrumentWord.used === true);

    listofWords[listofWords.findIndex(used => used === randomInstrumentWord)].used = true;

    return randomInstrumentWord.instrument;
};

// Function called whenever there is a new game
function newGame() {
    lettersUsed = [];
    activeRound = true;
    let currentWordObj = new Word(getRandomWord());
    guessesRemaining = currentWordObj.wordChosen.length * 2;
    playRound(currentWordObj);
}

//Check the status of the game. Game is over if wins and losses amount to the total words
function printStats() {

    console.log(`\r\n Tabulating results... \r\n`);

    //create a pause after the game is over
    setTimeout(stats, 2000);

    function stats() {

        // percentage is scored based on how many words the user actually answered
        let wordsCompleted = 0

        listofWords.forEach((element) => {
            if (element.used === true) {
                wordsCompleted++
            }
            //when the game over, set flag back to false incase user wants to play again
            element.used = false;
        });

        console.log(boxen('RESULTS', { borderStyle: 'double' }));
        console.log(`\r\n Okay ${userName}, here is how you did`);
        console.log(`\r\n Words Completed: ${wordsCompleted}`);
        console.log(`\r\nWins: ${wins}`);
        console.log(`\r\nLosses: ${losses}`);

        let gamePercent = wins / wordsCompleted * 100;

        // 80% required for a win
        gamePercent >= 80 ? console.log(`\r\nYou Got ${gamePercent} Percent! You Won!\r\n`) : console.log(`\r\nYou Got ${gamePercent} percent. Better luck next time!\r\n`);

        // blank wins and losses in case the user starts a new game 
        wins = 0;
        losses = 0;
        inquirer.prompt([
            {
                type: 'confirm',
                name: 'playAgain',
                message: 'Try Again?',
                default: false
            },
        ]).then(response => {
            if (response.playAgain) {
                newGame();
            } else {
                console.log(`\r\nI bid you adieu, ${userName}`)
            }
        });
    }
}

// recursive function to control the round. Takes random word as parameter
function playRound(wordObj) {

    // Conditions for a new game - when there haven't been any letters used. Only make the array of objects when no words have been guessed yet
    if (!lettersUsed.length) {
        result = 'New Word';
        wordObj.wordObjectArray();
    }

    // Display the results message to the user
    console.log(`\r\n${result}\r\n`);
    console.log(`Guesses Remaining: ${guessesRemaining}\r\n`);
    console.log("Letters Used: " + lettersUsed.join('-') + "\r\n");
    console.log(`Wins: ${wins} \r\n`);
    console.log(`Losses: ${losses} \r\n`);
    console.log(boxen(wordObj.displayWord(), { padding: 2, borderStyle: 'double' }));
    console.log('\r\n--------------------------------------------------------------\r\n');

    //check if any of the letters have yet to be guessed. Returns false if all letters have been guessed corretly, meaning user has completed the word. 
    let winRoundTest = wordObj.wordLetters.find(function (obj) { return obj.alreadyGuessed === false; });

    // The round has been lost when user runs out of guesses. 
    if (guessesRemaining === 0) {
        console.log(`\r\n You lose this round! The word was ${wordObj.wordChosen}\r\n`);
        activeRound = false;
        losses++;
        if (wins + losses === listofWords.length) {
            printStats();
        } else {
            inquirer.prompt([
                {
                    type: 'confirm',
                    name: 'lostRound',
                    message: 'Keep Going?',
                    default: true
                },
            ]).then(response => {
                if (response.lostRound) {
                    newGame();
                } else {
                    printStats();
                }
            });
        }
        // If this returns nothing then user has won the round
    } else if ((typeof winRoundTest) !== 'object') {
        console.log(`\r\n You win this round! The word was ${wordObj.wordChosen} \r\n`);
        activeRound = false;
        wins++;
        if (wins + losses === listofWords.length) {
            printStats();
        } else {
            inquirer.prompt([
                {
                    type: 'confirm',
                    name: 'wonRound',
                    message: 'Keep Going?',
                    default: true
                },
            ]).then(response => {
                if (response.wonRound) {
                    newGame();
                } else {
                    printStats();
                }
            });
        }
    }

    // Only prompt the user for a new guess when they are currently trying to complete a word. 'Active Round' flag set to false when they complete a word or run out of guesses
    if (activeRound) {
        inquirer.prompt([
            {
                name: 'letterGuess',
                message: 'Enter Your Guess',
                validate: function (value) {
                    upperValue = value.toUpperCase();

                    // user must enter a letter and it cannot be present in the words array
                    if (upperValue.length === 1 && upperValue.match(/[a-zA-Z]/i) && lettersUsed.indexOf(upperValue) === -1) {
                        return true;
                    } else if (lettersUsed.includes(upperValue)) {
                        console.log(' You already used that, try again!');
                        return false;
                    } else if (upperValue.length !== 1) {
                        console.log('Invalid Input');
                        return false;
                    }
                }
            },
        ]).then(data => {

            //Store the guess made
            let currentGuess = data.letterGuess.toUpperCase();
            // add the guess to the array of used letters
            lettersUsed.push(currentGuess);
            // check if the letter guessed is in the word and set the 'already guessed' flag to 'true' by calling the method
            wordObj.guessedLetter(currentGuess);

            // returns an object if the guess made matches any of the letters in the array of letter objects
            let correctGuess = wordObj.wordLetters.find(function (obj) { return obj.chosenChar === currentGuess; })

            if ((typeof correctGuess) === 'object') {
                result = correctGuessColor("CORRECT");
                playRound(wordObj);
            } else {
                // take a guess away if the user gets the letter wrong
                guessesRemaining--;
                result = wrongGuessColor("INCORRECT");
                playRound(wordObj);
            }  

        });
    }

};



