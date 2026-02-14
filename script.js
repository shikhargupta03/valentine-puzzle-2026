const size = 3;
const puzzle = document.getElementById("puzzle");
const reference = document.getElementById("reference");

let tiles = [];
let emptyIndex = size * size - 1;

/* AUTO GENERATE IMAGE LIST img1 → img10 */
const photos = [];

for (let i = 1; i <= 10; i++) {
    photos.push(`images/img${i}.jpg`);
}

/* RANDOM PHOTO SELECTION */
const selectedPhoto =
    photos[Math.floor(Math.random() * photos.length)];

reference.src = selectedPhoto;

/* WAIT FOR IMAGE LOAD */
const image = new Image();
image.src = selectedPhoto;

image.onload = () => {
    createPuzzle();
};

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
                `-${col * 110}px -${row * 110}px`;

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

    document.getElementById("message")
        .classList.remove("hidden");
}

function solvePuzzle() {

    tiles = [...Array(size * size).keys()];
    emptyIndex = size * size - 1;

    render();

    document.getElementById("message")
        .classList.remove("hidden");
}
