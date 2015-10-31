(function() {    
	'use strict';     
	function Mark() {}
	
	var playerMark;
	var MAX_FACE = 3;
	var MAX_ENMH = 5;
	var makeMark = function(x, y, context) {
		var baseColor = Math.floor(Math.random() * MAX_FACE);
		var faceGroup = context.game.add.sprite(x, y, 'popup');
		var stuff = [ Math.floor(Math.random() * MAX_ENMH), baseColor.toString() + Math.round(Math.random()), baseColor, Math.floor(Math.random() * MAX_ENMH), Math.floor(Math.random() * MAX_ENMH), Math.floor(Math.random() * MAX_ENMH), Math.floor(Math.random() * MAX_ENMH) ];
		faceGroup.addChild(context.game.make.sprite(0 - faceGroup.width / 2, 0 - faceGroup.height - 100, 'back' + stuff[0]));
		faceGroup.addChild(context.game.make.sprite(0 - faceGroup.width / 2, 0 - faceGroup.height - 100, 'ears' + stuff[1]));
		faceGroup.addChild(context.game.make.sprite(0 - faceGroup.width / 2, 0 - faceGroup.height - 100, 'face' + stuff[2]));
		faceGroup.addChild(context.game.make.sprite(0 - faceGroup.width / 2, 0 - faceGroup.height - 100, 'front' + stuff[3]));
		faceGroup.addChild(context.game.make.sprite(0 - faceGroup.width / 2, 0 - faceGroup.height - 100, 'eyes' + stuff[4]));
		faceGroup.addChild(context.game.make.sprite(0 - faceGroup.width / 2, 0 - faceGroup.height - 100, 'nose' + stuff[5]));
		faceGroup.addChild(context.game.make.sprite(0 - faceGroup.width / 2, 0 - faceGroup.height - 100, 'mouth' + stuff[6]));
		
		faceGroup.anchor.set(.5, 1);
		faceGroup.scale.set(.25);
		return stuff;
	}
	
	Mark.prototype = {
		create: function () {
			var buttonStart = this.game.add.button(this.game.world.width - 100, this.game.world.height - 70, 'ready', this.startOnClick, this, 2, 1, 0);
			buttonStart.anchor.set(0.5);
			
			var style = { font: "bold 64px Calibri", fill: "#fff", align: "center" };
			var title = this.game.add.text(200, 90, 'Your target is...', style);
			playerMark = makeMark(512, 450, this);
			title.anchor.set(0.5);
		},
		update: function () {
	
		},
		
		startOnClick: function () {
			this.game.state.start('game', true, false, playerMark);
		},
	};

	window['s6'] = window['s6'] || {};
	window['s6'].Mark = Mark;
}());