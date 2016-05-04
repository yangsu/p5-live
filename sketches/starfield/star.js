const rand = n => randomGaussian() * n - n / 2;
class Star {
  constructor(x = random(width), y = random(height), vx = rand(2), vy = rand(2)) {
    this.pos = new p5.Vector(x, y);
    this.speed = new p5.Vector(vx, vy);
  }
  draw() {
    stroke(200);
    point(this.pos.x, this.pos.y);
    this.update();
  }
  update() {
    this.pos.add(this.speed);
    this.pos.x = (this.pos.x + width) % width;
    this.pos.y = (this.pos.y + height) % height;
  }
}
