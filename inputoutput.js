var deadDemons = 0, demonsKilledPerTick = 1, demonsSouls = 1, buyQuantity = 1;

function centreText(){
  var textHeight = $('h1').height() / 2;
  var textWidth = $('h1').width() / 2;
  var windowHeight = $(window).height() / 2;
  var windowWidth = $(window).width() / 2;
  var leftOffset = windowWidth - textWidth;
  var topOffset = windowHeight - textHeight;
  $('h1').css("margin-top", topOffset + "px");
  $('h1').css("margin-left", leftOffset + "px");
  var currentposition = $("#world_selected").position();
  var targetPosition = $('#tired_terra').position();
  var leftoffset = currentposition.left - targetPosition.left + 5;
  var topoffset = currentposition.top - targetPosition.top;
  $("#world_selected").css({ top: -topoffset, left: -leftoffset});
  addworldbuttonevents();
};

function addworldbuttonevents() {
  $('.world_button').click(function() {
    var currentposition = $("#world_selected").position().left;
    var targetPosition = $(this).position().left;
    var amounttomove = currentposition - targetPosition;
    $("#world_selected").animate({
      left: "-=" + amounttomove.toString(),
    }, 200, function() {
      // Animation complete.
    });
  });
};

function updateText(){
  deadDemons += demonsKilledPerTick;
  demonsSouls += Math.random() * 0.05 * demonsKilledPerTick;
  $('h1').text("You have killed " + deadDemons + " demons...");
  $('h2').text("Demon's souls unbound: " + Math.floor(demonsSouls));
}

function keyDown(event) {
  if(event.shiftKey){
    buyQuantity = 10;
  }
}

function keyUp() {
  buyQuantity = 1;
}
