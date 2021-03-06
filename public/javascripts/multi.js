$(document).ready(function(){
  window.setInterval(function(){
    updateEquationText();
  }, 200);
})

var updateEquationText = function(){
  if (!gameIsOver){
  $('#equation_text_div').html(current_equation.problem)
  }
}

var game = new Phaser.Game(1000, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

var cursors;
var one;
var two;
var three;
var four;
var questionTimer;
var gameIsOver = false
var hummerSpawned = false

function problem(problem, truth){
  this.problem = problem;
  this.truth = truth;
}

var equations = [
new problem('2 + 2 = 4', 'true'),
new problem('1 + 1 = 8', 'false'),
new problem('10 / 2 = 5', 'true'),
new problem('12 + 4 = 18', 'false'),
new problem('6 * 2 = 12', 'true'),
new problem('9 + 6 = 13', 'false'),
new problem('1 + 5 = 6', 'true'),
new problem('3 * 4 = 16', 'false'),
new problem('2 / 2 = 1', 'true'),
new problem('4 + 4 = 16', 'false'),
new problem('1 * 8 = 8', 'true'),
new problem('128 + 1 = 128', 'false')
]

var current_equation

var playerOneScore = 0;
var playerTwoScore = 0;

function preload() {
  game.load.image('tux', '/assets/frog.png');
  game.load.image("background", "/assets/street.jpeg");
  game.load.image('bug', '/assets/bug.png')
  game.load.image('car1', '/assets/car1.png');
  game.load.image('car3', '/assets/car3.png');
  game.load.image('police1', '/assets/police1.png')
  game.load.image('hummer1', '/assets/limo1.png')
}

function create(){
    game.add.tileSprite(0, 0, 1000, 600, 'background');
    game.physics.startSystem(Phaser.Physics.ARCADE);

    players = game.add.group();
    players.enableBody = true;
    createPlayer(400, 10, 1);
    createPlayer(200, 200, 2);

    hummers = game.add.group();
    hummers.enableBody = true;

    one = game.input.keyboard.addKey(Phaser.Keyboard.ONE);
    two = game.input.keyboard.addKey(Phaser.Keyboard.TWO);
    three = game.input.keyboard.addKey(Phaser.Keyboard.THREE);
    four = game.input.keyboard.addKey(Phaser.Keyboard.FOUR);
    cursors = game.input.keyboard.createCursorKeys();

    cars = game.add.group();
    cars.enableBody = true;
    createCar(game.width/2, 250)
    createCar(game.width + 300, 0)

    current_equation = equations[Math.floor(Math.random()*(equations.length - 0))]
    questionTimer = 0;

    bugs = game.add.group();
    bugs.enableBody = true;
    createBug(Math.random()*(game.width - 20), Math.random()*(game.height - 20))

    game.input.onDown.add(go_fullscreen, this);


    playerOneText = game.add.text(32, 550, 'Player 1: ' + playerOneScore, { font: '20px Arial', fill: '#ffffff', align: 'left'});
    playerTwoText = game.add.text(32, 500, 'Player 2: ' + playerTwoScore, { font: '20px Arial', fill: '#ffffff', align: 'left'});
    finalScoreText = game.add.text(200, 400, '', { font: '50px Arial', fill: '#ffffff', align: 'left'});
    // MathQuestionText = game.add.text(400, 40, current_equation.problem, { font: '50px Arial', fill: '#ffffff', align: 'left', fontStyle: 'bold'});
}

function createBug(x, y){
  var bug = bugs.create(x, y, 'bug')
}

function update(){
  playerUpdate();
  carUpdate();
  hummerUpdate();

  game.physics.arcade.overlap(players, bugs, playerBugCollisionHandler, null, this);
  game.physics.arcade.overlap(players, cars, playerCarCollisionHandler, null, this);
  game.physics.arcade.overlap(cars, bugs, carBugCollisionHandler, null, this);

  gameOver();

  questionTimer += 1
  if (questionTimer >= 250){
    questionTimer = 0
    current_equation = equations[Math.floor(Math.random()*(equations.length - 0))]
    // MathQuestionText.text = current_equation.problem
  }
}

function carBugCollisionHandler(car, bug){
  bug.x = Math.random()*(game.width - 20)
  bug.y = Math.random()*(game.height - 20)
}

function playerCarCollisionHandler(player, car){
  player.alpha = .5
  player.health = 'false';
  setTimeout(function(){
    updatePlayerHealth(player);
  }, 5000);
}

function updatePlayerHealth(player){
  player.alpha = 1;
  player.health = 'true';
}

function playerBugCollisionHandler(player, bug){
  bug.kill();
  createBug(Math.random()*(game.width - 20), Math.random()*(game.height - 20))

  if (current_equation.truth === 'true'){

      if (player.player_id === 1){
        playerOneScore += 1;
        playerOneText.text = 'Player 1: ' + playerOneScore
      } else if (player.player_id === 2) {
        playerTwoScore += 1;
        playerTwoText.text = 'Player 2: ' + playerTwoScore
      }
  } else {
    if (player.player_id === 1){
        playerTwoScore += 1;
        playerTwoText.text = 'Player 2: ' + playerTwoScore;
    } else if (player.player_id === 2){
        playerOneScore += 1;
        playerOneText.text = 'Player 1: ' + playerOneScore;
    }
    console.log(playerOneScore)
    if (playerOneScore === 1 || playerTwoScore === 1){
      addHummer();
    }
    player.x = 0
    player.y = 0
  }
  current_equation = equations[Math.floor(Math.random()*(equations.length - 0))]
  // MathQuestionText.text = current_equation.problem
  questionTimer = 0
}

function addHummer(){
  if (!hummerSpawned){
    createHummer(850, 250)
  }
  hummerSpawned = true;
}

function createHummer(x, y){
  var hummer = hummers.create(x, y, 'hummer1');
}


function createPlayer(x, y, id){
  var player = players.create(x, y, 'tux');
  player.player_id = id;
  player.health = 'true';
  player.body.collideWorldBounds = true;
}

function playerUpdate(){

  players.forEach(function(p){
    if (p.player_id === 1){
          p.body.velocity.x = 0;
                if(cursors.left.isDown){
                  p.body.velocity.x = -200*p.alpha;
                }else if(cursors.right.isDown){
                  p.body.velocity.x = 200*p.alpha;
                }
                if(cursors.up.isDown){
                  p.body.velocity.y = -200*p.alpha;
                }else if(cursors.down.isDown){
                  p.body.velocity.y = 200*p.alpha;
                } else {
                  p.body.velocity.y = 0;
                }
    }
    if (p.player_id === 2){
          p.body.velocity.x = 0;
                if(one.isDown){
                  p.body.velocity.x = -200*p.alpha;
                }else if(four.isDown){
                  p.body.velocity.x = 200*p.alpha;
                }
                if(three.isDown){
                  p.body.velocity.y = -200*p.alpha;
                }else if(two.isDown){
                  p.body.velocity.y = 200*p.alpha;
                } else {
                  p.body.velocity.y = 0;
                }
    }

  })
}

function gameOver(){
  if (playerOneScore >= 5 || playerTwoScore >= 5){
    gameIsOver = true;
    players.forEach(function(p){
      p.kill();
    })
    cars.forEach(function(c){
      c.kill();
    })
    var winner;
    if (playerOneScore > playerTwoScore){
      winner = 'Player 1'
    } else {
      winner = 'Player 2'
    }
    finalScoreText.text = 'Game over, ' + winner +  ' wins!'
  }
}

function createCar(x, y){
  var car = cars.create(x, y, 'police1')
  car.body.immovable = true;
}

function carUpdate(){
  cars.forEach(function(c){
    c.body.velocity.x = -200;
    if (c.x < -250 ){
      var rand = (Math.floor(Math.random()*(3)))
      var heights = [0, 150, 300]
      c.x = game.width + 400;
      c.y = heights[rand]
    }
  })
}

function hummerUpdate(){
  hummers.forEach(function(f){
    f.body.velocity.x = 150
    if (f.x > game.width + 200){
      f.x = -400
    }
  })
}



function go_fullscreen(){
  game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
  game.scale.startFullScreen();
}
