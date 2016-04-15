var demonsSoulsUsedPerSecond = 0;

var weapons = (function() {
    var weaponlist = [];
    var sizes = ["a silent", "a sighing", "a whispering", "a moaning", "a wailing", "a shouting", "a clamouring", "a roaring", "a screaming", "a deafening", "a thunderous"];
    return {
        length: function() {
          return weaponlist.length;
        },
        add: function(U) {
            weaponlist.push(U);
        },
        get: function(N) {
            return weaponlist[N];
        },
        find: function(name, offset){
          for(i = 0; i < weaponlist.length; ++i){
            if(weaponlist[i].name === name){
              if(i + offset >= 0){
                return weaponlist[i + offset];
              }
            }
          }
          return null;
        },
        getprefix(U){
          if(U != null){
            var q = U.tier;
            var name = U.name;
            if(q > 10){
              q = 10;
            }
            return sizes[q] + " " + name;
          }
          return "baditem";
        }
    };

})();

function weapon(name, powerUnit, buttonId, cooldownTimer, damage) {
  if(!(this instanceof weapon) ) {
    return new weapon(name, size, buttonId, cost);
  }
  var self = this;
  this.name = name;
  this.powerUnit = powerUnit;
  this.buttonId = buttonId;
  this.tier = 0;
  this.soulsConsumed = 0;
  this.cooldown = cooldownTimer;
  setInterval(fire.bind(self), cooldownTimer);
  this.damage = damage;

  $($("#" + buttonId)[0]).text("a silent " + self.name);
  $($("#" + buttonId)[0]).siblings("button")[0].onclick = upgrade.bind(self);
  $($("#" + buttonId)[0]).siblings("button")[1].onclick = downgrade.bind(self);
  $("#" + this.buttonId + "_stats").text("the " + self.name + " is off");
};

weapon.prototype.updateText = function() {
  $($("#" + this.buttonId)[0]).text(weapons.getprefix(weapons.find(this.name, 0)));
  if(this.tier === 0){
    $("#" + this.buttonId + "_stats").text("the " + this.name + " is off");
  } else {
    var consumingString = "consuming " + this.soulsConsumed + " souls\n";
    var damageString = "outputting " + Math.pow(this.damage, tier) + " " + this.powerUnit;
    $("#" + this.buttonId + "_stats").text(consumingString + damageString);
  }
}

function fire() {
  if(demonsSoulsUsedPerSecond > demonsSoulsPerSecond){
    shutdownWeapons();
  } else {
    useDemonsSouls(this.soulsConsumed);
    //Do the damage;
  }
}

function upgrade() {
  this.tier += 1;
  if(demonsSouls >= Math.pow(this.tier, 1)) {
    useDemonsSouls(Math.pow(this.tier, 10));
    changeTier(this);
  }
}

function downgrade() {
  if(this.tier > 0){
    this.tier -= 1;
  }
  changeTier(this);
}

function changeTier(W){
  W.soulsConsumed = Math.pow(W.tier, 2);
  updateSoulsUsed();
  W.updateText();
}

function updateSoulsUsed() {
  demonsSoulsUsedPerSecond = 0;
  for(i = 0; i < weapons.length(); ++i){
    demonsSoulsUsedPerSecond += weapons.get(i).soulsConsumed * weapons.get(i).cooldown;
  }
}

function shutdownWeapons() {
  demonsSoulsUsedPerSecond = 0;
  for(i = 0; i < weapons.length(); ++i){
    weapons.get(i).tier = 0;
    weapons.get(i).soulsConsumed = 0;
    weapons.get(i).updateText();
  }
}

function initialiseweapons(){
  weapons.add(new weapon("luminous laser", "watts", "laser", 17, 5));
  weapons.add(new weapon("furious flamethrower", "kelvin", "flamethrower", 45, 12));
  weapons.add(new weapon("excitable electromagnet", "teslas", "electromagnet", 500, 150));
  weapons.add(new weapon("fickle fulmination", "joules", "fulmination", 300, 100));
  weapons.add(new weapon("penetrating plasma", "electronvolts", "plasma", 1000, 300));
  weapons.add(new weapon("ruinous railgun", "megatons", "railgun", 3000, 900));
}
