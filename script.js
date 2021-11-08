const gameBoard = (() => {
    const topLeft = document.querySelector("#top-left");
    const topMiddle = document.querySelector("#top-middle");
    const topRight = document.querySelector("#top-right");
    const middleLeft = document.querySelector("#middle-left");
    const middleMiddle = document.querySelector("#middle-middle");
    const middleRight = document.querySelector("#middle-right");
    const bottomLeft = document.querySelector("#bottom-left");
    const bottomMiddle = document.querySelector("#bottom-middle");
    const bottomRight = document.querySelector("#bottom-right");
    //Save elements from DOM to an array
    const board = [topLeft, topMiddle, topRight,
                   middleLeft, middleMiddle, middleRight,
                   bottomLeft, bottomMiddle, bottomRight];
    
    
    function clearBoard(){
        board.forEach(cell => cell.textContent = "");
    }

    function isValidMove(target) {
        if (target === "") {
            return true;
        }
        else if (target === "X" || target === "O") {
            return false;
        }
    } 

    board.forEach(cell => {cell.addEventListener("click", function(e){
        target = e.target.textContent;
        console.log(gameState.getPlayerNumber());
        //Check if the move is valid
        if (isValidMove(target) === true) {
            e.target.textContent = gameState.getCurrentPlayer().getSymbol();
            console.log(gameState.getCurrentPlayer().getSymbol());  
            gameState.nextTurn();
            //Call gameState to increment turn
            if (gameState.getPlayerNumber() === 1) {
                gameState.computerMove();
                gameState.nextTurn();
            }
        }
    })})

    return {clearBoard, board};
})()

const player = (symbol, name) => {
    const getSymbol = () => symbol;
    const getName = () => name;
    return {getSymbol, getName};
}

