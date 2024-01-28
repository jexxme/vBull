// Settings
const trend_intenseness = 4.0
const step = 10;
const steps = 48;

// Computation values
let trend = 10; // Initial trend (positive is down, negative is up)
let x = 10;
let lastY = 200; // Initial stock value

function setup() {
  // Drawn once
  createCanvas(500, 400); // Canvas size
  background(20); // Background color
}

// TODO: This function should later on be called by the backend and fed the trend. Right now the trend is calculated client-side.
function _step() {
  if (x > steps * step) {
    // End of steps reached. Clear screen and start over.
    x = 10;
    trend = 0;
    background(20); // Overdraw everything.
    return;
  }

  if (trend < 0) {
    // Positive trend (green)
    stroke(0, 255, 60);
  } else {
    // Negative trend (red)
    stroke(255, 30, 60);
  }

  line(x, lastY, x + step, lastY + trend); // Draw the actual line

  // Cleanup for the next step
  x += step;
  lastY += trend;
  trend = random(-10.0 * trend_intenseness, 10.0 * trend_intenseness);
}
  
function draw() {
  // Drawn per frame
  
}