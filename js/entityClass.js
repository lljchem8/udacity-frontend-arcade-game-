class Entity {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

class Enemy extends Entity {
  constructor(x,y,speed) {
    super(x,y);
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
  }

  // Update the enemy's position, required method for game
  // Parameter: dt, a time delta between tick
  update(dt) {
    if (this.x>505)
      this.x -= 505;
    this.x = this.x + dt*this.speed*1.5;
  }

  //colllision condition
  collision(player) {
    if (this.y == player.y) {
      if (Math.abs(this.x-player.x) < 30) {
        console.log("player:", player.x, player.y);
        console.log("bug:", this.x, this.y);
        return true;
      }
    }
    return false;
  }
}

class Player extends Entity {
  constructor(x,y) {
    super(x,y);
    this.sprite = "images/char-boy.png";
  }

  update() {
    //do nothing;
  }

  handleInput(direction) {
    const horizontal = 101;
    const vertical = 83;
    if (direction == 'left' && this.x - horizontal >= 0) {
      this.x -= horizontal;
      console.log(this.x);
    }
    else if (direction == 'right' && this.x+horizontal < ctx.canvas.width) {
      this.x += horizontal;
      console.log(this.x);
    }
    else if (direction == 'up' && this.y  > 0) {
      this.y -= vertical;
      console.log(this.y);
    }
    else if (direction == 'down' && this.y + 3*vertical < ctx.canvas.height) {
      this.y += vertical;
      console.log(this.y);
    }
  }
}
