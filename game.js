const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let car = {
x: canvas.width/2,
y: canvas.height/2,
angle: 0,
speed: 4
};

let drifting = false;

document.addEventListener("keydown", (e)=>{
if(e.code === "Space"){
drifting = true;
}
});

document.addEventListener("keyup", (e)=>{
if(e.code === "Space"){
drifting = false;
}
});

function update(){

if(drifting){
car.angle += 0.05;
}else{
car.angle -= 0.03;
}

car.x += Math.cos(car.angle) * car.speed;
car.y += Math.sin(car.angle) * car.speed;

}

function draw(){

ctx.clearRect(0,0,canvas.width,canvas.height);

ctx.save();

ctx.translate(car.x, car.y);
ctx.rotate(car.angle);

ctx.fillStyle = "red";
ctx.fillRect(-20,-10,40,20);

ctx.restore();

}

function gameLoop(){

update();
draw();

requestAnimationFrame(gameLoop);

}

gameLoop();
