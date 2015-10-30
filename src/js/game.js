(function() {
  'use strict';

  function Game() {}
  
  var player;
  var platforms;
  var cursors;

  Game.prototype = {
    create: function () {
      this.input.onDown.add(this.onInputDown, this);
      
      player = this.game.add.sprite(100, 200, 'player');

      this.game.physics.arcade.enable(player);
  
      player.body.collideWorldBounds = true;
      player.body.gravity.y = 500;
  
      platforms = this.game.add.physicsGroup();
  
      platforms.create(0, 256, 'platform').scale.setTo(0.75, 0.75);
      platforms.create(96, 256, 'platform').scale.setTo(0.75, 0.75);
      platforms.create(256, 128, 'platform').scale.setTo(0.75, 0.75);
  
      platforms.setAll('body.immovable', true);
  
      cursors = this.game.input.keyboard.createCursorKeys();

    },

    update: function () {
      this.game.physics.arcade.collide(player, platforms);

      player.body.velocity.x = 0;
  
      if (cursors.left.isDown)
          player.body.velocity.x = -250;
      else if (cursors.right.isDown)
          player.body.velocity.x = 250;
    },

    onInputDown: function () {
      this.game.state.start('menu');
    }
  };

  window['s6'] = window['s6'] || {};
  window['s6'].Game = Game;
}());
