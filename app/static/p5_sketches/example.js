function setup() {
    // Drawn once
    createCanvas(500, 400); // Canvas size
    background(20); // Background color
    
    // Settings
    const trend_intenseness = 4.0
    const step = 10;
    const steps = 48;
    
    // Computation values
    let trend = 10; // Initial trend (positive is down, negative is up)
    let x = 10;
    
    
    let lastY = 200; // Initial stock value
    
    for (i = 0; i < steps; i++) {
      if (trend < 0) {
        // Positive trend (green)
        stroke(0, 255, 60);
      } else {
        // Negative trend (red)
        stroke(255, 30, 60);
      }
      line(x, lastY, x + step, lastY + trend);
      x += step;
      lastY += trend;
      trend = random(-10.0 * trend_intenseness, 10.0 * trend_intenseness);
    }
  }
  
  function draw() {
    // Drawn per frame
    
  }