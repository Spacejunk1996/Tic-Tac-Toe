/**
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
*/



var readlineSync = require('readline-sync');
var readline = require('readline');
var fs = require('fs');
var path = require('path');

var order = ['X','O','A','B','C','D','E','F','G','H','I','J','K','L','M','N','P','Q','R','S','T','U','V','W','Y','Z'];
main();
//主函数
function main() {

	console.log("Hello and welcome to Tic-Tac-Toe! Enter a number to tell me what you want to do.");
	console.log("1. Begain a new game.");
	console.log("2. Resume game.");
	console.log("3. Exit");
	var n = readlineSync.question("What you want to do: ");
	
	switch (n) {
		case '1': 
		beginNewGame();
		break;

		case '2':
		resumeGame();
		break;

		case '3':
		process.exit();
		break;

		default:
		console.log("error");
	}
}

//开始新游戏
function beginNewGame() {

	var n1 = true;
	var n2 = true;
	var n3 = true;

	while (n1) {

		var sizeOfBoard = readlineSync.question("How large the board should be as a prompt on its own line? The maximum number is 999. ");
		if (sizeOfBoard > 0 && sizeOfBoard <= 999) {
			n1 = false;
		}
		else 
			console.log("Error!! Try again!");

	}

	while (n2) {
		var numberOfPlayer = readlineSync.question("How many players are playing as a prompt on its own line? The maximum number of players is 26. ");
		if (numberOfPlayer > 0 && numberOfPlayer < 26) {
			n2 = false;
		}
		else
			console.log("Error!! Try again!");
	}

	
	
	var numberOfsequence = readlineSync.question("What the win sequence count should be? ")

	creatBoard(sizeOfBoard);
	playingGame(sizeOfBoard,numberOfPlayer,creatBoard(sizeOfBoard),numberOfsequence,0);

}

//恢复游戏
function resumeGame() {
	var fileName = readlineSync.question("What is the file name? ");
	openFile(fileName);
}

//创建棋盘
function creatBoard(sizeOfBoard) {

	var board = new Array();
	var m = 2 * sizeOfBoard; // 代表y
	var n = 4 * sizeOfBoard; // 代表x

	var base = 3;
	var base2 = 4;
	var base3 = 4;
	var k = 1;
	var j = 0;

	for (var y = 0; y < m; y++) {
		board[y] = new Array()
		for (var x = 0; x < n; x++) {
			board[y][x] = ' '; 
		}
	}

	for (var y = 0; y < m; y++) {
		for (var x = 0; x < n; x++) {

			if (x == base && y == 0) { //打印横坐标
				board[y][x] = k;
				//对齐操作
				if (board[y][x] >= 10 && board[y][x] <= 99) {

					var t1 = board[y][x];
					var t2 = board[y][x] % 10;
					board[y][x] = board[y][x] % 10;
					board[y][x - 1] = (t1 - t2) / 10;

				}
				
				if (board[y][x] >= 100 && board[y][x] <= 999) {
					
					var t1 = board[y][x];
					var t2 = board[y][x] % 10;
					var t3 = board[y][x] / 10 % 10;
					var t4 = board[y][x] / 100 % 10
					board[y][x] = t2;
					board[y][x - 1] = t3;
					board[y][x - 2] = t4;

				}



				base = base + 4;
				k ++;
			}

			else if (x != base && y == 0) {
				board[y][x] = " ";
			}

			else if ((y + 1) % 2 == 0 && y != 0) { //对于行1，3，5...的操作

				if (x == 0) {
					board[y][x] = (y + 1) / 2;
				} 
				else if (x % 4 == 0) {
					board[y][x] = "|";
				}
				else {
					board[y][x] = " ";
				}
			}

			else {
				if (x == 0) {
					board[y][x] = " ";
				}

				else if (x % 4 == 0) {
					board[y][x] = "+";
				}

				else {
					board[y][x] = "-";
				}
			}
			
		}
	}	

	for (var y = 0; y < m; y ++) {
		if (y < 19 || y % 2 == 0 )
		board[y][0] = ' ' + board[y][0]
	}

	//初始补齐方法
	// if (x > 36) {
	// 	for (var y = 2; y < m; y += 2) {
	// 		for (var x = 37; x < n; x += 4) {
	// 			board[y][x] = '' + board[y][x];
	// 		}
	// 	}
	// 	for (var y = 1; y < m; y += 2) {
	// 		for (var x = 37; x < n; x += 4) {
	// 			board[y][x] = ' ' + board[y][x];
	// 		}
	// 	}
	// }

	return board;

}

