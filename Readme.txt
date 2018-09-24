Readme

Tic-Tac-Toe
Create an advanced, flexible tic-tac-toe game for the console. The game should work as follows:
 
1. Ask if the player would like to resume a saved game. If yes, load game state from a text or binary file (your choice of file format).
For a new game, ask how many players are playing as a prompt on its own line. The maximum number of players is 26.
For a new game, ask how large the board should be as a prompt on its own line. The maximum number is 999.
For a new game, ask what the win sequence count should be (i.e. 3 would be normal standard tic-tac-toe) as a prompt on its own line.
For a new game, check to ensure that winning is possible given the criteria specified, and display an error and quit if not.

2. Output a board in the following general format:
 
    1   2   3
1     |   |
   ---+---+---
2     |   |
   ---+---+---
3     |   |
No other board format will be accepted. You must number the rows and columns, not each box. 
You can treat the screen as infinitely large, so if you run out of screen space, 
do not worry about it wrapping or having scroll bars appear. 
The maximum number of rows/columns will be 999, so three spaces is enough.

3. Repeat the following process over and over again until the user saves and quits, the game is won, or a tie occurs:
Ask the user for a row and column number separated by spaces, or Q to quit. Put the appropriate symbol for that player in the specified spot.
Players should be given the following symbols, in order: XOABCDEFGHIJKLMNPQRSTUVWYZ
If the user chooses instead to save and quit, ask them for a filename in a prompt on its own line. 
Then, save to that file and quit.

@Author: Zixu Jiang
@Date: 09 - 23 - 2018

Enter main menu:
1. Begain a new game.
2. Resume a game.
3. Exit

Begain a new game.
1. How large the board should be as a prompt on its own line? The maximum number is 999.
2. How many players are playing as a prompt on its own line? The maximum number of players is 26. 
3. What the win sequence count should be?

In the game.
1. Enter x
2. Enter y
3. Do you want to quit (y/n)

Quit
1. Input the file name. (Example: Game1.txt)

Resume
1. Input the file name.