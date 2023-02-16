class Animal extends MovingCell {
  constructor(x, y, type, colour) {
    super(x, y, type, colour);
    this.isImmune = false;
  }

  makeImmune() {
    if (!this.isImmune) {
      this.isImmune = true;
      this.colour = shade(this.colour, -50);
    }
  }
}
