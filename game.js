const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let drifting = false;
let gameOver = false;

let score = 0;

let car = {
x: canvas.width/2,
y: canvas.height*0.7,
size:20
};

let roadWidth = 120;

let segments = [];
let segmentLength = 120;

function createSegment(x){
return {
x:x
};
}

segments.push(createSegment(canvas.width/2));

document.addEventListener("keydown", e=>{
if(e.code==="Space") drifting = true;

if(gameOver && e.code==="KeyR"){
restart();
}
});

document.addEventListener("keyup", e=>{
if(e.code==="Space") drifting = false;
});

function restart(){
segments=[];
segments.push(createSegment(canvas.width/2));
score=0;
gameOver=false;
}

function update(){

if(gameOver) return;

score+=0.1;

let last = segments[segments.length-1];

if(drifting){
last.x += 3;
}else{
last.x -= 3;
}

if(segments.length < canvas.height/segmentLength + 2){

let direction = Math.random() > 0.5 ? 1 : -1;

let newX = last.x + direction * (Math.random()*120);

segments.push(createSegment(newX));

}

if(segments.length > 20){
segments.shift();
}

let roadLeft = last.x - roadWidth/2;
let roadRight = last.x + roadWidth/2;

if(car.x < roadLeft || car.x > roadRight){
gameOver = true;
}

}

function draw(){

ctx.clearRect(0,0,canvas.width,canvas.height);

for(let i=0;i<segments.length;i++){

let s = segments[i];

let y = canvas.height - i*segmentLength;

ctx.fillStyle="#444";
ctx.fillRect(s.x-roadWidth/2,y,roadWidth,segmentLength);

}

ctx.fillStyle="red";
ctx.fillRect(car.x-car.size/2,car.y-car.size/2,car.size,car.size);

ctx.fillStyle="white";
ctx.font="20px Arial";
ctx.fillText("Score: "+Math.floor(score),20,40);

if(gameOver){

ctx.font="50px Arial";
ctx.fillText("GAME OVER",canvas.width/2-150,canvas.height/2);

ctx.font="20px Arial";
ctx.fillText("Press R to Restart",canvas.width/2-80,canvas.height/2+40);

}

}

function gameLoop(){

update();
draw();

requestAnimationFrame(gameLoop);

}

gameLoop();
