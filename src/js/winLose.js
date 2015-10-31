(function() {    
	'use strict';     
	function WinLose() {}
	
	var winlose;
	
	WinLose.prototype = {
		init: function(wl) {
			winlose = wl;
		},
		create: function () {
			var buttonStart = this.game.add.button(this.game.world.width - 136, this.game.world.height - 70, 'restart', this.startOnClick, this, 2, 1, 0);
			buttonStart.anchor.set(0.5);
			
			var style = { font: "bold 64px Calibri", fill: "#fff", align: "center" };
			var text = "You " + winlose + "!"
			var title = this.game.add.text(512, 300, text, style);
			title.anchor.set(0.5);
			if (winlose === "lose")
				title.addColor("#FF4C4C", 0);
			else title.addColor("#4CFF4C", 0);
		},
		update: function () {
	
		},
		
		startOnClick: function () {
			this.game.state.start('mark');
		},
	};

	window['s6'] = window['s6'] || {};
	window['s6'].WinLose = WinLose;
}());