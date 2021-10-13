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
                   bottomLeft, bottomMiddle, bottomRight]
    
    function isValidMove(target) {
        if (target === "") {
            return true;
        }
        else if (target === "X" || target === "O" ) {
            return false;
        }
    } 

    board.forEach(cell => {cell.addEventListener("click", function(e){
        target = e.target.textContent;
        //Check if the move is valid
        if (isValidMove(target) === true) {
            e.target.textContent = player("X").getSymbol();
            //Call gameState to increment turn
            gameState.nextTurn();
        }
        else {console.log(isValidMove(target));
            e.target.textContent = "invalid"};
    })})
})()

const player = (symbol) => {
    const getSymbol = () => symbol;
    return {getSymbol};
}

const gameState = (() => {
    let turn = 0;
    let players = 2;
    const nextTurn = () => turn++;
    return {nextTurn, players};
})()



