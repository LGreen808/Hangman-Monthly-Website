// Word List
const wordList = [
    'gold',
    'luck',
    'clover',
    'green', 
    'shamrock',
    'leprechaun',
    'march',
    'greenery',
    'tradition'
]

// Declare Variables
let selectedWord = ''
let displayedWord = ''
let wrongGuesses = 0
let guessedLetters = []
const maxMistakes = 6




// Start Game Function (runs everything)
function startGame(level){
    //reset game
    wrongGuesses = 0
    guessedLetters = []
    
    selectedWord = getRandomWord(level) // Gets a random word based on the level the user selected
    displayedWord = '_'.repeat(selectedWord.length)

    updateDifficultyDisplay(level)
    updateUI()

// Show Game Area / Difficulty Display , hide selection buttons
document.getElementById('gameArea').classList.remove('d-none');
document.getElementById('gameArea').classList.add('d-block');

document.getElementById('difficultyBox').classList.remove('d-none');
document.getElementById('difficultyBox').classList.add('d-block');

document.getElementById('difficultySelection').classList.add('d-none');

 document.getElementById('letterInput').focus();
}

function getRandomWord(level) {
    let filteredWords = wordList.filter ( word => {
       if(level === 'easy') return word.length <= 4
       if(level === 'medium') return word.length >= 5 && word.length <=7
       if(level === 'hard') return word.length >= 8
    })
    
    return filteredWords[Math.floor(Math.random()*filteredWords.length)]
}

//Update Difficulty Display
function updateDifficultyDisplay(level){
    let difficultyBox = document.getElementById('difficultyBox')
    difficultyBox.classList.remove('easy', 'medium', 'hard')


    if (level === 'easy') {
       difficultyBox.classList.add('easy')
       difficultyBox.textContent = 'Difficulty: Easy'
    }
    else if (level === 'medium'){
        difficultyBox.classList.add('medium')
        difficultyBox.textContent = 'Difficulty: Medium'

    } else if(level === 'hard') {
       difficultyBox.classList.add('hard')
       difficultyBox.textContent = 'Difficulty: Hard'
                
    }                                

                                                                                                                                                                                                                     
}   

function updateUI() {
    document.getElementById('wordDisplay').textContent = displayedWord.split('').join('') // Display the word with spaces between
    
}



function guessLetter () {
    let inputField = document.getElementById('letterInput') // Get input field
    let guessedLetter = inputField.value.toLowerCase() // Convert letter guesses into lowercase
    


// Check if the guess if is a valid letter from (A-Z)
  if (!guessedLetter.match(/^[a-z]$/)) {
    alert('Please Enter a Valid Letter (a-z)!') // Alert user if invalid input
    inputField.value = '' // Clear input field
    return // Exit function 
}
  
// Check if letter was already guessed
if (guessedLetters.includes(guessLetter)) {
alert('You have already guessed this letter, please choose another one!')
inputField.value = '';
return;
}


// Store guessed Letter
guessedLetters.push(guessedLetter) 

// Check if guessed letter is in the selected word
if (selectedWord.includes(guessedLetter)) {
    updateCorrectGuess(guessedLetter)
} else {
    updateWrongGuess(guessedLetter)
}

 inputField.value = '' // Clear input field
 document.getElementById('letterInput').focus() // Refocus input field for next guess

}    