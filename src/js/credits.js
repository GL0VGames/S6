(function() {    
	'use strict';     
	function Credits() {}
	
	Credits.prototype = {
		create: function () {
			var credit = this.game.add.sprite(0, 0, 'creditPage');
			var buttonMenu = this.game.add.button(888, 530, 'back', this.startOnClick, this, 2, 1, 0);
			buttonMenu.anchor.set(0.5);
		},
		update: function () {
	
		},
		
		startOnClick: function () {
			this.game.state.start('menu');
		},
	};

	window['s6'] = window['s6'] || {};
	window['s6'].Credits = Credits;
}());