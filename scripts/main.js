let playerPlane;
let cloud1;
const planeImage = new Image();
const cloudImage = new Image();
let ctx;
let secondsPassed = 0;
let oldTimeStamp = 0;
let movingSpeed = 50;
let timePassed = 0;








let myGameArea = {
    canvas: document.createElement("canvas"),
    start: function () {

        //sets the canvas width + height
        this.canvas.width = 100 * window.innerWidth / 100;
        this.canvas.height = 90 * window.innerHeight / 100;

        //set canvas contex to 2d 
        this.context = this.canvas.getContext("2d");

        //gets div element called gameCanvas and adds the canvas
        document.getElementById("gameCanvas").appendChild(this.canvas);

        //counts the frames
        this.frameNo = 0;

        //frame interval counter
        // this.interval = setInterval(updateGameArea, 20);
      
    },

    //clearing the screen
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.fillStyle = "#2bceff";
        this.context.fillRect(0, 0, myGameArea.canvas.width, myGameArea.canvas.height);
    },
}

function gameLoop(timeStamp){
    //calculate how much time has passed
    secondsPassed = (timeStamp - oldTimeStamp) / 1000;
    oldTimeStamp = timeStamp;
    
    
    myGameArea.clear();


    playerPlane.draw();
    
   


    //passed the time to update
    update(secondsPassed);
    
    window.requestAnimationFrame(gameLoop);

}
//game logic loop
function update(secondsPassed) {

    timePassed += secondsPassed;
    playerPlane.update(timePassed);
}

//waits for page body to load then runs startGame
function startGame() {
    myGameArea.start();
    ctx = myGameArea.context;
    planeImage.onload = function () {
        playerPlane = new Player(planeImage, //image
            128, //width 
            128, //height
            Math.ceil(myGameArea.canvas.width / 2 - 64), //Xpos
            Math.ceil(myGameArea.canvas.height * 0.7)); //Ypos
            window.requestAnimationFrame(gameLoop);

    


        // console.log(Math.ceil(myGameArea.canvas.width / 2));
        // console.log(myGameArea.canvas.width);


    }


    // cloudImage.onload = function () {
    //     cloud1 = new Component(cloudImage,
    //         32,
    //         32,
    //         getRandomInt(myGameArea.canvas.width),
    //         getRandomInt(myGameArea.canvas.height))
    // }


    planeImage.src = "styles/Images/plane.png";

}





let keyPress = {
    left: false,
    right: false,
    up: false,
    down: false
}

let keyMap = {
    68: "right",
    65: "left",
    87: "up",
    83: "down",
}


function keyDown(event){
    let key = keyMap[event.keyCode];
    keyPress[key] = true;
}

function keyUp(event){
    let key = keyMap[event.keyCode];
    keyPress[key] = false;
}

window.addEventListener("keydown", keyDown, false);
window.addEventListener("keyup", keyUp, false);


function Player(image, width, height, pX, pY) {
    this.image = image;
    this.width = width;
    this.height = height;
    this.pX = pX;
    this.pY = pY;
    this.yVelocity = 1;
    this.xVelocity = 1;


    this.draw = function(){
        // drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
        ctx.drawImage(this.image, 0, 0, 128, 128, this.pX, this.pY, 128, 128);
    }
     
    this.update = function (timePassed) {

        if(keyPress.left){
            this.pX -= this.xVelocity * timePassed;
        }

        if(keyPress.right){
            this.pX += xVelocity * timePassed; 
        }

        if(keyPress.up){
            this.pY -= this.yVelocity * timePassed;
        }

        if(keyPress.down){
         this.pY += this.yVelocity * timePassed;
        }
       
        
    }
};



function Component(image, width, height, pX, pY) {
    this.image = image;
    this.width = width;
    this.height = height;
    this.pX = pX;
    this.pY = pY;


     
    this.update = function () {
 

        // drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
        ctx.drawImage(this.image, 0, 0, 32, 32, this.pX, this.pY, 128, 128)
    }
};

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

