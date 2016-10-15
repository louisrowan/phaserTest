$(document).ready(function(){
  console.log('wuzaaaaaah')
  populateTable();
  clickListener();
  startClock();

  window.setInterval(function(){
    runClock();
  }, 1000);

  //////////////////////////////////
  //////////////////////////////////
  populateNewTable();
  moveSquareListener();

})



var populateNewTable = function(){
  var boxes = $('.table_box')

  for (var i = 0; i < boxes.length; i++){
    box = boxes[i]
    rand = Math.floor(Math.random()*fractions.length)
    $(box).append(fractions[rand])
    fractions.splice(rand, 1)
  }

}

var moveSquareListener = function(){
  $('.table_box').on('click', function(){
    var box = $(this)

    if ($('.active').length >= 2){
      $('.active').removeClass('active')
    }

    $(box).hasClass('correct') ? null : $(box).addClass('active')

    if ($('.active').length === 2){
      checkEquality();
    }

  })
}











////////////////////////////////////
//////////////////////////////////
/////////////////////////////////
/////////////////////////////////
///////////////////////////////


var runClock = function(){
  if ($('.correct').length < 15){
    var time = Math.floor(((new Date) - startTime)/1000)
    $('#timer').html(time)
  }
}

var startClock = function(){
  startTime = new Date
}



var clickListener = function(){
  $('.box').on('click', function(){
    var box = $(this)

    if ($('.active').length >= 2){
      $('.active').removeClass('active')
    }

    $(box).hasClass('correct') ? null : $(box).addClass('active')

    if ($('.active').length === 2){
      checkEquality();
    }


  })
}


var checkEquality = function(){
  var actives = $('.active')

  if (eval($(actives[0]).text()) === eval($(actives[1]).text())){
    $('.active').addClass('correct')
  } else {
    var text1 = $(actives[0]).text()
    var text2 = $(actives[1]).text()
    $(actives[0]).text(text2)
    $(actives[1]).text(text1)
  }
}



var populateTable = function(){
  var boxes = $('.box')

  for (var i = 0; i < boxes.length; i++){
    box = boxes[i]
    rand = Math.floor(Math.random()*fractions.length)
    $(box).append(fractions[rand])
    fractions.splice(rand, 1)
  }

}

var fractions = [
  '1/2',
  '4/8',
  '2/3',
  '6/9',
  '1/5',
  '3/15',
  '5/9',
  '10/18',
  '2/5',
  '6/15',
  '4/5',
  '12/15',
  '1/7',
  '3/21',
  '3/7',
  '6/14'
]
