// Enemies our player must avoid
function generateRandomSpeed() {
  return Math.floor((Math.random() * 120) + 50);
}





// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const player = new Player(202,392);
const allEnemies = [];
(function addEnemies () {
  allEnemies.push(new Enemy(-1, 60,generateRandomSpeed()));
  allEnemies.push(new Enemy(-1, 143,generateRandomSpeed()));
  allEnemies.push(new Enemy(-1,143+83,generateRandomSpeed()));
}());

function checkCollisions() {
  allEnemies.forEach(function(enimy) {
    if (enimy.collision(player)) {
      player.x = 202;
      player.y = 392;
      alert("game over");
    }
  })
}







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
