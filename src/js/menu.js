(function() {
	'use strict';

	function Menu() {}

	Menu.prototype = {
		create: function () {
			var buttonStart = this.game.add.button(384,
											  328,
											  'start',
											  this.startOnClick,
											  this,
											  2, 1, 0);
			var buttonCredits = this.game.add.button(384,
											  328,
											  'credits',
											  this.actionOnClick,
											  this,
											  2, 1, 0);
			buttonStart.anchor.set(0.5);
			buttonCredits.anchor.set(0.5);

			var style = { font: "bold 64px Calibri", fill: "#fff", align: "center" };
			var title = this.game.add.text(512,
				204,
				'SNEAKILY SLINGING\nSLIGHTLY SULFUROUS-SMELLING\nSMOKE\n(or S6, for short)',
				style);

			title.anchor.set(0.5);

			title.addColor("#FF4C4C", 0);
			title.addColor("#FFFFFF", 1);
			title.addColor("#FF4C4C", 9);
			title.addColor("#FFFFFF", 10);
			title.addColor("#FF4C4C", 17);
			title.addColor("#FFFFFF", 18);
			title.addColor("#FF4C4C", 26);
			title.addColor("#FFFFFF", 27);
			title.addColor("#FF4C4C", 36);
			title.addColor("#FFFFFF", 37);
			title.addColor("#FF4C4C", 44);
			title.addColor("#FFFFFF", 45);
			title.addColor("#4C4CFF", 52);
			title.addColor("#FFFFFF", 55);

		},

		update: function () {

		},

		startOnClick: function () {
			this.game.state.start('mark');
		},
		actionOnClick: function () {
			this.game.state.start('credits');
		},

	};

	window['s6'] = window['s6'] || {};
	window['s6'].Menu = Menu;
}());