//游戏进行
function playingGame(sizeOfBoard,numberOfPlayer,board,sequence,ord) {
		var j = ord;

		for (var num = 0; num < sizeOfBoard * sizeOfBoard; num++) {
			var empty = true;
			//是否需要存储游戏，别忘了存order。
			while (empty) {
			

			var coordinate = readlineSync.question("Please enter a row and column number separated by spaces, or Q to quit.");
			var token = coordinate.split(' ');

			var m = token[0];
			var n = token[1];

			//console.log("m: " + m + " n: " + n);


			if (token[0] == 'Q')
				process.exit();

			var x = 4 * m - 2;
			var y = 2 * n - 1;
			
			//console.log("sizeOfBoard: "+sizeOfBoard);

			// if (y <= 2*sizeOfBoard-1)
			// 	console.log("!!!!!");

			if (x > 0 && x <= 4 * sizeOfBoard - 2 && y > 0 && y <= 2 * sizeOfBoard - 1) {
				//console.log("jinqule");
				if (board[y][x] == ' ') {
					//console.log("空的");
					empty = false;
				}
					
			}
			else {
				//empty = true;
				console.log("Error! Try again.");
				//console.log(board[y][x]);
			}
			}

			board[y][x] = order[j];

			j++;

			if (j == numberOfPlayer)
				j = 0;
			
			for(var i = 0; i < board.length; i++) {
				console.log(board[i].join(''));
			}
			
			checkWinner(board,sizeOfBoard,sequence);

			

			var t = true;

			while (t) {
				var quit = readlineSync.question("Do you want to quit and save game? if yes enter q: if no enter n: ");

				if (quit == 'q') {
					var fileName = readlineSync.question("File name: ");
					saveFile(fileName, sizeOfBoard, numberOfPlayer, j, sequence, board);
					process.exit();
				}

				else if (quit == 'n') {
					t = false;
				}

				else {
					//var quit = readlineSync.quesiton("Error! Please try again: ");
					console.log("Error! Please try again:")
				}

			}
		}
	
	console.log("Tie");
	process.exit();

}

