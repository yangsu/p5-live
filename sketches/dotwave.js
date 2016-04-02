const xspacing = 16;    // Distance between each horizontal location
let theta = 0.0;      // Start angle at 0
const amplitude = 10.0; // Height of wave
const period = 20.0;   // How many pixels before the wave repeats
let w;                // Width of entire wave
let dx;               // Value for incrementing x
let yvalues;  // Using an array to store height values for the wave

function setup() {
  createCanvas(800, 400);
  w = width + 8;
  dx = (TWO_PI / period) * xspacing;
  yvalues = new Array(floor(w / xspacing));
}

function draw() {
  background(10);
  calcWave();
  renderWave();
}

function calcWave() {
  // Increment theta (try different values for
  // 'angular velocity' here
  theta += 0.5;

  // For every x value, calculate a y value with sine function
  let x = theta;
  for (let i = 0; i < yvalues.length; i++) {
    yvalues[i] = sin(x) * amplitude;
    x += dx;
  }
}

function renderWave() {
  noStroke();
  fill(250);
  // A simple way to draw the wave with an ellipse at each location
  for (let x = 0; x < yvalues.length; x++) {
    ellipse(x * xspacing, height / 2 + yvalues[x], 16, 16);
  }
}
