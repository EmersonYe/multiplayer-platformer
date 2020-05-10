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
    this.isOnGround = false;
    this.canJump = true;
  }

  update(dt, platforms) {
    super.update(dt);

    // Collisions
    platforms.forEach(platform => {
      const footPix = this.y + Constants.PLAYER_RADIUS;
      if (footPix >= platform.y - (platform.height / 2) &&
          footPix <= platform.y + (platform.height / 2) &&
          this.x + Constants.PLAYER_RADIUS >= (platform.x - platform.width / 2) &&
          this.x - Constants.PLAYER_RADIUS <= (platform.x + platform.width / 2)) {
        this.y = platform.y - platform.height / 2 - Constants.PLAYER_RADIUS;
        this.dy = 0;
        this.isOnGround = true;
      } else {
        this.isOnGround = false;
      }
    });

    // Jump
    if (this.input.up && this.isOnGround && this.canJump) {
      this.dy -= 3;
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
      this.canJump = true;
    } else {
      this.dy += Constants.PLAYER_GRAVITY * dt;
    }
    this.dx *= Constants.FRICTION;
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
