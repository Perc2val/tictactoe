function Gameboard(){
    const board = [
        "","","",
        "","","",
        "","",""
    ]
    const getBoard = () => board;

    const setCell = (index, playerMark) => {
        if (board[index] === ""){
            board[index] = playerMark;
            return true
        } else {
            return false
        }
    };

    const resetBoard = () => {
        board.fill("");
    };

    return {
        getBoard,
        setCell,
        resetBoard,
    };
}

function Player (name, mark){
    let playerName = name;
    let playerMark = mark;

    let getPlayerName = () => playerName;
    let getPlayerMark = () => playerMark;

    return {
        getPlayerName,
        getPlayerMark
    };
}

const GameController = (function(){
    let board = Gameboard();
    let players = [Player("X", "X"), Player("O", "O")];
    let gameOver = false
    let activePlayer = players[0];
    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0]
    };
    const getBoard = () => board.getBoard();
    const getActivePlayer = () => activePlayer;
    const playRound = (index) => {
        if(gameOver) return;
        const played = board.setCell(index, activePlayer.getPlayerMark())
        if(!played) return;
        let hasWin = checkWin();
        if (hasWin) {
            gameOver = true;
            console.log(`${activePlayer.getPlayerName()} won`)
            return getBoard();
        } if (checkTie()) {
            gameOver = true;
            console.log("Its a tie")
            return getBoard();
        } else {
           switchPlayerTurn(); 
           return getBoard();
        }
    }
    let allWins = [
        [0, 1 ,2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    let checkWin = () => {
        const getBoard = board.getBoard();
        const getMark = activePlayer.getPlayerMark();

        for (let i = 0; i < allWins.length; i++){
            let combo = allWins[i];

            let a = combo[0];
            let b = combo[1];
            let c = combo[2];

            if (
                getBoard[a] === getMark &&
                getBoard[b] === getMark &&
                getBoard[c] === getMark
            ) {
                return true;
            }
        }
        return false;
    }
    let checkTie = () => board.getBoard().every(cell => cell != "") && !checkWin();
    let resetGame = () => {
        board.resetBoard();
        gameOver = false;
        activePlayer = players[0]
        return getBoard();
    }
    return {
        playRound,
        getActivePlayer,
        getBoard,
        resetGame
    }
})();

const game = GameController;