// Global Settings
const canvas_x = 500;
const canvas_y = 400;
const step_size = 10;
const max_horizontal_steps = 48;
const node_size = 4; // The squares in the graph

const s = (sketch) => {

	sketch.setup = () => {
		// Executes once when creating the graph
		sketch.points = [];
		sketch.trend = 0;
		sketch.lastY = -1;
		sketch.createCanvas(canvas_x, canvas_y);
		sketch.clear_graph();
	}
	

	sketch.addpoint = (y_value) => {
		sketch.points.push(y_value);

		if (sketch.points.length > max_horizontal_steps) {
			sketch.points.shift(); // Drops the first element (index: 0)
		}
	}


	sketch._step = (new_value) => {
		sketch.addpoint(new_value);
		sketch.clear_graph();

		let i = 1;
		sketch.points.forEach(y => {
			let x = step_size * i;

			sketch.trend = sketch.lastY - y;
			
			// Bare in mind, trend is flipped here.
			if (sketch.trend < 0) {
				// Negative trend => green
				sketch.stroke(0, 255, 60);
				sketch.fill(0, 255, 60);
			} else {
				// Positive trend => red
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
				sketch.line(x - step_size, canvas_y - sketch.lastY, x, canvas_y - y); // Draw the actual line
			}
			sketch.fill(255);

			// Prepare for next _step call
			sketch.lastY = y;
			i++;
		});
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
