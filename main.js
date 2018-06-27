var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

//constants

var interval;
var frames = 0;
var images = {
  bg:"./images/pixil-frame-1.png",
  skater1:"./images/Sprite1.png",
  skater2:"./images/Sprite2.png",
  skater3:"./images/Sprite3.png",
  doggy1:"./images/doggy3.png",
  doggy2:"./images/Doggy2.png",
}
var dogs = [];
var players = [];
var player1 = "";
var player2 = "";
var points = 0;
var multiplicador = false;
var pause = false;




//class
class Board {
  constructor(){
    this.x = 0;
    this.y = 0;
    this.width = canvas.width;
    this.height = canvas.height;
    
    this.image = new Image();
    this.image.src = images.bg;
    this.image.onload = function(){
      this.draw()
    }.bind(this);

  }
  gameOver(){
    ctx.font = "100px Arial";
    ctx.fillStyle = "red";
    ctx.fillText("GAME OVER",20,100);
    ctx.font = "20px Arial";
    ctx.fillText("Press ESC to restart",20,180);
    
    ctx.fillStyle = "black";
    ctx.fillText("TOTAL POINTS: " + points,20,250)
    console.log(points);
    

  }
  
  
  draw(){
    this.x--;
    if(this.x === -this.width) this.x = 0;
    ctx.drawImage(this.image, this.x,this.y,this.width,this.height);
    ctx.drawImage(this.image, this.x + this.width,this.y,this.width,this.height);
    
  }
  drawScore(){
    ctx.font = "50px Arial";
    ctx.fillStyle = "green";
    if (skater.x <= 250) {
    //points += Math.floor(frames/20);
    multiplicador = false;
    ctx.fillText("POINTS: " + points, canvas.width - 400, 170);
    
    
  } else if (skater.x > 250){
    //points += Math.floor(frames/10);
    multiplicador = true;
    ctx.fillText("POINTS x2: " + points, canvas.width - 400, 170);
    
  }
  
  }
  
}

class Doggy {
  constructor(){
    this.x = canvas.width;
    this.y = 390;
    this.width = 70;
    this.height = 60;
    this.image1 = new Image();
    this.image1.src = images.doggy1;
    this.image2 = new Image();
    this.image2.src = images.doggy2;
    this.toggleWhich = function(){
      this.which = !this.which;
    }
    // this.image.onload = function(){
    //   this.draw();
    // }.bind(this);
  }

  draw(){
    this.x-=2;
    var img = this.which ? this.image1:this.image2;
    ctx.drawImage(img,this.x,this.y,this.width,this.height);
    if(frames%20===0) this.toggleWhich();
  
  }
}

class Skater {
  constructor(){
    this.x = 50;
    this.y = 350;
    this.width = 100;
    this.height = 100;
    this.isJumping = false;
    this.isJumpingLonger = false;
    this.jumpTimer = 0;
    this.image = new Image();
    this.image.src = images.skater1;
    this.image.onload = function(){
      this.draw();
    }.bind(this);
  }

  isTouching(item){
    return  (this.x < item.x + item.width -30) &&
            (this.x + this.width - 30 > item.x) &&
            (this.y < item.y + item.height - 30) &&
            (this.y + this.height - 30 > item.y);
  }


  jump(){
        this.y -= 60;
        if(this.isJumping) return;
        this.isJumping = true;    
               
            this.image = new Image();
            this.image.src = images.skater2;
            this.image.onload = function(){
              this.draw();
            }.bind(this);

      setTimeout(function(){
        this.isJumping = false;
        this.y += 60;
          this.image.src = images.skater1;
          this.image.onload = function(){
            this.draw();
        }.bind(this);
  }.bind(this), 500);
  }
  jumpLonger(){
    this.y -= 60;
    if(this.isJumpingLonger) return;
    this.isJumpingLonger = true;           
        this.image = new Image();
        this.image.src = images.skater2;
        this.image.onload = function(){
          this.draw();
        }.bind(this);

  setTimeout(function(){
    this.isJumpingLonger = false;
    this.y += 60;
      this.image.src = images.skater1;
      this.image.onload = function(){
        this.draw();
    }.bind(this);
  }.bind(this), 3000);
}
  moveRight(){
    this.x += 20;
  }
  moveLeft(){
    this.x-=20;
  }

  draw(){
    ctx.drawImage(this.image, this.x,this.y,this.width,this.height);
  }

}

//instances
var backg = new Board();
var skater = new Skater();
var dog = new Doggy();

//main functions

function update(){
  frames++;
  scoreMult();
  ctx.clearRect(0,0,canvas.width,canvas.height);
  backg.draw();
  skater.draw();
  dog.draw();
  generateDogs();
  drawDogs();
  backg.drawScore();
  playerName();
  
  
  
}
function scoreMult (){
  if (frames % 80 === 0) {
    if(multiplicador) points += 2
    else points += 1;
  }
}

function start(){
  console.log("puchado");
  if(interval) return;
  interval = setInterval(update, 400/60);
  var playa = document.getElementById("player").value;
  players.push(playa);
  console.log(players);
  
  // console.log(player);

}

function togglePause(){
  console.log("pausa")
  if (!pause) {
    pause = true;
    clearInterval(interval)
    document.getElementById("btn-2-pause").innerText="Play"
  }else{
    console.log("interval")
    pause = false;
    interval = setInterval(update, 400/60);
    document.getElementById("btn-2-pause").innerText="Pause"
  } 
}

function startUser(){
  console.log("pucheng");
}
function restart(){
  if(interval) return;
    dogs = [];
    frames = 0;
    points = 0;
    skater.x = 50;
    skater.y = 350;
    start();
}

// function playerLog(){
//   if (player1 = "") return players;

// }

function playerName(){
  var player1 = document.getElementsByTagName("input").value;
  
  document.getElementById("player1").innerText = player1;
  
}

//aux functions
addEventListener('keydown', function(e){
  if (e.keyCode === 38) {
    skater.jump();
    this.removeEventListener;
  } else if (e.keyCode === 27) {
    restart();
  }else if (e.keyCode === 39) {
    skater.moveRight();
    
  }else if (e.keyCode === 37) {
    skater.moveLeft();
  }
})
addEventListener("keydown", function(e){
  if (e.keyCode === 38 && e.keyCode === 39)
    skater.jumpLonger();
})
// addEventListener("keydown", function(e){
//   if (e.keyCode === 39 && e.keyCode === 38){
//     skater.jumpLonger();
//   }
// })


document.getElementById("btn-1").addEventListener("click", function(e){
    start();
    playerName();
    // var player = document.getElementsByTagName("input").value;
    // console.log(player);
})

document.getElementById("btn-2-pause").addEventListener("click",function(){
  togglePause()
});
document.getElementsByTagName("input")

function generateDogs(){
  if(!(frames%500===0) ) return;
  console.log("dog generated")
  var dawg = new Doggy();
  dogs.push(dawg);
}

function drawDogs(){
  dogs.forEach(function(dogz){
    dogz.draw();
    if(skater.isTouching(dogz)){
      dead();
  }
    
});  
}

function dead(){
  clearInterval(interval);
  interval = undefined;
  backg.gameOver();
}

//listeners


//start();



