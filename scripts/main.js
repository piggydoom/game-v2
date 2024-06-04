let playerPlane;
let cloud1;
// const planeImage = new Image();
// const cloudImage = new Image();
let sources = { plane: "styles/Images/plane.png", cloud1: "styles/Images/cloud1.png", cloud2: "styles/Images/cloud2.png", cessna: "styles/Images/cessna pixelart.png" };
let ctx;
let secondsPassed = 0;
let oldTimeStamp = 0;
let movingSpeed = 50;
let timePassed = 0;
let clouds = [];
let cessnas = [];
let cessnaSpeedMultiplier = [0, 2, 50];
let speedMultiplierIndex = 2;


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

    myGameArea.frameNo++;


   
    myGameArea.clear();



console.log("cessna speed is: ". cessnaSpeedMultiplier[speedMultiplierIndex]);





    //passed the time to update
    update(secondsPassed);

    window.requestAnimationFrame(gameLoop);

    playerPlane.draw();
    clouds.forEach((cloud) => {
        cloud.draw();


    });

    cessnas.forEach((cessna) => {
        cessna.draw();
    })
}
//game logic loop
function update(secondsPassed) {

    timePassed += secondsPassed;
    playerPlane.update(timePassed);


    clouds.forEach((cloud) => {
        cloud.update();
    });


    //itterate over each cessna
    cessnas.forEach((cessna) => {
        cessna.update();
        collision(playerPlane, cessna);
        }
    );
}



//waits for page body to load then runs startGame
function startGame() {
    myGameArea.start();
    ctx = myGameArea.context;

    loadImages(sources, function (images) {
        playerPlane = new Player(images.plane,
            176, //width 
            166, //height
            Math.ceil(myGameArea.canvas.width / 2 - 64), //Xpos
            Math.ceil(myGameArea.canvas.height * 0.7)); //Ypos



        window.requestAnimationFrame(gameLoop);


        //spawn cessnas
        setInterval(() => {
            let w = 128;
            let h = 128;
            let x = Math.random() * Math.abs(myGameArea.canvas.width - w); //randomize X location to change spawning location
            let y = -100;
            cessnas.push(new entity(images.cessna, w, h, x, y, "cessna", true));
        }, 5000);

        //spawn clouds
        setInterval(() => {
            let w = 128;
            let h = 128;
            let x = Math.random() * Math.abs(myGameArea.canvas.width - w);
            let y = -100;
         
            clouds.push(new entity(images.cloud1, w, h, x, y, "cloud", false));
        }, 300);

        setInterval(() => {
            let w = 128;
            let h = 128;
            let x = Math.random() * Math.abs(myGameArea.canvas.width - w);
            let y = -100;
    
            clouds.push(new entity(images.cloud2, w, h, x, y, "cloud", false));
        }, 300);

    })
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


function Player(image, width, height, pX, pY) {

    this.image = image;
    this.width = width;
    this.height = height;
    this.pX = pX;
    this.pY = pY;
    this.speed = 10; //10
    this.damageFrames = [1, 2, 3, 4];
    this.isDamaged = false;
    this.currentFrame = 0;

    this.draw = function () {


        if (this.isDamaged) {
            // drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
            ctx.drawImage(this.image, this.damageFrames[this.currentFrame] * 88, 0, 88, 83, this.pX, this.pY, this.width, this.height);
        } else {

            // drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
            ctx.drawImage(this.image, 0, 0, 88, 83, this.pX, this.pY, this.width, this.height);
        }
    }

    this.update = function () {
        speedMultiplierIndex  = 1;
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
            speedMultiplierIndex = 2;
            this.pY -= distance;
            if (this.pY <= 0) {
                this.pY = myGameArea.canvas.height - this.height;

            }
        }

        if (keyPress.down) {
            speedMultiplierIndex = 0;
            this.pY += distance;
            if (this.pY >= myGameArea.canvas.height - this.height) {
                this.pY = 0;
            }
        }

        if (playerPlane.isDamaged = true) {
            playerPlane.currentFrame++;
            if (playerPlane.currentFrame >= playerPlane.damageFrames.length) {
                playerPlane.currentFrame = 1;
            }
        };
    
    }
}

function collision(player, object) {
    if (
        player.pX + player.width >= object.pX &&  //check if player right hand side touches object left hand side
        object.pX + object.width >= player.pX && //check if object right hand side touches player left hand side
        player.pY + player.height >= object.pY && //check if player bottom side touches object top side
        object.pY + objectHeight >= player.pY //check if player top side touches object bottom side
    ) {
        console.log("hit")
    }
};


class entity {
    constructor(img, width, height, pX, pY, type, collidable) {
        this.image = img;
        this.width = width;
        this.height = height;
        this.pX = pX;
        this.pY = pY;
      
        this.collidable = collidable;
        if(this.type == "cessna"){
            this.speed = cessnaSpeedMultiplier[speedMultiplierIndex];
        } else{
            this.speed = 5;
        }
    }




    draw() {

        // drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
        ctx.drawImage(this.image, 0, 0, 128, 128, this.pX, this.pY, 128, 128)
    }

    update() {
        this.pY = this.pY + this.speed;
    }
}




function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}


function loadImages(sources, callback) {
    var images = {};
    var loadedImages = 0;
    var numImages = 0;
    // get num of sources
    for (var src in sources) {
        numImages++;
    }
    for (var src in sources) {
        images[src] = new Image();
        images[src].onload = function () {
            if (++loadedImages >= numImages) {
                callback(images);
            }
        };
        images[src].src = sources[src];
    }
}


function collision(player, object) {
    if (
        player.pX + player.width >= object.pX &&  //check if player right hand side touches object left hand side
        object.pX + object.width >= player.pX && //check if object right hand side touches player left hand side
        player.pY + player.height >= object.pY && //check if player bottom side touches object top side
        object.pY + object.height >= player.pY //check if player top side touches object bottom side
    ) {
        console.log("hit");
        playerPlane.isDamaged = true;
    }
}

// COMMIT TEST 3