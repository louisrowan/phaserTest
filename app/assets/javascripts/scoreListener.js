


var submitScore = function(){
  var score = $('#game_form').serialize();
  var printableScore = $('#game_score').val();
  console.log(printableScore)
  var request = $.ajax({
    url: '/games',
    method: 'post',
    data: score
  })

  request.done(function(data){
    console.log(data)
    console.log('it worked')
    $('#final_score').append('<h1>You died! Final score: ' + printableScore + '</h1>')
    $('#play_again').show();
  })

  request.fail(function(data){
    console.log(data)
    console.log('it failed')
  })
}
