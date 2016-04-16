$(document).ready(start);

function start(){
  centreText();
  initialiseUnits();
  initialiseContainers();
  initialiseweapons();
  setInterval(updateAllText, 17);
};

var units = (function() {
    var unitlist = [];
    var sizes = ["a", "a few", "several", "a dozen", "a mob of", "a batallion of", "an army of", "a horde of", "a legion of"];
    return {
        length: function() {
          return unitlist.length;
        },
        add: function(U) {
            unitlist.push(U);
        },
        get: function(N) {
            return unitlist[N];
        },
        find: function(name, offset){
          for(i = 0; i < unitlist.length; ++i){
            if(unitlist[i].name === name){
              if(i + offset >= 0){
                return unitlist[i + offset];
              }
            }
          }
          return null;
        },
        getprefix(U){
          if(U != null){
            var q = Math.floor(U.quantity);
            var name = U.name;
            if(q === 0){
              return "no " + name + "s";
            } else if(q === 1){
              return sizes[0] + " " + name;
            } else if (q < 4){
              return sizes[1] + " " + name + "s";
            } else if (q < 8){
              return sizes[2] + " " + name + "s";
            } else if (q < 12){
              return sizes[3] + " " + name + "s";
            } else if (q < 20){
              return sizes[4] + " " + name + "s";
            } else if (q < 40){
              return sizes[5] + " " + name + "s";
            } else if (q < 100){
              return sizes[6] + " " + name + "s";
            } else if (q < 150){
              return sizes[7] + " " + name + "s";
            } else if (q >= 150){
              return sizes[8] + " " + name + "s";
            }
          }
          return "baditem";
        }
    };

})();

function unit(name, quantity, buttonId, power, cost, trainQuantity) {
  if(!(this instanceof unit) ) {
    return new unit(name, quantity, buttonId, power, cost, trainQuantity);
  }
  var self = this;
  this.name = name;
  this.quantity = quantity;
  this.power = power;
  this.cost = cost;
  this.trainQuantity = trainQuantity;
  this.button = $("#" + buttonId)[0];
  this.statsButton = $("#" + buttonId + "_stats");

  this.button.textContent = "no " + self.name + "s";
  this.button.onclick = updatequantity.bind(self);
  setInterval(self.reproduce.bind(self), 1000);
  this.statsButton.text("please wait");
};

unit.prototype.reproduce = function() {
    var prev = units.find(this.name, -1);
    if(prev != null){
      prev.quantity += this.quantity / 10;
      kills.add(prev.power * this.quantity / 10);
    }
}

unit.prototype.train = function(N) {
  this.quantity -= this.trainQuantity * N;
}

unit.prototype.updateText = function() {
  this.button.textContent = units.getprefix(units.find(this.name, 0));
  var quantity = Math.round(this.quantity);
  var quantityString = quantity + " " + this.name + "s\n";
  if(quantity === 1){
    quantityString = quantity + " " + this.name + "\n";
  }
  var killingString = "killing " + (Math.floor(this.quantity * this.power) * 10) / 10 + " demons\n";
  var producing = units.find(this.name, -1);
  var producingString = "";
  if(producing !== null) {
    producingString = "producing " + Math.round(this.quantity / 10) + " " + producing.name + "s per second";
  }
  this.statsButton.text(quantityString + killingString + producingString);
}

function updatequantity(){
  var toBuy = buyQuantity;
  if (souls.remaining() < this.cost * toBuy) {
    toBuy = Math.floor(demonsSouls / this.cost);
  }
  var prev = units.find(this.name, -1);
  var upgrade = false;
  if(prev === null){
    upgrade = true;
  } else {
    if(prev.quantity < prev.trainQuantity * toBuy) {
      toBuy = Math.floor(prev.quantity / prev.trainQuantity);
    }
    prev.train(toBuy);
    upgrade = true;
  }
  if(upgrade){
    this.quantity += toBuy;
    souls.consume(this.cost * toBuy);
  }
  updateAllText();
};

function initialiseUnits(){
  units.add(new unit("forgetful farmer", 1, "farmer", 1, 1, 20));
  units.add(new unit("busty barmaid", 0, "barmaid", 5, 10, 15));
  units.add(new unit("maimed militiaman", 0, "militiaman", 25, 100, 10));
  units.add(new unit("beastly barbarian", 0, "barbarian", 125, 1000, 6));
  units.add(new unit("vengeful valkyrie", 0, "valkyrie", 625, 10000, 4));
  units.add(new unit("destructive demigod", 0, "demigod", 3125, 100000, 2));
}
