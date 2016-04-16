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
  }
  return totalAdded - N;
};

function useDemonsSouls(N){
  if(N < 0){
    alert("you cannot use less than 0 demons souls");
  }
  var used = 0;
  for(i = containers.length() - 1; i >= 0; --i) {    
    //Number of souls in this container
    var totalSouls = Math.floor(containers.get(i).currentQuantity);
    //Number to remove from that container
    var amountToRemove = 0;
    //If there are more (or the same) number of souls in the container as the amount we want to remove then remove N
    if(totalSouls >= N){
      amountToRemove = N;
    } else {
      //Otherwise remove all the souls in the container
      amountToRemove = totalSouls;
    }
    used += amountToRemove;
    if(amountToRemove < 0){
      alert(used + " "+ amountToRemove + " "+totalSouls);
    }
    containers.get(i).currentQuantity -= amountToRemove;
    N -= amountToRemove;
  }
  if(N != 0){
    alert("something has gone wrong, used:" + used + ", needed to use N:" + N);
  }
  return used;
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
  if(souls.remaining() >= this.cost * buyQuantity && this.percent + buyQuantity <= 100){
      this.percent += buyQuantity;
      souls.consume(this.cost * buyQuantity);
  }
};

function initialiseContainers(){
  containers.add(new container("vacuous vial", 20, "vial", 1));
  containers.add(new container("fractured flask", 200, "flask", 8));
  containers.add(new container("generous jug", 2000, "jug", 32));
  containers.add(new container("perplexing pool", 20000, "pool", 128));
  containers.add(new container("bottomless basin", 2000000, "basin", 512));
  containers.add(new container("opaque ocean", 20000000, "ocean", 2056));
}
