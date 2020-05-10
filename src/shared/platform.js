const shortid = require('shortid');
const ObjectClass = require('./object');
const Constants = require('./constants');

class Platform extends ObjectClass {
  constructor(x, y, width, height) {
    super(shortid(), x, y);
    this.width = width;
    this.height = height;
    this.color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

  serializeForUpdate() {
    return {
      ...(super.serializeForUpdate()),
      width: this.width,
      height: this.height,
      color: this.color,
    };
  }
}

module.exports = Platform;
