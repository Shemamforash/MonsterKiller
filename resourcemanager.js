var kills = (function() {
  var killed = 0;
  var toKill = 0;
  return {
    add : function(N) {
      toKill += N;
    },
    update : function() {
      var oldKillRate = toKill;
      killed += toKill;
      toKill = 0;
      souls.add(0.05 * oldKillRate);
      return oldKillRate;
    },
    total : function() {
      return killed;
    }
  }
})();

var souls = (function() {
  var soulsToConsume = 0;
  var totalSouls = 1;
  var soulsToAdd = 0;
  return {
    remaining : function() {
      return totalSouls - soulsToConsume;
    },
    consume : function(N) {
      var newAmount = N + soulsToConsume;
      if(newAmount > totalSouls){
        alert("error- too many souls consumed");
      } else {
        soulsToConsume += N;
      }
    },
    add : function(N){
      soulsToAdd += N;
    },
    updateQuantities : function(){
      var difference = soulsToAdd - soulsToConsume;
      totalSouls += addDemonsSouls(soulsToAdd);
      totalSouls -= useDemonsSouls(soulsToConsume);
      soulsToAdd = 0;
      soulsToConsume = 0;
      return difference;
    }
  }
})();

function updateSoulsUsed() {
  demonsSoulsUsedPerSecond = 0;
  for(i = 0; i < weapons.length(); ++i){
    demonsSoulsUsedPerSecond += weapons.get(i).soulsConsumed * weapons.get(i).cooldown;
  }
}
