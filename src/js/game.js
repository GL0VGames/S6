/* global Phaser */
(function() {
	'use strict';

	function Game() {}

	var player;
	var playerState = "walking";
	var playerDir = {left: 1, right: -1};
	var currPlayerDir = playerDir.left;
	var hidingPlayerTheatre = 0;
	var floor;
	var theatres;
	var floorLine;
	var hidingPlayerY;
	var walkingPlayerY;
	var cursors;
	var throwKey;
	
	var TheatreParts = {LWALL: 0, UWALL: 1, WELL: 2, SCREEN: 3};
	
	// Global Vars
	var MOVEMENT_SPEED = 5;
	var TOTAL_THEATRES = 6;
	var THEATRE_WIDTH = 474;
	var MAX_FACE = 1;
	var MAX_ALL_ELSE = 1;
	var worldWidth = TOTAL_THEATRES * THEATRE_WIDTH;
	var currentTheatrePosX = 0;

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
				_: [context.game.add.sprite(currentTheatrePosX, y, 'lwall'), context.game.add.sprite(currentTheatrePosX, y, 'uwall'), context.game.add.sprite(x, y, 'well'), context.game.add.sprite(currentTheatrePosX, y, 'screen')],
				em: context.game.add.emitter(currentTheatrePosX + THEATRE_WIDTH / 2, 200, 100),
				face: FaceManager.create(currentTheatrePosX + THEATRE_WIDTH / 2, 300, context)
			}
			this.setup(ret, context);
			return ret;
		},
		setup: function (obj, context) {
			// Lower Wall
			obj._[0].scale.set(.5);
			obj._[0].anchor.set(0, 1);
			
			// Upper Wall
			obj._[1].anchor.set(0, 1);
			obj._[1].scale.set(.5);
			
			// Well
			obj._[2].scale.set(.5);
			obj._[2].anchor.set(.5, 1);
			obj._[2].tint = 0xd0d0d0;
			context.game.physics.arcade.enable(obj._[1]);

			// Screen
			obj._[3].scale.set(.5);
			obj._[3].anchor.set(0, 1);
			
			// Particles
			obj.em.makeParticles(['smoke1', 'smoke2', 'smoke3']);
			obj.em.minParticleScale = .3;
			obj.em.maxParticleScale = .3;
		}
	}
	
	var FaceManager = {
		create: function(x, y, context) {
			var baseColor = Math.floor(Math.random() * MAX_FACE);
			var faceGroup = context.game.add.sprite(x, y, 'popup');
			
			faceGroup.addChild(context.game.make.sprite(0 - faceGroup.width / 2, 0 - faceGroup.height - 100, 'back' + Math.floor(Math.random() * MAX_ALL_ELSE)));
			faceGroup.addChild(context.game.make.sprite(0 - faceGroup.width / 2, 0 - faceGroup.height - 100, 'ears' + baseColor));
			faceGroup.addChild(context.game.make.sprite(0 - faceGroup.width / 2, 0 - faceGroup.height - 100, 'face' + baseColor));
			faceGroup.addChild(context.game.make.sprite(0 - faceGroup.width / 2, 0 - faceGroup.height - 100, 'front' + Math.floor(Math.random() * MAX_ALL_ELSE)));
			faceGroup.addChild(context.game.make.sprite(0 - faceGroup.width / 2, 0 - faceGroup.height - 100, 'eyes' + Math.floor(Math.random() * MAX_ALL_ELSE)));
			faceGroup.addChild(context.game.make.sprite(0 - faceGroup.width / 2, 0 - faceGroup.height - 100, 'nose' + Math.floor(Math.random() * MAX_ALL_ELSE)));
			faceGroup.addChild(context.game.make.sprite(0 - faceGroup.width / 2, 0 - faceGroup.height - 100, 'mouth' + Math.floor(Math.random() * MAX_ALL_ELSE)));
			faceGroup.visible = false;
			faceGroup.anchor.set(.5, 1);
			faceGroup.scale.set(.25);
			return faceGroup;
		}
	}
	

	Game.prototype = {
		create: function () {
			this.game.world.setBounds(0, 0, worldWidth, 600);
			
			floorLine = this.game.height - 128;
			hidingPlayerY = floorLine - 20;
			walkingPlayerY = floorLine + 40;
			
			theatres = TheatreManager.create(floorLine, this);
			
			floor = this.game.add.physicsGroup();
			for (var i = 0; i < worldWidth; i += 1024)
				floor.create(i, floorLine, 'floor');
			floor.setAll('tint', 0xd0d0d0);
			
			player = this.game.add.sprite(100, walkingPlayerY, 'player')
			player.anchor.set(0.5, 0.5);
			this.game.physics.arcade.enable(player);
			this.game.camera.follow(player, Phaser.Camera.FOLLOW_TOPDOWN);

			this.input.keyboard.addKey(Phaser.Keyboard.UP);
			cursors = this.game.input.keyboard.createCursorKeys();
			throwKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		},

		update: function () {			
			if (playerState === "walking") {
				var wells = theatres.getParts(TheatreParts.WELL);
				
				for (var i = 0; i < TOTAL_THEATRES; i++) {
					var wellXMin = (player.x - (player.width * currPlayerDir) / 2 > wells[i].x - wells[i].width / 2);
					var wellXMax = (player.x + (player.width * currPlayerDir) / 2 < (wells[i].x + wells[i].width / 2));
					if ((wellXMin && wellXMax) && player.y <= hidingPlayerY + 10) {
						playerState = "hiding";
						hidingPlayerTheatre = i;
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
				
				player.tint = 0xffffff;
			}
			else if (playerState === "hiding") {
				player.tint = 0x747474;
				if (throwKey.isDown && playerState === "hiding") {
					theatres.theatres[hidingPlayerTheatre].em.start(false, 5000, 20);
					playerState = "smoking";
				}
				theatres.theatres[hidingPlayerTheatre].face.visible = true;
			}
			else if (playerState === "moving") {
				player.tint = 0xffffff;
			}

			this.game.input.keyboard.onDownCallback = function( e ){
				if (e.keyCode === Phaser.Keyboard.UP) {
					this.game.add.tween(player).to( { x: player.x, y: hidingPlayerY }, 100 * MOVEMENT_SPEED, "Cubic", true);
				}
			};

			function back2Walking() {
				playerState = "walking";
				theatres.theatres[hidingPlayerTheatre].face.visible = false;
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
