function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('canvasContainer');
  background(100);
}

function draw() {
  // Your drawing code goes here
}

let prevX, prevY;

function mouseDragged() {
  erase(); // Turn on eraser
  strokeWeight(40);
  if (prevX && prevY) {
    line(prevX, prevY, mouseX, mouseY); // Draw a line from the previous mouse position to the current one
  }
  prevX = mouseX;
  prevY = mouseY;
  noErase(); // Turn off eraser
}

function mouseReleased() {
  prevX = null;
  prevY = null;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}