const board = document.getElementById("puzzle-board");
const preview = document.getElementById("preview-img");
const message = document.getElementById("message");

const GRID = 3;
const TOTAL = GRID * GRID;

let tiles = [];
let order = [];
let blankIndex;

/* Load Random Image */
function loadRandomImage() {

  const num = Math.floor(Math.random() * 10) + 1;
  const path = `images/img${num}.jpg`;

  const img = new Image();
  img.src = path;

  preview.src = path;

  img.onload = () => createPuzzle(img);
}

/* Create Puzzle */
function createPuzzle(img) {

  board.innerHTML = "";
  tiles = [];
  order = [];

  const pieceW = img.width / GRID;
  const pieceH = img.height / GRID;

  for (let i = 0; i < TOTAL; i++) {

    if (i === TOTAL - 1) {
      tiles.push(null);
      order.push(i);
      continue;
    }

    const canvas = document.createElement("canvas");
    canvas.width = 100;
    canvas.height = 100;

    const ctx = canvas.getContext("2d");

    const sx = (i % GRID) * pieceW;
    const sy = Math.floor(i / GRID) * pieceH;

    ctx.drawImage(img, sx, sy, pieceW, pieceH, 0, 0, 100, 100);

    canvas.classList.add("tile");
    canvas.addEventListener("click", () => moveTile(i));

    tiles.push(canvas);
    order.push(i);
  }

  shuffle();
  render();
}

/* Shuffle */
function shuffle() {

  do {
    order.sort(() => Math.random() - 0.5);
  } while (isSolved());

  blankIndex = order.indexOf(TOTAL - 1);
}

/* Render */
function render() {

  board.innerHTML = "";

  order.forEach(v => {

    if (v === TOTAL - 1) {

      const blank = document.createElement("div");
      blank.classList.add("tile", "blank");
      board.appendChild(blank);

    } else {

      board.appendChild(tiles[v]);

    }

  });
}

/* Move Tile */
function moveTile(originalIndex) {

  const tileIndex = order.indexOf(originalIndex);

  if (isAdjacent(tileIndex, blankIndex)) {

    [order[tileIndex], order[blankIndex]] =
      [order[blankIndex], order[tileIndex]];

    blankIndex = tileIndex;

    render();

    if (isSolved()) {
      solvedEffects();
    }
  }
}

/* Adjacent Check */
function isAdjacent(i, j) {

  const r1 = Math.floor(i / GRID);
  const c1 = i % GRID;

  const r2 = Math.floor(j / GRID);
  const c2 = j % GRID;

  return (
    (r1 === r2 && Math.abs(c1 - c2) === 1) ||
    (c1 === c2 && Math.abs(r1 - r2) === 1)
  );
}

/* Solved Check */
function isSolved() {
  return order.every((v, i) => v === i);
}

/* Messages */
const msgs = [
  "Happy Valentine's Day ❤️ You complete me.",
  "Every puzzle piece leads to you 💕",
  "You are my forever favorite ❤️",
  "My heart feels complete with you 💖",
  "You are the best part of my life 💘"
];

function solvedEffects() {

  const text = msgs[Math.floor(Math.random() * msgs.length)];

  message.innerText = text;
  message.style.display = "block";

  confetti();
  hearts();
}

/* Confetti */
function confetti() {

  for (let i = 0; i < 120; i++) {

    const c = document.createElement("div");
    c.className = "confetti";
    c.style.left = Math.random() * 100 + "vw";

    document.body.appendChild(c);

    setTimeout(() => c.remove(), 5000);
  }
}

/* Hearts */
function hearts() {

  for (let i = 0; i < 25; i++) {

    const h = document.createElement("div");
    h.className = "heart";
    h.innerHTML = "❤️";
    h.style.left = Math.random() * 100 + "vw";

    document.body.appendChild(h);

    setTimeout(() => h.remove(), 6000);
  }
}

/* WhatsApp Share */
function shareWhatsApp() {

  const text = encodeURIComponent(
    "I solved this beautiful love puzzle ❤️"
  );

  window.open(`https://wa.me/?text=${text}`);
}

loadRandomImage();
