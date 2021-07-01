//!! ------------------------------ TO DO ------------------------------*
//! 1.a. Need to prevent the head from change directions if it is opposite to current direction
//! 1.b. Need to prevent the body parts from updating location if the head doesn't move per 1.a.

//! 2.a. Dark mode styling

//! 3.a. Figure out why keydown eventlistener works on init for any key

//! 5.a. Controls on mobile?


//!see if I actually use isWinner/isLoser variables > prob not

//!turn youWon function into > levelUp. Create a Level variable. Use a switch to determine whether you raise the level and reset the init or end game

//!3-4 levels

//!change styling on level up 

//!Prevent backwards movement


/*------------------------------ Constants ------------------------------*/

const colorScheme = {
    dark: "",
    change: function () {
        //This is a toggle function. Check to see if the colorScheme.dark is equal to "dark"
        if(colorScheme.dark = colorScheme.dark) {
            //LIGHT MODE 
            //If so, switch it to blank (light mode)
            colorScheme.dark = ""

            //LIGHT MODE 

            //Also toggle the dark mode button image
            toggleDarkModeBtn.src = "images/game/mooneyehd.png"
            //Also toggle the left header image
            headerImageLeftElement.src = "images/game/snakescreamhd.png"
            //Also toggle the right header image
            headerImageRightElement.src = "images/game/snakeskullhd.png"

            //Also toggle the up arrow image
            upKeyBtnElement.src = "images/game/arrowuphd.png"
            //Also toggle the down arrow image
            downKeyBtnElement.src = "images/game/arrowdownhd.png"
            //Also toggle the left arrow image
            leftKeyBtnElement.src = "images/game/arrowlefthd.png"
            //Also toggle the right arrow image
            rightKeyBtnElement.src = "images/game/arrowrighthd.png"

        } else {

            //DARK MODE 
            //If not, switch it to dark (dark mode)
            colorScheme.dark = "dark"
            //Also toggle the dark mode button image
            toggleDarkModeBtn.src = "images/game/mooneyecolor.png"
            //Also toggle the left header image
            headerImageLeftElement.src = "images/game/snakescreamcolor.png"
            //Also toggle the right header image
            headerImageRightElement.src = "images/game/snakeskullcolor.png"

            //Also toggle the up arrow image
            upKeyBtnElement.src = "images/game/arrowupcolor.png"
            //Also toggle the down arrow image
            downKeyBtnElement.src = "images/game/arrowdowncolor.png"
            //Also toggle the left arrow image
            leftKeyBtnElement.src = "images/game/arrowleftcolor.png"
            //Also toggle the right arrow image
            rightKeyBtnElement.src = "images/game/arrowrightcolor.png"
            
        }
        //Then set the class based on colorScheme.dark
        //Does this remove other classes?
        document.querySelector("body").setAttribute("class", colorScheme.dark)
    }
}

/*------------------------------ Variables ------------------------------*/

let snake = {
    speed: 0,
    size: 0,
    headLocation: [],
    bodyLocations: [],
    headDirection: "",
    previousHeadLocations: []
}
// Convert to array of objects?
let fruitLocations = {
    apple: [],
    banana:[],
    orange: []
}

let gridRows // Represents the current number of rows on the gameboard
let gridColumns // Represents the current number of columns on the gameboard
let gameBoard // Represents the gameboard as an array of coordinates -> [[1,1],[1,2],[1,3]...]

let numberOfFruitEaten // The players current score
let newFruitLocation // Used to store the location of new fruit in the changeFruitLocation function

let pointsNeededToWin
let isWinner // Will be "true" if the player has won the game
let isLoser // Will be "true" if the player has lost the game

let timerIntervalId // Utilized by the snake movement loop

/*---------------------- Cached Element References ----------------------*/

const headerImageLeftElement = document.querySelector("#title-image-left")
const headerImageRightElement = document.querySelector("#title-image-right")

const gridContainerElement = document.querySelector("#game-grid") 

const toggleDarkModeBtn = document.querySelector("#dark-mode-btn")

