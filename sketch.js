let infoImage;
let bicycleGif;
const processImagePaths = Array.from(
  { length: 20 },
  (_, i) => `proccess/${String(i + 1).padStart(2, "0")}.jpg`
);
const processImages = [];

function preload() {
  infoImage = loadImage("assets/info1.png");
  bicycleGif = loadImage("assets/bicycle.gif");

  for (const path of processImagePaths) {
    processImages.push(loadImage(path));
  }
}

function setup() {
  const canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("sketch-container");
}

function draw() {
  background(255);

  const scale = min(width / infoImage.width, height / infoImage.height);
  const imageWidth = infoImage.width * scale;
  const imageHeight = infoImage.height * scale;

  imageMode(CENTER);
  image(infoImage, width / 2, height / 2, imageWidth, imageHeight);

  const squareSize = min(width, height) * 0.55;
  const squareX = width / 2;
  const squareY = height / 2;
  const currentIndex = floor((millis() / 2000) % processImages.length);
  const currentImage = processImages[currentIndex];
  const processScale = min(squareSize / currentImage.width, squareSize / currentImage.height);
  const processWidth = currentImage.width * processScale;
  const processHeight = currentImage.height * processScale;

  rectMode(CENTER);
  noStroke();
  fill(255);
  rect(squareX, squareY, squareSize, squareSize);

  imageMode(CENTER);
  image(currentImage, squareX, squareY, processWidth, processHeight);

  rectMode(CENTER);
  noFill();
  stroke(0);
  strokeWeight(3);
  rect(squareX, squareY, squareSize, squareSize);

  noStroke();
  fill(0);
  textAlign(CENTER, TOP);
  textFont('"Noto Serif JP", "Hiragino Mincho ProN", "YuMincho", "Yu Mincho", serif');
  const numberTextSize = min(width, height) * 0.045;
  textSize(numberTextSize);
  text(
    `${nf(currentIndex + 1, 2)} / ${processImages.length}`,
    squareX,
    squareY + squareSize / 2 + numberTextSize * 0.4
  );

  const gifWidth = min(width, height) * 0.14;
  const gifHeight = gifWidth * (bicycleGif.height / bicycleGif.width);
  const margin = min(width, height) * 0.025;

  imageMode(CORNER);
  image(bicycleGif, width - gifWidth - margin, margin, gifWidth, gifHeight);
}

function toggleFullscreen() {
  fullscreen(!fullscreen());
  setTimeout(() => resizeCanvas(windowWidth, windowHeight), 100);
}

function keyPressed() {
  if (key === "f" || key === "F") {
    toggleFullscreen();
    return false;
  }
}

function mousePressed() {
  toggleFullscreen();
}

function touchStarted() {
  toggleFullscreen();
  return false;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
