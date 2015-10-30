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

			this.game.load.image('wall', 'kenny/Tiles/fence_stone.png')
			this.game.load.image('floor', 'backgrounds/floor.png');
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