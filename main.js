
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
  hobo:"./images/hobo.png",
  gameOver:"https://media.moddb.com/images/games/1/45/44877/Game_Over.1.png",
  palmTree:"https://i.pinimg.com/originals/74/b4/b6/74b4b6e3299c72aa67967f4d2fd7936c.png",
  infoScreen:"./images/Tie-dye.png",
}

var dogs = [];
var hobos = [];
var palms = [];
var players = [];
// var player1 = "";

var points = 0;
var points2 = 0;
var multiplicador = false;
var pause = false;
var player1 = document.getElementById("player").value;
var count = 0;

var sound = new Audio();
sound.src = "./sounds/Snoop Dogg -  Smoke Weed Everyday Instrumental ( Dj Esdras Martins )-[AudioTrimmer.com].mp3";
sound.loop = true;

var ollieSound = new Audio();
ollieSound.src="./sounds/Skateboard Ollie Sound Effect-[AudioTrimmer.com] (1).mp3";


var hoboSound = new Audio();
hoboSound.src="./sounds/Pain-SoundBible.com-1883168362.mp3";

// var dogSound = new Audio();
// sound.src="";

// var pauseSound = new Audio();
// sound.src ="";



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

    this.image2 = new Image();
    this.image2.src = images.gameOver;
    this.image2.onload = function(){
      this.draw()
    }.bind(this);
    
    this.image3 = new Image();
    this.image3.src = images.infoScreen;
    this.image3.onload = function(){
      this.draw()
    }.bind(this);

  }
  gameOver(){
    
    ctx.drawImage(this.image2, 0,100,this.width,this.height);
    ctx.font = "100px Mexcellent-Regular";
    ctx.fillStyle = "yellow";
    
    // ctx.fillText("GAME OVER",20,100);
    ctx.font = "20px Avenir";
    ctx.fillText("Press ESC to restart",470,490);
    
    ctx.fillStyle = "white";
    // ctx.fillText("TOTAL POINTS: " + points,470,490)
    ctx.font = "15px Avenir";
    ctx.fillText("if player 2's turn... input name before pressing ESC!",20, 480);
    console.log(points);
    

  }
  
  drawInfo(){
    ctx.drawImage(this.image3, 120,100,450,300);
  }
  draw(){
    this.x--;
    if(this.x === -this.width) this.x = 0;
    ctx.drawImage(this.image, this.x,this.y,this.width,this.height);
    ctx.drawImage(this.image, this.x + this.width,this.y,this.width,this.height);
    
  }
  drawScore(){
    ctx.font = "50px Avenir";
    
    ctx.fillStyle = "rgb(229, 50, 159)";
    if (skater.x <= 250) {
    //points += Math.floor(frames/20);
    multiplicador = false;
    ctx.fillText("POINTS: " + points, canvas.width - 400, 80);
    
    
  } else if (skater.x > 250){
    //points += Math.floor(frames/10);
    multiplicador = true;
    ctx.fillText("POINTS x2: " + points, canvas.width - 400, 80);
    
  }
  
  }
  
  
}

