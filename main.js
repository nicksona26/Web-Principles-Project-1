// inits
let timerInterval;
let timerVal = 0;
let moveCnt = 0;
let isSimple = false;

// split the New Game button into Simple and Hard buttons
function splitnewGameBtns() {
    document.getElementById("newGameBtn").style.display = "none";
    document.getElementById("simpleGameBtn").style.display = "block";
    document.getElementById("hardGameBtn").style.display = "block";
}

//start the game based on the selected difficulty
function startGame(simple) {
    isSimple = simple;
    shuffle();
    document.getElementById("simpleGameBtn").style.display = "none";
    document.getElementById("hardGameBtn").style.display = "none";
    document.getElementById("quitGameBtn").style.display = "block";
    startTimer();
}

// start the timer
function startTimer() {
    timerInterval = setInterval(function() {
        timerVal++;
        document.getElementById("timerVal").textContent = timerVal;
    }, 1000);
}

// stop timer
function stopTimer() {
    clearInterval(timerInterval);
}

// shuffle tiles
function shuffle() {
    if (isSimple) {
        swapTiles("cell44", "cell43");
    } else {
        for (let row = 1; row <= 4; row++) {
            for (let column = 1; column <= 4; column++) {
                let row2 = Math.floor(Math.random() * 4 + 1);
                let column2 = Math.floor(Math.random() * 4 + 1);
                swapTiles("cell" + row + column, "cell" + row2 + column2);
            }
        }
    }
}

// swap tiles
function swapTiles(cell1, cell2) {
    let temp = document.getElementById(cell1).className;
    document.getElementById(cell1).className = document.getElementById(cell2).className;
    document.getElementById(cell2).className = temp;
}

// clicking a tile
function clickTile(row, column) {
    let cell = document.getElementById("cell" + row + column);
    let tile = cell.className;
    
    if (tile !== "tile16") {
        if (column < 4 && document.getElementById("cell" + row + (column + 1)).className === "tile16") {
            swapTiles("cell" + row + column, "cell" + row + (column + 1));
            checkSolve();
            moveCnt++;
            document.getElementById("moveCnt").textContent = moveCnt;
            return;
        }
        if (column > 1 && document.getElementById("cell" + row + (column - 1)).className === "tile16") {
            swapTiles("cell" + row + column, "cell" + row + (column - 1));
            checkSolve();
            moveCnt++;
            document.getElementById("moveCnt").textContent = moveCnt;
            return;
        }
        if (row > 1 && document.getElementById("cell" + (row - 1) + column).className === "tile16") {
            swapTiles("cell" + row + column, "cell" + (row - 1) + column);
            checkSolve();
            moveCnt++;
            document.getElementById("moveCnt").textContent = moveCnt;
            return;
        }
        if (row < 4 && document.getElementById("cell" + (row + 1) + column).className === "tile16") {
            swapTiles("cell" + row + column, "cell" + (row + 1) + column);
            checkSolve();
            moveCnt++;
            document.getElementById("moveCnt").textContent = moveCnt;
            return;
        }
    }
}

// check if puzzle is solved
function checkSolve() {
    let IDs = ["cell11", "cell12", "cell13", "cell14", "cell21", "cell22", "cell23", "cell24", "cell31", "cell32", "cell33", "cell34", "cell41", "cell42", "cell43", "cell44"];
    let classNames = ["tile1", "tile2", "tile3", "tile4", "tile5", "tile6", "tile7", "tile8", "tile9", "tile10", "tile11", "tile12", "tile13", "tile14", "tile15", "tile16"];
    
    for (let row = 1; row <= 4; row++) {
        for (let column = 1; column <= 4; column++) {
            let currID = "cell" + row + column;
            let currClass = document.getElementById(currID).className;

            let index1 = IDs.indexOf(currID);
            let index2 = classNames.indexOf(currClass);

            if (index1 !== index2) {
                return;
            }
        }
    }
    document.getElementById("playAgain").style.display = "block";
    document.getElementById("newGameBtn").style.display = "block";
    document.getElementById("quitGameBtn").style.display = "none";
    stopTimer();
}

// quit
function quitGame() {
    window.location.reload();
}
