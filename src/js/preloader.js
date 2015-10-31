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

			this.game.load.baseURL = './assets/';
			this.game.load.crossOrigin = 'anonymous';

			// ----- Menu -----
			this.game.load.image('credits', 'Credits button.png');
			this.game.load.image('start', 'StartButton.png');
			
			// ----- Mark -----
			this.game.load.image('ready', "ready button.png");
			
			// ----- WinLose -----
			this.game.load.image("restart", "restart button.png");
			
			// ----- Credits -----
			this.game.load.image("back", "BackButton.png");

			// ----- Background -----
			this.game.load.image('well', 'backgrounds/well.png');
			this.game.load.image('screen', 'backgrounds/screen.png');

			this.game.load.image('lwall', 'backgrounds/lower wall.png');
			this.game.load.image('uwall', 'backgrounds/upper wall.png');
			this.game.load.image('floor', 'backgrounds/floor.png');

			// ----- Smoke -----
			this.game.load.image('smoke1', 'effects/smoke 1.png');
			this.game.load.image('smoke2', 'effects/smoke 2.png');
			this.game.load.image('smoke3', 'effects/smoke 3.png');

			// ----- Actors -----
			this.game.load.image('player', 'kenny/Characters/Hedgehog/hedgehog_body.png');
			this.game.load.image('enemy', 'Mr Boo.png');
			
			// ----- Credits -----
			this.game.load.image('creditPage', 'Credits Page.png');

			// ----- Face Stuff -----
			// Popup
			this.game.load.image('popup', 'popup.png');

			// Eyes
			this.game.load.image('eyes0', 'face elements/bored eyes.png');
			this.game.load.image('eyes1', 'face elements/mad eyes.png');
			this.game.load.image('eyes2', 'face elements/normal eyes.png');
			this.game.load.image('eyes3', 'face elements/pleased eyes.png');
			this.game.load.image('eyes4', 'face elements/sad eyes.png');
			this.game.load.image('eyes5', 'face elements/suspicious eyes.png');

			// Nose
			this.game.load.image('nose0', 'face elements/cute nose.png');
			this.game.load.image('nose1', 'face elements/long nose.png');
			this.game.load.image('nose2', 'face elements/normal nose.png');
			this.game.load.image('nose3', 'face elements/pointy nose.png');
			this.game.load.image('nose4', 'face elements/squat nose.png');
			this.game.load.image('nose5', 'face elements/strong nose.png');

			// Mouth
			this.game.load.image('mouth0', 'face elements/bored mouth.png');
			this.game.load.image('mouth1', 'face elements/mad mouth.png');
			this.game.load.image('mouth2', 'face elements/normal mouth.png');
			this.game.load.image('mouth3', 'face elements/pleased mouth.png');
			this.game.load.image('mouth4', 'face elements/sad mouth.png');
			this.game.load.image('mouth5', 'face elements/worried mouth.png');

			// Front hair
			this.game.load.image('front0', 'face elements/normal hair fore.png');
			this.game.load.image('front1', 'face elements/black girl fore.png');
			this.game.load.image('front2', 'face elements/prim hair fore.png');
			this.game.load.image('front3', 'face elements/boy black hair fore.png');
			this.game.load.image('front4', 'face elements/boybrown curly hair fore.png');
			this.game.load.image('front5', 'face elements/spiky blond boy.png');

			// Back hair
			this.game.load.image('back0', 'face elements/girl hair back.png');
			this.game.load.image('back1', 'face elements/black girl back.png');
			this.game.load.image('back2', 'face elements/prim girl hair back.png');
			this.game.load.image('back3', 'face elements/boy back hair prim.png');
			this.game.load.image('back4', 'face elements/boy back hair black.png');
			this.game.load.image('back5', 'face elements/blonde boy back.png');

			// Ears
			this.game.load.image('ears00', 'face elements/white ears med.png');
			this.game.load.image('ears01', 'face elements/white ears big.png');
			this.game.load.image('ears10', 'face elements/brown ears med.png');
			this.game.load.image('ears11', 'face elements/brown ears big.png');
			this.game.load.image('ears20', 'face elements/tan ears med.png');
			this.game.load.image('ears21', 'face elements/tan ears big.png');

			// Face
			this.game.load.image('face0', 'face elements/facebase white.png');
			this.game.load.image('face1', 'face elements/facebase brown.png');
			this.game.load.image('face2', 'face elements/facebase tan.png');
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
