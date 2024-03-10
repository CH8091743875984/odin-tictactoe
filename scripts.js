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
        
        if (board.updateGrid(x, y, getActivePlayer().token)) {
            
            if (checkEndgame()) {
                console.log('we have a winner')
            }

            if (checkDraw()) {
                console.log('game is a draw')
            }
    
            switchActivePlayer()
    
            //render board
            console.log(board.getGrid()[0])
            console.log(board.getGrid()[1])
            console.log(board.getGrid()[2])
        }

    }
    
    return {playRound, getActivePlayer, board}
})

const game = gameController();