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


/*------------------------------ Constants ------------------------------*/

// const oldGameboard = [
//     [1,1], [1,2], [1,3], [1,4], [1,5], [1,6], [1,7], [1,8], [1,9], [1,10], [1,11], [1,12], [1,13],
//     [2,1], [2,2], [2,3], [2,4], [2,5], [2,6], [2,7], [2,8], [2,9], [2,10], [2,11], [2,12], [2,13],
//     [3,1], [3,2], [3,3], [3,4], [3,5], [3,6], [3,7], [3,8], [3,9], [3,10], [3,11], [3,12], [3,13],
//     [4,1], [4,2], [4,3], [4,4], [4,5], [4,6], [4,7], [4,8], [4,9], [4,10], [4,11], [4,12], [4,13],
//     [5,1], [5,2], [5,3], [5,4], [5,5], [5,6], [5,7], [5,8], [5,9], [5,10], [5,11], [5,12], [5,13],
//     [6,1], [6,2], [6,3], [6,4], [6,5], [6,6], [6,7], [6,8], [6,9], [6,10], [6,11], [6,12], [6,13],
//     [7,1], [7,2], [7,3], [7,4], [7,5], [7,6], [7,7], [7,8], [7,9], [7,10], [7,11], [7,12], [7,13],
//     [8,1], [8,2], [8,3], [8,4], [8,5], [8,6], [8,7], [8,8], [8,9], [8,10], [8,11], [8,12], [8,13],
//     [9,1], [9,2], [9,3], [9,4], [9,5], [9,6], [9,7], [9,8], [9,9], [9,10], [9,11], [9,12], [9,13],
//     [10,1],[10,2],[10,3],[10,4],[10,5],[10,6],[10,7],[10,8],[10,9],[10,10],[10,11],[10,12],[10,13],
//     [11,1],[11,2],[11,3],[11,4],[11,5],[11,6],[11,7],[11,8],[11,9],[11,10],[11,11],[11,12],[11,13]
// ]

/*------------------------------ Variables ------------------------------*/
let snake

let gridRows
let gridColumns
let gameBoard

let fruitLocations // The various fruit locations on the gameBoard. An array of arrays.
let numberOfFruitEaten // The players current score

let pointsNeededToWin
let isWinner // Will be "true" if the player has won the game
let isLoser // Will be "true" if the player has lost the game

let timerIntervalId //Utilized by the snake movement loop
let seconds //

/*---------------------- Cached Element References ----------------------*/

// const gameBoardArray = document.querySelector("")
// const winLoseMessageContainer = document.querySelector("")

const gridContainerElement = document.querySelector("#game-grid") 
// const gameBoardElement = Array.from(document.querySelector(".cell"))

const upKeyBtnElement = document.querySelector("#up-arrow-image")
const downKeyBtnElement = document.querySelector("#down-arrow-image")
const leftKeyBtnElement = document.querySelector("#left-arrow-image")
const rightKeyBtnElement = document.querySelector("#right-arrow-image")

// const toggleDarkModeBtn = document.querySelector("")
// const restartGameBtn = document.querySelector("")

const pointsBoxElement = document.querySelector("#score-number")

// Element.classList.add('this')
// Element.classList.remove('this')

/*--------------------------- Event Listeners ---------------------------*/

upKeyBtnElement.addEventListener("click", (event) => handleClick(event)) //Listens for a click on the Up Key button element
downKeyBtnElement.addEventListener("click",(event) => handleClick(event)) //Listens for a click on the Down Key button element
leftKeyBtnElement.addEventListener("click", (event) => handleClick(event)) //Listens for a click on the Left Key button element
rightKeyBtnElement.addEventListener("click",(event) => handleClick(event)) //Listens for a click on the Right Key button element

