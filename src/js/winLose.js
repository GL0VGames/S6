(function() {    
	'use strict';     
	function WinLose() {}
	
	var winlose;
	
	WinLose.prototype = {
		init: function(wl) {
			winlose = wl;
		},
		create: function () {			
			var style = { font: "bold 64px Calibri", fill: "#fff", align: "center" };
			var text = "You " + winlose + "!"
			var title = this.game.add.text(512, 300, text, style);
			title.anchor.set(0.5);
			if (winlose === "win")
				title.addColor("#4CFF4C", 0);
			else title.addColor("#FF4C4C", 0);

			var buttonLose = this.game.add.button(888, 530, 'restart', this.startOnClick, this, 2, 1, 0);
			buttonLose.anchor.set(0.5);
		},
		update: function () {
	
		},
		
		startOnClick: function () {
			this.game.state.start('menu');
		},
	};

	window['s6'] = window['s6'] || {};
	window['s6'].WinLose = WinLose;
}());