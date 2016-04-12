$(document).ready(start);

var deadDemons = 0, demonsKilledPerSecond = 1;

var units = [];

function unit(name, quantity, buttonId, power) {
  var thisunit = this;

  this.name = name;
  this.quantity = quantity;
  this.quantityButton = $('#' + buttonId +'_quantity')[0];
  this.power = power;

  this.updateQuantity = function(){
    thisunit.quantity = thisunit.quantity + 1;
    thisunit.quantityButton.textContent  = thisunit.quantity.toString();
    updateDemonsKilledPerSecond(power);
  };
  $("#" + buttonId)[0].onclick = this.updateQuantity;
};

function updateDemonsKilledPerSecond(N){
  demonsKilledPerSecond += N;
}

function initialiseUnits(){
  units.push(new unit("A forgetful farmer", 0, "farmer", 1));
  units.push(new unit("A busty barmaid", 0, "barmaid", 5));
  units.push(new unit("A vengeful valkyrie", 0, "valkyrie", 20));
}

function centreText(){
  var textHeight = $('h1').height() / 2;
  var textWidth = $('h1').width() / 2;
  var windowHeight = $(window).height() / 2;
  var windowWidth = $(window).width() / 2;
  var leftOffset = windowWidth - textWidth;
  var topOffset = windowHeight - textHeight;
  $('h1').css("margin-top", topOffset + "px");
  $('h1').css("margin-left", leftOffset + "px");
}

function updateText(){
  $('h1').text("You have killed " + deadDemons + " demons...");
  deadDemons += demonsKilledPerSecond;
}

function start(){
  centreText();
  initialiseUnits();
  setInterval(updateText, 17);
};
