$(document).ready(start);

function start(){
  centreText();
  initialiseUnits();
  setInterval(updateText, 17);
};

var units = (function() {
    var unitlist = [];
    var sizes = ["a", "a few", "several", "a dozen", "a mob of", "a batallion of", "an army of", "a horde of", "a legion of"];
    return {
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
  this.quantityButton = $('#' + buttonId +'_quantity')[0];
  this.power = power;
  this.cost = cost;
  this.trainQuantity = trainQuantity;
  this.buttonId = buttonId;

  $("#" + buttonId)[0].textContent = "no " + self.name + "s";
  this.quantityButton.textContent = "0";
  $("#" + buttonId)[0].onclick = updatequantity.bind(self);
  setInterval(self.reproduce.bind(self), 1000);
};

unit.prototype.reproduce = function() {
    var prev = units.find(this.name, -1);
    if(prev != null){
      prev.quantity += this.quantity / 10;
    }
    this.updateText();
}

unit.prototype.train = function() {
  this.quantity -= this.trainQuantity;
  this.quantityButton.textContent  = Math.floor(this.quantity).toString();
}

unit.prototype.updateText = function() {
  this.quantityButton.textContent = Math.floor(this.quantity).toString();
  $("#" + this.buttonId)[0].textContent = units.getprefix(units.find(this.name, 0));
}

function updatequantity(){
  if(demonsSouls >= this.cost * buyQuantity){
    var prev = units.find(this.name, -1);
    var upgrade = false;
    if(prev === null){
      upgrade = true;
    } else if(prev.quantity >= prev.trainQuantity){
      prev.train();
      upgrade = true;
    }
    if(upgrade){
      this.quantity += buyQuantity;
      this.quantityButton.textContent = Math.floor(this.quantity).toString();
      updatedemonsKilledPerTick(this.power);
      updateDemonsSouls(-this.cost * buyQuantity);
    }
  }
  this.updateText();
};

function updatedemonsKilledPerTick(N){
  demonsKilledPerTick += N;
}

function updateDemonsSouls(N){
  demonsSouls += N;
}

function initialiseUnits(){
  units.add(new unit("forgetful farmer", 0, "farmer", 1, 1, 20));
  units.add(new unit("busty barmaid", 0, "barmaid", 5, 10, 15));
  units.add(new unit("maimed militiaman", 0, "militiaman", 25, 100, 10));
  units.add(new unit("beastly barbarian", 0, "barbarian", 125, 1000, 6));
  units.add(new unit("vengeful valkyrie", 0, "valkyrie", 625, 10000, 4));
  units.add(new unit("destructive demigod", 0, "demigod", 3125, 100000, 2));
}
