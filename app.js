var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");
var score=0;
var best=document.querySelector(".best");
var current=document.querySelector(".current");
var max=0;

//Get best score local storage
max=localStorage.getItem("BestScore");
best.innerHTML=`Best Score: ${max}`;


//load images
var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeNorth = new Image();
var pipeSouth = new Image();

//images
bird.src = "images/bird.png";
bg.src = "images/bg.png";
fg.src = "images/fg.png";
pipeNorth.src = "images/pipeNorth.png";
pipeSouth.src = "images/pipeSouth.png";

//audio
var fly=new Audio();
var scor=new Audio();
fly.src="sounds/fly.mp3";
scor.src="sounds/score.mp3";

//Const
var constant=242+85;

//Position var
var bX=10;
var bY=150;
var gravity=1.5;

//Keyboard
document.addEventListener('keydown', moveUp);
//Bird move function
function moveUp() {
  bY-=25;
  fly.play();
}

//pipe coordinates
var pipe=[];
pipe[0]={
  x: cvs.width,
  y: 0
}

var flag=true;

//draw images
function draw() {
  //Draw pipes and backgrouds
  ctx.drawImage(bg,0,0);
  //Loop all pipes and draw
  for (var i = 0; i < pipe.length; i++) {
    //Draw the pipes
    ctx.drawImage(pipeNorth, pipe[i].x, pipe[i].y);
    ctx.drawImage(pipeSouth, pipe[i].x, pipe[i].y+constant);
    //Move the pipe
    pipe[i].x--;
    //Add new pipes to the array
    if(pipe[i].x==125){
      pipe.push({
        x: cvs.width,
        y: Math.floor(Math.random()*242)-242
      })
    }

    //detect collision
    if(bX+bird.width>=pipe[i].x  && bX<=pipe[i].x+52
      && (bY<=pipe[i].y +242 || bY+bird.height>=pipe[i].y+constant)
     || bY+bird.height>=cvs.height-fg.height){
      location.reload();
    }

    //add score
    if(pipe[i].x==5){
      score++;
      scor.play();
      console.log(score  );
      if(score>max){
        max=score;
        console.log(max);
        localStorage.setItem('BestScore', max);
        best.innerHTML=`Best Score: ${localStorage.getItem("BestScore")}`;
      }
      current.innerHTML=`Current Score: ${score}`;
      //console.log(score);

    }
  }


  //Draw front ground
  ctx.drawImage(fg, 0,cvs.height-fg.height);
  //Draw the bird
  ctx.drawImage(bird, bX,bY);
  //Gravity
  bY+=gravity;



  if (flag){
    requestAnimationFrame(draw);
  }

}

draw();
