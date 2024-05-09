document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('game-board');
    const statusDisplay = document.getElementById('status');
    const resetButton = document.getElementById('reset-button');

    let currentPlayer = 'X';
    let gameActive = true;
    let gameState = ['', '', '', '', '', '', '', '', ''];

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleCellClick(event) {
        const clickedCell = event.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

        if (gameState[clickedCellIndex] !== '' || !gameActive) {
            return;
        }

        handleCellPlayed(clickedCell, clickedCellIndex);
        handleResultValidation();
    }

    function handleCellPlayed(clickedCell, clickedCellIndex) {
        gameState[clickedCellIndex] = currentPlayer;
        clickedCell.innerText = currentPlayer;
    }

    function handleResultValidation() {
        let roundWon = false;
        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
                roundWon = true;
                break;
            }
        }
        document.querySelectorAll('.cell').forEach(cell => {
            cell.classList.remove('X', 'O');
            if (cell.innerText === 'X') {
                cell.classList.add('X');
            } else if (cell.innerText === 'O') {
                cell.classList.add('O');
            }
        });
    
        if (roundWon) {
            statusDisplay.innerText = `Player ${currentPlayer} wins!`;
            gameActive = false;
            return;
        }
    
        if (!gameState.includes('')) {
            statusDisplay.innerText = 'It\'s a draw!';
            gameActive = false;
            return;
        }
    
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusDisplay.innerText = `Player ${currentPlayer}'s turn`;
        
    }
    

    function handleRestartGame() {
        currentPlayer = 'X';
        gameActive = true;
        gameState = ['', '', '', '', '', '', '', '', ''];
        statusDisplay.innerText = `${currentPlayer}'s turn`;
        document.querySelectorAll('.cell').forEach(cell => cell.innerText = '');
    }

    gameBoard.addEventListener('click', handleCellClick);
    resetButton.addEventListener('click', handleRestartGame);
});

