var containers = (function() {
    var containerlist = [];
    var sizes = ["a crude", "a simple", "a valuable", "a treasured", "a deep", "a boundless", "an impossible"];
    return {
        length: function() {
          return containerlist.length;
        },
        add: function(U) {
            containerlist.push(U);
        },
        get: function(N) {
            return containerlist[N];
        },
        find: function(name, offset){
          for(i = 0; i < containerlist.length; ++i){
            if(containerlist[i].name === name){
              if(i + offset >= 0){
                return containerlist[i + offset];
              }
            }
          }
          return null;
        },
        getprefix(U){
          if(U != null){
            var q = Math.floor(U.percent);
            var name = U.name;
            if(q === 0){
              return "an empty " + name + "";
            } else if(q < 10){
              return sizes[0] + " " + name;
            } else if (q < 20){
              return sizes[1] + " " + name;
            } else if (q < 30){
              return sizes[2] + " " + name;
            } else if (q < 50){
              return sizes[3] + " " + name;
            } else if (q < 70){
              return sizes[4] + " " + name;
            } else if (q < 90){
              return sizes[5] + " " + name;
            } else if (q <= 100){
              return sizes[6] + " " + name;
            }
          }
          return "baditem";
        }
    };

})();

function container(name, size, buttonId, cost) {
  if(!(this instanceof container) ) {
    return new container(name, size, buttonId, cost);
  }
  var self = this;
  this.name = name;
  this.maximumSize = size;
  this.minimumSize = size / 10;
  this.cost = cost;
  this.buttonId = buttonId;
  this.percent = 0;
  this.currentQuantity = 0;

  $("#" + buttonId)[0].textContent = "an empty " + self.name;
  $("#" + buttonId)[0].onclick = updatesize.bind(self);
  $("#" + this.buttonId + "_stats").text("the " + self.name + " is empty");
};

function addDemonsSouls(N){
  var totalAdded = N;
  for(i = 0; i < containers.length(); ++i) {
    var remainingSpace = containers.get(i).getRemainingSpace();
    if(remainingSpace > 0 && (containers.get(i).percent >= 1 || i == 0)){
      var amountToAdd = 0;
      if(remainingSpace >= N){
        amountToAdd = N;
        N = 0;
      } else {
        amountToAdd = remainingSpace;
        N -= remainingSpace;
      }
      containers.get(i).currentQuantity += amountToAdd;
    }
    containers.get(i).updateText();
  }
  demonsSouls += totalAdded - N;
  return totalAdded - N;
};

function useDemonsSouls(N){
  for(i = 0; i < containers.length(); ++i) {
    var totalSouls = containers.get(i).currentQuantity;
    var amountToRemove = 0;
    if(totalSouls >= N){
      amountToRemove = N;
    } else {
      amountToRemove = totalSouls;
    }
    containers.get(i).currentQuantity -= amountToRemove;
    containers.get(i).updateText();
  }
  demonsSouls -= N;
}

container.prototype.getRemainingSpace = function() {
  var totalSpace = Math.floor((this.maximumSize - this.minimumSize) * (this.percent / 100)) + this.minimumSize;
  var remainingSpace = totalSpace - this.currentQuantity;
  return remainingSpace;
}

container.prototype.updateText = function() {
  $("#" + this.buttonId)[0].textContent = containers.getprefix(containers.find(this.name, 0));
  var size = Math.round((this.maximumSize - this.minimumSize) * (this.percent / 100)) + this.minimumSize;
  var sizeString = "the capacity of the " + this.buttonId + " is " + size + "\n";
  var percentString = "at " + Math.round(this.percent) + "% maximum capacity\n";
  var containingString = "currently containing " + Math.round(this.currentQuantity) + " souls";
  $("#" + this.buttonId + "_stats").text(sizeString + percentString + containingString);
}

function updatesize(){
  if(demonsSouls >= this.cost * buyQuantity && this.percent + buyQuantity <= 100){
      this.percent += buyQuantity;
      useDemonsSouls(this.cost * buyQuantity);
  }
  this.updateText();
};

function initialiseContainers(){
  containers.add(new container("vacuous vial", 20, "vial", 2));
  containers.add(new container("fractured flask", 200, "flask", 8));
  containers.add(new container("generous jug", 2000, "jug", 32));
  containers.add(new container("perplexing pool", 20000, "pool", 128));
  containers.add(new container("bottomless basin", 2000000, "basin", 512));
  containers.add(new container("opaque ocean", 20000000, "ocean", 2056));
}
