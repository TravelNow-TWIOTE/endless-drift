const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let drifting = false;
let gameOver = false;

let car = {
x: canvas.width / 2,
y: canvas.height / 2,
size: 20
};

let roadWidth = 120;
let roadX = canvas.width / 2;

let score = 0;

document.addEventListener("keydown", e => {
if(e.code === "Space") drifting = true;
});

document.addEventListener("keyup", e => {
if(e.code === "Space") drifting = false;
});

function update(){

if(gameOver) return;

score += 0.1;

if(drifting){
roadX += 3;
}else{
roadX -= 3;
}

if(
car.x < roadX - roadWidth/2 ||
car.x > roadX + roadWidth/2
){
gameOver = true;
}

}

function draw(){

ctx.clearRect(0,0,canvas.width,canvas.height);

ctx.fillStyle = "#333";
ctx.fillRect(roadX - roadWidth/2, 0, roadWidth, canvas.height);

ctx.fillStyle = "red";
ctx.fillRect(car.x - car.size/2, car.y - car.size/2, car.size, car.size);

ctx.fillStyle = "white";
ctx.font = "20px Arial";
ctx.fillText("Score: " + Math.floor(score), 20, 40);

if(gameOver){
ctx.font = "50px Arial";
ctx.fillText("GAME OVER", canvas.width/2 - 150, canvas.height/2);
}

}

function gameLoop(){

update();
draw();

requestAnimationFrame(gameLoop);

}

gameLoop();
