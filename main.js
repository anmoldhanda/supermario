const player = document.querySelector(".player");
const dragon = document.querySelector(".dragon");
const usermove = new Audio("music/usermove.mp3");
const gameoverindicator = document.querySelector(".gameoverindicator");
const scoreindicator = document.getElementById("scoreindicator");
const lasthighestscore = document.getElementById("lasthighestscore");
let currentscore = 0;
let tackle = true;
document.onkeydown = function (e) {
  // if up arrow up key is pressed then jump the player
  if (e.keyCode == 38) {
    // console.log(`key code for ${e.key} is ${e.keyCode}`);
    player.classList.add("playerjump");
    usermove.play();
    setTimeout(() => {
      player.classList.remove("playerjump");
      usermove.pause();
    }, 700);
  }
  // if arrow right key is pressed then player will move forwards in right direction
  else if (e.keyCode == 39) {
    // console.log(`key code for ${e.key} is ${e.keyCode}`);
    let playerxoffset = Number.parseInt(
      window.getComputedStyle(player, null).getPropertyValue("left")
    );
    player.style.left = playerxoffset + 250 + "px";
    player.classList.remove("playerleftface");
  }
  // if arrow left key is pressed then the player will move backwards in left direction
  else if (e.keyCode == 37) {
    // console.log(`key code for ${e.key} is ${e.keyCode}`);
    let playerxoffset = Number.parseInt(
      window.getComputedStyle(player, null).getPropertyValue("left")
    );
    player.style.left = playerxoffset - 250 + "px";
    player.classList.add("playerleftface");
  }
};

setInterval(() => {
  // player's & dragon's top,right,bottom,left position's value according to the windowscomputedstyle then converted into integer
  let playerxoffset = Number.parseInt(
    window.getComputedStyle(player, null).getPropertyValue("left")
  );
  let playeryoffset = Number.parseInt(
    window.getComputedStyle(player, null).getPropertyValue("top")
  );
  let dragonxoffset = Number.parseInt(
    window.getComputedStyle(dragon, null).getPropertyValue("left")
  );
  let dragonyoffset = Number.parseInt(
    window.getComputedStyle(dragon, null).getPropertyValue("top")
  );
  let offsetxabsolutevalue = Math.abs(playerxoffset - dragonxoffset);
  let offsetyabsolutevalue = Math.abs(playeryoffset - dragonyoffset);
  // if the player within these co-ordinates with the dragon then the game is over otherwise it will update and print the score
  if (offsetxabsolutevalue < 93 && offsetyabsolutevalue < 52) {
    // console.log("game over");
    gameoverindicator.style.display = "block";
    dragon.classList.remove("dragoncomes");
  } else if (offsetxabsolutevalue < 100 && tackle) {
    currentscore += 1;
    updatescore(currentscore);
    // tackle means the player is successfully bypassed the dragon by default tackle true means the score can be updated then set to false and again after 1 second set to true so it will not run again and again
    tackle = false;
    setTimeout(() => {
      tackle = true;
    }, 1000);
  }
}, 100);

function updatescore(currentscore) {
  let lastscore = (scoreindicator.innerHTML =
    "Highest Score is " + currentscore);
  localStorage.setItem("lastscore", lastscore);
}
lasthighestscore.innerHTML = localStorage.getItem("lastscore");
