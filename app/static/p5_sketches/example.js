// Settings
const canvas_x = 500;
const canvas_y = 400;
const trend_intenseness = 4.0;
const step = 10;
const steps = 48;
const node_size = 4;

// Computation values
let trend = 10; // Initial trend (positive is down, negative is up)
let x = 10;
let lastY = 200; // Initial stock value

function setup() {
  // Drawn once
  createCanvas(canvas_x, canvas_y); // Canvas size
  background(20); // Background color
  
  stroke(255)
  line(10, 10, 10, canvas_y - 10) // Y-Axis
  line(10, canvas_y - 10, canvas_x - 10, canvas_y - 10) // X-Axis
}

// TODO: This function should later on be called by the backend and fed the trend. Right now the trend is calculated client-side.
function _step(new_value) {
  if (x > steps * step) {
    // End of steps reached. Clear screen and start over.
    x = 10;
    background(20); // Overdraw everything.
    return;
  }

  trend = canvas_y - new_value - lastY; // This 'canvas_y' needs to be done as a larger y-position is considered lower on the canvas in p5-land.

  if (trend < 0) {
    // Positive trend (green)
    stroke(0, 255, 60);
    fill(0, 255, 60);
  } else {
    // Negative trend (red)
    stroke(255, 30, 60);
    fill(255, 30, 60);
  }

  square(x + step - (node_size / 2), lastY + trend - (node_size / 2), node_size)
  line(x, lastY, x + step, lastY + trend); // Draw the actual line
  fill(255)

  // Cleanup for the next step
  x += step;
  lastY += trend;
}
  
function draw() {
  // Drawn per frame
  
}