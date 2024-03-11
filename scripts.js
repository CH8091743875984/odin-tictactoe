//iife - gameboard, displaycontroller
//players in objects

const gameBoard = (function () {
    
    const tokens = ['X','O']

    const grid = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']];

    const updateGrid = (x,y,marker) => {
        if (!tokens.includes(marker)) {
            console.log('Cannot place token'+marker+': Invalid token')
            return false
        } else if (grid[x][y] !== '') {
            console.log('Cannot place token: Token exists / placement out of bounds')
            return false
        } else {
            grid[x][y] = marker
            return true
        }
    };

    const getGrid = () => grid;

    return {getGrid, updateGrid}

    })

const gameController = (function(
    playerOneName = "Player 1",
    playerTwoName = "Player 2"
) {
    const board = gameBoard();

    const getBoard = () => board.getGrid()

    const players = [
        {
            name: playerOneName,
            token: 'X'
        },
        {
            name: playerTwoName,
            token: 'O'
        }
    ]

    let activePlayer = players[0]

    const switchActivePlayer = () => {
        if (activePlayer === players[0]) {
            activePlayer = players[1]
        } else {
            activePlayer = players[0]
        }
    }

    const getActivePlayer = () => activePlayer;

    const checkThreeInRow = (arr, token) => {
        return arr.map(element => {
            return element === token ? element : null;
        }).filter(Boolean).length === 3
        
    }
    
    const getWinningPositions = () => {
        return arr = [
            [board.getGrid()[0][0], board.getGrid()[0][1], board.getGrid()[0][2]],
            [board.getGrid()[1][0], board.getGrid()[1][1], board.getGrid()[1][2]],
            [board.getGrid()[2][0], board.getGrid()[2][1], board.getGrid()[2][2]],
            [board.getGrid()[0][0], board.getGrid()[1][0], board.getGrid()[2][0]],
            [board.getGrid()[0][1], board.getGrid()[1][1], board.getGrid()[2][1]],
            [board.getGrid()[0][2], board.getGrid()[1][2], board.getGrid()[2][2]],
            [board.getGrid()[0][0], board.getGrid()[1][1], board.getGrid()[2][2]],
            [board.getGrid()[2][0], board.getGrid()[1][1], board.getGrid()[0][2]]
    ]
    }

    const checkEndgame = () => {
        return (getWinningPositions().map(position => {
            return checkThreeInRow(position, activePlayer.token) 
        }
            )).filter(Boolean).length > 0
    }

    const checkDraw = () => {
        return !board.getGrid().flat().includes("")
    }

    const playRound = (x, y) => {
        if (!checkEndgame() && (!checkDraw())) {
            if (board.updateGrid(x, y, getActivePlayer().token)) {
                if (checkDraw()) {
                    console.log('game is a draw')
                } else if (checkEndgame()) {
                    console.log('we have a winner')
                } else {
                    switchActivePlayer()
                }
                return true
        
            }
        }
    }
    
    return {playRound, getActivePlayer, getBoard}
})

const renderBoard = () => {
    let boardDiv = document.getElementById('game');

    const gridCoord = {1: [0,0], 2: [0,1], 3: [0,2],
                       4: [1,0], 5: [1,1], 6: [1,2],
                       7: [2,0], 8: [2,1], 9: [2,2]
        }
    
    for (let i = 1; i <= 9; i++) {
        const button = document.createElement('button');
        button.classList.add('boardButton');
        button.addEventListener('click', function(){
            game.playRound(gridCoord[i][0], gridCoord[i][1])

            const gridFlat = game.getBoard().flat()
            button.textContent = gridFlat[i-1]
        });
        //button.textContent = i;
        boardDiv.appendChild(button);
    }
 
}

const game = gameController();

renderBoard();

