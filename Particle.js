class Particle {
  constructor(part, x, y, size, color) {
    this.part = part;
    this.x = x;
    this.y = y;
    this.initX = x + canvas.width / parts / 2;
    this.initY = y + canvas.height / parts / 2;
    // this.size = size;
    this.size = this.randomIntFromRange(10, 20) * 2;
    this.radians = Math.random() * Math.PI * 2;
    this.velocity = this.randomIntFromRange(1, 10) / 2000;
    this.color = color;
    this.randomNumber = Math.random() + 0.7;
    this.distanceFromCenter = {
      // this property defines the animation. in this case: the orbital effect
      x: this.randomIntFromRange(canvas.height / 2, canvas.height / 2) / 1.5,
      y: this.randomIntFromRange(-canvas.height / 2, canvas.height / 2) / 1.5,
    };
  }

  // function to generate a random number between min and max
  randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  // function to draw the Particle object
  draw() {
    const dots = true;
    if (!dots) {
      c.putImageData(this.part, this.x, this.y);
    } else {
      c.beginPath();
      c.fillStyle = this.color;
      c.arc(this.x, this.y, this.size / 2, 0, 2 * Math.PI);
      c.fill();
      c.stroke();
    }
  }

  // function to manipulate the properties of the object
  orbit() {
    this.radians += this.velocity;
    this.x =
      canvas.width / 2 + Math.cos(this.radians) * this.distanceFromCenter.x;
    this.y =
      canvas.height / 2 + Math.sin(this.radians) * this.distanceFromCenter.y;
    this.draw();
  }

  // function to bring the part back to it's initial position
  toInitial() {
    // for now, it runs only in straight lines and in angles of 45 degrees. need to be looked into.
    const distanceX = this.x - this.initX;
    if (distanceX > 1) {
      this.x -= this.randomNumber;
    } else if (distanceX < -1) {
      this.x += this.randomNumber;
    } else {
      this.x = this.initX;
    }

    const distanceY = this.y - this.initY;
    if (distanceY > 1) {
      this.y -= this.randomNumber;
    } else if (distanceY < -1) {
      this.y += this.randomNumber;
    } else {
      this.y = this.initY;
    }

    this.draw();
  }
}
