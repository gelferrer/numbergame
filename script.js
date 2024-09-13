// Generate a random 4-digit number
function generateNumber() {
    let number;
    do {
        number = Math.floor(Math.random() * 9000) + 1000; // Generate a number between 1000 and 9999
    } while (new Set(String(number)).size !== 4); // Ensure all digits are unique
    return String(number);
}

const targetNumber = generateNumber();

function checkGuess() {
    const guess = document.getElementById('guess').value;
    const results = document.getElementById('results');
    
    if (guess.length !== 4 || isNaN(guess)) {
        results.textContent = 'Please enter a valid 4-digit number.';
        return;
    }
    
    let correctDigitsInPlace = 0;
    let correctDigitsOutOfPlace = 0;
    
    // Arrays to keep track of which digits are counted
    const targetUsed = Array(4).fill(false);
    const guessUsed = Array(4).fill(false);

    // First pass: Check for correct digits in the right place
    for (let i = 0; i < 4; i++) {
        if (guess[i] === targetNumber[i]) {
            correctDigitsInPlace++;
            targetUsed[i] = true;
            guessUsed[i] = true;
        }
    }

    // Second pass: Check for correct digits but in the wrong place
    for (let i = 0; i < 4; i++) {
        if (!guessUsed[i]) {
            for (let j = 0; j < 4; j++) {
                if (!targetUsed[j] && guess[i] === targetNumber[j]) {
                    correctDigitsOutOfPlace++;
                    targetUsed[j] = true;
                    break;
                }
            }
        }
    }

    results.innerHTML = `
		Total correct digits: ${correctDigitsInPlace + correctDigitsOutOfPlace}<br>
        Correct digits in the right place: ${correctDigitsInPlace}<br>
    `;

    // Optionally, you can add a check to end the game if the guess is correct
    if (correctDigitsInPlace === 4) {
        results.innerHTML += '<br><strong>Congratulations! You guessed the number!</strong>';
    }
}
