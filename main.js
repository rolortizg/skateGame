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
    ctx.fillText("GAME OVER",20,100);
    ctx.fillStyle("lightblue");

  }
  draw(){
    this.x--;
    if(this.x === -this.width) this.x = 0;
    ctx.drawImage(this.image, this.x,this.y,this.width,this.height);
    ctx.drawImage(this.image, this.x + this.width,this.y,this.width,this.height);
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
    // this.image.onload = function(){
    //   this.draw();
    // }.bind(this);
  }
  draw(){
    this.x-=2;
    var img = this.which ? this.image1:this.image2;
    ctx.drawImage(img,this.x,this.y,this.width,this.height);
    if(frames%20===0) this.toggleWhich();
  
  this.toggleWhich = function(){
    this.which = !this.which;
  }
}
}

class Skater {
  constructor(){
    this.x = 50;
    this.y = 350;
    this.width = 100;
    this.height = 100;
    this.isJumping = false;
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
  moveRight(){
    this.x += 10;
  }
  moveLeft(){
    this.x-=10;
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
  ctx.clearRect(0,0,canvas.width,canvas.height);
  backg.draw();
  skater.draw();
  dog.draw();
  generateDogs();
  drawDogs();
  
}

function start(){
  console.log("puchado");
  if(interval) return;
  interval = setInterval(update, 400/60);
  // console.log(player);

}
function pauseButton(){
  console.log("Me puchaste");
  clearInterval(interval);
  
}
function startUser(){
  console.log("pucheng");
}
function restart(){
  if(interval) return;
    dogs = [];
    frames = 0;
    skater.x = 50;
    skater.y = 350;
    start();

}
//aux functions
addEventListener('keydown', function(e){
  if (e.keyCode === 38) {
    skater.jump();
  } else if (e.keyCode === 27) {
    restart();
  }else if (e.keyCode === 39) {
    skater.moveRight();
  }else if (e.keyCode === 37) {
    skater.moveLeft();
  }else if (e.keyCode === 39 && keyCode === 38){
    skater.jumpLonger();
  }
})



// addEventListener("keydown", function(e){
//   if(e.keyCode === 39) {
//     skater.moveRight();
//   }
// })

document.getElementById("btn-1").addEventListener("click", function(e){
    start();
    // var player = document.getElementsByTagName("input").innerText("");
})

document.getElementById("btn-2").addEventListener("click", function(e){
    pauseButton();
})

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



