/*------------------------ Pseudocode ------------------------*/
// 1. HTML: Create basic elements based on wireframe
    // 1.1. The main game board is a grid, which lives within a flexbox

// 2. JS: Create objects, variables, constants 

// 3. JS: Store cached elements

// 4. JS: Add event listeners

// 5. JS: Create functions

// 6. CSS: Styling (including light/dark mode)


// Established rules:
// -Single player game
// -The gameboard is a 13 x 11 grid
// -On init, the snake occupies 2 squares, facing right, moving left to right
// -On init, there are 3 food items on the gameboard
// -On init (or first click?), the snake begins moving forward, starting the game 

/* How to play: 
-The snake will move forward in a straight line.

-The player uses left and right turns to manuever the snake towards
food items on the grid. 

-Every time the snake makes contact with a food item, the snack grows in 
length (occupies an additional square on the grid). The food item is also
removed from the grid.

-Every time the snake makes contact with 3 food items, it will move faster.*/

// How to win: The player wins when they have collected 20 items

/* How to lose: The player loses when the snake makes contact with
itself or with the border of the gameboard. */


// !! Set the body based on the heads last known location


/*------------------------------ Constants ------------------------------*/

const oldGameboard = [
    [1,1], [1,2], [1,3], [1,4], [1,5], [1,6], [1,7], [1,8], [1,9], [1,10], [1,11], [1,12], [1,13],
    [2,1], [2,2], [2,3], [2,4], [2,5], [2,6], [2,7], [2,8], [2,9], [2,10], [2,11], [2,12], [2,13],
    [3,1], [3,2], [3,3], [3,4], [3,5], [3,6], [3,7], [3,8], [3,9], [3,10], [3,11], [3,12], [3,13],
    [4,1], [4,2], [4,3], [4,4], [4,5], [4,6], [4,7], [4,8], [4,9], [4,10], [4,11], [4,12], [4,13],
    [5,1], [5,2], [5,3], [5,4], [5,5], [5,6], [5,7], [5,8], [5,9], [5,10], [5,11], [5,12], [5,13],
    [6,1], [6,2], [6,3], [6,4], [6,5], [6,6], [6,7], [6,8], [6,9], [6,10], [6,11], [6,12], [6,13],
    [7,1], [7,2], [7,3], [7,4], [7,5], [7,6], [7,7], [7,8], [7,9], [7,10], [7,11], [7,12], [7,13],
    [8,1], [8,2], [8,3], [8,4], [8,5], [8,6], [8,7], [8,8], [8,9], [8,10], [8,11], [8,12], [8,13],
    [9,1], [9,2], [9,3], [9,4], [9,5], [9,6], [9,7], [9,8], [9,9], [9,10], [9,11], [9,12], [9,13],
    [10,1],[10,2],[10,3],[10,4],[10,5],[10,6],[10,7],[10,8],[10,9],[10,10],[10,11],[10,12],[10,13],
    [11,1],[11,2],[11,3],[11,4],[11,5],[11,6],[11,7],[11,8],[11,9],[11,10],[11,11],[11,12],[11,13]
]


// const gameboard = [
//     {
//         row: X;
//         column: Y;
//         neighborAbove: [X - 1, Y];
//         neighborBelow: [X + 1, Y];
//         neighborLeft: [X, Y - 1];
//         neighborRight: [X, Y + 1];
//     }
// ]
//need a class to build an object

const pointsNeededToWin = "15"

/*------------------------------ Variables ------------------------------*/
let snake

let gridRows
let gridColumns
let gameBoard


let snakeSize // Current size of the snake
let snakeHeadLocation // The snake's head's current location on the gameBoard
let snakeBodyLocation // The snake's body's current locations on the gameBoard. An array of arrays.
let fruitLocations // The various fruit locations on the gameBoard. An array of arrays.
let snakeCurrentDirection // The direction the snake is moving, "Up", Down", Right", "Left"
let numberOfFruitEaten // The players current score
let isWinner // Will be "true" if the player has won the game
let isLoser // Will be "true" if the player has lost the game