//判断胜利
function checkWinner (board,sizeOfBoard,sequence) {
	var num = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
	var num2 = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
	var num3 = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
	var num4 = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
	var j = 0
	var win;

	if (sizeOfBoard == 1 && sequence == 1) { 
		console.log("Winner: X");
		process.exit();
	}

	//横向检测
	for (var y = 1; y < 2 * sizeOfBoard; y += 2) {
		for (var x = 6; x < 4 * sizeOfBoard; x += 4) {
			if (board[y][x] != '' && board[y][x] != ' ' && board[y][x] == board[y][x - 4]){
				//console.log("HI");
				if (board[y][x] == 'X') num[0] ++;
				else if (board[y][x] == 'O') num[1] ++;
				else if (board[y][x] == 'A') num[2] ++;
				else if (board[y][x] == 'B') num[3] ++;
				else if (board[y][x] == 'C') num[4] ++;
				else if (board[y][x] == 'D') num[5] ++;
				else if (board[y][x] == 'E') num[6] ++;
				else if (board[y][x] == 'F') num[7] ++;
				else if (board[y][x] == 'G') num[8] ++;
				else if (board[y][x] == 'H') num[9] ++;
				else if (board[y][x] == 'I') num[10] ++;
				else if (board[y][x] == 'J') num[11] ++;
				else if (board[y][x] == 'K') num[12] ++;
				else if (board[y][x] == 'L') num[13] ++;
				else if (board[y][x] == 'M') num[14] ++;
				else if (board[y][x] == 'N') num[15] ++;
				else if (board[y][x] == 'P') num[16] ++;
				else if (board[y][x] == 'Q') num[17] ++;
				else if (board[y][x] == 'R') num[18] ++;
				else if (board[y][x] == 'S') num[19] ++;
				else if (board[y][x] == 'T') num[20] ++;
				else if (board[y][x] == 'U') num[21] ++;
				else if (board[y][x] == 'V') num[22] ++;
				else if (board[y][x] == 'W') num[23] ++;
				else if (board[y][x] == 'Y') num[24] ++;
				else if (board[y][x] == 'Z') num[25] ++;

				for (var i = 0; i < 26; i++) {
					if (num[i] >= sequence) {
						// if (x == 4 * sizeOfBoard - 2)
						// 	num[i] --;
						if (x - 4 * (sequence - 1) < 0)
							num[i] --;
						else if (board[y][x] != board[y][x - 4 * (sequence - 1)])
							num[i] --;

						
					}
				}4
				
			} 
				
				if (num[0] == sequence) {
					console.log("winner: X");
					process.exit();
				}
				else if (num[1] == sequence) {
					console.log("winner: O");
					process.exit();
				}
				else if (num[2] == sequence) {
					console.log("winner: A");
					process.exit();
				}
				else if (num[3] == sequence) {
					console.log("winner: B");
					process.exit();
				}
				else if (num[4] == sequence) {
					console.log("winner: C");
					process.exit();
				}
				else if (num[5] == sequence) {
					console.log("winner: D");
					process.exit();
				}
				else if (num[6] == sequence) {
					console.log("winner: E");
					process.exit();
				}
				else if (num[7] == sequence) {
					console.log("winner: F");
					process.exit();
				}
				else if (num[8] == sequence) {
					console.log("winner: G");
					process.exit();
				}
				else if (num[9] == sequence) {
					console.log("winner: H");
					process.exit();
				}
				else if (num[10] == sequence) {
					console.log("winner: I");
					process.exit();
				}
				else if (num[11] == sequence) {
					console.log("winner: J");
					process.exit();
				}
				else if (num[12] == sequence) {
					console.log("winner: K");
					process.exit();
				}
				else if (num[13] == sequence) {
					console.log("winner: L");
					process.exit();
				}
				else if (num[14] == sequence) {
					console.log("winner: M");
					process.exit();
				}
				else if (num[15] == sequence) {
					console.log("winner: N");
					process.exit();
				}
				else if (num[16] == sequence) {
					console.log("winner: P");
					process.exit();
				}
				else if (num[17] == sequence) {
					console.log("winner: Q");
					process.exit();
				}
				else if (num[18] == sequence) {
					console.log("winner: R");
					process.exit();
				}
				else if (num[19] == sequence) {
					console.log("winner: S");
					process.exit();
				}
				else if (num[20] == sequence) {
					console.log("winner: T");
					process.exit();
				}
				else if (num[21] == sequence) {
					console.log("winner: U");
					process.exit();
				}
				else if (num[22] == sequence) {
					console.log("winner: V");
					process.exit();
				}
				else if (num[23] == sequence) {
					console.log("winner: W");
					process.exit();
				}
				else if (num[24] == sequence) {
					console.log("winner: Y");
					process.exit();
				}
				else if (num[25] == sequence) {
					console.log("winner: Z");
					process.exit();
				}

		}

	}

	//纵向检测
	for (var x = 2; x < 4 * sizeOfBoard; x += 4) {
		for (var y = 3; y < 2 * sizeOfBoard; y += 2) {
			if (board[y][x] != '' && board[y][x] != ' ' && board[y][x] == board[y - 2][x]){

				if (board[y][x] == 'X') num2[0] ++;
				else if (board[y][x] == 'O') num2[1] ++;
				else if (board[y][x] == 'A') num2[2] ++;
				else if (board[y][x] == 'B') num2[3] ++;
				else if (board[y][x] == 'C') num2[4] ++;
				else if (board[y][x] == 'D') num2[5] ++;
				else if (board[y][x] == 'E') num2[6] ++;
				else if (board[y][x] == 'F') num2[7] ++;
				else if (board[y][x] == 'G') num2[8] ++;
				else if (board[y][x] == 'H') num2[9] ++;
				else if (board[y][x] == 'I') num2[10] ++;
				else if (board[y][x] == 'J') num2[11] ++;
				else if (board[y][x] == 'K') num2[12] ++;
				else if (board[y][x] == 'L') num2[13] ++;
				else if (board[y][x] == 'M') num2[14] ++;
				else if (board[y][x] == 'N') num2[15] ++;
				else if (board[y][x] == 'P') num2[16] ++;
				else if (board[y][x] == 'Q') num2[17] ++;
				else if (board[y][x] == 'R') num2[18] ++;
				else if (board[y][x] == 'S') num2[19] ++;
				else if (board[y][x] == 'T') num2[20] ++;
				else if (board[y][x] == 'U') num2[21] ++;
				else if (board[y][x] == 'V') num2[22] ++;
				else if (board[y][x] == 'W') num2[23] ++;
				else if (board[y][x] == 'Y') num2[24] ++;
				else if (board[y][x] == 'Z') num2[25] ++;

			}

			for (var i = 0; i < 26; i++) {
				if (num2[i] >= sequence) {
					// if (y == 2 * sizeOfBoard - 1)
					// 	num2[i] --;
					if (y - 2 * (sequence - 1) < 0 )
						num2[i] --;
					else if (board[y][x] != board[y - 2 * (sequence - 1)][x])
						num2[i] --;
				}
			}


				if (num2[0] == sequence) {
					console.log("winner: X");
					process.exit();
				}
				else if (num2[1] == sequence) {
					console.log("winner: O");
					process.exit();
				}
				else if (num2[2] == sequence) {
					console.log("winner: A");
					process.exit();
				}
				else if (num2[3] == sequence) {
					console.log("winner: B");
					process.exit();
				}
				else if (num2[4] == sequence) {
					console.log("winner: C");
					process.exit();
				}
				else if (num2[5] == sequence) {
					console.log("winner: D");
					process.exit();
				}
				else if (num2[6] == sequence) {
					console.log("winner: E");
					process.exit();
				}
				else if (num2[7] == sequence) {
					console.log("winner: F");
					process.exit();
				}
				else if (num2[8] == sequence) {
					console.log("winner: G");
					process.exit();
				}
				else if (num2[9] == sequence) {
					console.log("winner: H");
					process.exit();
				}
				else if (num2[10] == sequence) {
					console.log("winner: I");
					process.exit();
				}
				else if (num2[11] == sequence) {
					console.log("winner: J");
					process.exit();
				}
				else if (num2[12] == sequence) {
					console.log("winner: K");
					process.exit();
				}
				else if (num2[13] == sequence) {
					console.log("winner: L");
					process.exit();
				}
				else if (num2[14] == sequence) {
					console.log("winner: M");
					process.exit();
				}
				else if (num2[15] == sequence) {
					console.log("winner: N");
					process.exit();
				}
				else if (num2[16] == sequence) {
					console.log("winner: P");
					process.exit();
				}
				else if (num2[17] == sequence) {
					console.log("winner: Q");
					process.exit();
				}
				else if (num2[18] == sequence) {
					console.log("winner: R");
					process.exit();
				}
				else if (num2[19] == sequence) {
					console.log("winner: S");
					process.exit();
				}
				else if (num2[20] == sequence) {
					console.log("winner: T");
					process.exit();
				}
				else if (num2[21] == sequence) {
					console.log("winner: U");
					process.exit();
				}
				else if (num2[22] == sequence) {
					console.log("winner: V");
					process.exit();
				}
				else if (num2[23] == sequence) {
					console.log("winner: W");
					process.exit();
				}
				else if (num2[24] == sequence) {
					console.log("winner: Y");
					process.exit();
				}
				else if (num2[25] == sequence) {
					console.log("winner: Z");
					process.exit();
				}

		}
	}

	//右上->左下 斜向检测
	for (var y = 1; y <= 2 * sizeOfBoard - 3; y += 2) {
		for (var x = 6; x < 4 * sizeOfBoard; x += 4) {

			if (y == 2 * sizeOfBoard - 1 && x == 4 * sizeOfBoard - 2)
				continue;

				if (board[y][x] != '' && board[y][x] != ' ' && board[y][x] == board[y + 2][x - 4]) {
	
					if (board[y][x] == 'X') num3[0] ++;
					else if (board[y][x] == 'O') num3[1] ++;
					else if (board[y][x] == 'A') num3[2] ++;
					else if (board[y][x] == 'B') num3[3] ++;
					else if (board[y][x] == 'C') num3[4] ++;
					else if (board[y][x] == 'D') num3[5] ++;
					else if (board[y][x] == 'E') num3[6] ++;
					else if (board[y][x] == 'F') num3[7] ++;
					else if (board[y][x] == 'G') num3[8] ++;
					else if (board[y][x] == 'H') num3[9] ++;
					else if (board[y][x] == 'I') num3[10] ++;
					else if (board[y][x] == 'J') num3[11] ++;
					else if (board[y][x] == 'K') num3[12] ++;
					else if (board[y][x] == 'L') num3[13] ++;
					else if (board[y][x] == 'M') num3[14] ++;
					else if (board[y][x] == 'N') num3[15] ++;
					else if (board[y][x] == 'P') num3[16] ++;
					else if (board[y][x] == 'Q') num3[17] ++;
					else if (board[y][x] == 'R') num3[18] ++;
					else if (board[y][x] == 'S') num3[19] ++;
					else if (board[y][x] == 'T') num3[20] ++;
					else if (board[y][x] == 'U') num3[21] ++;
					else if (board[y][x] == 'V') num3[22] ++;
					else if (board[y][x] == 'W') num3[23] ++;
					else if (board[y][x] == 'Y') num3[24] ++;
					else if (board[y][x] == 'Z') num3[25] ++;

				}

				for (var i = 0; i < 26; i++) {
					if (num3[i] >= 3) {
						if (y == 1)
							num3[i] --;
						else if (board[y][x] != board[y - 2][x + 4])
							num3[i] --;
					}
				}

				if (num3[0] == sequence) {
					console.log("winner: X");
					process.exit();
				}
				else if (num3[1] == sequence) {
					console.log("winner: O");
					process.exit();
				}
				else if (num3[2] == sequence) {
					console.log("winner: A");
					process.exit();
				}
				else if (num3[3] == sequence) {
					console.log("winner: B");
					process.exit();
				}
				else if (num3[4] == sequence) {
					console.log("winner: C");
					process.exit();
				}
				else if (num3[5] == sequence) {
					console.log("winner: D");
					process.exit();
				}
				else if (num3[6] == sequence) {
					console.log("winner: E");
					process.exit();
				}
				else if (num3[7] == sequence) {
					console.log("winner: F");
					process.exit();
				}
				else if (num3[8] == sequence) {
					console.log("winner: G");
					process.exit();
				}
				else if (num3[9] == sequence) {
					console.log("winner: H");
					process.exit();
				}
				else if (num3[10] == sequence) {
					console.log("winner: I");
					process.exit();
				}
				else if (num3[11] == sequence) {
					console.log("winner: J");
					process.exit();
				}
				else if (num3[12] == sequence) {
					console.log("winner: K");
					process.exit();
				}
				else if (num3[13] == sequence) {
					console.log("winner: L");
					process.exit();
				}
				else if (num3[14] == sequence) {
					console.log("winner: M");
					process.exit();
				}
				else if (num3[15] == sequence) {
					console.log("winner: N");
					process.exit();
				}
				else if (num3[16] == sequence) {
					console.log("winner: P");
					process.exit();
				}
				else if (num3[17] == sequence) {
					console.log("winner: Q");
					process.exit();
				}
				else if (num3[18] == sequence) {
					console.log("winner: R");
					process.exit();
				}
				else if (num3[19] == sequence) {
					console.log("winner: S");
					process.exit();
				}
				else if (num3[20] == sequence) {
					console.log("winner: T");
					process.exit();
				}
				else if (num3[21] == sequence) {
					console.log("winner: U");
					process.exit();
				}
				else if (num3[22] == sequence) {
					console.log("winner: V");
					process.exit();
				}
				else if (num3[23] == sequence) {
					console.log("winner: W");
					process.exit();
				}
				else if (num3[24] == sequence) {
					console.log("winner: Y");
					process.exit();
				}
				else if (num3[25] == sequence) {
					console.log("winner: Z");
					process.exit();
				}

		}
	}


	//左上->右下 斜向检测
	for (var y = 1; y <= 2 * sizeOfBoard - 3; y += 2) {
		for (var x = 4 * sizeOfBoard - 6; x > 0; x -= 4) {

			if (y == 2 * sizeOfBoard - 1 && x == 2) {
				continue;
			}
				if (board[y][x] != '' && board[y][x] != ' ' && board[y][x] == board[y + 2][x + 4]) {

					if (board[y][x] == 'X') num4[0] ++;
					else if (board[y][x] == 'O') num4[1] ++;
					else if (board[y][x] == 'A') num4[2] ++;
					else if (board[y][x] == 'B') num4[3] ++;
					else if (board[y][x] == 'C') num4[4] ++;
					else if (board[y][x] == 'D') num4[5] ++;
					else if (board[y][x] == 'E') num4[6] ++;
					else if (board[y][x] == 'F') num4[7] ++;
					else if (board[y][x] == 'G') num4[8] ++;
					else if (board[y][x] == 'H') num4[9] ++;
					else if (board[y][x] == 'I') num4[10] ++;
					else if (board[y][x] == 'J') num4[11] ++;
					else if (board[y][x] == 'K') num4[12] ++;
					else if (board[y][x] == 'L') num4[13] ++;
					else if (board[y][x] == 'M') num4[14] ++;
					else if (board[y][x] == 'N') num4[15] ++;
					else if (board[y][x] == 'P') num4[16] ++;
					else if (board[y][x] == 'Q') num4[17] ++;
					else if (board[y][x] == 'R') num4[18] ++;
					else if (board[y][x] == 'S') num4[19] ++;
					else if (board[y][x] == 'T') num4[20] ++;
					else if (board[y][x] == 'U') num4[21] ++;
					else if (board[y][x] == 'V') num4[22] ++;
					else if (board[y][x] == 'W') num4[23] ++;
					else if (board[y][x] == 'Y') num4[24] ++;
					else if (board[y][x] == 'Z') num4[25] ++;
					//console.log("num4[0]: " + num4[0]);

			}

			for (var i = 0; i < 26; i++) {
				if (num4[i] >= 3) {
					if (y == 1)
						num4[i] --;
					else if (board[y][x] != board[y - 2][x - 4])
						num4[i] -- ;
				}
			}

				if (num4[0] == sequence) {
					console.log("winner: X");
					process.exit();
				}
				else if (num4[1] == sequence) {
					console.log("winner: O");
					process.exit();
				}
				else if (num4[2] == sequence) {
					console.log("winner: A");
					process.exit();
				}
				else if (num4[3] == sequence) {
					console.log("winner: B");
					process.exit();
				}
				else if (num4[4] == sequence) {
					console.log("winner: C");
					process.exit();
				}
				else if (num4[5] == sequence) {
					console.log("winner: D");
					process.exit();
				}
				else if (num4[6] == sequence) {
					console.log("winner: E");
					process.exit();
				}
				else if (num4[7] == sequence) {
					console.log("winner: F");
					process.exit();
				}
				else if (num4[8] == sequence) {
					console.log("winner: G");
					process.exit();
				}
				else if (num4[9] == sequence) {
					console.log("winner: H");
					process.exit();
				}
				else if (num4[10] == sequence) {
					console.log("winner: I");
					process.exit();
				}
				else if (num4[11] == sequence) {
					console.log("winner: J");
					process.exit();
				}
				else if (num4[12] == sequence) {
					console.log("winner: K");
					process.exit();
				}
				else if (num4[13] == sequence) {
					console.log("winner: L");
					process.exit();
				}
				else if (num4[14] == sequence) {
					console.log("winner: M");
					process.exit();
				}
				else if (num4[15] == sequence) {
					console.log("winner: N");
					process.exit();
				}
				else if (num4[16] == sequence) {
					console.log("winner: P");
					process.exit();
				}
				else if (num4[17] == sequence) {
					console.log("winner: Q");
					process.exit();
				}
				else if (num4[18] == sequence) {
					console.log("winner: R");
					process.exit();
				}
				else if (num4[19] == sequence) {
					console.log("winner: S");
					process.exit();
				}
				else if (num4[20] == sequence) {
					console.log("winner: T");
					process.exit();
				}
				else if (num4[21] == sequence) {
					console.log("winner: U");
					process.exit();
				}
				else if (num4[22] == sequence) {
					console.log("winner: V");
					process.exit();
				}
				else if (num4[23] == sequence) {
					console.log("winner: W");
					process.exit();
				}
				else if (num4[24] == sequence) {
					console.log("winner: Y");
					process.exit();
				}
				else if (num4[25] == sequence) {
					console.log("winner: Z");
					process.exit();
				}

		}

	}
}

