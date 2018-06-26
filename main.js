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
  draw(){
    this.x--;
    if(this.x === -this.width) this.x = 0;
    ctx.drawImage(this.image, this.x,this.y,this.width,this.height);
    ctx.drawImage(this.image, this.x + this.width,this.y,this.width,this.height);
  }
}

class Doggy {
  constructor(x=450){
    this.x = x;
    this.y = 230;
    this.width = 60;
    this.height = 50;
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
    this.y = 180;
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

  jump(){
        this.y -= 55;
        if(this.isJumping) return;
        this.isJumping = true;           
            this.image = new Image();
            this.image.src = images.skater2;
            this.image.onload = function(){
              this.draw();
            }.bind(this);

      setTimeout(function(){
        this.isJumping = false;
        this.y += 55;
          this.image.src = images.skater1;
          this.image.onload = function(){
            this.draw();
        }.bind(this);
  }.bind(this), 500);
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
  
}

function start(){
  console.log("puchado");
  if(interval) return;
  interval = setInterval(update, 500/60);
  // console.log(player);

}
function pauseButton(){
  console.log("Me puchaste");
  clearInterval(interval);
  
}
function startUser(){
  console.log("pucheng");


}

//aux functions
addEventListener('keydown', function(e){
  if (e.keyCode === 32) {
    skater.jump();
  }
})
document.getElementById("btn-1").addEventListener("click", function(e){
    start();
    // var player = document.getElementsByTagName("input").innerText("");
})

document.getElementById("btn-2").addEventListener("click", function(e){
    pauseButton();
})

//listeners


//start();



