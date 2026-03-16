const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let turningRight = false;
let gameOver = false;
let score = 0;

let car = {
x: canvas.width/2,
y: canvas.height/2,
size:20,
angle:0
};

let platforms = [];

function createPlatform(x,y){
return {x,y,width:120,height:20};
}

function restart(){

platforms = [];
score = 0;
gameOver = false;

let startX = canvas.width/2;
let startY = canvas.height/2;

for(let i=0;i<8;i++){
platforms.push(createPlatform(startX + i*120, startY));
}

car.x = startX;
car.y = startY;
car.angle = 0;

}

restart();

document.addEventListener("keydown", e=>{
if(e.code==="Space") turningRight = true;
if(e.code==="KeyR") restart();
});

document.addEventListener("keyup", e=>{
if(e.code==="Space") turningRight = false;
});

function update(){

if(gameOver) return;

score += 0.1;

if(turningRight){
car.angle += 0.05;
}else{
car.angle -= 0.05;
}

car.x += Math.cos(car.angle) * 3;
car.y += Math.sin(car.angle) * 3;

let onPlatform = false;

for(let p of platforms){

if(
car.x > p.x &&
car.x < p.x + p.width &&
car.y > p.y &&
car.y < p.y + p.height
){
onPlatform = true;
}

}

if(!onPlatform){
gameOver = true;
}

let last = platforms[platforms.length-1];

if(last.x < canvas.width){

let direction = Math.random() > 0.5 ? 1 : -1;

platforms.push(createPlatform(
last.x + 120,
last.y + direction*80
));

platforms.shift();

}

}

function draw(){

ctx.clearRect(0,0,canvas.width,canvas.height);

for(let p of platforms){

ctx.fillStyle="#3aa655";

ctx.fillRect(p.x,p.y,p.width,p.height);

}

ctx.fillStyle="red";

ctx.fillRect(
car.x-car.size/2,
car.y-car.size/2,
car.size,
car.size
);

ctx.fillStyle="white";
ctx.font="20px Arial";
ctx.fillText("Score: "+Math.floor(score),20,40);

if(gameOver){

ctx.font="50px Arial";
ctx.fillText("GAME OVER",canvas.width/2-150,canvas.height/2);

ctx.font="20px Arial";
ctx.fillText("Press R to Restart",canvas.width/2-90,canvas.height/2+40);

}

}

function loop(){

update();
draw();
requestAnimationFrame(loop);

}

loop();
