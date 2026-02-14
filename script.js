const puzzle = document.getElementById("puzzle");
const previewImage = document.getElementById("previewImage");
const message = document.getElementById("message");
const countdownDiv = document.getElementById("countdown");

let rows = 8;
let cols = 8;
let tiles = [];
let emptyIndex;

const images = [
    "images/img1.jpg",
    "images/img2.jpg",
    "images/img3.jpg",
    "images/img4.jpg",
    "images/img5.jpg",
    "images/img6.jpg",
    "images/img7.jpg",
    "images/img8.jpg",
    "images/img9.jpg",
    "images/img10.jpg"
];

let selectedImage = "";

function startGame() {

    let difficulty = document.getElementById("difficulty").value;

    let parts = difficulty.split("x");
    rows = parseInt(parts[0]);
    cols = parseInt(parts[1]);

    selectedImage = images[Math.floor(Math.random() * images.length)];

    previewImage.src = selectedImage;

    puzzle.style.gridTemplateColumns = `repeat(${cols},1fr)`;
    puzzle.style.gridTemplateRows = `repeat(${rows},1fr)`;

    createTiles();
    shuffleTiles();
    drawPuzzle();
    message.classList.add("hidden");
}

function createTiles() {

    tiles = [];

    for (let i = 0; i < rows * cols - 1; i++) {
        tiles.push(i);
    }

    tiles.push(null);
    emptyIndex = tiles.length - 1;
}

function shuffleTiles() {

    for (let i = 0; i < 1000; i++) {
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

            let r = Math.floor(tile / cols);
            let c = tile % cols;

            div.style.backgroundImage = `url(${selectedImage})`;

            div.style.backgroundSize = `${cols * 100}% ${rows * 100}%`;

            div.style.backgroundPosition =
                `${(c * 100) / (cols - 1)}% ${(r * 100) / (rows - 1)}%`;
        }

        div.addEventListener("click", () => moveTile(index));

        puzzle.appendChild(div);
    });
}

function getValidMoves(index) {

    let moves = [];

    let r = Math.floor(index / cols);
    let c = index % cols;

    if (r > 0) moves.push(index - cols);
    if (r < rows - 1) moves.push(index + cols);
    if (c > 0) moves.push(index - 1);
    if (c < cols - 1) moves.push(index + 1);

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

    startCountdown();
}

function startCountdown() {

    let count = 3;
    countdownDiv.classList.remove("hidden");

    let interval = setInterval(() => {

        countdownDiv.innerText = count;

        if (count === 0) {
            clearInterval(interval);
            countdownDiv.classList.add("hidden");
            showMessage();
        }

        count--;

    }, 1000);
}

function showMessage() {
    message.classList.remove("hidden");
    createHearts();
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

function shareWhatsApp() {

    let text = "I solved this Valentine Puzzle ❤️";
    let url = window.location.href;

    window.open(`https://wa.me/?text=${encodeURIComponent(text + " " + url)}`);
}