let timerIntervalId //Utilized by the snake movement loop
let seconds //

/*---------------------- Cached Element References ----------------------*/

// const gameBoardArray = document.querySelector("")
// const winLoseMessageContainer = document.querySelector("")

const gridContainerElement = document.querySelector("#game-grid") 
// const gameBoardElement = Array.from(document.querySelector(".cell"))

const leftKeyBtnElement = document.querySelector("#left-arrow-image")
const rightKeyBtnElement = document.querySelector("#right-arrow-image")
// const toggleDarkModeBtn = document.querySelector("")
// const restartGameBtn = document.querySelector("")


// Element.classList.add('this')
// Element.classList.remove('this')

/*--------------------------- Event Listeners ---------------------------*/

leftKeyBtnElement.addEventListener("click", (event) => handleLeftClick(event.key)) //Listens for a click on the Left Key button element
rightKeyBtnElement.addEventListener("click",(event) => handleLeftClick(event.key)) //Listens for a click on the Right Key button element

// Listens for Up, Down, Left, Right arrows on the keyboard
document.addEventListener("keydown",(event) => {
            handleKey(event.key)
    })

// toggleDarkModeBtn.addEventListener("click", toggleDarkMode) //Listens for a click on the Dark Mode button element
// restartGameBtn.addEventListener("click", restartGame) //Listens for a click on the Restart Game button element


/*------------------------------ Functions ------------------------------*/

init()

function init() {

    //Set the initial game board parameters
    gameBoard = []
    gridRows = 11
    gridColumns = 13

    //Generate the gameboard
    generateGameboard()

    //Set the initial snake parameters
    snake = {
        size: 2,
        location: [[9,7], [9,6]],
        // headLocation: this.location[0],
        headLocation: [9,7],
        tailLocation: this.location[location.length - 1],
        headDirection: "Up",
        tailDirection: "Right"
    }

    //Render the snake
    renderSnake()

    // //Add fruit to the gameboard
    // numberOfFruitEaten = 0
    // fruitLocations = [[4,3], [2,8], [5,10]]

    //Start the loop that moves the snake
    startLoop()
}

function generateGameboard() {

    //Loop (gridRows) times
    for(let row = 1; row <= gridRows; row++){
        //Loop (gridColumns) times
        for(let column = 1; column <= gridColumns; column++){

            //For each row/column combination, add a new array ([1,1], [1,2] etc) to the gameBoard array
            gameBoard.push([row,column])
        }
    }

    //Render the game board
    renderGameBoard()
}

function renderGameBoard() {

    //For each cell on the gameboard
    gameBoard.forEach((element) => {

        //Create a new div element
        let newGridCellDiv = document.createElement("div")

        //Give the new div a class and an ID
        newGridCellDiv.classList.add('cell');
        newGridCellDiv.setAttribute("id", `r${element[0]}c${element[1]}`)

        //Append the new div to the grid container
        gridContainerElement.appendChild(newGridCellDiv)
    });

    //Assign the grid parameters in CSS
    gridContainerElement.style.gridTemplateRows = `repeat(${gridRows}, 50px)`
    gridContainerElement.style.gridTemplateColumns = `repeat(${gridColumns}, 50px)`
}

function renderSnake() {

    //Loop through every row/column combination on the gameBoard grid
    gameBoard.forEach((cell) => {

        //Find the matching div
        matchingCellElement = document.querySelector(`#r${cell[0]}c${cell[1]}`)

        //If the cell's coordinates match the headLocation coordinates
        if(snake.headLocation.toString() === cell.toString()) {

            //Add the snake styling
            matchingCellElement.classList.add('snakehead')

            //Log the snakes location (cause you can)
            console.log(`Snake is on ${snake.headLocation}`)

        } else {

            //Add the snake styling
            matchingCellElement.classList.remove('snakehead')
            }
        
    } )
}

// This function kicks off the timer. Every X seconds, the snake moves.
function startLoop() {
	// Check for an active timer interval
    if (timerIntervalId) {
	// If interval exists, clear it and reset seconds to zero
        clearInterval(timerIntervalId);
        seconds = 0;
    }
    // Start a new timer interval
    timerIntervalId = setInterval(everyLoopThisHappens, 800);
}

