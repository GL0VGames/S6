/* global Phaser */
(function() {
	'use strict';

	function Game() {}

	var player;
	var floor;
	var wall;
	var floorLine;
	var hidingPlayerY;
	var walkingPlayerY;
	var cursors;
	var faceLoc;
	var face;

	

	Game.prototype = {
		create: function () {
			this.input.onDown.add(this.onInputDown, this);
			
			floor = this.game.add.sprite(0, this.game.height - 128, 'floor');
			floor.moveDown();
			
			floorLine = this.game.height - floor.height;
			hidingPlayerY = floorLine;
			walkingPlayerY = floorLine + floor.height / 2;
			faceLoc = {x: this.game.width / 2, y: this.game.height / 2};


			wall = this.game.add.physicsGroup();
			wall.create(0, floorLine - 128, 'wall');
			wall.create(0, floorLine - 128, 'wall');
			wall.setAll('body.immovable', true);

			
			player = this.game.add.sprite(100, walkingPlayerY, 'player')
			player.anchor.set(0.5, 1);
			this.game.physics.arcade.enable(player);

			face = this.game.add.physicsGroup();
			face.create(faceLoc.x, faceLoc.y, 'hairB1').scale.setTo(.2,.2);
			face.create(faceLoc.x, faceLoc.y, 'ears1').scale.setTo(.2,.2);
			face.create(faceLoc.x, faceLoc.y, 'face4').scale.setTo(.2,.2);
			face.create(faceLoc.x, faceLoc.y, 'hairF1').scale.setTo(.2,.2);
			face.create(faceLoc.x, faceLoc.y, 'eyes1').scale.setTo(.2,.2);
			face.create(faceLoc.x, faceLoc.y, 'nose1').scale.setTo(.2,.2);
			face.create(faceLoc.x, faceLoc.y, 'mouth1').scale.setTo(.2,.2);
			face.setAll('body.immovable', true);
			face.setAll('visible', false);

			this.input.keyboard.addKey(Phaser.Keyboard.UP);
			cursors = this.game.input.keyboard.createCursorKeys();
		},

		update: function () {
			if (player.overlap(wall) && player.y === hidingPlayerY)
				face.setAll('visible', true);
			else if (player.y === walkingPlayerY)
				face.setAll('visible', false);
			
			if (cursors.left.isDown && player.y === walkingPlayerY) {
				player.x -= 5;
				player.scale.x = 1;
			}
			else if (cursors.right.isDown && player.y === walkingPlayerY) {
				player.x += 5;
				player.scale.x = -1;
			}

			this.game.input.keyboard.onDownCallback = function( e ){
				if (e.keyCode == Phaser.Keyboard.UP)
					this.game.add.tween(player).to( { x: player.x, y: hidingPlayerY }, 500, "Cubic", true);
			};

			this.game.input.keyboard.onUpCallback = function( e ){
				if(e.keyCode == Phaser.Keyboard.UP)
					this.game.add.tween(player).to( { x: player.x, y: walkingPlayerY }, 500, "Cubic", true);
			};
		},

		onInputDown: function () {
			this.game.state.start('menu');
		}
	};

	window['s6'] = window['s6'] || {};
	window['s6'].Game = Game;
}());