class Doggy {
  constructor(){
    this.x = canvas.width;
    this.y = 400;
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

class Hobo {
  constructor(){
    this.x = canvas.width;
    this.y = 400;
    this.width = 80;
    this.height = 60;
    this.image = new Image();
    this.image.src = images.hobo;
    this.image.onload = function(){
       this.draw();
     }.bind(this);
  }
  draw(){
    this.x-=1;
    ctx.drawImage(this.image,this.x,this.y,this.width,this.height);
  }
}
class Palm  {
  constructor(){
    this.x = canvas.width;
    this.y = 100;
    this.width = 120;
    this.height = 300;
    this.image = new Image();
    this.image.src = images.palmTree;
    this.image.onload = function(){
       this.draw();
     }.bind(this);
  }
  draw(){
    this.x-=1;
    ctx.drawImage(this.image,this.x,this.y,this.width,this.height);
  }
}

class Skater {
  constructor(){
    this.x = 50;
    this.y = 340;
    this.width = 110;
    this.height = 110;
    this.isJumping = false;
    this.isJumpingLonger = false;
    this.jumpTimer = 0;
    
    this.image = new Image();
    this.image.src = images.skater1;
    this.image.onload = function(){
      this.draw();
    }.bind(this);
    this.gravity = 1.5;
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
  }.bind(this), 550);
  }
//   jumpLonger(){
//     this.y -= 60;
//     if(this.isJumpingLonger) return;
//     this.isJumpingLonger = true;           
//         this.image = new Image();
//         this.image.src = images.skater2;
//         this.image.onload = function(){
//           this.draw();
//         }.bind(this);

//   setTimeout(function(){
//     this.isJumpingLonger = false;
//     this.y += 60;
//       this.image.src = images.skater1;
//       this.image.onload = function(){
//         this.draw();
//     }.bind(this);
//   }.bind(this), 3000);
// }
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
var hobo = new Hobo();
var palm = new Palm();

//main functions

function update(){
  frames++;
  scoreMult();
  //playerName();
  ctx.clearRect(0,0,canvas.width,canvas.height);
  backg.draw();
  
  palm.draw();
  generatePalms();
  drawPalms();
  skater.draw();
  dog.draw();
  hobo.draw();
  generateDogs();
  drawDogs();
  generateHobos();
  drawHobos();
  
  backg.drawScore();
  // backg.drawInfo();
  
  
  
  
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
  sound.play();
 
  
  // var playa = document.getElementById("player").value;
  // players.push(playa);

  
  // console.log(player);

}

function togglePause(){
  console.log("pausa")
  if (!pause) {
    pause = true;
    clearInterval(interval)
    document.getElementById("btn-2-pause").innerText="Play"
    sound.pause();
  }else{
    console.log("interval")
    pause = false;
    interval = setInterval(update, 400/60);
    document.getElementById("btn-2-pause").innerText="Pause"
    sound.play();
  } 
}

// function startUser(){
//   console.log("pucheng");

//   if(interval) return;
//   interval = setInterval(update, 400/60);
// }
function restart(){
  if(interval) return;
    dogs = [];
    frames = 0;
    points = 0;
    skater.x = 50;
    skater.y = 350;
    start();
    playerName1();
    updateScore2();
    updateScore3();
    
    // updateScore1();
}

// function playerLog(){
//   if (player1 = "") return players;

// }

function playerName(){
  var player1 = document.getElementById("player").value;
  
  document.getElementById("player1").innerHTML =  player1;

  console.log(player1);
}
function playerName1(){
  var player2 = document.getElementById("player").value;
  
  document.getElementById("player2").innerHTML = player2;
}

function updateScore1(){
    var totalScore = points;
    var r1 = document.getElementById("ranking1")
    r1.innerHTML = totalScore;
    
    


}
function updateScore2(){
    var list = document.getElementsByClassName("ol");
    var second = document.getElementById("ranking2");
    var totalScore2 = points;
    second.innerHTML = totalScore2;

    console.log(list.indexOf(second));
}
function updateScore3(){
  var list = document.getElementsByClassName("ol");
  var third = document.getElementById("ranking3");
  var totalScore3 = points2;
  third.innerHTML = totalScore3;

  console.log(list.indexOf(third));
}

// function appendScore(){

  
//   var r2 =  document.getElementById("ranking2")
//     r2.appendChild(totalScore);
// }
// function updateScore2(){
//     var totalScore = points;
//     var r2 = document.getElementById("ranking2");
//     r2.innerHTML = totalScore;
// }
//aux functions
window.onload = function (){
  backg.drawInfo();
}


addEventListener('keydown', function(e){
  if (e.keyCode === 38) {
    // skater.jump();
    
    if(skater.isJumping) return;
    else skater.jump();
    ollieSound.play();  
    
    
  } else if (e.keyCode === 27) {
    restart();
    
   
    
  }else if (e.keyCode === 39) {
    skater.moveRight();
    
  }else if (e.keyCode === 37) {
    skater.moveLeft();
  }
})
// addEventListener("keydown", function(e){
//   if (e.keyCode === 38 && e.keyCode === 39)
//     skater.jumpLonger();
// })
// addEventListener("keydown", function(e){
//   if (e.keyCode === 39 && e.keyCode === 38){
//     skater.jumpLonger();
//   }
// })


document.getElementById("btn-1").addEventListener("click", function(){
    start();
    playerName();
    // var player = document.getElementsByTagName("input").value;
    // console.log(player);
})

document.getElementById("btn-2-pause").addEventListener("click",function(){
  togglePause()
});




function generateDogs(){
  if(!(frames%511===0) ) return;
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
function generateHobos(){
  if(!(frames%832===0) ) return;
  console.log("hobo generated")
  var houbo = new Hobo();
  dogs.push(houbo);
}

function drawHobos(){
  hobos.forEach(function(hoboz){
    hoboz.draw();
    if(skater.isTouching(hoboz)){
      
      dead();
      
  }
    
});  
}
function generatePalms(){
  if(!(frames%300===0) ) return;
  console.log("palm generated")
  var palm = new Palm();
  palms.push(palm);
}

function drawPalms(){
  palms.forEach(function(palmz){
    palmz.draw();
  })   
}

function dead(){
  clearInterval(interval);
  interval = undefined;
  backg.gameOver();
  sound.pause();
  hoboSound.play();
  count++;
  if (count === 1) return updateScore1();
  if (count === 2) return updateScore2();
  if (count === 3) return updateScore3();
  points2 += points;
  
}


//listeners


//start();



