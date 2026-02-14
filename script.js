const size = 3;
const puzzle = document.getElementById("puzzle");
const reference = document.getElementById("reference");
const loveText = document.getElementById("loveText");

let tiles = [];
let emptyPos = {row:2,col:2};

const tileSize = () => window.innerWidth < 600 ? 90 : 110;

/* IMAGES */
const photos=[];
for(let i=1;i<=10;i++){
    photos.push(`images/img${i}.jpg`);
}

const selectedPhoto =
    photos[Math.floor(Math.random()*photos.length)];

reference.src = selectedPhoto;

/* LOVE MESSAGES */
const messages=[
"You are my favorite notification ❤️",
"You complete my life puzzle 🧩💖",
"Forever isn't enough with you 💞",
"You are my happy place 🥰",
"Our story is my favorite adventure 💘"
];

/* CREATE IMAGE FIRST */
const image = new Image();
image.src = selectedPhoto;

image.onload = createPuzzle;

function createPuzzle(){

    puzzle.innerHTML="";
    tiles=[];

    let count=0;

    for(let r=0;r<size;r++){
        for(let c=0;c<size;c++){

            if(r===size-1 && c===size-1) continue;

            const tile=document.createElement("div");
            tile.className="tile";

            tile.dataset.row=r;
            tile.dataset.col=c;
            tile.dataset.value=count;

            positionTile(tile,r,c);

            /* image slicing */
            const imgRow=Math.floor(count/size);
            const imgCol=count%size;

            tile.style.backgroundImage=`url('${selectedPhoto}')`;
            tile.style.backgroundPosition=
                `-${imgCol*tileSize()}px -${imgRow*tileSize()}px`;

            tile.onclick=()=>moveTile(tile);

            puzzle.appendChild(tile);
            tiles.push(tile);

            count++;
        }
    }
}

function positionTile(tile,row,col){
    tile.style.top = row*tileSize()+"px";
    tile.style.left = col*tileSize()+"px";

    tile.dataset.row=row;
    tile.dataset.col=col;
}

function moveTile(tile){

    const row=parseInt(tile.dataset.row);
    const col=parseInt(tile.dataset.col);

    if(isAdjacent(row,col,emptyPos.row,emptyPos.col)){

        /* slide tile into empty */
        positionTile(tile,emptyPos.row,emptyPos.col);

        emptyPos={row,col};

        checkWin();
    }
}

function isAdjacent(r1,c1,r2,c2){
    return Math.abs(r1-r2)+Math.abs(c1-c2)===1;
}

function checkWin(){

    for(let tile of tiles){

        const val=parseInt(tile.dataset.value);
        const correctRow=Math.floor(val/size);
        const correctCol=val%size;

        if(
            parseInt(tile.dataset.row)!==correctRow ||
            parseInt(tile.dataset.col)!==correctCol
        ) return;
    }

    showLoveMessage();
}

function solvePuzzle(){

    for(let tile of tiles){

        const val=parseInt(tile.dataset.value);
        const row=Math.floor(val/size);
        const col=val%size;

        positionTile(tile,row,col);
    }

    emptyPos={row:2,col:2};
    showLoveMessage();
}

function showLoveMessage(){

    loveText.innerText =
        messages[Math.floor(Math.random()*messages.length)];

    const msg=document.getElementById("message");
    msg.classList.remove("hidden");
    msg.scrollIntoView({behavior:"smooth"});
}

/* WHATSAPP */
function shareWhatsApp(){

    const text=encodeURIComponent(
        "I solved our love puzzle ❤️"
    );

    window.open(
        `https://api.whatsapp.com/send?text=${text}`,
        "_blank"
    );
}
