const THRESHOLD = 100;
const ring = (stars, r, m) => {
  const cx = width / 2;
  const cy = height / 2;
  for (let i = 0, step = TWO_PI / m; i <= TWO_PI; i += step) {
    stars.push(new Star(cos(i) * r + cx, sin(i) * r + cy, 0, 0));
  }
};

class Field {
  constructor(n, m = 12) {
    this.stars = [];
    ring(this.stars, 50, 6);
    ring(this.stars, 100, 8);
    ring(this.stars, 150, 12);
    for (let i = 0; i < n; i++) {
      this.stars.push(new Star());
    }
  }
  draw() {
    this.stars.forEach(star => {
      star.draw();
      this.stars.forEach(otherStar => {
        if (star !== otherStar) {
          const d = star.pos.dist(otherStar.pos);
          if (d <= THRESHOLD) {
            const color = map(d, 0, THRESHOLD, 200, 0);
            const width = map(d, 0, THRESHOLD, 3, 0);
            strokeWeight(width);
            stroke(50, 150, 255, color);
            line(star.pos.x, star.pos.y, otherStar.pos.x, otherStar.pos.y);
          }
        }
      });
    });
  }
}
