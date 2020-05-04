const ObjectClass = require('./object');
const Constants = require('./constants');

class Player extends ObjectClass {
  constructor(id, username, x, y) {
    super(id, x, y);
    this.username = username;
    this.isAlive = true;
    this.score = 0;
    this.color = '#'+Math.floor(Math.random()*16777215).toString(16);
    this.input = {
      up: false,
      down: false,
      left: false,
      right: false,
    };
    // TODO(emersonye): check if on ground.
    this.isOnGround = true;
  }

  update(dt) {
    super.update(dt);

    if (this.input.up && this.canJump) {
      this.jump();
    }
    if (this.input.down) {
      // Do nothing for now. Maybe implement drop thru platforms later.
    }
    if (this.input.left) {
      this.x -= Constants.PLAYER_MAX_SPEED * dt;
    }
    if (this.input.right) {
      this.x += Constants.PLAYER_MAX_SPEED * dt;
    }
    // Make sure the player stays in bounds
    this.x = Math.max(0, Math.min(Constants.MAP_SIZE, this.x));
    this.y = Math.max(0, Math.min(Constants.MAP_SIZE, this.y));
  }

  jump() {
    this.isOnGround = false;
    this.y -= Constants.PLAYER_MAX_SPEED;
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
