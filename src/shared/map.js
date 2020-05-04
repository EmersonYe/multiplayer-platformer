class Object {
  // Friction should be a decimal between 0 and 1.
  constructor() {
    this.id = 0;
    this.spawnX = 0;
    this.spawnY = 0;
    this.width = 1000;
    this.height = 1000;
    this.gravity = 10;
  }

  serializeForUpdate() {
    return {
      id: this.id,
      spawnX: this.spawnX,
      spawnY: this.spawnY,
      width: this.width,
      height: this.height,
      gravity: this.gravity,
    };
  }
}

module.exports = Object;
