// Global Settings
const canvas_x = 500;
const canvas_y = 400;
const step = 10;
const steps = 48;
const node_size = 4; // The squares in the graph

const s = (sketch) => {

	sketch.setup = () => {
		// Drawn once
		sketch.points = [];
		sketch.trend = 0;
		sketch.x = 10;
		sketch.lastY = -1; // If -1, this will start drawing the line at the first price given.
		sketch.createCanvas(canvas_x, canvas_y); // Canvas size
		
		sketch.clear_graph();
	}
	
	sketch.addpoint = (y_value) => {
		sketch.points.push(y_value);
		if (sketch.points.length > steps) {
			sketch.points.shift(); // Drops the first element (index: 0)
		}
	}

	// TODO: This function should later on be called by the backend and fed the trend. Right now the trend is calculated client-side.
	sketch._step = (new_value) => {
		sketch.addpoint(new_value);
		sketch.clear_graph();

		let i = 0;
		sketch.points.forEach(y => {
			i++;
			
			let x = step * i;

			sketch.trend = sketch.lastY - y; // This 'canvas_y' needs to be done as a larger y-position is considered lower on the canvas in p5-land.
			
			// Check for y-delta to draw red or green
			if (sketch.trend < 0) {
				// Positive trend (green)
				sketch.stroke(0, 255, 60);
				sketch.fill(0, 255, 60);
			} else {
				// Negative trend (red)
				sketch.stroke(255, 30, 60);
				sketch.fill(255, 30, 60);
			}
			
			if (i == 1)
			{
				sketch.stroke(255);
				sketch.fill(255);
			}

			sketch.square(x - (node_size / 2), canvas_y - y - (node_size / 2), node_size);
			if (sketch.lastY != -1 && i != 1) {
				sketch.line(x - step, canvas_y - sketch.lastY, x, canvas_y - y); // Draw the actual line
			}
			sketch.fill(255);

			// Prepare for next _step call
			sketch.lastY = y;
		});

		return;

		

		if (sketch.x > steps * step) {
		  // End of steps reached. Clear screen and start over.
		  sketch.x = 10;
		  sketch.clear_graph();
		  return;
		}
	  
	  
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

// Actual creation of the graphs
let cTechCorp = new p5(s, 'cTechCorp');
let cHealthPlus = new p5(s, 'cHealthPlus');
let cGreenEnergy = new p5(s, 'cGreenEnergy');
let cFoodie = new p5(s, 'cFoodie');
let cFashionista = new p5(s, 'cFashionista');
let cAutoTech = new p5(s, 'cAutoTech');
