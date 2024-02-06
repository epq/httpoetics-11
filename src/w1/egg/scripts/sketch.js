let theEgg;

function preload() {
  // Make sure the path to your .obj file is correct
  theEgg = loadModel('../../assets/2402_gerrard_square.obj', true);
}

function setup() {
  let canvasWidth = windowWidth < 570 ? windowWidth * 0.7 : 400;
  let canvas = createCanvas(canvasWidth, 400, WEBGL);
  canvas.parent('p5-container');
}

function draw() {
  background(200);

  // Lighting
  ambientLight(100);
  directionalLight(255, 255, 255, 0.5, 0.5, -1); // Front light
  directionalLight(255, 255, 255, -0.5, -0.5, 1); // Back light
  
  orbitControl(); // Enable orbit control for interactive manipulation
  scale(1.5)

  rotateX(PI);
  rotateY(-HALF_PI);
  rotateY(frameCount * 0.01);

  ambientMaterial(0, 255, 0);
  noStroke();
  model(theEgg);
}
