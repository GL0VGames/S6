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
	
	// Global Vars
	var MOVEMENT_SPEED = 5;
	var TOTAL_THEATRES = 6;
	var THEATRE_WIDTH = 474;
	var worldWidth = TOTAL_THEATRES * THEATRE_WIDTH;
	var currentTheatrePosX = 0;

	function makeTheatres(y, context) {
		var arr = [];
		for (var i = 0; i < TOTAL_THEATRES; i++)
			arr[i] = new Theatre(y, context);
		return arr;
	}

	function Theatre(y, context) {
		this.x = currentTheatrePosX;
		currentTheatrePosX += THEATRE_WIDTH;
		this._[0] = context.game.add.sprite(this.x, y, 'wall');
		this._[0].scale.set(4,2);
		this._[0].width = THEATRE_WIDTH;
		this._[0].anchor.set(0, 1);
		this._[1] = context.game.add.sprite(this.x, y, 'well');
		this._[1].scale.set(.5);
		this._[1].anchor.set(0, 1);
		this._[2] = context.game.add.sprite(this.x, y, 'wall');
		this._[2].anchor.set(0, 1);
	}

	Theatre.prototype = {
		_: [],
		x: null,
		target: {},
		id: 0
	}

	Game.prototype = {
		create: function () {
			this.game.world.setBounds(0, 0, worldWidth, 600);
			
			floor = this.game.add.physicsGroup();
			for (var i = 0; i < worldWidth; i += 1024)
				floor.create(i, this.game.height - 128, 'floor');
			
			floorLine = this.game.height - floor.height;
			hidingPlayerY = floorLine - 20;
			walkingPlayerY = floorLine + floor.height / 2;
			faceLoc = {x: this.game.width / 2, y: this.game.height / 2};

			wall = makeTheatres(floorLine, this);
			
			player = this.game.add.sprite(100, walkingPlayerY, 'player')
			player.anchor.set(0.5, 0.5);
			this.game.physics.arcade.enable(player);
			this.game.camera.follow(player, Phaser.Camera.FOLLOW_TOPDOWN);

			face = this.game.add.physicsGroup();
			face.create(faceLoc.x, faceLoc.y, 'hairB1').scale.setTo(0.2);
			face.create(faceLoc.x, faceLoc.y, 'ears1').scale.setTo(0.2);
			face.create(faceLoc.x, faceLoc.y, 'face4').scale.setTo(0.2);
			face.create(faceLoc.x, faceLoc.y, 'hairF1').scale.setTo(0.2);
			face.create(faceLoc.x, faceLoc.y, 'eyes1').scale.setTo(0.2);
			face.create(faceLoc.x, faceLoc.y, 'nose1').scale.setTo(0.2);
			face.create(faceLoc.x, faceLoc.y, 'mouth1').scale.setTo(0.2);
			face.setAll('body.immovable', true);
			face.setAll('visible', false);

			this.input.keyboard.addKey(Phaser.Keyboard.UP);
			cursors = this.game.input.keyboard.createCursorKeys();
		},

		update: function () {
			// if (player.overlap(wall) && player.y === hidingPlayerY)
			// 	face.setAll('visible', true);
			// else if (player.y === walkingPlayerY)
			// 	face.setAll('visible', false);
			
			if (player.y === hidingPlayerY) {
				player.tint = 0x747474;
			} else player.tint = 0xffffff;
			
			if (cursors.left.isDown && player.y === walkingPlayerY) {
				player.x -= MOVEMENT_SPEED;
				player.scale.x = 1;
			}
			else if (cursors.right.isDown && player.y === walkingPlayerY) {
				player.x += MOVEMENT_SPEED;
				player.scale.x = -1;
			}

			this.game.input.keyboard.onDownCallback = function( e ){
				if (e.keyCode === Phaser.Keyboard.UP)
					this.game.add.tween(player).to( { x: player.x, y: hidingPlayerY }, 100 * MOVEMENT_SPEED, "Cubic", true);
			};

			this.game.input.keyboard.onUpCallback = function( e ){
				if(e.keyCode === Phaser.Keyboard.UP)
					this.game.add.tween(player).to( { x: player.x, y: walkingPlayerY }, 100 * MOVEMENT_SPEED, "Cubic", true);
			};
		}
	};

	window['s6'] = window['s6'] || {};
	window['s6'].Game = Game;
}());
