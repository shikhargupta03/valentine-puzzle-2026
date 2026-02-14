const puzzle = document.getElementById("puzzle");
const previewImage = document.getElementById("previewImage");
const resolveSection = document.getElementById("resolveSection");
const finalSurprise = document.getElementById("finalSurprise");
const finalImage = document.getElementById("finalImage");

const size = 3;

let tiles = [];
let emptyIndex;

const images = [
    "images/img1.jpg",
    "images/img2.jpg",
    "images/img3.jpg",
    "images/img4.jpg"
];

let selectedImage = "";

function startGame() {

    selectedImage = images[Math.floor(Math.random() * images.length)];

    previewImage.src = selectedImage;

    puzzle.style.gridTemplateColumns = `repeat(${size},1fr)`;
    puzzle.style.gridTemplateRows = `repeat(${size},1fr)`;

    createTiles();
    shuffleTiles();
    drawPuzzle();

    resolveSection.classList.add("hidden");
    finalSurprise.classList.add("hidden");
}

function createTiles() {

    tiles = [];

    for (let i = 0; i < size * size - 1; i++) {
        tiles.push(i);
    }

    tiles.push(null);
    emptyIndex = tiles.length - 1;
}

function shuffleTiles() {

    for (let i = 0; i < 200; i++) {
        let moves = getValidMoves(emptyIndex);
        let move = moves[Math.floor(Math.random() * moves.length)];
        swap(emptyIndex, move);
        emptyIndex = move;
    }
}

function drawPuzzle() {

    puzzle.innerHTML = "";

    tiles.forEach((tile, index) => {

        const div = document.createElement("div");
        div.classList.add("tile");

        if (tile === null) {
            div.classList.add("empty");
        }
        else {

            let row = Math.floor(tile / size);
            let col = tile % size;

            div.style.backgroundImage = `url(${selectedImage})`;
            div.style.backgroundSize = `${size * 100}% ${size * 100}%`;
            div.style.backgroundPosition =
                `${(col / (size - 1)) * 100}% ${(row / (size - 1)) * 100}%`;
        }

        div.addEventListener("click", () => moveTile(index));

        puzzle.appendChild(div);
    });
}

function getValidMoves(index) {

    let moves = [];

    let row = Math.floor(index / size);
    let col = index % size;

    if (row > 0) moves.push(index - size);
    if (row < size - 1) moves.push(index + size);
    if (col > 0) moves.push(index - 1);
    if (col < size - 1) moves.push(index + 1);

    return moves;
}

function moveTile(index) {

    if (getValidMoves(emptyIndex).includes(index)) {

        swap(emptyIndex, index);
        emptyIndex = index;
        drawPuzzle();
        checkWin();
    }
}

function swap(a, b) {
    [tiles[a], tiles[b]] = [tiles[b], tiles[a]];
}

function checkWin() {

    for (let i = 0; i < tiles.length - 1; i++) {
        if (tiles[i] !== i) return;
    }

    resolveSection.classList.remove("hidden");
    createHearts();
}

function showFinalSurprise() {

    finalImage.src = selectedImage;
    finalSurprise.classList.remove("hidden");
}

function createHearts() {

    for (let i = 0; i < 25; i++) {

        let heart = document.createElement("div");
        heart.innerHTML = "💖";

        heart.style.position = "fixed";
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.top = "-20px";
        heart.style.fontSize = "24px";
        heart.style.animation = "fall 3s linear";

        document.body.appendChild(heart);

        setTimeout(() => heart.remove(), 3000);
    }
}
