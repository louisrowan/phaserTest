var game = new Phaser.Game(1000, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

var cursors;

var brickCount = 0

function preload(){
  game.load.image('landscape', '/assets/clouds.jpeg')
  game.load.image('bug', '/assets/bug.png')
  game.load.image('brick', '/assets/brick.png')

}

function create(){
  game.add.tileSprite(0, 0, 100000, 600, 'landscape');
  game.world.setBounds(0, 0, 100000, 600);

  players = game.add.group();
  players.enableBody = true;
  createPlayer(0, 0);

  bricks = game.add.group();
  bricks.enableBody = true;

  cursors = game.input.keyboard.createCursorKeys();
  game.physics.startSystem(Phaser.Physics.ARCADE);

}

function createPlayer(x, y){
  var player = players.create(x, y, 'bug')
  player.body.collideWorldBounds = true;
  game.physics.enable(player);
  player.body.gravity.y = 1000;
}

function update(){
  brickCount += 1
  console.log(brickCount)

  if ( brickCount > 200) {
    createBricks()
    brickCount = 0
  }

  game.physics.arcade.overlap(players, bricks, playerBricksCollisionHandler, null, this);


  players.forEach(function(p){
      this.game.camera.x = p.body.x-game.width/2;
    p.body.velocity.x = 0;

      p.body.velocity.x = 300;

    if(cursors.up.isDown){
      p.body.velocity.y = -300;
    }else if(cursors.down.isDown){
      p.body.velocity.y = 300;
    }
  })
}

function playerBricksCollisionHandler(player, brick){
  brick.kill();
}

function createBricks() {
  var brick = bricks.create(this.game.camera.x + 1000, (Math.floor(Math.random() * 600) + 1)  , 'brick')
}
