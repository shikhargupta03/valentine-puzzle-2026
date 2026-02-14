const size = 3;
const puzzle = document.getElementById("puzzle");
const reference = document.getElementById("reference");
const loveText = document.getElementById("loveText");

let tiles = [];
let emptyPos = { row: 2, col: 2 };

function tileSize() {
    return window.innerWidth < 600 ? 90 : 110;
}

/* IMAGE LIST */
const photos = [];
for (let i = 1; i <= 10; i++) {
    photos.push(`images/img${i}.jpg`);
}

/* RANDOM IMAGE */
let selectedPhoto =
    photos[Math.floor(Math.random() * photos.length)];

reference.src = selectedPhoto;

/* LOVE MESSAGES */
const messages = [
    "You are my favorite notification ❤️",
    "Every puzzle piece leads me back to you 💕",
    "Life is beautiful because you are in it 💖",
    "You complete me in every possible way 🧩",
    "With you, every moment feels magical ✨",
    "My heart chooses you everyday ❤️",
    "You are my today and all of my tomorrows 💞",
    "Our love story is my favorite adventure 💘",
    "You are my happy place 🥰",
    "Forever is not enough with you ❤️"
];

/* LOAD IMAGE FIRST */
const image = new Image();
image.src = selectedPhoto;

image.onload = () => {
    createPuzzle();
};

/* ========================= */
/* CREATE PUZZLE */
/* ========================= */
function createPuzzle() {

    puzzle.innerHTML = "";
    tiles = [];

    let count = 0;

    for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {

            if (r === size - 1 && c === size - 1) continue;

            const tile = document.createElement("div");
            tile.className = "tile";

            tile.dataset.value = count;

            const imgRow = Math.floor(count / size);
            const imgCol = count % size;

            tile.style.backgroundImage = `url('${selectedPhoto}')`;

            tile.style.backgroundSize =
                `${tileSize() * size}px ${tileSize() * size}px`;

            tile.style.backgroundPosition =
                `-${imgCol * tileSize()}px -${imgRow * tileSize()}px`;

            puzzle.appendChild(tile);
            tiles.push(tile);

            count++;
        }
    }

    /* Place tiles solved */
    let index = 0;
    for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {

            if (r === size - 1 && c === size - 1) continue;

            positionTile(tiles[index], r, c);
            index++;
        }
    }

    emptyPos = { row: size - 1, col: size - 1 };

    shuffleMoves(80);

    tiles.forEach(tile => {
        tile.onclick = () => moveTile(tile);
    });
}

/* ========================= */
function positionTile(tile, row, col) {

    tile.style.top = row * tileSize() + "px";
    tile.style.left = col * tileSize() + "px";

    tile.dataset.row = row;
    tile.dataset.col = col;
}

/* ========================= */
function moveTile(tile) {

    const row = parseInt(tile.dataset.row);
    const col = parseInt(tile.dataset.col);

    if (isAdjacent(row, col, emptyPos.row, emptyPos.col)) {

        positionTile(tile, emptyPos.row, emptyPos.col);
        emptyPos = { row, col };

        checkWin();
    }
}

/* ========================= */
function isAdjacent(r1, c1, r2, c2) {
    return Math.abs(r1 - r2) + Math.abs(c1 - c2) === 1;
}

/* ========================= */
function shuffleMoves(moves) {

    for (let i = 0; i < moves; i++) {

        const neighbors = tiles.filter(tile => {

            const r = parseInt(tile.dataset.row);
            const c = parseInt(tile.dataset.col);

            return isAdjacent(r, c, emptyPos.row, emptyPos.col);
        });

        const randomTile =
            neighbors[Math.floor(Math.random() * neighbors.length)];

        const r = parseInt(randomTile.dataset.row);
        const c = parseInt(randomTile.dataset.col);

        positionTile(randomTile, emptyPos.row, emptyPos.col);
        emptyPos = { row: r, col: c };
    }
}

/* ========================= */
function checkWin() {

    for (let tile of tiles) {

        const val = parseInt(tile.dataset.value);
        const correctRow = Math.floor(val / size);
        const correctCol = val % size;

        if (
            parseInt(tile.dataset.row) !== correctRow ||
            parseInt(tile.dataset.col) !== correctCol
        ) return;
    }

    showLoveMessage();
}

/* ========================= */
function solvePuzzle() {

    for (let tile of tiles) {

        const val = parseInt(tile.dataset.value);
        const row = Math.floor(val / size);
        const col = val % size;

        positionTile(tile, row, col);
    }

    emptyPos = { row: 2, col: 2 };
    showLoveMessage();
}

/* ========================= */
function showLoveMessage() {

    loveText.innerText =
        messages[Math.floor(Math.random() * messages.length)];

    const msg = document.getElementById("message");
    msg.classList.remove("hidden");

    msg.scrollIntoView({ behavior: "smooth" });
}

/* ========================= */
function shareWhatsApp() {

    const text = encodeURIComponent(
        "I solved our love puzzle ❤️🧩"
    );

    window.open(
        `https://api.whatsapp.com/send?text=${text}`,
        "_blank"
    );
}

/* ========================= */
/* REBUILD ON SCREEN RESIZE */
/* ========================= */
window.addEventListener("resize", () => {
    createPuzzle();
});
