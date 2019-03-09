
function generateRandomSpeed(level) {
  return Math.floor((Math.random() * 80) + 80)*(1+level/10);
}

function generateInitialPosition() {
  return Math.floor(Math.random()*400);
}

function addEnemies (allEnemies) {
  const levelElement = document.querySelector(".levelNum");
  const levelNum = parseInt(levelElement.innerText);

  allEnemies.push(new Enemy(generateInitialPosition(), 60,generateRandomSpeed(levelNum)));
  allEnemies.push(new Enemy(generateInitialPosition(), 143,generateRandomSpeed(levelNum)));
  allEnemies.push(new Enemy(generateInitialPosition(),143+83,generateRandomSpeed(levelNum)));
  console.log(levelNum);
}

function restartGame() {
  player.x = 202;
  player.y = 392;
  allEnemies = [];
  level = 1;
  addEnemies(allEnemies);
}

// instantiate objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const player = new Player(202,392);
let allEnemies = [];
addEnemies(allEnemies);
let level = 1;


function checkCollisions() {
  allEnemies.forEach(function(enemy) {
    if (enemy.collision(player)) {
      const modalElement = document.querySelector(".modal");
      modalElement.style.display = "block";
    }
  })
}

// hide modal and restart the game
document.addEventListener('click', function(event) {
    console.log(event.target.classList);
    const modalElement = document.querySelector(".modal");

    // if user click close or play again, the game restart
    if (event.target.id == "play-again" || event.target.classList[0] == "close") {
      modalElement.style.display = "none";
      restartGame();
    }

    // if the user clicks anywhere outside of the modal, close it
    if (event.target == modalElement) {
      modalElement.style.display = "none";
      restartGame();
    }
})


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
