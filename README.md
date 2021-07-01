![Unoffical Snake Spinoff Series](/images/READERHeader.png/)

# Unoffical Snake Spinoff Series
Minecat is a Minesweeper re-creation! Cells on the board can be clicked, which will reveal them. The goal of the game is to reveal every cell on the board, except for those that have mines. When revealed, cells with neighboring mines will be shown with a number on them, corresponding to the number of mines next to that cell. Clicking on a cell that has no adjacency with a bomb will reveal an empty space, and will reveal any empty space around it. This action cascades out until it reaches the edges of the board, any flags, or a numbered cell while revealing a single layer of numbered cells. Flags may be placed and removed with a right click, and are used to mark potential bomb locations.

The number of rows, columns, and bombs can be adjusted by using the bar beneath the play board

# [Play the game here!](https://snakereturns.netlify.app/).

## General Info

## Languages
* HTML
* CSS
* JavaScript

## Attributions

* Icons made by iconixar from www.flaticon.com.
* Icons made by Pixel perfect from www.flaticon.com.
* Icons made by Smashicons from www.flaticon.com.



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

## Future Enhancements
- [ ] Enhanced Dark Mode
- [ ] Multiple levels
