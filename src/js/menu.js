(function() {
	'use strict';

	function Menu() {}

	Menu.prototype = {
		create: function () {
			var button = this.game.add.button(this.game.world.centerX,
											  this.game.world.centerY,
											  'platform',
											  this.actionOnClick,
											  this,
											  2, 1, 0);
			button.anchor.set(0.5);

		},

		update: function () {

		},

		actionOnClick: function () {
			this.game.state.start('game');
		},

	};

	window['s6'] = window['s6'] || {};
	window['s6'].Menu = Menu;
}());
