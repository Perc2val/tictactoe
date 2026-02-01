function Gameboard(){
    let gameboard = [
        "","","",
        "","","",
        "","",""
    ]
    const getBoard = () => gameboard;
    return {
        getBoard,
        
    }
}

function Player (name, mark){
    let playerName = name;
    let playerMark = mark;

    let getPlayerName = () => playerName;
    let getPlayerMark = () => playerMark;

    return {
        getPlayerName,
        getPlayerMark
    }
}