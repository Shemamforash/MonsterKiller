var buyQuantity = 1;

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
    for(var i = 0; i < children.length; ++i){
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

function updateAllText(){
  var i;
  for(i = 0; i < units.length(); ++i){
    units.get(i).updateText();
    kills.add(units.get(i).power * units.get(i).quantity);
  }
  for(i = 0; i < containers.length(); ++i){
    containers.get(i).updateText();
  }
  for(i = 0; i < weapons.length(); ++i){
    weapons.get(i).updateText();
  }
  updateBackgroundText();
}

function updateBackgroundText(){
  var killRate = kills.update();
  var addedSouls = souls.updateQuantities();
  $('h1').text("You have killed " + Math.round(kills.total()) + " demons...");
  $('h2').text("Demon's souls unbound: " + Math.floor(souls.remaining()) + " (" + Math.round(addedSouls * 10) / 10 + "sps)");
}

function keyDown(event) {
  if(event.shiftKey){
    buyQuantity = 100;
  }
  else if(event.ctrlKey){
    buyQuantity = 10;
  }
}

function keyUp() {
  buyQuantity = 1;
}
