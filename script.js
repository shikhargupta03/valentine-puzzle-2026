const size = 3;
const puzzle = document.getElementById("puzzle");
const reference = document.getElementById("reference");
const loveText = document.getElementById("loveText");

let tiles = [];
let emptyIndex = size * size - 1;

/* IMAGE LIST */
const photos = [];
for (let i = 1; i <= 10; i++) {
    photos.push(`images/img${i}.jpg`);
}

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

/* RANDOM IMAGE */
const selectedPhoto =
    photos[Math.floor(Math.random() * photos.length)];

reference.src = selectedPhoto;

/* LOAD IMAGE FIRST */
const image = new Image();
image.src = selectedPhoto;

image.onload = () => createPuzzle();

function createPuzzle() {
    tiles = [...Array(size * size).keys()];
    shuffle(tiles);
    render();
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function render() {

    puzzle.innerHTML = "";

    const tileSize = window.innerWidth < 600 ? 90 : 110;

    tiles.forEach((value, index) => {

        const tile = document.createElement("div");

        if (value === size * size - 1) {
            tile.className = "tile empty";
        }
        else {

            tile.className = "tile";
            tile.style.backgroundImage = `url('${selectedPhoto}')`;

            const row = Math.floor(value / size);
            const col = value % size;

            tile.style.backgroundPosition =
                `-${col * tileSize}px -${row * tileSize}px`;

            tile.onclick = () => moveTile(index);
        }

        puzzle.appendChild(tile);
    });
}

function moveTile(index) {

    const neighbors = [
        index - 1,
        index + 1,
        index - size,
        index + size
    ];

    if (neighbors.includes(emptyIndex) &&
        isAdjacent(index, emptyIndex)) {

        [tiles[index], tiles[emptyIndex]] =
        [tiles[emptyIndex], tiles[index]];

        emptyIndex = index;

        render();
        checkWin();
    }
}

function isAdjacent(a, b) {

    const r1 = Math.floor(a / size);
    const c1 = a % size;

    const r2 = Math.floor(b / size);
    const c2 = b % size;

    return Math.abs(r1 - r2) + Math.abs(c1 - c2) === 1;
}

function checkWin() {

    for (let i = 0; i < tiles.length; i++) {
        if (tiles[i] !== i) return;
    }

    showLoveMessage();
}

function solvePuzzle() {

    tiles = [...Array(size * size).keys()];
    emptyIndex = size * size - 1;

    render();
    showLoveMessage();
}

function showLoveMessage() {

    const randomMessage =
        messages[Math.floor(Math.random() * messages.length)];

    loveText.innerText = randomMessage;

    const msgDiv = document.getElementById("message");
    msgDiv.classList.remove("hidden");

    /* AUTO SCROLL MOBILE FIX */
    msgDiv.scrollIntoView({ behavior: "smooth" });
}

/* WHATSAPP SHARE MOBILE SAFE */
function shareWhatsApp() {

    const text = encodeURIComponent(
        "I solved our love puzzle ❤️🧩"
    );

    window.open(
        `https://api.whatsapp.com/send?text=${text}`,
        "_blank"
    );
}
