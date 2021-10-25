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
    let gameOver = false;
    //Save elements from DOM to an array
    const board = [topLeft, topMiddle, topRight,
                   middleLeft, middleMiddle, middleRight,
                   bottomLeft, bottomMiddle, bottomRight]
    
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
        //Check if the move is valid
        if (isValidMove(target) === true) {
            e.target.textContent = gameState.getCurrentPlayer().getSymbol();
            //Call gameState to increment turn
            gameState.nextTurn();
        }
    }
    )})
    return {clearBoard, board};
})()

const player = (symbol, name) => {
    const getSymbol = () => symbol;
    const getName = () => name;
    function changeName (newName){ 
         name = newName}
    return {getSymbol, getName, changeName};
}

const gameState = (() => {
    let turn = 0;
    let players = 0;
    let games = 0;
    let gameOver = false;
    let tie = false;
    const introDiv = document.querySelector(".intro");
    const btnSinglePlayer = document.querySelector("#btnSinglePlayer");
    const btnTwoPlayer = document.querySelector("#btnTwoPlayer");
    const game = document.querySelector(".game");
    const submitBtn = document.querySelector("#submitNames");
    const rematch = document.querySelector("#rematch");
    const changeMode = document.querySelector("#changeMode");
    const winnerP = document.querySelector("#winner")
    
    
    submitBtn.addEventListener("click", function(e){
        e.preventDefault();
        gameStart();
    })

    function gameStart() {
        let throwAway = "";
        introDiv.style.display = "none"; 
        document.querySelector("#endGame").style.display = "none";
        game.style.display = "block";
        turn = 0;
        let firstPlayerName = document.getElementById('twoPlayer1Name').value;
        let secondPlayerName = document.getElementById('twoPlayer2Name').value;
        if (games % 2 === 0) {
            playerOne = player("x", firstPlayerName)
            playerTwo = player("O", secondPlayerName)
        }
        else {
            playerOne = player("x", secondPlayerName)
            playerTwo = player("O", firstPlayerName)
        }
        gameBoard.clearBoard();
    }

    function getCurrentPlayer() {
        if (turn % 2 === 0) {
            return playerOne;
        }
        else {
            return playerTwo;
        }
    }

    btnSinglePlayer.addEventListener("click", () => {players = 1, document.querySelector("#singlePlayerName").style.borderBottom = "3px solid black"})
    btnTwoPlayer.addEventListener("click", () => {players = 2, document.querySelector(".divTwoPlayer").style.display = "flex"})

    
    function isVictory() {
        if (gameBoard.board[0].textContent === gameBoard.board[1].textContent
             && gameBoard.board[1].textContent === gameBoard.board[2].textContent && gameBoard.board[0].textContent != "") {
            gameOver = true;
            return true;
        }
        else if (gameBoard.board[3].textContent === gameBoard.board[4].textContent
             && gameBoard.board[4].textContent === gameBoard.board[5].textContent && gameBoard.board[3].textContent != "") {
            gameOver = true;
            return true;
        }
        else if (gameBoard.board[6].textContent === gameBoard.board[7].textContent
             && gameBoard.board[7].textContent === gameBoard.board[8].textContent && gameBoard.board[6].textContent != "") {
            gameOver = true;
            return true;
        }
        else if (gameBoard.board[0].textContent === gameBoard.board[3].textContent
             && gameBoard.board[3].textContent === gameBoard.board[6].textContent && gameBoard.board[0].textContent != "") {
            gameOver = true;
            return true;
        }
        else if (gameBoard.board[1].textContent === gameBoard.board[4].textContent
             && gameBoard.board[4].textContent === gameBoard.board[7].textContent && gameBoard.board[1].textContent != "") {
            gameOver = true;
            return true;
        }
        else if (gameBoard.board[2].textContent === gameBoard.board[5].textContent
             && gameBoard.board[5].textContent === gameBoard.board[8].textContent && gameBoard.board[2].textContent != "") {
            gameOver = true;
            return true;
        }
        else if (gameBoard.board[0].textContent === gameBoard.board[4].textContent
             && gameBoard.board[4].textContent === gameBoard.board[8].textContent && gameBoard.board[0].textContent != "") {
            gameOver = true;
            return true;
        }
        else if (gameBoard.board[2].textContent === gameBoard.board[4].textContent 
            && gameBoard.board[4].textContent === gameBoard.board[6].textContent && gameBoard.board[2].textContent != "") {
            gameOver = true;
            return true;
        }
        else if (gameBoard.board[0].textContent != "" && gameBoard.board[1].textContent != "" && gameBoard.board[2].textContent != "" 
                && gameBoard.board[3].textContent != "" && gameBoard.board[4].textContent != "" && gameBoard.board[5].textContent != "" 
                && gameBoard.board[6].textContent != "" && gameBoard.board[7].textContent != "" && gameBoard.board[8].textContent != "") {
            tie = true;
            gameOver = true;
            return true;
        }
        else {
            gameOver = false;
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
        
        document.querySelector("#endGame").style.display = "flex";
        if (tie === false) {    
            winnerP.textContent = `${getCurrentPlayer().getName()} is the winner`;
        }
        else {
            console.log(`Its a tie!`);
            tie = false;
        }
    }

    rematch.addEventListener("click", function(){
        games++;
        gameStart();
    })
    return {nextTurn, players, gameOver, getCurrentPlayer};
})()