//A timer that moves the snake forward and renders its position
function everyLoopThisHappens() {
    if(!isWinner && !isLoser){

        //Every X seconds, move the snake forward
        moveSnakeForward()

        //Render the snakes current position
        renderSnake()

        // //Determine if the snake hit itself
        // checkIfSnakeHitItself()

        // //Determine if the snake hit fruit
        // checkIfSnakeHitFruit()

        // //Determine if the player have enough points won the game
        // checkIfGameWonOrLost()
    }
}

function moveSnakeForward() {
    // Above: [X - 1, Y]
    // Below: [X + 1, Y]
    // Left: [X, Y - 1]
    // Right: [X, Y + 1]
        switch (snake.headDirection) {

        case "Up":
            //Check if the grid cell above the snake's head has an index off the board
            if(snake.headLocation[0] - 1 <= 0) {
                //If so, move the snake head to the bottom of the board
                snake.headLocation = [gridRows, snake.headLocation[1]]
            } else {
                //Otherwise, move the head to the cell directly above the current head location
                snake.headLocation = [snake.headLocation[0] - 1, snake.headLocation[1]]
            }
            break;

        case "Down":
            //Check if the grid cell below the snake's head has an index off the board
            if(snake.headLocation[0] + 1 > gridRows) {
                //If so, move the snake head to the top of the board
                snake.headLocation = [1, snake.headLocation[1]]
            } else {
                //Otherwise, move the head to the cell directly below the current head location
                snake.headLocation = [snake.headLocation[0] + 1, snake.headLocation[1]]
            }
            break;

        case "Left":
            //Check if the grid cell above the snake's head has an index off the board
            if(snake.headLocation[1] - 1 <= 0) {
                //If so, move the snake head to the right of the board
                snake.headLocation = [snake.headLocation[0], gridColumns]
            } else {
                //Otherwise, move the head to the cell directly left the current head location
                snake.headLocation = [snake.headLocation[0], snake.headLocation[1] - 1]
            }
            break;

        case "Right":
            //Check if the grid cell above the snake's head has an index off the board
            if(snake.headLocation[1] + 1 > gridColumns) {
                //If so, move the snake head to the left of the board
                snake.headLocation = [snake.headLocation[0], 1]
            } else {
                //Otherwise, move the head to the cell directly right the current head location
                snake.headLocation = [snake.headLocation[0], snake.headLocation[1] + 1]
            }
            break;
    }
}

function checkIfSnakeHitItself() {
    //If so, end the game
    gameOver()
}

function checkIfSnakeHitFruit() {

    //If so, increase the size of the snake
    growSnake()
}

function growSnake() {
    //Determine where to place the new appendage

    //Add to snake body array
}

function checkIfGameWonOrLost() {
    //Determine if the game has been won or lost using the isWinner and isLoser variables

    //If so, stop the loop

    //Also, add a new window element to the page that displays a win/loss message and the restart button
}

function handleLeftClick() {

    console.log("left click")

    //Turn the snake left 
    turnSnakeLeft()
}

function handleRightClick() {

    console.log("right click")

    //The the snake right
    turnSnakeRight()
}

function handleClick() {
    switch (snake.headDirection) {
        case "ArrowUp":
            snake.headDirection = "Up"
            break;

        case "ArrowRight":
            snake.headDirection = "Right"
            break;

        case "ArrowDown":
            snake.headDirection = "Down"
            break;

        case "ArrowLeft":
            snake.headDirection = "Left"
            break;
    }
}

function handleKey(key) {
    switch (key) {
        case "ArrowUp":
            snake.headDirection = "Up"
            break;

        case "ArrowRight":
            snake.headDirection = "Right"
            break;

        case "ArrowDown":
            snake.headDirection = "Down"
            break;

        case "ArrowLeft":
            snake.headDirection = "Left"
            break;
    }
}

function toggleDarkMode() {

}

function restartGame() {

}


