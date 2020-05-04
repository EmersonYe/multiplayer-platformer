const ObjectClass = require('./object');
const Constants = require('./constants');

class Platform extends ObjectClass {
  constructor(id, x, y, width, height, owner) {
    super(id, x, y);
    this.width = width;
    this.height = height;
    this.owner = owner;
  }

  serializeForUpdate() {
    return {
      ...(super.serializeForUpdate()),
      width: this.width,
      height: this.height,
      owner: this.owner,
    };
  }
}

module.exports = Player;