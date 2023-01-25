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
		faceGroup.visible = false;
		faceGroup.anchor.set(.5, 1);
		faceGroup.scale.set(.25);
		return stuff;
	}
	
	var descriptions = {
		"eyes0": ["bored", "tired"],
		"eyes1": ["angry", "unhappy"],
		"eyes2": ["calm", "neutral"],
		"eyes3": ["very cheerful", "very content"],
		"eyes4": ["melancholy", "sorry"],
		"eyes5": ["suspicious", "cautious"],
		"nose0": ["cute", "dainty"],
		"nose1": ["pointy", "wisdomatic"],
		"nose2": ["average", "plain"],
		"nose3": ["sharp", "chiseled"],
		"nose4": ["round", "nubby"],
		"nose5": ["strong", "powerful"],
		"mouth0": ["indifferent", "disinterested"],
		"mouth1": ["uptight", "bitter"],
		"mouth2": ["satisfied", "alright"],
		"mouth3": ["happy", "smiling"],
		"mouth4": ["unhappy", "sad"],
		"mouth5": ["worried", "distressed"],
		"front0": ["brown", "straight"],
		"front1": ["dark", "sideburned"],
		"front2": ["prim", "brown"],
		"front3": ["black", "curly"],
		"front4": ["brown", "curly"],
		"front5": ["blond", "spiky"],
		"back0": ["long", "straight"],
		"back1": ["long", "dark"],
		"back2": ["long", "brown"],
		"back3": ["no", "no"],
		"back4": ["no", "no"],
		"back5": ["short", "light"],
		"ears00": ["average", "light"],
		"ears01": ["big", "light"],
		"ears10": ["average", "dark"],
		"ears11": ["big", "dark"],
		"ears20": ["average", "tan"],
		"ears21": ["big", "tan"],
		"face0": ["fair", "pasty"],
		"face1": ["dark", "brown"],
		"face2": ["tan", "amber"]
	}
	
	Mark.prototype = {
		create: function () {
			var buttonStart = this.game.add.button(924, 530, 'ready', this.startOnClick, this, 2, 1, 0);
			buttonStart.anchor.set(0.5);
			
			var titleStyle = { font: "bold 64px Calibri", fill: "#fff", align: "center" };
			var title = this.game.add.text(230, 90, 'Your target...', titleStyle);
			title.anchor.set(0.5);
			playerMark = makeMark(512, 740, this);
			
			var descriptionStyle = { font: "bold 48px Calibri", fill: "#fff", align: "center", wordWrap: true, wordWrapWidth: 800 };
			var description = "will stare at you with " + descriptions["eyes" + playerMark[4]][Math.round(Math.random())] + " eyes.  " + 
							  "Their nose is " + descriptions["nose" + playerMark[5]][Math.round(Math.random())] + ".  " + 
							  "Their mouth curls in a(n) " + descriptions["mouth" + playerMark[6]][Math.round(Math.random())] + " way.  " + 
							  "They have " + descriptions["front" + playerMark[3]][Math.round(Math.random())] + " hair on top " + 
							  "and " + descriptions["back" + playerMark[0]][Math.round(Math.random())] + " hair in back.  " + 
							  "Your target has a(n) " + descriptions["face" + playerMark[2]][Math.round(Math.random())] + " face " + 
							  "and " + descriptions["ears" + playerMark[1]][Math.round(Math.random())] + " ears.  " +
							  "Hide in theaters to avoid being seen by the guards. Good luck!";
			var text = this.game.add.text(512, 320, description, descriptionStyle);
			text.anchor.set(0.5);
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