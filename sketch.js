var xspacing;
var w;                // Width of entire wave
var theta;
var amplitude;
var period;
var dx;               // Value for incrementing x
var yvalues;  // Using an array to store height values for the wave

function setup() {
  xspacing = 16;    // Distance between each horizontal location
  theta = 0.0;      // Start angle at 0
  amplitude = 10.0; // Height of wave
  period = 200.0;   // How many pixels before the wave repeats
  createCanvas(810, 400);
  w = width + 16;
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
  theta += 0.02;

  // For every x value, calculate a y value with sine function
  var x = theta;
  for (var i = 0; i < yvalues.length; i++) {
    yvalues[i] = sin(x) * amplitude;
    x += dx;
  }
}

function renderWave() {
  noStroke();
  fill(250);
  // A simple way to draw the wave with an ellipse at each location
  for (var x = 0; x < yvalues.length; x++) {
    ellipse(x * xspacing, height / 2 + yvalues[x], 16, 16);
  }
}
