
// generate the  random speed for bugs
function generateRandomSpeed(level) {
  return Math.floor((Math.random() * 80) + 80)*(1+level/10);
}

// generate the initial random position for bugs
function generateInitialPosition() {
  return Math.floor(Math.random()*400);
}

function addEnemies (allEnemies) {
  const levelElement = document.querySelector(".levelNum");
  const levelNum = parseInt(levelElement.innerText);
  //level determines the speed of the bugs
  allEnemies.push(new Enemy(generateInitialPosition(), 60,generateRandomSpeed(levelNum)));
  allEnemies.push(new Enemy(generateInitialPosition(), 143,generateRandomSpeed(levelNum)));
  allEnemies.push(new Enemy(generateInitialPosition(),143+83,generateRandomSpeed(levelNum)));
}


function restartGame() {
  player.x = 202;
  player.y = 392;
  allEnemies = [];
  addEnemies(allEnemies);
}

// decrease the number of life by one
function decreaseNumOfLife() {
  const livesElement = document.querySelectorAll('.life');
  for (lifeElement of livesElement) {
    if (lifeElement.style.display != 'none') {
      lifeElement.style.display = 'none';
      return;
    }
  }
}

//check the number of life
function checkNumOfLife() {
  const livesElement = document.querySelectorAll('.life');
  let count = 0;
  for (lifeElement of livesElement) {
    if (lifeElement.style.display != 'none') {
      count++
    }
  }
  return count;
}

//display default setup from the begining of the game, game level and num of lives
function defaultSetUp() {
  const livesElement = document.querySelectorAll('.life');
  for (lifeElement of livesElement) {
    lifeElement.style.display = 'inline-block';
  }
  document.querySelector(".win-game").setAttribute("data-win",false);
  document.querySelector(".game-continue").style.display = "none";
  document.querySelector(".game-over").style.display = "none";
  document.querySelector(".win-game").style.display = "none";
  //set level to 1;
  document.querySelector(".levelNum").innerText = 1;
  document.querySelector("#play-again").innerText = "Continue";




}

//display modal and remove the eventlistenr of the keyboardup
function diaplayModal(Win=false) {
  const numberOfLife = checkNumOfLife();
  const modalElement = document.querySelector(".modal");
  modalElement.style.display = "block";
  if (numberOfLife == 0) {
    // diplay game over text
    document.querySelector(".game-continue").style.display = "none";
    document.querySelector(".game-over").style.display = "block";
    document.querySelector("#play-again").innerText = "Play Again";
  }
  else if (Win) {
    document.querySelector(".game-continue").style.display = "none";
    document.querySelector(".win-game").style.display = "block";
    document.querySelector("#play-again").innerText = "Play Again";
  }
  else {
    document.querySelector(".game-continue").style.display = "block";
    document.querySelector(".numOfLife").innerText = numberOfLife;
    document.querySelector(".failedLevel").innerText = document.querySelector(".levelNum").innerText;
  }
  //remove the eventlistenr of the keyboardup
  document.removeEventListener('keyup', keyboard);
}

// instantiate objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const player = new Player(202,392);
let allEnemies = [];
addEnemies(allEnemies);



function checkCollisions() {
  allEnemies.forEach(function(enemy) {
    if (enemy.collision(player)) {
      //check the number of life lefe, if there is zero life left, then game overflow
      if (checkNumOfLife() == 0) {
        //display the modeal to tell the user game over
        diaplayModal();
        return;
      }

      restartGame();
      // decrease the number of life by one if the player lose the game
      decreaseNumOfLife();
      //display the modeal to tell the user how many life is left
      diaplayModal();
    }
  })
}

// hide modal and restart the game
document.addEventListener('click', function(event) {
    const modalElement = document.querySelector(".modal");

    // if user click close or play again, the game restart
    if (event.target.id == "play-again" || event.target.classList[0] == "close") {
      modalElement.style.display = "none";
      document.addEventListener('keyup', keyboard);
    }

    // if the user clicks anywhere outside of the modal, close it
    if (event.target == modalElement) {
      modalElement.style.display = "none";
      document.addEventListener('keyup', keyboard);
    }

    if (checkNumOfLife() == 0) {
      // starts from level 1, and given the user three lives
      defaultSetUp();
      restartGame();
    }
    if (document.querySelector(".win-game").getAttribute("data-win") == "true") {
      defaultSetUp();
      restartGame();
    }

})


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
function keyboard(e)  {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
}

document.addEventListener('keyup', keyboard);
