var game = new Phaser.Game(1000, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

var cursors;
var score = 0;

function preload() {
  game.load.image('tux', '/assets/frog.png');
  game.load.image("background", "/assets/street.jpeg");
  game.load.image('car1', '/assets/car1.png');
  game.load.image('car2', '/assets/car2.png')
  game.load.image('bug', '/assets/bug.png')
}

function create() {
  game.add.tileSprite(0, 0, 1000, 600, 'background');
  game.physics.startSystem(Phaser.Physics.ARCADE);

  cars = game.add.group();
  cars.enableBody = true;
  createCar(game.width/2, 0);
  createCar(game.width, 400)

  rightCars = game.add.group();
  rightCars.enableBody = true;
  createRightCar(0, 200)

  players = game.add.group();
  players.enableBody = true;
  createPlayer(0, 10, -500, 500);

  bugs = game.add.group();
  bugs.enableBody = true;
  createBug(300, 300);


  cursors = game.input.keyboard.createCursorKeys();
  game.input.onDown.add(go_fullscreen, this);

  scoreText = game.add.text(32, 550, 'bugs eaten: ', { font: '20px Arial', fill: '#ffffff', align: 'left'});
}

function update() {
  playerUpdate();
  carUpdate();
  rightCarUpdate();

  game.physics.arcade.overlap(players, bugs, playerBugCollisionHandler, null, this);
  game.physics.arcade.overlap(cars, bugs, carBugCollisionHandler, null, this);
  game.physics.arcade.overlap(rightCars, bugs, carBugCollisionHandler, null, this);
}

function carBugCollisionHandler(car, bug){
  bug.kill();
  createBug(Math.random()*(game.width - 0), Math.random()*(game.height - 0))
}

function playerBugCollisionHandler(player, bug){
  bug.kill();
  score += 1;
  createBug(Math.random()*(game.width - 0), Math.random()*(game.height - 0))
  scoreText.text = 'bugs eaten: ' + score;
}

function createBug(x, y){
  var bug = bugs.create(x, y, 'bug')
}

function createRightCar(x, y){
  var rightCar = rightCars.create(x, y, 'car2')
  rightCar.body.immovable = true;
}

function createCar(x,y){
  var car = cars.create(x, y, 'car1')
  car.body.immovable = true;
}

function rightCarUpdate(){
  rightCars.forEach(function(c){
    c.body.velocity.x = 400;
    if (c.x > game.width + 300){
      c.x = -300;
    }
  })
}

function carUpdate(){
  cars.forEach(function(c){
    c.body.velocity.x = -400;
    if (c.x < -300 ){
      c.x = game.width + 400;
    }
  })
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
  game.physics.arcade.collide(players, players);
  game.physics.arcade.collide(players, cars);
  game.physics.arcade.collide(players, rightCars);
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



function go_fullscreen(){
  game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
  game.scale.startFullScreen();
}
