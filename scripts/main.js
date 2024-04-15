let playerPlane;
let cloud1;
// const planeImage = new Image();
// const cloudImage = new Image();

let ctx;
let secondsPassed = 0;
let oldTimeStamp = 0;
let movingSpeed = 50;
let timePassed = 0;

loadImage("styles/Images/plane.png")




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

function gameLoop(timeStamp) {
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
console.log();
//waits for page body to load then runs startGame
function startGame() {
    myGameArea.start();
    ctx = myGameArea.context;

    playerPlane = new Player(
        88, //width 
        83, //height
        Math.ceil(myGameArea.canvas.width / 2 - 64), //Xpos
        Math.ceil(myGameArea.canvas.height * 0.7)); //Ypos
    window.requestAnimationFrame(gameLoop);
    
    cloud1 = new Component(32, 32, getRandomInt(myGameArea.canvas.width), getRandomInt(myGameArea.canvas.height))
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


function keyDown(event) {
    let key = keyMap[event.keyCode];
    keyPress[key] = true;
}

function keyUp(event) {
    let key = keyMap[event.keyCode];
    keyPress[key] = false;
}

window.addEventListener("keydown", keyDown, false);
window.addEventListener("keyup", keyUp, false);


function Player(width, height, pX, pY) {
    loadImage('styles/Images/plane.png')
    .then(image=>{ this.image = image})
    this.width = width;
    this.height = height;
    this.pX = pX;
    this.pY = pY;
    this.speed = 100; //10



    this.draw = function () {
        // drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
     ctx.drawImage(this.image, 0, 0, 88, 83, this.pX, this.pY, 88, 83);
    }

    this.update = function (timePassed) {
        const distance = this.speed;
        this.pX = Math.max(0, Math.min(myGameArea.canvas.width - this.width, this.pX));
        this.pY = Math.max(0, Math.min(myGameArea.canvas.height - this.height, this.pY));



        if (keyPress.left) {
            this.pX -= distance;
            if (this.pX <= 0) {
                this.pX = myGameArea.canvas.width - this.width;
            }
        }

        if (keyPress.right) {
            this.pX += distance;
            if (this.pX >= myGameArea.canvas.width - this.width) {
                this.pX = 0;
            }
        }

        if (keyPress.up) {
            this.pY -= distance;
            if (this.pY <= 0) {
                this.pY = myGameArea.canvas.height - this.height;

            }
        }

        if (keyPress.down) {
            this.pY += distance;
            if (this.pY >= myGameArea.canvas.height - this.height) {
                this.pY = 0;
            }
        }


    }
};



function Component(width, height, pX, pY) {
    loadImage('styles/Images/clouds.png')
        .then(image => { this.image = image });
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


function loadImage(url) {
    return new Promise(resolve => {
        const image = new Image();
        image.addEventListener('load', () => {
            resolve(image);
        });
        image.src = url;
    });
}

