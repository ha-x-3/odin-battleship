import Player from "./player.js";
import AI from "./AI.js";

let computerPlayer = AI('Computer');
let player = Player('Enemy');

it('Should create a new player object', () => {
	expect(player).toBeInstanceOf(Object);
});

it('Should be able to place a ship on its own board', () => {
	player.placePlayerShip(1, 0, 0, 'H');
	expect(player.playerBoard.board).toEqual([
		['H', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
		['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
		['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
		['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
		['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
		['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
		['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
		['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
		['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
		['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
	]);
});

it('Should be able to throw a precise attack on the enemy board', () => {
	player.playerShot(computerPlayer, 0, 5);
	expect(computerPlayer.playerBoard.board[0][5]).not.toEqual('o');
	// may be missed hit or ship hit
});
