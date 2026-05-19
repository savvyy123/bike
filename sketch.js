let infoImage;
let bicycleGif;
let captionImage;
const REF_WIDTH = 1440;
const REF_HEIGHT = 900;
const captionSource = { x: 250, y: 460, w: 1450, h: 700 };
const caption = { x: 197, y: 701, width: 384 };
const processImagePaths = Array.from(
  { length: 20 },
  (_, i) => `proccess/${String(i + 1).padStart(2, "0")}.jpg`
);
const processImages = [];

const faceGrids = [
  { x: 66, y: 369, size: 120, name: "sota" },
  { x: 263, y: 449, size: 120, name: "goshin" },
  { x: 115, y: 530, size: 120, name: "okabe" },
  { x: 1315, y: 333, size: 120, name: "jinto" },
  { x: 1233, y: 126, size: 120, name: "katoshun" },
  { x: 1085, y: 261, size: 120, name: "ken" },
];
const memberImages = {};

function preload() {
  infoImage = loadImage("assets/info1.png");
  bicycleGif = loadImage("assets/bicycle.gif");
  captionImage = loadImage("assets/caption.png");

  for (const path of processImagePaths) {
    processImages.push(loadImage(path));
  }

  for (const g of faceGrids) {
    memberImages[g.name] = loadImage(`assets/members/${g.name}.jpg`);
  }
}

function setup() {
  const canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("sketch-container");
  canvas.mousePressed(toggleFullscreen);
  canvas.touchStarted(toggleFullscreen);

}

function draw() {
  background(255);

  const layoutScale = min(width / REF_WIDTH, height / REF_HEIGHT);
  const offsetX = (width - REF_WIDTH * layoutScale) / 2;
  const offsetY = (height - REF_HEIGHT * layoutScale) / 2;

  push();
  translate(offsetX, offsetY);
  scale(layoutScale);

  const infoFit = min(REF_WIDTH / infoImage.width, REF_HEIGHT / infoImage.height);
  const imageWidth = infoImage.width * infoFit;
  const imageHeight = infoImage.height * infoFit;

  imageMode(CENTER);
  image(infoImage, REF_WIDTH / 2, REF_HEIGHT / 2, imageWidth, imageHeight);

  const squareSize = min(REF_WIDTH, REF_HEIGHT) * 0.55;
  const squareX = REF_WIDTH / 2;
  const squareY = REF_HEIGHT / 2;
  const currentIndex = floor((millis() / 2000) % processImages.length);
  const currentImage = processImages[currentIndex];
  const processScale = max(squareSize / currentImage.width, squareSize / currentImage.height);
  const processWidth = currentImage.width * processScale;
  const processHeight = currentImage.height * processScale;

  rectMode(CENTER);
  noStroke();
  fill(255);
  rect(squareX, squareY, squareSize, squareSize);

  drawingContext.save();
  drawingContext.beginPath();
  drawingContext.rect(squareX - squareSize / 2, squareY - squareSize / 2, squareSize, squareSize);
  drawingContext.clip();
  imageMode(CENTER);
  image(currentImage, squareX, squareY, processWidth, processHeight);
  drawingContext.restore();

  noStroke();
  fill(0);
  textAlign(CENTER, TOP);
  textFont('"Noto Serif JP", "Hiragino Mincho ProN", "YuMincho", "Yu Mincho", serif');
  const numberTextSize = min(REF_WIDTH, REF_HEIGHT) * 0.06;
  textSize(numberTextSize);
  text(
    `${nf(currentIndex + 1, 2)} / ${processImages.length}`,
    squareX,
    squareY + squareSize / 2 + numberTextSize * 0.4
  );

  const gifWidth = min(REF_WIDTH, REF_HEIGHT) * 0.14;
  const gifHeight = gifWidth * (bicycleGif.height / bicycleGif.width);
  const margin = min(REF_WIDTH, REF_HEIGHT) * 0.025;

  imageMode(CORNER);
  image(bicycleGif, REF_WIDTH - gifWidth - margin, margin, gifWidth, gifHeight);

  const captionHeight = caption.width * (captionSource.h / captionSource.w);
  image(
    captionImage,
    caption.x,
    caption.y,
    caption.width,
    captionHeight,
    captionSource.x,
    captionSource.y,
    captionSource.w,
    captionSource.h
  );

  imageMode(CORNER);
  for (const g of faceGrids) {
    const img = memberImages[g.name];
    const cover = max(g.size / img.width, g.size / img.height);
    const drawW = img.width * cover;
    const drawH = img.height * cover;
    drawingContext.save();
    drawingContext.beginPath();
    drawingContext.rect(g.x, g.y, g.size, g.size);
    drawingContext.clip();
    image(img, g.x + (g.size - drawW) / 2, g.y + (g.size - drawH) / 2, drawW, drawH);
    drawingContext.restore();
  }

  pop();
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

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
