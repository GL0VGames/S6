/* global Phaser */
(function() {
	'use strict';

	function Game() {}

	var player;
	var playerState = "walking";
	var playerDir = {left: 1, right: -1};
	var currPlayerDir = playerDir.left;
	var floor;
	var theatres;
	var floorLine;
	var hidingPlayerY;
	var walkingPlayerY;
	var cursors;
	var faceLoc;
	var face;
	
	var TheatreParts = {WALL: 0, WELL: 1, SCREEN: 2};
	
	// Global Vars
	var MOVEMENT_SPEED = 5;
	var TOTAL_THEATRES = 6;
	var THEATRE_WIDTH = 474;
	var worldWidth = TOTAL_THEATRES * THEATRE_WIDTH;
	var currentTheatrePosX = 0;
	
	function checkOverlap(spriteA, spriteB) {
		var boundsA = spriteA.getBounds();
		var boundsB = spriteB.getBounds();
		return Phaser.Rectangle.intersects(boundsA, boundsB);
	}

	var TheatreManager = {
		theatres: [],
		create: function(y, context) {
			for (var i = 0; i < TOTAL_THEATRES; i++) {
				this.theatres[i] = Theatre.create(y, context);
				currentTheatrePosX += THEATRE_WIDTH;
			}
			return this;
		},
		getParts: function(part) {
			var arr = [];
			for (var i = 0; i < TOTAL_THEATRES; i++)
				arr[i] = this.theatres[i]._[part];
			return arr;
		},
	}

	var Theatre = {
		create: function(y, context) {
			var x = currentTheatrePosX + THEATRE_WIDTH / 2;
			var ret = {
				_: [context.game.add.sprite(currentTheatrePosX, y, 'wall'), context.game.add.sprite(x, y, 'well'), context.game.add.sprite(x, 100, 'screen')],
			}
			this.setup(ret._, context);
			return ret;
		},
		setup: function (_, context) {
			// Wall
			_[0].scale.set(.5);
			_[0].anchor.set(0, 1);
			
			// Well
			_[1].scale.set(.5);
			_[1].anchor.set(.5, 1);
			_[1].tint = 0xd0d0d0;
			context.game.physics.arcade.enable(_[1]);

			// Screen
			_[2].anchor.set(.5, 1);
			_[2].scale.set(.5);
		}
	}

	Game.prototype = {
		create: function () {
			this.game.world.setBounds(0, 0, worldWidth, 600);
			
			floor = this.game.add.physicsGroup();
			for (var i = 0; i < worldWidth; i += 1024)
				floor.create(i, this.game.height - 128, 'floor');
			floor.setAll('tint', 0xd0d0d0);
			
			floorLine = this.game.height - floor.height;
			hidingPlayerY = floorLine - 20;
			walkingPlayerY = floorLine + floor.height / 2;
			faceLoc = {x: this.game.width / 2, y: this.game.height / 2};

			theatres = TheatreManager.create(floorLine, this);
			
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
			
			if (playerState === "walking") {
				var wells = theatres.getParts(TheatreParts.WELL);
				
				for (var i = 0; i < TOTAL_THEATRES; i++) {
					var compX = (player.x - (player.width * currPlayerDir) / 2 > wells[i].x - wells[i].width / 2);
					var wellsiW = wells[i].x + wells[i].width / 2;
					var compXMax = (player.x + (player.width * currPlayerDir) / 2 < wellsiW);
					if ((compX && compXMax) && player.y <= hidingPlayerY + 10) {
						playerState = "hiding";
						break;
					}
				}
				
				if (cursors.left.isDown && player.y === walkingPlayerY) {
					player.x -= MOVEMENT_SPEED;
					player.scale.x = 1;
					currPlayerDir = playerDir.left;
				}
				else if (cursors.right.isDown && player.y === walkingPlayerY) {
					player.x += MOVEMENT_SPEED;
					player.scale.x = -1;
					currPlayerDir = playerDir.right;
				}
				
				player.tint = 0xffffff
			}
			else if (playerState === "hiding") {
				player.tint = 0x747474;
			}
			else if (playerState === "moving") {
				player.tint = 0xffffff
			}

			this.game.input.keyboard.onDownCallback = function( e ){
				if (e.keyCode === Phaser.Keyboard.UP) {
					this.game.add.tween(player).to( { x: player.x, y: hidingPlayerY }, 100 * MOVEMENT_SPEED, "Cubic", true);
				}
			};

			function back2Walking() {
				playerState = "walking";
			}

			this.game.input.keyboard.onUpCallback = function( e ){
				if(e.keyCode === Phaser.Keyboard.UP) {
					var tween = this.game.add.tween(player);
					tween.to( { x: player.x, y: walkingPlayerY }, 100 * MOVEMENT_SPEED, "Cubic", true);
					tween.onComplete.add(back2Walking, this);
					playerState = "moving";
				}
			};
		}
	};

	window['s6'] = window['s6'] || {};
	window['s6'].Game = Game;
}());
