let infoImage;
let bicycleGif;
const processImagePaths = [
  "proccess/01.jpg",
  "proccess/02.jpg",
  "proccess/03.png",
  "proccess/04.jpg",
  "proccess/05.jpg",
  "proccess/06.jpg",
  "proccess/07.jpg",
  "proccess/08.jpg",
  "proccess/09.jpg",
  "proccess/10.jpg",
  "proccess/11.jpg",
  "proccess/12.jpg",
  "proccess/13.jpg",
  "proccess/14.jpg",
  "proccess/15.jpg",
  "proccess/16.png",
  "proccess/17.png",
  "proccess/18.png",
  "proccess/19.jpg",
  "proccess/20.jpg",
];
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

function keyPressed() {
  if (key === "f" || key === "F") {
    fullscreen(!fullscreen());
    setTimeout(() => resizeCanvas(windowWidth, windowHeight), 100);
    return false;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
