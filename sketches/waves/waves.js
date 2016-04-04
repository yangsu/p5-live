const size = 800;
const fieldDensity = 20;
let field;
function setup() {
  createCanvas(size, size);
  field = new FlowField(fieldDensity, fieldDensity, (i, j) => {
    return new p5.Vector(1, 1);
  });
}

function draw() {
  fill(0, 10);
  rect(0, 0, width, height);
  field.draw();
}

function mouseMoved() {
  const mouse = new p5.Vector(mouseX, mouseY);
  if (mouse.magSq() > 0) {
    field.update((direction, position) => {
      const newDirection = p5.Vector.sub(mouse, position);
      const mag = newDirection.mag();
      newDirection
        .normalize()
        .mult(map(mag, 0, 100, 0, 20));
      direction.set(newDirection);
    });
  }
}
