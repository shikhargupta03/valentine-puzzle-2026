const board = document.getElementById("puzzle-board");
const preview = document.getElementById("preview-img");
const message = document.getElementById("message");

const SIZE = 3;
const TOTAL = SIZE * SIZE;

let order = [];
let blankIndex;
let imagePath;

/* Load Random Image */
function loadImage() {

  const num = Math.floor(Math.random() * 10) + 1;
  imagePath = `images/img${num}.jpg`;

  preview.src = imagePath;

  setupPuzzle();
}

/* Setup Puzzle */
function setupPuzzle() {

  board.innerHTML = "";
  order = [];

  for (let i = 0; i < TOTAL; i++) {
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

/* Render Tiles */
function render() {

  board.innerHTML = "";

  order.forEach((val, index) => {

    if (val === TOTAL - 1) {

      const blank = document.createElement("div");
      blank.className = "tile blank";
      board.appendChild(blank);

    } else {

      const tile = document.createElement("div");
      tile.className = "tile";

      const row = Math.floor(val / SIZE);
      const col = val % SIZE;

      tile.style.backgroundImage = `url(${imagePath})`;
      tile.style.backgroundSize = `${SIZE * 100}px`;
      tile.style.backgroundPosition =
        `-${col * 100}px -${row * 100}px`;

      tile.onclick = () => moveTile(val);

      board.appendChild(tile);
    }

  });
}

/* Move Tile */
function moveTile(value) {

  const tileIndex = order.indexOf(value);

  if (isAdjacent(tileIndex, blankIndex)) {

    [order[tileIndex], order[blankIndex]] =
      [order[blankIndex], order[tileIndex]];

    blankIndex = tileIndex;

    render();

    if (isSolved()) showLove();
  }
}

/* Adjacent Check */
function isAdjacent(i, j) {

  const r1 = Math.floor(i / SIZE);
  const c1 = i % SIZE;

  const r2 = Math.floor(j / SIZE);
  const c2 = j % SIZE;

  return (
    (r1 === r2 && Math.abs(c1 - c2) === 1) ||
    (c1 === c2 && Math.abs(r1 - r2) === 1)
  );
}

/* Solved Check */
function isSolved() {
  return order.every((v, i) => v === i);
}

/* Love Effects */
function showLove() {

  const msgs = [
    "Happy Valentine's Day ❤️",
    "You complete my life 💕",
    "Forever with you ❤️",
    "You are my heart 💖",
	"Happy Valentine's Day ❤️ You complete my puzzle of life.",
    "Every piece led me to you 💕",
    "You make my world whole 🧩❤️",
    "Solving this puzzle was easy… loving you is easier 💖",
    "You are my forever favorite picture 📸❤️"
  ];

  message.innerText =
    msgs[Math.floor(Math.random() * msgs.length)];

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

/* WhatsApp */
function shareWhatsApp() {
  window.open("https://wa.me/?text=I solved this love puzzle ❤️");
}

loadImage();
