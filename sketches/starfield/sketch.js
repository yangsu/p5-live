const size = 800;
let field;

function setup() {
  createCanvas(size, size);
  background(0);
  field = new Field(200);
}

function draw() {
  background(0);
  // fill(0, 10);
  // rect(0, 0, width, height);
  field.draw();
}
