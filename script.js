const puzzle = document.getElementById("puzzle");
const message = document.getElementById("message");
const countdownDiv = document.getElementById("countdown");

let size = 8;
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

    size = parseInt(document.getElementById("difficulty").value);

    selectedImage = images[Math.floor(Math.random() * images.length)];

    puzzle.style.gridTemplateColumns = `repeat(${size},1fr)`;
    puzzle.style.gridTemplateRows = `repeat(${size},1fr)`;

    createTiles();
    shuffleTiles();
    drawPuzzle();
    message.classList.add("hidden");
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

            let row = Math.floor(tile / size);
            let col = tile % size;

            div.style.backgroundImage = `url(${selectedImage})`;

            // ⭐ FIXED IMAGE SLICING
            div.style.backgroundSize = `${size * 100}% ${size * 100}%`;

            div.style.backgroundPosition =
                `${(col * 100) / (size - 1)}% ${(row * 100) / (size - 1)}%`;
        }

        div.addEventListener("click", () => moveTile(index));
        addSwipe(div, index);

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

function addSwipe(element, index) {

    let startX = 0;
    let startY = 0;

    element.addEventListener("touchstart", e => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    });

    element.addEventListener("touchend", e => {

        let dx = e.changedTouches[0].clientX - startX;
        let dy = e.changedTouches[0].clientY - startY;

        if (Math.abs(dx) > 30 || Math.abs(dy) > 30) {
            moveTile(index);
        }
    });
}

function shareWhatsApp() {

    let text = "I solved this Valentine Puzzle ❤️";
    let url = window.location.href;

    window.open(`https://wa.me/?text=${encodeURIComponent(text + " " + url)}`);
}