const gameState = (() => {
    let turn = 0;
    let players = 0;
    let games = 0;
    let tie = false;
    let playerSelection = "";
    let computer = "";
    const introDiv = document.querySelector(".intro");
    const btnSinglePlayer = document.querySelector("#btnSinglePlayer");
    const btnTwoPlayer = document.querySelector("#btnTwoPlayer");
    const game = document.querySelector(".game");
    const submitBtn = document.querySelectorAll(".submitNames");
    const rematch = document.querySelector("#rematch");
    const changeMode = document.querySelector("#changeMode");
    const winnerP = document.querySelector("#winner")
    const symbolBtn = document.querySelectorAll(".startOrder");

    

    btnSinglePlayer.addEventListener("click", () => {players = 1, document.querySelector(".divTwoPlayer").style.display = "none",
                                                     document.querySelector(".divSinglePlayer").style.display = "flex"})
    btnTwoPlayer.addEventListener("click", () => {players = 2, document.querySelector(".divTwoPlayer").style.display = "flex",
                                                    document.querySelector(".divSinglePlayer").style.display = "none"})
    
    submitBtn.forEach(btn => btn.addEventListener("click", function(e){
        e.preventDefault();
        gameStart(players);
    }))

    symbolBtn.forEach(btn => btn.addEventListener("click", function(e) {
        playerSelection = e.target.textContent;
        gameStart();
    }))
    function gameStart(players) {
        gameBoard.clearBoard();
        introDiv.style.display = "none"; 
        document.querySelector("#endGame").style.display = "none";
        game.style.display = "block";
        turn = 0;
        if (players === 2) { 
            let firstPlayerName = document.getElementById('twoPlayer1Name').value;
            let secondPlayerName = document.getElementById('twoPlayer2Name').value;
            if (games % 2 === 0) {
                playerOne = player("X", firstPlayerName)
                playerTwo = player("O", secondPlayerName)
            }
            else {
                playerOne = player("X", secondPlayerName)
                playerTwo = player("O", firstPlayerName)
            }
        }
        else {
            if (playerSelection === "X") {
                playerOne = player(playerSelection, "human"); 
                playerTwo = player("O", "computer")
                computer = playerTwo;
                console.log("Is x");
            }
            else {
                playerOne = player("X", "computer");
                computer = playerOne;
                playerTwo = player(playerSelection, "human");
                computerMove();
                nextTurn();
            }
        }
    }

    function computerMove() {
        cell = Math.floor(Math.random() * (9 - 0) + 0);
            while (gameBoard.board[cell].textContent != "") {
                if (isVictory()){
                    break;
                }
                else {
                    computerMove();
                    break;
                }
            }
            gameBoard.board[cell].textContent = computer.getSymbol();
    } 

    function getCurrentPlayer() {
        if (turn % 2 === 0) {
            return playerOne;
        }
        else {
            return playerTwo;
        }
    }

    function clearInputs() {
        game.style.display = "none";
        introDiv.style.display = "flex";
        document.getElementById('twoPlayer1Name').value = "";
        document.getElementById('twoPlayer2Name').value = "";
        document.querySelector(".divSinglePlayer").style.display = "none";
        document.querySelector(".divTwoPlayer").style.display = "none";
    }

    
    function isVictory() {
        if (gameBoard.board[0].textContent === gameBoard.board[1].textContent
             && gameBoard.board[1].textContent === gameBoard.board[2].textContent && gameBoard.board[0].textContent != "") {
            return true;
        }
        else if (gameBoard.board[3].textContent === gameBoard.board[4].textContent
             && gameBoard.board[4].textContent === gameBoard.board[5].textContent && gameBoard.board[3].textContent != "") {
            return true;
        }
        else if (gameBoard.board[6].textContent === gameBoard.board[7].textContent
             && gameBoard.board[7].textContent === gameBoard.board[8].textContent && gameBoard.board[6].textContent != "") {
            return true;
        }
        else if (gameBoard.board[0].textContent === gameBoard.board[3].textContent
             && gameBoard.board[3].textContent === gameBoard.board[6].textContent && gameBoard.board[0].textContent != "") {
            return true;
        }
        else if (gameBoard.board[1].textContent === gameBoard.board[4].textContent
             && gameBoard.board[4].textContent === gameBoard.board[7].textContent && gameBoard.board[1].textContent != "") {
            return true;
        }
        else if (gameBoard.board[2].textContent === gameBoard.board[5].textContent
             && gameBoard.board[5].textContent === gameBoard.board[8].textContent && gameBoard.board[2].textContent != "") {
            return true;
        }
        else if (gameBoard.board[0].textContent === gameBoard.board[4].textContent
             && gameBoard.board[4].textContent === gameBoard.board[8].textContent && gameBoard.board[0].textContent != "") {
            return true;
        }
        else if (gameBoard.board[2].textContent === gameBoard.board[4].textContent 
            && gameBoard.board[4].textContent === gameBoard.board[6].textContent && gameBoard.board[2].textContent != "") {
            return true;
        }
        else if (gameBoard.board[0].textContent != "" && gameBoard.board[1].textContent != "" && gameBoard.board[2].textContent != "" 
                && gameBoard.board[3].textContent != "" && gameBoard.board[4].textContent != "" && gameBoard.board[5].textContent != "" 
                && gameBoard.board[6].textContent != "" && gameBoard.board[7].textContent != "" && gameBoard.board[8].textContent != "") {
            tie = true;
            return true;
        }
        else {
            return false;
        }
    }
    
    const nextTurn = () => {
        if (!isVictory()){
            turn++;
        }
        else {
           endGame();
        }
    }

    function endGame() {
        game.style.display = "none";
        document.querySelector("#endGame").style.display = "flex";
        if (tie === false) {    
            winnerP.textContent = `${getCurrentPlayer().getName()} is the winner`;
        }
        else {
            winnerP.textContent = `It's a tie!`;
            tie = false;
        }
    }

    rematch.addEventListener("click", function(){
        games++;
        gameStart(players);
    })

    changeMode.addEventListener("click", function(){
        clearInputs();
        introDiv.style.display = "flex"; 
        document.querySelector("#endGame").style.display = "none";
        game.style.display = "none";
    })

    function getPlayerNumber() {
        return players;
    }
    
    return {nextTurn, players, getCurrentPlayer, computerMove, getPlayerNumber};
})()



