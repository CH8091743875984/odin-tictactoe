//player name, start/restart, results display

const gameBoard = function () {
  const tokens = ["X", "O"];

  const grid = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  const updateGrid = (x, y, marker) => {
    if (!tokens.includes(marker)) {
      console.log("Cannot place token" + marker + ": Invalid token");
      return false;
    } else if (grid[x][y] !== "") {
      console.log("Cannot place token: Token exists / placement out of bounds");
      return false;
    } else {
      grid[x][y] = marker;
      return true;
    }
  };

  const resetGrid = () => {
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        grid[i][j] = "";
      }
    }
  };

  const getGrid = () => grid;

  return { getGrid, updateGrid, resetGrid };
};

const gameController = function (
  playerOneName = "Player 1",
  playerTwoName = "Player 2"
) {
  const board = gameBoard();

  const getBoard = () => board.getGrid();

  const players = [
    {
      name: playerOneName,
      token: "X",
    },
    {
      name: playerTwoName,
      token: "O",
    },
  ];

  const setPlayerName = (player, newName) => {
    players[player].name = newName;
  };

  const getPlayerName = (player) => {
    return players[player].name;
  };

  const playerBtn = document.getElementById("showPlayerDialog");
  const playerDialog = document.getElementById("playerDialog");
  const confirmPlayerBtn = document.getElementById("confirmPlayerBtn");
  const cancelPlayerBtn = document.getElementById("closePlayerBtn");

  playerBtn.addEventListener("click", () => {
    playerDialog.showModal();
  });

  confirmPlayerBtn.addEventListener("click", (event) => {
    event.preventDefault();
    console.log(document.getElementById("player1").value);
    game.setPlayerName(0, document.getElementById("player1").value);
    game.setPlayerName(1, document.getElementById("player2").value);
    renderPlayers();
    playerDialog.close();
  });

  cancelPlayerBtn.addEventListener("click", (event) => {
    event.preventDefault();
    playerDialog.close();
  });

  let activePlayer = players[0];

  const switchActivePlayer = () => {
    if (activePlayer === players[0]) {
      activePlayer = players[1];
    } else {
      activePlayer = players[0];
    }
  };

  const resetActivePlayer = () => {
    activePlayer = players[0];
  };

  const getActivePlayer = () => activePlayer;

  const checkThreeInRow = (arr, token) => {
    return (
      arr
        .map((element) => {
          return element === token ? element : null;
        })
        .filter(Boolean).length === 3
    );
  };

  const getWinningPositions = () => {
    return (arr = [
      [board.getGrid()[0][0], board.getGrid()[0][1], board.getGrid()[0][2]],
      [board.getGrid()[1][0], board.getGrid()[1][1], board.getGrid()[1][2]],
      [board.getGrid()[2][0], board.getGrid()[2][1], board.getGrid()[2][2]],
      [board.getGrid()[0][0], board.getGrid()[1][0], board.getGrid()[2][0]],
      [board.getGrid()[0][1], board.getGrid()[1][1], board.getGrid()[2][1]],
      [board.getGrid()[0][2], board.getGrid()[1][2], board.getGrid()[2][2]],
      [board.getGrid()[0][0], board.getGrid()[1][1], board.getGrid()[2][2]],
      [board.getGrid()[2][0], board.getGrid()[1][1], board.getGrid()[0][2]],
    ]);
  };

  const checkEndgame = () => {
    //Returns True if there is a winning position found for the active player
    return (
      getWinningPositions()
        .map((position) => {
          return checkThreeInRow(position, activePlayer.token);
        })
        .filter(Boolean).length > 0
    );
  };

  const checkDraw = () => {
    //Returns True if there are no open spaces on the grid
    return !board.getGrid().flat().includes("");
  };

  const playRound = (x, y) => {
    if (!checkEndgame() && !checkDraw()) {
      if (board.updateGrid(x, y, getActivePlayer().token)) {
        if (checkDraw() && !checkEndgame()) {
          console.log("game is a draw");
          displayResults("none");
        } else if (checkEndgame()) {
          console.log("we have a winner");
          displayResults(getActivePlayer().name);
        } else {
          switchActivePlayer();
        }

        //return false
      }
    }
  };

  const resetGame = () => {
    board.resetGrid();
    resetActivePlayer();
    renderBoard();
    resetResults();
    renderPlayers();
  };

  function displayResults(winner) {
    // const resultDiv = document.getElementById("result")
    const resultMsg = document.getElementById("resultMessage");
    const resetBtn = document.getElementById("resetBtn");

    if (winner === "none") {
      resultMsg.textContent = "The game is a draw!";
    } else {
      resultMsg.textContent = winner + " wins the game!";
    }

    resetBtn.textContent = "Start new game?";
    resultMsg.style.display = "flex";
  }

  function resetResults() {
    const resultMsg = document.getElementById("resultMessage");
    const resetBtn = document.getElementById("resetBtn");

    resultMsg.textContent = "";
    resetBtn.textContent = "Reset Game";
    resultMsg.style.display = "none";
  }

  document.getElementById("resetBtn").addEventListener("click", function () {
    resetGame();
  });

  return {
    playRound,
    getActivePlayer,
    getBoard,
    resetGame,
    setPlayerName,
    getPlayerName,
  };
};

const renderBoard = () => {
  let boardDiv = document.getElementById("game");

  const gridCoord = {
    1: [0, 0],
    2: [0, 1],
    3: [0, 2],
    4: [1, 0],
    5: [1, 1],
    6: [1, 2],
    7: [2, 0],
    8: [2, 1],
    9: [2, 2],
  };

  while (boardDiv.firstChild) {
    boardDiv.removeChild(boardDiv.firstChild);
  }

  for (let i = 1; i <= 9; i++) {
    const button = document.createElement("button");
    button.classList.add("boardButton");
    button.addEventListener("click", function () {
      game.playRound(gridCoord[i][0], gridCoord[i][1]);
      const gridFlat = game.getBoard().flat();
      button.textContent = gridFlat[i - 1];
    });
    //button.textContent = i;
    boardDiv.appendChild(button);
  }

  renderPlayers();
};

const renderPlayers = () => {
  document.getElementById("playerDisplay").textContent =
    game.getPlayerName(0) + " as X vs. " + game.getPlayerName(1) + " as O";
};

const game = gameController();

renderBoard();
