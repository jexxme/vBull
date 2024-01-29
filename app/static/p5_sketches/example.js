// Global Settings
const canvas_x = 500;
const canvas_y = 400;
const step = 10;
const steps = 48;
const node_size = 4; // The squares in the graph

const s = (sketch) => {

	sketch.setup = () => {
		// Drawn once
		sketch.trend = 0;
		sketch.x = 10;
		sketch.lastY = -1; // If -1, this will start drawing the line at the first price given.
		sketch.createCanvas(canvas_x, canvas_y); // Canvas size
		
		sketch.clear_graph();
	}
	  
	// TODO: This function should later on be called by the backend and fed the trend. Right now the trend is calculated client-side.
	sketch._step = (new_value) => {
		if (sketch.lastY == -1) {
			// If this is the first price given to the frontend, make sure just to draw a dot.
			sketch.lastY = canvas_y - new_value;
			sketch.square(sketch.x - (node_size / 2), canvas_y - new_value - (node_size / 2), node_size);
			return;
		}

		if (sketch.x > steps * step) {
		  // End of steps reached. Clear screen and start over.
		  sketch.x = 10;
		  sketch.clear_graph();
		  return;
		}
	  
		sketch.trend = canvas_y - new_value - sketch.lastY; // This 'canvas_y' needs to be done as a larger y-position is considered lower on the canvas in p5-land.
	  
		if (sketch.trend < 0) {
		  // Positive trend (green)
		  sketch.stroke(0, 255, 60);
		  sketch.fill(0, 255, 60);
		} else {
		  // Negative trend (red)
		  sketch.stroke(255, 30, 60);
		  sketch.fill(255, 30, 60);
		}
	  
		sketch.square(sketch.x + step - (node_size / 2), sketch.lastY + sketch.trend - (node_size / 2), node_size);
		sketch.line(sketch.x, sketch.lastY, sketch.x + step, sketch.lastY + sketch.trend); // Draw the actual line
		sketch.fill(255);
	  
		// Cleanup for the next step
		sketch.x += step;
		sketch.lastY += sketch.trend;
	}

	sketch.clear_graph = () => {
		sketch.background(20); // Background color
		sketch.stroke(255)
		sketch.line(10, 10, 10, canvas_y - 10) // Y-Axis
		sketch.line(10, canvas_y - 10, canvas_x - 10, canvas_y - 10) // X-Axis
	}
}

let cTechCorp = new p5(s, 'cTechCorp');
let cHealthPlus = new p5(s, 'cHealthPlus');
let cGreenEnergy = new p5(s, 'cGreenEnergy');
let cFoodie = new p5(s, 'cFoodie');
let cFashionista = new p5(s, 'cFashionista');
let cAutoTech = new p5(s, 'cAutoTech');
