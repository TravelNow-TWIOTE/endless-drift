const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let drifting = false;
let gameOver = false;
let score = 0;

let car = {
x: canvas.width/2,
y: canvas.height*0.75,
size:20
};

let roadWidth = 140;
let segmentHeight = 120;
let scrollSpeed = 4;

let segments = [];

function restart(){

segments = [];
score = 0;
gameOver = false;

let startX = canvas.width/2;

for(let i=0;i<12;i++){
segments.push({
x:startX,
y:canvas.height - i*segmentHeight
});
}

}

restart();

document.addEventListener("keydown", e=>{

if(e.code==="Space"){
drifting=true;
}

if(e.code==="KeyR"){
restart();
}

});

document.addEventListener("keyup", e=>{

if(e.code==="Space"){
drifting=false;
}

});

function update(){

if(gameOver) return;

score += 0.1;

if(drifting){
car.x += 4;
}else{
car.x -= 4;
}

for(let seg of segments){
seg.y += scrollSpeed;
}

let last = segments[segments.length-1];

if(last.y > canvas.height){

let direction = Math.random()>0.5 ? 1 : -1;

let newX = last.x + direction*(60 + Math.random()*80);

segments.push({
x:newX,
y:last.y - segmentHeight
});

segments.shift();

}

let playerSegment = segments.find(
s => car.y > s.y && car.y < s.y + segmentHeight
);

if(playerSegment){

let left = playerSegment.x - roadWidth/2;
let right = playerSegment.x + roadWidth/2;

if(car.x < left || car.x > right){
gameOver=true;
}

}

}

function draw(){

ctx.clearRect(0,0,canvas.width,canvas.height);

for(let seg of segments){

ctx.fillStyle="#444";

ctx.fillRect(
seg.x-roadWidth/2,
seg.y,
roadWidth,
segmentHeight
);

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

ctx.font="22px Arial";
ctx.fillText("Press R to Restart",canvas.width/2-100,canvas.height/2+40);

}

}

function loop(){
update();
draw();
requestAnimationFrame(loop);
}

loop();
