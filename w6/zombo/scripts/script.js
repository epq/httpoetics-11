// const zomboColours = ['#FF0000', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF', '#FF8000', '#FF0080', '#80FF00', '#8000FF']
const zomboColours = ['#FF0000', '#0000FF', '#00FFFF', '#FF8000', '#80FF00', '#8000FF'];

let amplitude;
let colorIndex = 0;
let lastChange = 0;
let zombo;
let rot = 0;
let speed = 1;
let centerX = 200;
let centerY = 200;

function preload() {
  zombo = loadSound('https://jordanne.ca/httpoetics/assets/audio/zombo.mp3');
}

function setup() {
  let canvas = createCanvas(400, 400);
  canvas.parent('p5-container');
  amplitude = new p5.Amplitude();

  let scaryButton = createButton("ZOMBO 🔊");
  scaryButton.id("scary-button");
  scaryButton.mousePressed(zomboPlay);
  scaryButton.parent('button-container')
  noStroke();
  angleMode(DEGREES);
}

function polygon(x, y, radius, npoints, rotation = 0) {
  let angle = 360 / npoints;
  let i = 0;
  for (let a = 0 + rotation; a < 360 + rotation; a += angle) {
    let sx = x + cos(a) * radius;
    let sy = y + sin(a) * radius;
    fill(zomboColours[i % zomboColours.length]);
    circle(sx, sy, 50);
    i++;
  }
}

let time = 0;
function draw() {
  background(255);
  push();
  translate(width / 2, height / 2);

  // if (zombo.isPlaying()) {
  //   radius = 60 + (sin(time) + 1) / 2 * 70; // Adjust the 30 to change the amount of contraction/expansion
  // } else {
  //   radius = 60;
  // }
  if (zombo.isPlaying()) {
    radius = 60 + pow((sin(time) + 1) / 2, 2) * 70; // Adjust the 2 to change the non-linearity
    time += 1; // Adjust this value to change the speed of contraction/expansion
    speed = 3
  } else {
    radius = 60;
    const distance = dist(mouseX, mouseY, centerX, centerY);
    speed = constrain(map(distance, width/2, 0, 1, 5), 1, 5);  }
  if (rot === 360) {
    rot = 0;
  } else {
    rot += speed;
  }
  polygon(0, 0, radius, zomboColours.length, rot);

  pop();
  // background(220);

  // const centerX = width / 2;
  // const centerY = height / 2;
  // const radius = 90;
  // const angleStep = TWO_PI / zomboColours.length;

  // if (millis() - lastChange > 500) {
  //   colorIndex = (colorIndex + 1) % zomboColours.length;
  //   lastChange = millis(); // store the time of this color change
  // }

  // for (let i = 0; i < zomboColours.length; i++) {
  //   const x = centerX + cos(i * angleStep) * radius;
  //   const y = centerY + sin(i * angleStep) * radius;

  //   fill(zomboColours[(i - colorIndex + zomboColours.length) % zomboColours.length]);

  //   circle(x, y, 50);
  // }


  fill(0);
  if (zombo.isPlaying()) {
    let level = amplitude.getLevel();
    let size;
    if (level > 0.02) {
      size = map(pow(level, 2), pow(0.02, 2), pow(0.12, 2), 50, 120);
    } else {
      size = 50;
    }
    circle(centerX, centerY, size);
  } else {
    circle(centerX, centerY, 50);
  }

}

function zomboPlay() {
  if (zombo.isPlaying()) {
    // .isPlaying() returns a boolean
    zombo.stop();
    document.querySelector("#scary-button").innerHTML = "ZOMBO";
  } else {
    zombo.play();
    document.querySelector("#scary-button").innerHTML = "Please stop";
  }
}
