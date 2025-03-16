## Command Line Word Guess

## Table of contents
1. [Description](#description)
2. [Technology](#technology)
2. [Installation](#installation)
3. [Usage](#usage)

## Description

Command line game built with Node.js that generates random words for users to guess. It starts by displaying the letters of a word as underscores (e.g., '_ _ _ _ _'), which will be replaced by correctly guessed letters. The number of guesses is equal to twice the length of the randomly generated word. Wins, losses, and previously guessed words are also tracked while the game is running.

## Technology
* [Figlet](https://www.npmjs.com/package/figlet)
* [Inquirer](https://www.npmjs.com/package/@inquirer/prompts)
* Javascript
* [Node.js](https://nodejs.org/en/download/)

## Installation

1. Clone the repository to your local machine. 
```bash
git clone https://github.com/DavidLapadula/command-line-word-guess.git
cd command-line-word-guess
```  
2. Ensure node is installed; link in the [Technology](#technology) section. 
3. Open a terminal in the root directory and run: 
```
npm install
```
4. Open a terminal in the root directory, run the command below, and follow the prompts in the terminal.
```
node index
```

## Usage
![](./images/cliGuess.gif)
  

