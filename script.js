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
    
    //A board in the "back" to realize logic on it, later i can use
    //the same functions on a board created for the minimax algorithm
    const backBoard = ["","",""
                        ,"","","",
                        "","",""];
    
    function clearBoards(){
        board.forEach(cell => cell.textContent = "");
        for (let i = 0; i < 9; i++){
            backBoard[i] = "";
        }
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
        //Check if the move is valid
        if (isValidMove(target) === true) {
            e.target.textContent = gameState.getCurrentPlayer().getSymbol();
            //Store information in the backBoard (for later use in minimax algorithm)
            //Also to use it in checkForVictory function to pass it as an argument
            backBoard[e.target.getAttribute("data-number")] = e.target.textContent;
            gameState.nextTurn();
            //Call gameState to increment turn
            if (gameState.getPlayerNumber() === 1) {
                setTimeout(() => {gameState.computerMove();}, 450);
                gameState.nextTurn();
            }
        }
    })})

    return {clearBoards, board, backBoard};
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
    let computer = {};
    winnerSymbol = "";
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
        gameBoard.clearBoards();
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
                playerTwo = player("O", "computer");
                computer = playerTwo;
                human = playerOne;
            }
            else {
                playerOne = player("X", "computer");
                computer = playerOne;
                playerTwo = player(playerSelection, "human");
                human = playerTwo;
                computerMove();
                nextTurn();
            }
        }
    }

    function computerMove() {
        cell = bestMove();
 
        if (gameBoard.backBoard[cell] !== undefined) {
            gameBoard.backBoard[cell] = computer.getSymbol();
            gameBoard.board.forEach(el => {
            if (el.getAttribute("data-number") == cell) { 
                el.textContent = computer.getSymbol();
            }})
        }
    }
    

    function bestMove() {
        let bestScore = -Infinity;
        let move;
        for (i = 0; i < 9; i++) {
            if (gameBoard.backBoard[i] == "") {
                gameBoard.backBoard[i] = computer.getSymbol();
                let score = minimax(gameBoard.backBoard, 0, false);
                gameBoard.backBoard[i] = "";
                if (score > bestScore)  {
                    bestScore = score;
                    move = i;
                }
            }    
        }
        return move;
    }

    function minimax(board, depth, isMaximizing) {
        if (isVictory(board)) {
            let winner = winnerSymbol;
            let score = 0;
            computerSymbol = computer.getSymbol();
            humanSymbol = human.getSymbol(); 
            if (tie === true) {
                score = 0;
                tie = false;
            }
            if (winner === computerSymbol) {
                score = 10;
            }
            else if (winner === humanSymbol) {
                score = -10;
            }
            return score;
        }
        if (isMaximizing) {
            let bestScore = -Infinity;
            for (let i = 0; i < 9; i++) {
                if (board[i] == "") {
                    board[i] = computer.getSymbol();
                    let score = minimax(board, depth + 1, false);
                    board[i] = "";
                    bestScore = Math.max(score, bestScore);
                }
            }
            return bestScore;
        }
        else {
            let bestScore = Infinity;
            for (let i = 0; i < 9; i++) {
                if (board[i] == "") {
                    board[i] = human.getSymbol();
                    let score = minimax(board, depth + 1, true);
                    board[i] = "";
                    bestScore = Math.min(score, bestScore);
                }
            }
            return bestScore;
        }
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

    //winnerSymbol later will return who is the winner to the minimax function
    function isVictory(board) {
        if (board[0] === board[1] && board[1] === board[2] && board[0]!= "") {
            winnerSymbol = board[0]
            return true;
        }
        else if (board[3] === board[4] && board[4] === board[5] && board[3] != "") {
            winnerSymbol = board[3]
            return true;
        }
        else if (board[6] === board[7] && board[7] === board[8] && board[6] != "") {
            winnerSymbol = board[6]
            return true;
        }
        else if (board[0] === board[3] && board[3] === board[6] && board[0] != "") {
            winnerSymbol = board[0]
            return true;
        }
        else if (board[1] === board[4] && board[4] === board[7] && board[1] != "") {
            winnerSymbol = board[1]
            return true;
        }
        else if (board[2] === board[5] && board[5] === board[8] && board[2] != "") {
            winnerSymbol = board[2]
            return true;
        }
        else if (board[0] === board[4] && board[4] === board[8] && board[0] != "") {
            winnerSymbol = board[0]
            return true;
        }
        else if (board[2] === board[4] && board[4] === board[6] && board[2] != "") {
            winnerSymbol = board[2]
            return true;
        }
        else if (board[0] != "" && board[1] != "" && board[2] != "" 
                && board[3] != "" && board[4] != "" && board[5] != "" 
                && board[6] != "" && board[7] != "" && board[8] != "") {
            winnerSymbol = undefined;
            tie = true;
            return true;
        }
        else {
            return false;
        }
    }
    
    const nextTurn = () => {
        if (!isVictory(gameBoard.backBoard)){
            turn++;
        }
        else {
           endGame();
        }
    }

    //Function to format player name to title case (Title)
    String.prototype.toProperCase = function () {
        return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    };

    function endGame() {
        document.querySelector("#endGame").style.display = "flex";
        if (tie === false) {    
            winnerP.textContent = `${getCurrentPlayer().getName().toProperCase()}  wins!`;
        }
        else {
            winnerP.textContent = `It's a tie!`;
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



