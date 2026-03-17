const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let drifting = false;
let gameOver = false;
let score = 0;

const car = {
x: canvas.width / 2,
y: canvas.height * 0.75,
size: 20
};

let roadCenter = canvas.width / 2;
const roadWidth = 160;

document.addEventListener("keydown", e => {
if(e.code === "Space") drifting = true;
if(e.code === "KeyR") restart();
});

document.addEventListener("keyup", e => {
if(e.code === "Space") drifting = false;
});

function restart(){
gameOver = false;
score = 0;
car.x = canvas.width / 2;
roadCenter = canvas.width / 2;
}

function update(){

if(gameOver) return;

score += 0.1;

/* car movement */
if(drifting){
car.x += 4;
}else{
car.x -= 4;
}

/* road zig-zag */
roadCenter += (Math.random() - 0.5) * 3;

/* collision */
let left = roadCenter - roadWidth/2;
let right = roadCenter + roadWidth/2;

if(car.x < left || car.x > right){
gameOver = true;
}

}

function draw(){

ctx.clearRect(0,0,canvas.width,canvas.height);

/* road */
ctx.fillStyle = "#444";
ctx.fillRect(
roadCenter - roadWidth/2,
0,
roadWidth,
canvas.height
);

/* car */
ctx.fillStyle = "red";
ctx.fillRect(
car.x - car.size/2,
car.y - car.size/2,
car.size,
car.size
);

/* score */
ctx.fillStyle = "white";
ctx.font = "20px Arial";
ctx.fillText("Score: " + Math.floor(score), 20, 40);

/* game over */
if(gameOver){
ctx.font = "50px Arial";
ctx.fillText("GAME OVER", canvas.width/2 - 150, canvas.height/2);
ctx.font = "20px Arial";
ctx.fillText("Press R to Restart", canvas.width/2 - 90, canvas.height/2 + 40);
}

}

function loop(){
update();
draw();
requestAnimationFrame(loop);
}

loop();
