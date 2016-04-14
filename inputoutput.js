var deadDemons = 0, demonsKilledPerTick = 1, demonsSouls = 0, buyQuantity = 1;

function centreText(){
  var textHeight = $('h1').height() / 2;
  var textWidth = $('h1').width() / 2;
  var windowHeight = $(window).height() / 2;
  var windowWidth = $(window).width() / 2;
  var leftOffset = windowWidth - textWidth;
  var topOffset = windowHeight - textHeight - 50;
  $('h1').css("margin-top", topOffset + "px");
  $('h1').css("margin-left", leftOffset + "px");
  var currentposition = $("#world_selected").position();
  var targetPosition = $('#tired_terra').position();
  var leftoffset = currentposition.left - targetPosition.left;
  var topoffset = currentposition.top - targetPosition.top;
  $("#world_selected").css({ top: -topoffset, left: -leftoffset});
  addworldbuttonevents();
};

function sliderBehaviour() {
  var slider = $("#slider_content");
  var children = slider.children();
  var current = slider.children().first();
  var width = $(window).width();
  var totalWidth = width * children.length;

  return function slideTo(event){
    var target = "page_" + $(event.target).attr("id");
    var currentPosition = -1, targetPosition = -1;
    for(i = 0; i < children.length; ++i){
      if($(children[i]).attr("id") === target){
        targetPosition = i;
      }
      if($(children[i]).attr("id") === $(current).attr("id")){
        currentPosition = i;
      }
    }
    if(currentPosition != -1 && targetPosition != -1) {
      var distance = width * (targetPosition - currentPosition);
      slider.animate({
        left: "-=" + distance.toString(),
      }, 200, function() {
      });
      current = children[targetPosition];
    }
  };
};

function addworldbuttonevents() {
  var currentpage = "#page_tired_terra";

  $('.world_button').click(sliderBehaviour());
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
  var newSouls = Math.random() * 0.05 * demonsKilledPerTick;
  var addedSouls = addDemonsSouls(newSouls);
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
