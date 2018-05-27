var letter = [
  "A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"
];

var adjective = [
  "Yellow",
  "Meaty",
  "Sticky",
  "Super",
  "Hot",
  "Blonde",
  "Crispy",
  "Banana",
  "Mama"
];

var noun = [
  "Rabbit",
  "Bear",
  "Kid",
  "Captian",
  "Red",
  "Topic",
  "Wish",
  "Bloom",
  "Stuff",
  "Detention",
  "Bastard",
  "Box",
  "Momma"
];

function getStyle(){
  var styleNum = Math.floor(Math.random()*18+1);

  $("#name").removeClass();
  $("#siteBackground").removeClass();
  $("#name").addClass("style"+styleNum);
  $("#siteBackground").addClass("background"+styleNum);
}

function getLetter(){
  var letterIndex = Math.floor(Math.random()*letter.length);
  var letterValue = letter[letterIndex];
  $("#name").append(letterValue);
}

function getAcronym(){
  var numLetter = Math.floor(Math.random()*3+2);
  var coinFlip = Math.random();
  function slash(){
    if(coinFlip > 0.5){
      $("#name").append("/");
    }
  }
  getLetter();
  slash();
  getLetter();
  if (numLetter > 2){
    slash();
    getLetter();
  }
  if (numLetter > 3){
    slash();
    getLetter();
  }
}

function getAdjective(){
  var adjectiveIndex = Math.floor(Math.random()*adjective.length);
  var adjectiveValue = adjective[adjectiveIndex];
  $("#name").append(adjectiveValue);
}

function getNoun(){
  var nounIndex = Math.floor(Math.random()*noun.length);
  var nounValue = noun[nounIndex];
  $("#name").append(" " + nounValue);
}

function getWords(){
  var threeSidedCoin = Math.random();
  if(threeSidedCoin > .67){
    getAdjective();
  }
  if(threeSidedCoin < .33){
    getNoun();
  }
  if(threeSidedCoin >= .33 && threeSidedCoin <= .67){
    getAdjective();
    getNoun();
  }
}

function getName(){
  if(Math.random()>0.5){
    getAcronym();
  }
  else{
    getWords();
  }
}

var styleLock = false;
var nameLock = false;

function toggleStyleLock(){
  if(styleLock == false){
    $("#styleLock").addClass("fullOpacity");
    styleLock = true;
    return;
  }
  if(styleLock == true){
    $("#styleLock").removeClass("fullOpacity");
    styleLock = false;
    return;
  }
}

function toggleNameLock(){
  if(nameLock == false){
    $("#nameLock").addClass("fullOpacity");
    nameLock = true;
    return;
  }
  if(nameLock == true){
    $("#nameLock").removeClass("fullOpacity");
    nameLock = false;
    return;
  }
}

$("#styleLock").click(toggleStyleLock);
$("#nameLock").click(toggleNameLock);

var undoStatus = false;

function generate(){
  // Record previous content for undo & reset undo
  window.lastStyle = document.getElementById("name").className;
  window.lastBackground = document.getElementById("siteBackground").className;
  window.lastName = document.getElementById("name").innerHTML;
  $("#undo").css("transform", "");
  $("#undoLabel").html("(U)ndo");
  undoStatus = false;


  if(styleLock == false){
    getStyle();
  }
  if(nameLock == false){
    $("#name").html("");
    getName();
  }
}

function undo(){
  if(lastStyle){
    if(styleLock == false){
      window.redoStyle = document.getElementById("name").className;
      window.redoBackground = document.getElementById("siteBackground").className;
      $("#name").removeClass();
      $("#siteBackground").removeClass();
      $("#name").addClass(lastStyle);
      $("#siteBackground").addClass(lastBackground);
    }
    if(nameLock == false){
      window.redoName = document.getElementById("name").innerHTML;
      $("#name").html(lastName);
    }

    $("#undo").css("transform", "scaleX(-1)");
    $("#undoLabel").html("(R)edo");

    undoStatus = true;
  }
}

function redo(){
  if(redoStyle){
    $("#name").removeClass();
    $("#siteBackground").removeClass();
    $("#name").addClass(redoStyle);
    $("#siteBackground").addClass(redoBackground);
  }
  if(redoName){
    $("#name").html(redoName);
  }

  $("#undo").css("transform", "");
  $("#undoLabel").html("(U)ndo");

  undoStatus = false;
}

function undoOrRedo(){
  if(undoStatus == false){
    undo();
  }
  else{
    redo();
  }
}

$("#undo").click(undoOrRedo);

$("#button").click(generate);

$(document).keyup(function(e){
  if(e.keyCode == 32){
    generate();
  }
  if(e.keyCode == 85){
    undoOrRedo();
  }
  if(e.keyCode == 83){
    toggleStyleLock();
  }
  if(e.keyCode == 78){
    toggleNameLock();
  }
  if(e.keyCode == 82){
    redo();
  }
})
