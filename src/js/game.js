(function() {
	'use strict';

	function Game() {}

	var player;
	var floor;
	var wall;
	var floorLine;
	var playerY;
	var cursors;

	Game.prototype = {
		create: function () {
			this.input.onDown.add(this.onInputDown, this);
			floorLine = this.game.height - 128;
			playerY = floorLine + 32;

			player = this.game.add.sprite(0, playerY, 'player');

			wall = this.game.add.sprite(0, floorLine - 128, 'wall');
			wall.moveDown();

			floor = this.game.add.sprite(0, floorLine, 'floor');
			floor.moveDown();

			this.input.keyboard.addKey(Phaser.Keyboard.UP);
			cursors = this.game.input.keyboard.createCursorKeys();
		},

		update: function () {

			if (cursors.left.isDown)
				player.x += -5;
			else if (cursors.right.isDown)
				player.x += 5;

			this.game.input.keyboard.onDownCallback = function( e ){
				if (e.keyCode == Phaser.Keyboard.UP)
					this.game.add.tween(player).to( { x: player.x, y: floorLine - player.height }, 500, "Cubic", true);
			};

			this.game.input.keyboard.onUpCallback = function( e ){
				if(e.keyCode == Phaser.Keyboard.UP)
					this.game.add.tween(player).to( { x: player.x, y: playerY }, 500, "Cubic", true);
			};
		},

		onInputDown: function () {
			this.game.state.start('menu');
		}
	};

	window['s6'] = window['s6'] || {};
	window['s6'].Game = Game;
}());
