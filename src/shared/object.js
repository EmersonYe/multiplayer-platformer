class Object {
  // Friction should be a decimal between 0 and 1.
  constructor(id, x, y) {
    this.id = id;
    this.x = x;
    this.y = y;
  }

  update(dt) {
  }

  distanceTo(object) {
    const dx = this.x - object.x;
    const dy = this.y - object.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  serializeForUpdate() {
    return {
      id: this.id,
      x: this.x,
      y: this.y,
    };
  }
}

module.exports = Object;
