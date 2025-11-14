// Game state
let playerScore = 0;
let computerScore = 0;

// Emoji mappings
const emojiMap = {
    rock: '🪨',
    paper: '📄',
    scissors: '✂️'
};

// Get DOM elements
const choiceBtns = document.querySelectorAll('.choice-btn');
const playerScoreEl = document.getElementById('playerScore');
const computerScoreEl = document.getElementById('computerScore');
const resultTextEl = document.getElementById('resultText');
const playerMoveEl = document.getElementById('playerMove');
const computerMoveEl = document.getElementById('computerMove');
const resetBtn = document.getElementById('resetBtn');

// Game logic
function getComputerChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
}

function determineWinner(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        return 'draw';
    }

    if (
        (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'paper' && computerChoice === 'rock') ||
        (playerChoice === 'scissors' && computerChoice === 'paper')
    ) {
        return 'player';
    }

    return 'computer';
}

function updateDisplay(playerChoice, computerChoice, result) {
    // Update move displays with animation
    playerMoveEl.style.animation = 'none';
    computerMoveEl.style.animation = 'none';

    setTimeout(() => {
        playerMoveEl.textContent = emojiMap[playerChoice];
        computerMoveEl.textContent = emojiMap[computerChoice];
        playerMoveEl.style.animation = 'fadeIn 0.5s';
        computerMoveEl.style.animation = 'fadeIn 0.5s';
    }, 10);

    // Update result text
    resultTextEl.className = '';
    if (result === 'player') {
        resultTextEl.textContent = '🎉 You Win!';
        resultTextEl.classList.add('win');
        playerScore++;
        playerScoreEl.textContent = playerScore;
    } else if (result === 'computer') {
        resultTextEl.textContent = '😢 You Lose!';
        resultTextEl.classList.add('lose');
        computerScore++;
        computerScoreEl.textContent = computerScore;
    } else {
        resultTextEl.textContent = '🤝 It\'s a Draw!';
        resultTextEl.classList.add('draw');
    }

    // Save scores to localStorage
    localStorage.setItem('playerScore', playerScore);
    localStorage.setItem('computerScore', computerScore);
}

function playRound(playerChoice) {
    const computerChoice = getComputerChoice();
    const result = determineWinner(playerChoice, computerChoice);
    updateDisplay(playerChoice, computerChoice, result);
}

function resetGame() {
    playerScore = 0;
    computerScore = 0;
    playerScoreEl.textContent = '0';
    computerScoreEl.textContent = '0';
    resultTextEl.textContent = 'Make your move!';
    resultTextEl.className = '';
    playerMoveEl.textContent = '❓';
    computerMoveEl.textContent = '❓';

    // Clear localStorage
    localStorage.removeItem('playerScore');
    localStorage.removeItem('computerScore');
}

// Event listeners
choiceBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const playerChoice = btn.getAttribute('data-choice');
        playRound(playerChoice);
    });
});

resetBtn.addEventListener('click', resetGame);

// Load saved scores on page load
window.addEventListener('load', () => {
    const savedPlayerScore = localStorage.getItem('playerScore');
    const savedComputerScore = localStorage.getItem('computerScore');

    if (savedPlayerScore !== null) {
        playerScore = parseInt(savedPlayerScore);
        playerScoreEl.textContent = playerScore;
    }

    if (savedComputerScore !== null) {
        computerScore = parseInt(savedComputerScore);
        computerScoreEl.textContent = computerScore;
    }
});
