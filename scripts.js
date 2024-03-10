//iife - gameboard, displaycontroller
//players in objects

const gameBoard = (function () {
    
    const tokens = ['X','O']

    const grid = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']];

    const updateGrid = (x,y,marker) => {
        if (tokens.includes(marker)) {
            console.log('Cannot place token: Invalid token')
        } else if (grid[x][y] !== '') {
            console.log('Cannot place token: Token exists')
        } else {
            grid[x][y] = marker
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

    const checkThreeInRow = (arr, token) => {
        return arr.map(element => {
            return element === token ? element : null;
        }).filter(Boolean).length === 3
        
    }
    
    const getWinningPositions = () {
        return arr = [
            [board[0][0], board[0][1], board[0][2]],
            [board[1][0], board[1][1], board[1][2]],
            [board[2][0], board[2][1], board[2][2]],
            [board[0][0], board[1][0], board[2][0]],
            [board[0][1], board[1][1], board[2][1]],
            [board[0][2], board[1][2], board[2][2]],
            [board[0][0], board[1][1], board[2][2]],
            [board[2][0], board[1][1], board[0][2]]
    ]
    }

    const checkEndgame = () => {
        return (getWinningPositions.map(position => {
            return checkThreeInRow(position, activePlayer.token) 
        }
            )).filter(Boolean).length > 0
    }

    const playRound = (activePlayer, x, y) {
        board.updateGrid(x, y, activePlayer.token)




        switchActivePlayer()

        if (checkEndgame()) {
            console.log('we have a winner')
        }

        //render board

    }
 

})