const arrowBtnContainerElement = document.querySelector("#arrow-button-container")
const upKeyBtnElement = document.querySelector("#up-arrow-image")
const downKeyBtnElement = document.querySelector("#down-arrow-image")
const leftKeyBtnElement = document.querySelector("#left-arrow-image")
const rightKeyBtnElement = document.querySelector("#right-arrow-image")

const modalWindowElement = document.querySelector("#modal-window")
const modalTextElement = document.querySelector("#modal-text")
const restartGameBtn = document.querySelector("#try-again-btn")

const pointsBoxElement = document.querySelector("#score-number")

/*--------------------------- Event Listeners ---------------------------*/

// Listens for clicks on the Up, Down, Left, Right arrow image elements
arrowBtnContainerElement.addEventListener("click", handleClick)

// Listens for keydowns on the Up, Down, Left, Right arrows on the keyboard
document.addEventListener("keydown", handleKey)

toggleDarkModeBtn.addEventListener("click", colorScheme.change) //Listens for a click on the Dark Mode button element
restartGameBtn.addEventListener("click", restartGame) //Listens for a click on the Restart Game button element


/*------------------------------ Functions ------------------------------*/

init()

function init() {

    //Check the user's preferred color scheme (light/dark mode)
    //checkUserColorSchemePreference()

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
        speed: 150,
        size: 2,
        headLocation: [9,6],
        bodyLocations: [[9,5]],
        headDirection: "Right",
        previousHeadLocations: []
    }

    //Add fruit to the gameboard
    fruitLocations = {
        apple: [4,3],
        banana:[2,8],
        orange: [5,10]
    }

    timerIntervalId = null

    //Render the the snake and the fruit
    renderGameElements()

    //Set
    setModalText("Welcome to SNEK!")

    //Set the retry button text
    setRestartText("Press any key to start the game!")

    //Show the modal
    showModalWindow()
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

        //So long as gridContainerElement has a child
        while (gridContainerElement.firstChild) {
            //Remove that child
            gridContainerElement.removeChild(gridContainerElement.firstChild)
        }

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

function clearGameBoardRender() {
    //So long as gridContainerElement has a child
    while (gridContainerElement.firstChild) {
        //Remove that child
        gridContainerElement.removeChild(gridContainerElement.firstChild)
    }
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
    //Render the current number of points of the pointsBox Element
    pointsBoxElement.innerHTML = numberOfFruitEaten
}

