const puzzle = document.getElementById("puzzle");
const size = 3;
let tiles = [];
let emptyIndex = size * size - 1;

function createPuzzle(){

    tiles = [];

    for(let i=0;i<size*size;i++){
        tiles.push(i);
    }

    shuffle(tiles);

    render();
}

function shuffle(arr){
    for(let i=arr.length-1;i>0;i--){
        let j = Math.floor(Math.random()*(i+1));
        [arr[i],arr[j]] = [arr[j],arr[i]];
    }
}

function render(){
    puzzle.innerHTML = "";

    tiles.forEach((value,index)=>{

        const tile = document.createElement("div");

        if(value === size*size-1){
            tile.classList.add("tile","empty");
        } else {

            tile.classList.add("tile");

            let row = Math.floor(value/size);
            let col = value % size;

            tile.style.backgroundPosition =
                `-${col*100}px -${row*100}px`;

            tile.addEventListener("click",()=>{
                moveTile(index);
            });
        }

        puzzle.appendChild(tile);
    });
}

function moveTile(index){

    const neighbors = [
        index-1,
        index+1,
        index-size,
        index+size
    ];

    if(neighbors.includes(emptyIndex) &&
       isAdjacent(index, emptyIndex)){

        [tiles[index], tiles[emptyIndex]] =
        [tiles[emptyIndex], tiles[index]];

        emptyIndex = index;

        render();
        checkWin();
    }
}

function isAdjacent(i,j){

    const row1 = Math.floor(i/size);
    const col1 = i%size;

    const row2 = Math.floor(j/size);
    const col2 = j%size;

    return Math.abs(row1-row2)+Math.abs(col1-col2) === 1;
}

function checkWin(){

    for(let i=0;i<tiles.length;i++){
        if(tiles[i] !== i) return;
    }

    showMessage();
}

function solvePuzzle(){

    tiles = [...Array(size*size).keys()];
    emptyIndex = size*size-1;
    render();
    showMessage();
}

function showMessage(){
    document.getElementById("message")
        .classList.remove("hidden");
}

createPuzzle();
