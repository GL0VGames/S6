(function() {
	'use strict';

	function Preloader() {
		this.asset = null;
		this.ready = false;
	}

	Preloader.prototype = {
		preload: function () {
			this.asset = this.add.sprite(this.game.width * 0.5 - 110, this.game.height * 0.5 - 10, 'preloader');
			this.load.setPreloadSprite(this.asset);

			// this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
			this.loadResources();

			this.ready = true;
		},

		loadResources: function () {
			// load your assets here
			this.game.stage.backgroundColor = '#85b5e1';

			this.game.load.baseURL = '/assets/';
			this.game.load.crossOrigin = 'anonymous';

			// ----- Background -----
			this.game.load.image('player', 'kenny/Characters/Hedgehog/hedgehog_body.png');
			this.game.load.image('platform', 'kenny/Tiles/brick_red.png');
			this.game.load.image('well', 'backgrounds/well.png');
			this.game.load.image('screen', 'backgrounds/screen.png');

			this.game.load.image('wall', 'backgrounds/wall.png');
			this.game.load.image('floor', 'backgrounds/floor.png');
			
			// ----- Smoke -----
			this.game.load.image('smoke1', 'effects/smoke 1.png');
			this.game.load.image('smoke2', 'effects/smoke 2.png');
			this.game.load.image('smoke3', 'effects/smoke 3.png');
			
			// ----- Face Stuff -----
			// Eyes
			this.game.load.image('eyes0', 'effects/bored eyes.png');
			this.game.load.image('eyes1', 'effects/mad eyes.png');
			this.game.load.image('eyes2', 'effects/normal eyes.png');
			this.game.load.image('eyes3', 'effects/pleased eyes.png');
			this.game.load.image('eyes4', 'effects/sad eyes.png');
			this.game.load.image('eyes5', 'effects/suspicious eyes.png');
			
			// Nose
			this.game.load.image('nose0', 'effects/cute nose.png');
			this.game.load.image('nose1', 'effects/long nose.png');
			this.game.load.image('nose2', 'effects/normal nose.png');
			this.game.load.image('nose3', 'effects/pointy nose.png');
			this.game.load.image('nose4', 'effects/squat nose.png');
			this.game.load.image('nose5', 'effects/strong nose.png');
			
			// Mouth
			this.game.load.image('mouth0', 'effects/bored mouth.png');
			this.game.load.image('mouth1', 'effects/mad mouth.png');
			this.game.load.image('mouth2', 'effects/normal mouth.png');
			this.game.load.image('mouth3', 'effects/pleased mouth.png');
			this.game.load.image('mouth4', 'effects/sad mouth.png');
			this.game.load.image('mouth5', 'effects/worried mouth.png');
			
			// Ears
			this.game.load.image('ears0', 'effects/white ears med.png');
			
			// Front hair
			this.game.load.image('front0', 'effects/normal hair fore.png');
			
			// Back hair
			this.game.load.image('back0', 'effects/girl hair back.png');
			
			// Face
			this.game.load.image('face0', 'effects/facebase white.png');
		},

		create: function () {

		},

		update: function () {
			// if (!!this.ready) {
			this.game.state.start('menu');
			// }
		},

		onLoadComplete: function () {
			// this.ready = true;
		}
	};

	window['s6'] = window['s6'] || {};
	window['s6'].Preloader = Preloader;
}());
