/* global Phaser */
(function() {
	'use strict';

	function Game() {}

	var player;
	var playerState = "walking";
	var actorDir = {left: 1, right: -1};
	var currPlayerDir = actorDir.left;
	var hidingPlayerTheatre = 0;
	var floor;
	var theatres;
	var floorLine;
	var hidingPlayerY;
	var walkingPlayerY;
	var cursors;
	var throwKey;
	var playerMark;
	var markLoc;
	var enemies = [];
	
	var TheatreParts = {LWALL: 0, UWALL: 1, WELL: 2, SCREEN: 3};
	
	// Global Vars
	var MOVEMENT_SPEED = 5;
	var TOTAL_THEATRES = 6;
	var THEATRE_WIDTH = 474;
	var TOTAL_ENEMIES = Math.round(TOTAL_THEATRES / 3);
	var ENEMY_RANGE = 500;
	var MAX_FACE = 3;
	var MAX_ENMH = 5;
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
		}
	}
	
	var FaceManager = {
		create: function(x, y, context) {
			var baseColor = Math.floor(Math.random() * MAX_FACE);
			var faceGroup = context.game.add.sprite(x, y, 'popup');
			
			faceGroup.addChild(context.game.make.sprite(0 - faceGroup.width / 2, 0 - faceGroup.height - 100, 'back' + Math.floor(Math.random() * MAX_ENMH)));
			faceGroup.addChild(context.game.make.sprite(0 - faceGroup.width / 2, 0 - faceGroup.height - 100, 'ears' + baseColor + Math.round(Math.random())));
			faceGroup.addChild(context.game.make.sprite(0 - faceGroup.width / 2, 0 - faceGroup.height - 100, 'face' + baseColor));
			faceGroup.addChild(context.game.make.sprite(0 - faceGroup.width / 2, 0 - faceGroup.height - 100, 'front' + Math.floor(Math.random() * MAX_ENMH)));
			faceGroup.addChild(context.game.make.sprite(0 - faceGroup.width / 2, 0 - faceGroup.height - 100, 'eyes' + Math.floor(Math.random() * MAX_ENMH)));
			faceGroup.addChild(context.game.make.sprite(0 - faceGroup.width / 2, 0 - faceGroup.height - 100, 'nose' + Math.floor(Math.random() * MAX_ENMH)));
			faceGroup.addChild(context.game.make.sprite(0 - faceGroup.width / 2, 0 - faceGroup.height - 100, 'mouth' + Math.floor(Math.random() * MAX_ENMH)));
			faceGroup.visible = false;
			faceGroup.anchor.set(.5, 1);
			faceGroup.scale.set(.25);
			return faceGroup;
		},
		fromArr(arr, x, y, context) {
			var faceGroup = context.game.add.sprite(x, y, 'popup');
			faceGroup.addChild(context.game.make.sprite(0 - faceGroup.width / 2, 0 - faceGroup.height - 100, 'back' + arr[0]));
			faceGroup.addChild(context.game.make.sprite(0 - faceGroup.width / 2, 0 - faceGroup.height - 100, 'ears' + arr[1]));
			faceGroup.addChild(context.game.make.sprite(0 - faceGroup.width / 2, 0 - faceGroup.height - 100, 'face' + arr[2]));
			faceGroup.addChild(context.game.make.sprite(0 - faceGroup.width / 2, 0 - faceGroup.height - 100, 'front' + arr[3]));
			faceGroup.addChild(context.game.make.sprite(0 - faceGroup.width / 2, 0 - faceGroup.height - 100, 'eyes' + arr[4]));
			faceGroup.addChild(context.game.make.sprite(0 - faceGroup.width / 2, 0 - faceGroup.height - 100, 'nose' + arr[5]));
			faceGroup.addChild(context.game.make.sprite(0 - faceGroup.width / 2, 0 - faceGroup.height - 100, 'mouth' + arr[6]));
			faceGroup.visible = false;
			faceGroup.anchor.set(.5, 1);
			faceGroup.scale.set(.25);
			return faceGroup;
		}
	}
	

	Game.prototype = {
		init: function(mark) {
			playerMark = mark;
			markLoc = Math.floor(Math.random() * TOTAL_THEATRES);
			console.log("mark in:" + markLoc);
		},
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
			
			player = this.game.add.sprite(100, walkingPlayerY, 'player');
			player.anchor.set(0.5, 0.5);
			this.game.physics.arcade.enable(player);
			player.body.collideWorldBounds = true;
			this.game.camera.follow(player, Phaser.Camera.FOLLOW_TOPDOWN);
			
			for (var i = 0; i < TOTAL_ENEMIES; i++) {
				var locX = Math.floor(Math.random() * (worldWidth - 450)) + 300;
				enemies[i] = {
					e: this.game.add.sprite(locX, walkingPlayerY, 'enemy'),
					dir: (Math.round(Math.random()) === 0) ? actorDir.left : actorDir.right,
					startX: locX,
					max: locX + ENEMY_RANGE,
					min: locX - ENEMY_RANGE,
					speed: MOVEMENT_SPEED - 4
				};
				enemies[i].e.anchor.set(0.5, 0.5);
				enemies[i].e.scale.set(.25);
				this.game.physics.arcade.enable(enemies[i].e);
				enemies[i].e.body.collideWorldBounds = true;
			}
			
			for (var i = 0; i < TOTAL_THEATRES; i++) {
				theatres.theatres[i].em = this.game.add.emitter((i * THEATRE_WIDTH) + THEATRE_WIDTH / 2, 200, 200);
				// Particle settings
				theatres.theatres[i].em.makeParticles(['smoke1', 'smoke2', 'smoke3']);
				theatres.theatres[i].em.minParticleScale = .3;
				theatres.theatres[i].em.maxParticleScale = .3;
				theatres.theatres[i].em.particleBringToTop = false;
				
				if (i === markLoc) {
					theatres.theatres[i].face = FaceManager.fromArr(playerMark, (i * THEATRE_WIDTH) + THEATRE_WIDTH / 2, 300, this);
					theatres.theatres[i].face.visible = false;
					theatres.theatres[i].face.anchor.set(.5, 1);
					theatres.theatres[i].face.scale.set(.25);
				}
				else
					theatres.theatres[i].face = FaceManager.create((i * THEATRE_WIDTH) + THEATRE_WIDTH / 2, 300, this);
			}

			this.input.keyboard.addKey(Phaser.Keyboard.UP);
			cursors = this.game.input.keyboard.createCursorKeys();
			throwKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		},

		update: function () {	
			
			for (var i = 0; i < TOTAL_ENEMIES; i++) {
				if (enemies[i].e.x >= enemies[i].max || enemies[i].e.x <= enemies[i].min) {
					if (enemies[i].e.x >= enemies[i].max) {
						enemies[i].dir = actorDir.left;
						enemies[i].e.x -= enemies[i].speed;
					}
					else if (enemies[i].e.x <= enemies[i].min) {
						enemies[i].dir = actorDir.right;
						enemies[i].e.x += enemies[i].speed;
					}
				}
				else
					if (enemies[i].dir == actorDir.right)
						enemies[i].e.x += enemies[i].speed;
					else if (enemies[i].dir == actorDir.left) {
						enemies[i].e.x -= enemies[i].speed;
					}
				if (enemies[i].dir == actorDir.right)
					enemies[i].e.scale.x = -.25;
				else
					enemies[i].e.scale.x = .25;
					
				var min = player.x + (player.width * currPlayerDir) / 2 > (enemies[i].e.x - (enemies[i].e.width * enemies[i].dir) / 2);
				var max = player.x - (player.width * currPlayerDir) / 2 < (enemies[i].e.x - (enemies[i].e.width * enemies[i].dir) / 2);
				if ((min && max) && playerState !== "hiding") {
					var context = this;
					function seen() {
						context.game.paused = false;
						context.game.state.start('winLose', false, false, "were seen");
					}
					this.game.paused = true;
					window.setTimeout(seen, 1000);
				}
			}
					
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
					currPlayerDir = actorDir.left;
				}
				else if (cursors.right.isDown && player.y === walkingPlayerY) {
					player.x += MOVEMENT_SPEED;
					player.scale.x = -1;
					currPlayerDir = actorDir.right;
				}
				
				player.tint = 0xffffff;
			}
			else if (playerState === "hiding") {
				player.tint = 0x747474;
				if (throwKey.isDown && playerState === "hiding") {
					theatres.theatres[hidingPlayerTheatre].em.start(false, 5000, 20);
					var that = this;
					if (hidingPlayerTheatre !== markLoc) {
						theatres.theatres[hidingPlayerTheatre].face.tint = 0xff4c4c;
						function lose() {
							that.game.state.start('winLose', false, false, "lose");
						}
						window.setTimeout(lose, 2500);
					}
					else {
						theatres.theatres[hidingPlayerTheatre].face.tint = 0x4cff4c;
						function win() {
							that.game.state.start('winLose', false, false, "win");
						}
						window.setTimeout(win, 2500);
					}
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
					if (playerState !== "smoking") {
						var tween = this.game.add.tween(player);
						tween.to( { x: player.x, y: walkingPlayerY }, 125 * MOVEMENT_SPEED, "Cubic", true);
						tween.onComplete.add(back2Walking, this);
						playerState = "moving";
					}
				}
			};
		}
	};

	window['s6'] = window['s6'] || {};
	window['s6'].Game = Game;
}());
