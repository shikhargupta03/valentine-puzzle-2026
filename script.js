const board = document.getElementById("puzzle-board");
const preview = document.getElementById("preview-img");
const message = document.getElementById("message");

const GRID_SIZE = 3;
const TOTAL_TILES = GRID_SIZE * GRID_SIZE;

let tiles = [];
let tileOrder = [];
let blankIndex = TOTAL_TILES - 1;
let currentImage = "";

/* -------- Load Random Image -------- */
function loadRandomImage() {
  const imgNumber = Math.floor(Math.random() * 10) + 1;
  currentImage = `images/img${imgNumber}.jpg`;

  preview.src = currentImage;

  const img = new Image();
  img.src = currentImage;
  img.onload = () => createPuzzle(img);
}

/* -------- Create Puzzle -------- */
function createPuzzle(img) {
  board.innerHTML = "";
  tiles = [];
  tileOrder = [];

  const pieceWidth = img.width / GRID_SIZE;
  const pieceHeight = img.height / GRID_SIZE;

  // Create pieces using canvas
  for (let i = 0; i < TOTAL_TILES; i++) {

    if (i === TOTAL_TILES - 1) {
      tiles.push(null);
      tileOrder.push(i);
      continue;
    }

    const canvas = document.createElement("canvas");
    canvas.width = 100;
    canvas.height = 100;
    const ctx = canvas.getContext("2d");

    const sx = (i % GRID_SIZE) * pieceWidth;
    const sy = Math.floor(i / GRID_SIZE) * pieceHeight;

    ctx.drawImage(
      img,
      sx, sy,
      pieceWidth, pieceHeight,
      0, 0,
      canvas.width, canvas.height
    );

    canvas.classList.add("tile");
    canvas.dataset.index = i;

    canvas.addEventListener("click", () => moveTile(i));

    tiles.push(canvas);
    tileOrder.push(i);
  }

  shufflePuzzle();
  renderBoard();
}

/* -------- Shuffle -------- */
function shufflePuzzle() {

  do {
    tileOrder.sort(() => Math.random() - 0.5);
  } while (isSolved(tileOrder));

  blankIndex = tileOrder.indexOf(TOTAL_TILES - 1);
}

/* -------- Render -------- */
function renderBoard() {
  board.innerHTML = "";

  tileOrder.forEach((value, idx) => {

    if (value === TOTAL_TILES - 1) {
      const blank = document.createElement("div");
      blank.classList.add("tile", "blank");
      board.appendChild(blank);
    } else {
      board.appendChild(tiles[value]);
    }

  });
}

/* -------- Move Tile -------- */
function moveTile(tileOriginalIndex) {

  const tileCurrentIndex = tileOrder.indexOf(tileOriginalIndex);

  if (isAdjacent(tileCurrentIndex, blankIndex)) {

    [tileOrder[tileCurrentIndex], tileOrder[blankIndex]] =
      [tileOrder[blankIndex], tileOrder[tileCurrentIndex]];

    blankIndex = tileCurrentIndex;

    renderBoard();

    if (isSolved(tileOrder)) {
      showLoveMessage();
      launchConfetti();
      launchHearts();
    }
  }
}

/* -------- Adjacency -------- */
function isAdjacent(i, j) {

  const rowI = Math.floor(i / GRID_SIZE);
  const colI = i % GRID_SIZE;

  const rowJ = Math.floor(j / GRID_SIZE);
  const colJ = j % GRID_SIZE;

  return (
    (rowI === rowJ && Math.abs(colI - colJ) === 1) ||
    (colI === colJ && Math.abs(rowI - rowJ) === 1)
  );
}

/* -------- Solved Check -------- */
function isSolved(order) {
  return order.every((val, idx) => val === idx);
}

/* -------- Love Messages -------- */
const loveMessages = [
  "Happy Valentine's Day ❤️ You complete my puzzle of life.",
  "Every piece led me to you 💕",
  "You make my world whole 🧩❤️",
  "Solving this puzzle was easy… loving you is easier 💖",
  "You are my forever favorite picture 📸❤️"
];

function showLoveMessage() {
  const randomMsg =
    loveMessages[Math.floor(Math.random() * loveMessages.length)];

  message.innerText = randomMsg;
  message.style.display = "block";
}

/* -------- WhatsApp Share -------- */
function shareWhatsApp() {
  const text = encodeURIComponent(
    "I solved this Valentine Puzzle ❤️"
  );

  window.open(`https://wa.me/?text=${text}`);
}

/* -------- Confetti -------- */
function launchConfetti() {

  for (let i = 0; i < 120; i++) {
    const conf = document.createElement("div");
    conf.className = "confetti";
    conf.style.left = Math.random() * 100 + "vw";
    conf.style.animationDuration = Math.random() * 2 + 3 + "s";

    document.body.appendChild(conf);

    setTimeout(() => conf.remove(), 5000);
  }
}

/* -------- Floating Hearts -------- */
function launchHearts() {

  for (let i = 0; i < 25; i++) {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.innerHTML = "❤️";

    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = Math.random() * 20 + 20 + "px";
    heart.style.animationDuration = Math.random() * 3 + 4 + "s";

    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 6000);
  }
}

/* -------- Start -------- */
loadRandomImage();
