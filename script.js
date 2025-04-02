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
    'tradition',
]

// Declare Variables
let selectedWord = ''
let displayedWord = ''
let wrongGuesses = 0
let guessedLetters = []
const maxMistakes = 6


      

    
window.addEventListener('keydown', function (event) {
    if (event.key == "Enter") {
        guessLetter()
    }
})


// Start Game Function (runs everything)
function startGame(level) {
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
    let filteredWords = wordList.filter(word => {
        if (level === 'easy') return word.length <= 4
        if (level === 'medium') return word.length >= 5 && word.length <= 7
        if (level === 'hard') return word.length >= 8
    })

    return filteredWords[Math.floor(Math.random() * filteredWords.length)]
}

//Update Difficulty Display
function updateDifficultyDisplay(level) {
    let difficultyBox = document.getElementById('difficultyBox')
    difficultyBox.classList.remove('easy', 'medium', 'hard')


    if (level === 'easy') {
        difficultyBox.classList.add('easy')
        difficultyBox.textContent = 'Difficulty: Easy'
    }
    else if (level === 'medium') {
        difficultyBox.classList.add('medium')
        difficultyBox.textContent = 'Difficulty: Medium'

    } else if (level === 'hard') {
        difficultyBox.classList.add('hard')
        difficultyBox.textContent = 'Difficulty: Hard'

    }
    updateUI()


}

function updateUI() {
    document.getElementById('wordDisplay').textContent = displayedWord.split('').join(' ') // Display the word with spaces between

}



function guessLetter() {
        let inputField = document.getElementById('letterInput')// Get input field
        let guessedLetter = inputField.value.toLowerCase() // Convert letter guesses into lowercase




    // Check if the guess if is a valid letter from (A-Z)
    if (!guessedLetter.match(/^[a-z]$/)) {
        alert('Please Enter a Valid Letter (a-z)!') // Alert user if invalid input
        inputField.value = '' // Clear input field
        return // Exit function 
    }

    // Check if letter was already guessed
    if (guessedLetters.includes(guessedLetter)) {
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

function updateWrongGuess(guessedLetter) {
    wrongGuesses++
    document.getElementById('wrongLetters').textContent += `${guessedLetter}`
    document.getElementById('shamrock').src = `imgs/ShamrockImage.jpg${6 - wrongGuesses}.`
    document.getElementById('shamrock1').src = `imgs/1Shamrock.png ${5 - wrongGuesses}.`


    if (wrongGuesses === maxMistakes) {
        endgame(false)
    }
}

function updateCorrectGuess(guessedLetter) {
    let newDisplayedWord = ''


    for (let i = 0; i < selectedWord.length; i++) {
        if (selectedWord[i] === guessedLetter) {
            newDisplayedWord += guessedLetter
        } else {
            newDisplayedWord += displayedWord[i]
        }
    }

    displayedWord = newDisplayedWord
    updateUI()


    // Check if the player has guessed all letters
    if (!displayedWord.includes('_')) {
        endGame(true)
    }



}


function endGame(won) {
    if (won) {
        console.log(`You have won the game! The word was ${selectedWord}`)



    }
    else {
        console.log(`Im sorry, you lost The word was ${selectedWord}`)
    }
}

// End Message - Shows a message that notifies the user that the game is over
let endMessage = `The Game is Over, Goodbye`
console.log(endMessage)
document.getElementById('gameOver').innerHTML = endMessage





// /Restart Game - Reloads the page to reset everything
function restartGame() {
    location.reload()
}