// Listens for Up, Down, Left, Right arrows on the keyboard
document.addEventListener("keydown",(event) => {
            handleKey(event)
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

    //Point system
    numberOfFruitEaten = 0
    pointsNeededToWin = 15

    //Render Points
    renderScore()

    //Set the initial snake parameters
    snake = {
        speed: 300,
        size: 2,
        headLocation: [9,7],
        bodyLocations: [[9,6]],
        headDirection: "Right",
        previousHeadLocations: []
    }

    //Add fruit to the gameboard
    fruitLocations = {
        apple: [4,3],
        banana:[2,8],
        orange: [5,10]
    }

    //Render the the snake and the fruit
    renderGameElements()

    //Start the loop that moves the snake
    startLoop()
}

function generateGameboard() {

    //Loop (gridRows) times
    for(let row = 1; row <= gridRows; row++){
        //Loop (gridColumns) times
        for(let column = 1; column <= gridColumns; column++){

            //For each row/column combination, add a new array ([1,1], [1,2] etc) to the gameBoard array
            gameBoard.push([row, column])
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

function renderGameElements() {

    //Loop through every row/column combination on the gameBoard grid
    gameBoard.forEach((cell) => {

        //Find the corresponding div element
        matchingCellElement = document.querySelector(`#r${cell[0]}c${cell[1]}`)

        //RENDER APPLE
        //If the cell's coordinates match apple's coordinates
        if(fruitLocations.apple.toString() === cell.toString()) {

            //Add the apple styling
            matchingCellElement.setAttribute("class", "cell item-apple")

        //RENDER BANANA
        //If the cell's coordinates match banana's coordinates
        } else if(fruitLocations.banana.toString() === cell.toString()) {

            //Add the banana styling
            matchingCellElement.setAttribute("class", "cell item-banana")

        //RENDER ORANGE
        //If the cell's coordinates match orange's coordinates
        } else if(fruitLocations.orange.toString() === cell.toString()) {

            //Add the orange styling
            matchingCellElement.setAttribute("class", "cell item-orange")

        //RENDER EMPTY CELL
        //If the cell's coordinates match none of the above's coordinates
        } else {
            //Add the empty cell styling
            matchingCellElement.setAttribute("class", "cell")
        }

        //RENDER SNAKEBODY
        snake.bodyLocations.forEach((location) => {

        if(location.toString() === cell.toString()) {

            //Add the snake styling
            matchingCellElement.setAttribute("class", "cell snake-body")
            }
        })

        //RENDER SNAKEHEAD
        //If the cell's coordinates match snake head's coordinates
        if(snake.headLocation.toString() === cell.toString()) {

            //Add the snake styling
            matchingCellElement.setAttribute("class", "cell snake-head")
        
            //Log the snakes location (cause you can)
            //console.log(`Snake is on ${snake.headLocation}`)
        }
    })
}

function renderScore() {
    //
    pointsBoxElement.innerHTML = numberOfFruitEaten
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
    timerIntervalId = setInterval(everyLoopThisHappens, snake.speed);
}

//A timer that moves the snake forward and renders its position
function everyLoopThisHappens() {
    if(!isWinner && !isLoser){

        //Add current location to list of previous locations
        logPreviousLocations()

        //Move the snake forward
        moveSnakeForward()

        //Update the location of the snake's body
        updateBodyLocations()

        //Render the snakes current position
        renderGameElements()

        //Determine if the snake hit fruit or itself
        checkForCollision()

        // //!!Determine if the player have enough points won the game
        // checkIfGameWonOrLost()
    }
}

function logPreviousLocations() {
    //Log every movements that the snake takes
    snake.previousHeadLocations.unshift(snake.headLocation)
}

function updateBodyLocations() {
    //Cut off a portion of the snake's previous movements based on the snake's size
    snake.bodyLocations = snake.previousHeadLocations.slice(0, snake.size - 1)
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

    function checkForCollision() {
        //Check if you hit the apple 
        if(snake.headLocation.toString() === fruitLocations.apple.toString()) {

            console.log("APPLE HIT!")

            //Add a point and render it
            addPoint()

            //Increase the size of the snake
            growSnake()

            //!Move the fruit

        //Check if you hit the banana
        } else if(snake.headLocation.toString() === fruitLocations.banana.toString()) {

            console.log("BANANA HIT!")

            //Add a point and render it
            addPoint()

            //Increase the size of the snake
            growSnake()

            //!Move the fruit

        //Check if you hit the orange
        } else if(snake.headLocation.toString() === fruitLocations.orange.toString()) {

            console.log("ORANGE HIT!")

            //Add a point and render it
            addPoint()

            //Increase the size of the snake
            growSnake()

            //!Move the fruit
            changeFruitLocation()
        }
    } 

    function addPoint() {
        //Add to the total score
        numberOfFruitEaten += 1

        renderScore()
    }

    function growSnake() {
        //Log the increase in size to the snake.size parameter
        snake.size += 1
    }

    function changeFruitLocation() {

        let newFruitLocation = [randomNumberBetween(1, gridRows), randomNumberBetween(1, gridColumns)]

        console.log(newFruitLocation)
        console.log(randomNumberBetween(1, 2))

        if(newFruitLocation.toString() !== fruitLocations.orange.toString()) {

            fruitLocations.orange = newFruitLocation

        }
        //let random1 = (min, max) => Math.floor(Math.random() * (max - min)) + min;

        //Find a random spot on the map to move the fruit [r, c] = [random#between1andgridRows, random#between1andgridColumns]
        //Check if something is in that spot. If it is, do is again.
        //Make sure that something is not already there
        //Maybe you should make a list called "occupiedSpaces", reset every time the game loops. 
        //There can be a function after every action that updates a location that also updates this list
        //Then you can reference that list exclusively to determine if a space is occupied
        //Otherwise you need to loop through what? Snake? Fruit? if that's item, nbd
    }

    function randomNumberBetween(min, max) {
        //Generate a random number between min and max
        return Math.floor(Math.random() * (max - min)) + min
    }

    function checkIfSnakeHitItself() {
        //!!If so, end the game
        gameOver()
    }
    
    function checkIfGameWonOrLost() {
        //!!Determine if the game has been won or lost using the isWinner and isLoser variables
        
        //!!If so, stop the loop

    //!!Also, add a new window element to the page that displays a win/loss message and the restart button
}

function handleClick(event) {
    //Check which element was clicked and change the snakes direction accordingly
    switch (event.target) {
        case upKeyBtnElement:
            snake.headDirection = "Up"
            break;

        case downKeyBtnElement:
            snake.headDirection = "Down"
            break;

        case leftKeyBtnElement:
            snake.headDirection = "Left"
            break;

        case rightKeyBtnElement:
            snake.headDirection = "Right"
            break;
    }
}

function handleKey(event) {
    //Check which key was pressed and change the snakes direction accordingly
    switch (event.key) {
        case "ArrowUp":
            snake.headDirection = "Up"
            break;

        case "ArrowDown":
            snake.headDirection = "Down"
            break;

        case "ArrowLeft":
            snake.headDirection = "Left"
            break;

        case "ArrowRight":
            snake.headDirection = "Right"
            break;
    }
}

function toggleDarkMode() {
//!!
}

function restartGame() {
//!!
}

