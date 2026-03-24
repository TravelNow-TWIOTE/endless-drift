const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let turningRight = false;
let gameOver = false;
let score = 0;

/* CAR */
const car = {
x: canvas.width / 2,
y: canvas.height / 2,
angle: 0,
speed: 3,
size: 12
};

/* ROAD SETTINGS */
const tileSize = 40;
let tiles = [];

/* DIRECTIONS */
let directions = [
{dx:1, dy:0},   // right
{dx:0, dy:1},   // down
{dx:-1, dy:0},  // left
{dx:0, dy:-1}   // up
];

let currentDir = 0;

/* INIT ROAD */
function reset(){

tiles = [];
score = 0;
gameOver = false;

currentDir = 0;

let startX = Math.floor(canvas.width/2 / tileSize);
let startY = Math.floor(canvas.height/2 / tileSize);

for(let i=0;i<20;i++){
tiles.push({x:startX + i, y:startY});
}

car.x = canvas.width/2;
car.y = canvas.height/2;
car.angle = 0;

}

reset();

/* INPUT */
document.addEventListener("keydown", e=>{
if(e.code === "Space") turningRight = true;
if(e.code === "KeyR") reset();
});

document.addEventListener("keyup", e=>{
if(e.code === "Space") turningRight = false;
});

/* UPDATE */
function update(){

if(gameOver) return;

score += 0.1;

/* TURNING */
if(turningRight){
car.angle += 0.05;
}else{
car.angle -= 0.05;
}

/* MOVE FORWARD */
car.x += Math.cos(car.angle) * car.speed;
car.y += Math.sin(car.angle) * car.speed;

/* GENERATE ROAD */
let last = tiles[tiles.length - 1];

if(Math.random() < 0.03){

if(turningRight){
currentDir = (currentDir + 1) % 4;
}else{
currentDir = (currentDir + 3) % 4;
}

}

let dir = directions[currentDir];

tiles.push({
x: last.x + dir.dx,
y: last.y + dir.dy
});

if(tiles.length > 100){
tiles.shift();
}

/* COLLISION */
let onRoad = false;

for(let t of tiles){

let tx = t.x * tileSize;
let ty = t.y * tileSize;

if(
car.x > tx &&
car.x < tx + tileSize &&
car.y > ty &&
car.y < ty + tileSize
){
onRoad = true;
break;
}

}

if(!onRoad){
gameOver = true;
}

}

/* DRAW */
function draw(){

ctx.clearRect(0,0,canvas.width,canvas.height);

/* ROAD */
for(let t of tiles){

ctx.fillStyle = "#444";

ctx.fillRect(
t.x * tileSize,
t.y * tileSize,
tileSize,
tileSize
);

}

/* CAR */
ctx.save();
ctx.translate(car.x, car.y);
ctx.rotate(car.angle);

ctx.fillStyle = "red";
ctx.fillRect(-10,-5,20,10);

ctx.restore();

/* SCORE */
ctx.fillStyle="black";
ctx.font="20px Arial";
ctx.fillText("Score: "+Math.floor(score),20,40);

/* GAME OVER */
if(gameOver){

ctx.font="50px Arial";
ctx.fillText("GAME OVER",canvas.width/2-150,canvas.height/2);

ctx.font="20px Arial";
ctx.fillText("Press R to Restart",canvas.width/2-90,canvas.height/2+40);

}

}

/* LOOP */
function loop(){
update();
draw();
requestAnimationFrame(loop);
}

loop();
