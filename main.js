var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

//constants

var interval;
var frames = 0;
var images = {
  bg:"./images/pixil-frame-1.png",
  skater1:"./images/Sprite1.png",
  skater2:"./images/Sprite2.png",

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
        this.y -= 50;
        if(this.isJumping) return;
        this.isJumping = true;
            this.image = new Image();
            this.image.src = images.skater2;
            this.image.onload = function(){
              this.draw();
            }.bind(this);

      setTimeout(function(){
        this.isJumping = false;
        this.y += 50;
          this.image.src = images.skater1;
          this.image.onload = function(){
            this.draw();
        }.bind(this);
  }.bind(this), 300);
  }

  draw(){
    ctx.drawImage(this.image, this.x,this.y,this.width,this.height);
  }

}

//instances
var backg = new Board();
var skater = new Skater();

//main functions

function update(){
  frames++;
  ctx.clearRect(0,0,canvas.width,canvas.height);
  backg.draw();
  skater.draw();
  // if (skater.isJumping){
  //   skater.jumpTimer += 1;
  //   if (skater.jumpTimer === 60) {
  //     skater.jump();
  //     skater.jumpTimer === 0
  //   }
  // }
}

function start(){
  if(interval) return;
  interval = setInterval(update, 1000/60);
}
//aux functions
addEventListener('keydown', function(e){
  if (e.keyCode === 32) {
    skater.jump();
  }
})

//listeners
start();
