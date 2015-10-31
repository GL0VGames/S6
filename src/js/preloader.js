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

			this.game.load.image('player', 'kenny/Characters/Hedgehog/hedgehog_body.png');
			this.game.load.image('platform', 'kenny/Tiles/brick_red.png');
			this.game.load.image('well', 'backgrounds/well.png');
			this.game.load.image('screen', 'backgrounds/screen.png');

			this.game.load.image('wall', 'backgrounds/wall.png');
			this.game.load.image('floor', 'backgrounds/floor.png');
			
			this.game.load.image('smoke1', 'effects/smoke 1.png');
			this.game.load.image('smoke2', 'effects/smoke 2.png');
			this.game.load.image('smoke3', 'effects/smoke 3.png');
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
