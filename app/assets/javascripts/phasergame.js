var game = new Phaser.Game(1000, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

var cursors;

function preload() {
  game.load.image('tux', '/assets/frog.png');
  game.load.image("background", "/assets/street.jpeg");
  game.load.image('car1', '/assets/car1.png');
}

function create() {
  game.add.tileSprite(0, 0, 1000, 600, 'background');
  game.physics.startSystem(Phaser.Physics.ARCADE);
  cars = game.

  players = game.add.group();
  players.enableBody = true;
  createPlayer(0, 10, -500, 500);

  platforms = game.add.group();
  platforms.enableBody = true;
  //createPlatform();
  cursors = game.input.keyboard.createCursorKeys();
  game.input.onDown.add(go_fullscreen, this);
}

function update() {
  playerUpdate();
}

function createPlayer(x, y, j, v){
  var player = players.create(x, y, 'tux');
  //player.body.bounce.y = .2;
  //player.body.gravity.y = 1000;
  player.body.collideWorldBounds = true;
  player.jump = j;
  player.v = v
}

function playerUpdate(){
  game.physics.arcade.collide(players, players)
  game.physics.arcade.collide(players, platforms);
  players.forEach(function(p){
    p.body.velocity.x = 0;
    if(cursors.left.isDown){
      p.body.velocity.x = -p.v;
    }else if(cursors.right.isDown){
      p.body.velocity.x = p.v;
    }
    if(cursors.up.isDown){
      p.body.velocity.y = -p.v;
    }else if(cursors.down.isDown){
      p.body.velocity.y = p.v;
    } else {
      p.body.velocity.y = 0;
    }
  })
}

function createPlatform(){
  for(var i = 0; i < game.world.width; i+= 64){
    var ground = platforms.create(i, game.world.height - 64, 'brick');
    ground.body.immovable = true;
  }
}

function go_fullscreen(){
  game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
  game.scale.startFullScreen();
}
