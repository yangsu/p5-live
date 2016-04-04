function setup() {
  createCanvas(400, 400);
}

function draw() {
  const increment = 0.01;
  // noiseDetail(8, 0.65);
  loadPixels();
  let xoff = frameCount * 0.5;
  for (let x = 0; x < width; x++) {
    xoff += increment;
    let yoff = 0;
    for (let y = 0; y < height; y++) {
      yoff += increment;
      const bright = noise(xoff, yoff) * 255;
      set(x, y, color(bright));
    }
  }
  updatePixels();
}