//This function kicks off the timer. Every X seconds, the snake moves.
function startLoopToggle() {
	//Check for an active timer interval
    if (timerIntervalId) {
	//If interval exists, clear it and reset
        clearInterval(timerIntervalId)
        timerIntervalId = null
    } else {
        //Start a new timer interval
        timerIntervalId = setInterval(everyLoopThisHappens, snake.speed)
    }
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

        //Determine if the snake hit item
        checkForItemCollision()

        //Determine if the snake hit itself
        checkForBodyCollision()

        //Check to see if the player has enough points to win the level
        checkForWinner()
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

function checkForItemCollision() {
    //Check if you hit the apple 
    if(snake.headLocation.toString() === fruitLocations.apple.toString()) {

        console.log("APPLE HIT!")

        //Add a point and render it
        addPoint()

        //Increase the size of the snake
        growSnake()

        //Move the fruit
        changeAppleLocation()

    //Check if you hit the banana
    } else if(snake.headLocation.toString() === fruitLocations.banana.toString()) {

        console.log("BANANA HIT!")

        //Add a point and render it
        addPoint()

        //Increase the size of the snake
        growSnake()

        //Move the fruit
        changeBananaLocation()

    //Check if you hit the orange
    } else if(snake.headLocation.toString() === fruitLocations.orange.toString()) {

        console.log("ORANGE HIT!")

        //Add a point and render it
        addPoint()

        //Increase the size of the snake
        growSnake()

        changeOrangeLocation()
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

function changeAppleLocation() {
    // Need to refactor to changeFruitLocation(), having trouble with fruitLocations.key

    //Declare a variable that represents whether or not the item hit the snakeBody
    let collisionWithSnakeBody = true

    do {
        //Set a random location on the grid
        newFruitLocation = [randomNumberBetween(1, gridRows), randomNumberBetween(1, gridColumns)]

        //Set collisionWithSnakeBody to false
        collisionWithSnakeBody = false

        //For every subArray in bodyLocations 
        snake.bodyLocations.forEach((location) => {

            //Check if the newFruitLocation is equal to the bodyLocation subArray item
            if(newFruitLocation.toString() === location.toString()) {
                //If this is true for the snakeBodyLocation subArray, set collisionWithSnakeBody back to true
                collisionWithSnakeBody = true
            }
        })

    } while (
        //Continue to set random grid locations if the location matches any existing items on the grid
        newFruitLocation.toString() === fruitLocations.apple.toString() ||
        newFruitLocation.toString() === fruitLocations.banana.toString() ||
        newFruitLocation.toString() === fruitLocations.orange.toString() ||
        newFruitLocation.toString() === snake.headLocation.toString() || 
        //Including anything in snake.bodyLocations
        collisionWithSnakeBody
    )

    //Once the loop is broken, set the fruit's new location
    fruitLocations.apple = newFruitLocation   
}

function changeBananaLocation() {
    // Need to refactor to changeFruitLocation(), having trouble with fruitLocations.key

    //Declare a variable that represents whether or not the item hit the snakeBody
    let collisionWithSnakeBody = true

    do {
        //Set a random location on the grid
        newFruitLocation = [randomNumberBetween(1, gridRows), randomNumberBetween(1, gridColumns)]

        //Set collisionWithSnakeBody to false
        collisionWithSnakeBody = false

        //For every subArray in bodyLocations 
        snake.bodyLocations.forEach((location) => {

            //Check if the newFruitLocation is equal to the bodyLocation subArray item
            if(newFruitLocation.toString() === location.toString()) {
                //If this is true for the snakeBodyLocation subArray, set collisionWithSnakeBody back to true
                collisionWithSnakeBody = true
            }
        })

    } while (
        //Continue to set random grid locations if the location matches any existing items on the grid
        newFruitLocation.toString() === fruitLocations.apple.toString() ||
        newFruitLocation.toString() === fruitLocations.banana.toString() ||
        newFruitLocation.toString() === fruitLocations.orange.toString() ||
        newFruitLocation.toString() === snake.headLocation.toString() || 
        //Including anything in snake.bodyLocations
        collisionWithSnakeBody
    )

    //Once the loop is broken, set the fruit's new location
    fruitLocations.banana = newFruitLocation   
}

function changeOrangeLocation() {
    // Need to refactor to changeFruitLocation(), having trouble with fruitLocations.key

    //Declare a variable that represents whether or not the item hit the snakeBody
    let collisionWithSnakeBody = true

    do {
        //Set a random location on the grid
        newFruitLocation = [randomNumberBetween(1, gridRows), randomNumberBetween(1, gridColumns)]

        //Set collisionWithSnakeBody to false
        collisionWithSnakeBody = false

        //For every subArray in bodyLocations 
        snake.bodyLocations.forEach((location) => {

            //Check if the newFruitLocation is equal to the bodyLocation subArray item
            if(newFruitLocation.toString() === location.toString()) {
                //If this is true for the snakeBodyLocation subArray, set collisionWithSnakeBody back to true
                collisionWithSnakeBody = true
            }
        })

    } while (
        //Continue to set random grid locations if the location matches any existing items on the grid
        newFruitLocation.toString() === fruitLocations.apple.toString() ||
        newFruitLocation.toString() === fruitLocations.banana.toString() ||
        newFruitLocation.toString() === fruitLocations.orange.toString() ||
        newFruitLocation.toString() === snake.headLocation.toString() || 
        //Including anything in snake.bodyLocations
        collisionWithSnakeBody
    )

    //Once the loop is broken, set the fruit's new location
    fruitLocations.orange = newFruitLocation   
}

function randomNumberBetween(min, max) {
    //Generate a random number between min and max
    return Math.floor(Math.random() * (max - min)) + min
}

function checkForBodyCollision() {
    //Check every bodyLocation on the gameBoard grid
    snake.bodyLocations.forEach((location) => {

        //If the head collides with a bodyLocation
        if(snake.headLocation.toString() === location.toString()) {

            //The player loses the game
            gameLose()
        }
    })
}

function checkForWinner() {
    if(numberOfFruitEaten === pointsNeededToWin) {
        //Run the gameWin function
        gameWin()
    }
}

function gameWin() {
    //Stop the snake's movement
    stopTheSnake()

    //Set the modal text
    setModalText("You win! :)")

    //Set the retry button text
    setRestartText("Press SPACE to play again!")

    //Unhide the modal window
    showModalWindow()

    //Allow the user to press spacebar to restart
    toggleSpacebarRestartListenerOn()
}

function gameLose() {
    //Stop the snake's movement
    stopTheSnake()

    //Set the modal text
    setModalText("You lose! :(")

    //Set the retry button text
    setRestartText("Press SPACE to try again!")

    //Unhide the modal window
    showModalWindow()

    //Allow the user to press spacebar to restart
    toggleSpacebarRestartListenerOn()
}

function showModalWindow() {
    modalWindowElement.style.display = "block"
}

function hideModalWindow() {
    modalWindowElement.style.display = "none"
}

function setModalText(text) {
    modalTextElement.innerText = text
}

function setRestartText(text) {
    restartGameBtn.innerText = text
}

function initialStartLoop() {
    //When the game first loads, start the snake's movement
    if(!timerIntervalId) {
        //
        startLoopToggle()

        //Hide the modal window
        hideModalWindow()
        }
}

function stopTheSnake() {
    //Pause the timer
    startLoopToggle()

    //Toggle arrow key/image listeners off
    toggleArrowButtonListenerOff()
    toggleArrowKeyListenerOff()
}

function toggleArrowButtonListenerOn() { 
    // Listens for clicks on the Up, Down, Left, Right arrow image elements
    arrowBtnContainerElement.addEventListener("click", handleClick) // Toggle ON
}

function toggleArrowButtonListenerOff() { 
    // Listens for clicks on the Up, Down, Left, Right arrow image elements
    arrowBtnContainerElement.removeEventListener("click", handleClick) // Toggle OFF
}

function toggleArrowKeyListenerOn() { 
    // Listens for keydowns on the Up, Down, Left, Right arrows on the keyboard
    document.addEventListener("keydown", handleKey) // Toggle ON
}

function toggleArrowKeyListenerOff() { 
    // Listens for keydowns on the Up, Down, Left, Right arrows on the keyboard
    document.removeEventListener("keydown", handleKey) // Toggle OFF
}

function toggleSpacebarRestartListenerOn() {
    document.addEventListener('keydown', toggleSpacebarListenerMeat)
}

function toggleSpacebarRestartListenerOff() { // Toggle OFF
    document.removeEventListener('keydown', toggleSpacebarListenerMeat)
}

function toggleSpacebarListenerMeat(event) {
    //Named function needed for add/removeEventListener
    if(event.code === 'Space') {
        restartGame()
    }
}

function handleClick(event) {
    //If the snake is not moving yet, start it's movement
    initialStartLoop()

    //Check which element was clicked and change the snakes direction accordingly
    switch (event.target) {
        case upKeyBtnElement && snake.headDirection !== "Down":
            snake.headDirection = "Up"
            break;

        case downKeyBtnElement && snake.headDirection !== "Up":
            snake.headDirection = "Down"
            break;

        case leftKeyBtnElement && snake.headDirection !== "Right":
            snake.headDirection = "Left"
            break;

        case rightKeyBtnElement && snake.headDirection !== "Left":
            snake.headDirection = "Right"
            break;
        }
}

function handleKey(event) {
    //If the snake is not moving yet, start it's movement
    initialStartLoop()

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

function restartGame() {
    //Run init
    init()

    //Hide the modal Window
    hideModalWindow()

    //Restart event listeners on arrow keys
    toggleArrowButtonListenerOn()
    toggleArrowKeyListenerOn()

    //Turn off spacebar event listener
    toggleSpacebarRestartListenerOff()

    //Start the movement loop
    startLoopToggle()
}

function checkUserColorSchemePreference() {
    /* Checks if the user's browser preferences call for dark mode 
    AND that the colorScheme is not already dark. Should run on init. */
    if (window.matchMedia("(prefers-color-scheme:dark)").matches && !colorScheme.dark) {
        
        //If prefered, change the colorScheme.
        colorScheme.change()
    }
}