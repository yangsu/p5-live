const size = 800;
const fieldDensity = 40;
const noiseMultiplier = 0.05;
let field;
let maxDist;
let maxArrowSize;
let x = 0;
let y = 0;

function setup() {
  createCanvas(size, size);
  field = new FlowField(fieldDensity, fieldDensity, (i, j) => {
    const theta = map(noise(i * noiseMultiplier, j * noiseMultiplier), 0, 1, 0, TWO_PI);
    return new p5.Vector(cos(theta), sin(theta));
  });
  maxDist = pow(dist(0, 0, width, height) / 2, 2);
  const cellSize = size / fieldDensity;
  maxArrowSize = dist(0, 0, cellSize, cellSize) / 2;
  background(0);
}

function draw() {
  // noiseDetail(3, 0.45);
  background(0);
  // fill(0, 10);
  // rect(0, 0, width, height);
  x += map(noise(frameCount * 0.05), 0, 1, -2, 2);
  y += map(noise(frameCount * 0.05 + 10000), 0, 1, -2, 2);
  field.update((direction, position, i, j) => {
    const theta = map(noise((i + x * 2) * noiseMultiplier, (j + y * 2) * noiseMultiplier), 0, 1, 0, TWO_PI);
    direction.set(cos(theta), sin(theta));
  });
  field.draw();
}

// function mouseMoved() {
//   const mouse = new p5.Vector(mouseX, mouseY);
//   if (mouse.magSq() > 0) {
//     field.update((direction, position) => {
//       const newDirection = p5.Vector.sub(mouse, position);
//       const mag = newDirection.magSq();
//       newDirection
//         .normalize()
//         .mult(map(mag, 0, maxDist, 0, maxArrowSize));
//       direction.set(newDirection);
//     });
//   }
// }
