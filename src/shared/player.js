const ObjectClass = require('./object');
const Constants = require('./constants');

class Player extends ObjectClass {
  constructor(id, username, x, y) {
    super(id, x, y);
    this.dx = 0;
    this.dy = 0;
    this.username = username;
    this.isAlive = true;
    this.score = 0;
    this.color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    this.input = {
      up: false,
      down: false,
      left: false,
      right: false,
    };
    // TODO(emersonye): check if on ground.
    this.isOnGround = true;
    this.canJump = true;
  }

  update(dt) {
    super.update(dt);

    // Jump
    if (this.input.up && this.isOnGround && this.canJump) {
      this.dy -= 100;
      this.canJump = false;
    }
    if (this.input.down) {
      // Do nothing for now. Maybe implement drop thru platforms later.
    }
    if (this.input.left) {
      // this.x -= Constants.PLAYER_MAX_SPEED * dt;
      this.dx = -Constants.PLAYER_MAX_SPEED;
    }
    if (this.input.right) {
      this.dx = Constants.PLAYER_MAX_SPEED;
      // this.x += Constants.PLAYER_MAX_SPEED * dt;
    }

    // Gravity & friction.
    if (this.isOnGround) {
      this.dx *= Constants.FRICTION;
      this.dy = 0;
    } else {
      this.dy += 10;
    }
    this.x += this.dx;
    this.y += this.dy;

    // Make sure the player stays in bounds
    this.x = Math.max(0, Math.min(Constants.MAP_SIZE, this.x));
    this.y = Math.max(0, Math.min(Constants.MAP_SIZE, this.y));
  }

  takeDamage() {
    this.isAlive = false;
  }

  onKill() {
    this.score += Constants.SCORE_KILL;
  }

  onWin() {
    this.score += Constants.SCORE_WIN;
  }

  setInput(input) {
    this.input = input;
  }

  serializeForUpdate() {
    return {
      ...(super.serializeForUpdate()),
      username: this.username,
      score: this.score,
      isAlive: this.isAlive,
      color: this.color,
    };
  }
}

module.exports = Player;