//存储文件
function saveFile(fileName, sizeOfBoard, numberOfPlayer, order, numberOfsequence, board) {
	var fs = require("fs");
	//console.log(board);

	fs.writeFileSync(path.join(__dirname, "./" + fileName), sizeOfBoard, function (err) {
		if (err) throw err;
		//console.log("save");
	})
	
	fs.appendFileSync(path.join(__dirname, "./" + fileName), '\r' + numberOfPlayer, (err) => {
		if (err) throw err;
	})

	fs.appendFileSync(path.join(__dirname, "./" + fileName), '\r' + numberOfsequence, (err) => {
		if (err) throw err;
	})

	fs.appendFileSync(path.join(__dirname, "./" + fileName), '\r' + order, (err) => {
		if (err) throw err;
	})

	fs.appendFileSync(path.join(__dirname, "./" + fileName), '\r' + board, (err) => {
		if (err) throw err;
	})

}


//打开文件
function openFile(fileName) {


	var i = 0;
	
	var fRead = fs.createReadStream(path.join(__dirname, "./" + fileName));
    var objReadline = readline.createInterface({
        input:fRead
    });

    var arr = new Array();
   
    objReadline.on('line',function (line) {
        arr.push(line);
    });

    objReadline.on('close',function () {


	//将棋盘属性存入数组
	var sizeOfBoard = arr[0];
	var numberOfPlayer = arr[1];
	var order = arr[3]
	var numberOfsequence = arr[2];
	var boardStr = arr[4];	
	//console.log(arr);

	var boardArr = boardStr.split(',');

	var board = new Array();
	var m = 2 * sizeOfBoard; // 代表y
	var n = 4 * sizeOfBoard; // 代表x

	var base = 2;
	var base2 = 4;
	var base3 = 4;
	var k = 1;
	var j = 0;

	for (var y = 0; y < m; y++) {
		board[y] = new Array()
		for (var x = 0; x < n; x++) {
			board[y][x] = ''; 
		}
	}

	var i = 0;

	for (var y = 0; y < m; y ++) {
		for (var x = 0; x < n; x++) {
			board[y][x] = boardArr[i];
			i ++;
		}

	}	

	playingGame(sizeOfBoard,numberOfPlayer,board,numberOfsequence,order);	
;
        
    });

}
