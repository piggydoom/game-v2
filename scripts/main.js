let playerPlane;
let cloud1;
// const planeImage = new Image(); 
// const cloudImage = new Image();
let sources = { plane: "styles/Images/plane.png", cloud1: "styles/Images/cloud1.png", cloud2: "styles/Images/cloud2.png", f16: "styles/Images/f16.png", su27: "styles/Images/su27.png", explosion: "styles/Images/planeExplosion.png", blimp: "styles/Images/blimp.png" };
let ctx;
let secondsPassed = 0;
let oldTimeStamp = 0;
let movingSpeed = 50;
let timePassed = 0;
let clouds = [];
let f16s = [];
let su27s = [];
let blimps = [];
let blimps2 = [];
let explosionImage;
const loopingCessnaAudio = new Audio("../styles/audio/cessna-looping.wav");
let f16SpeedMultiplier = [2, 3, 6];
let speedMultiplierIndex;
const startScreen = document.getElementById("startScreenContainer");
const gameCanvasDiv = document.getElementById("gameCanvas");
const endGameContainer = document.getElementById("endGameContainer");
const healthContainer = document.getElementById("health-container");
let healthBar = document.getElementById("health-bar");
let scoreText = document.getElementById("score-text");
let finalScoreText = document.getElementById("final-score-text");
let score = 0;
let finalScore;
let playerDamageTimer = 0;
let currentHealth = 100;
let lastCollisionTime = 0;
const COLLISION_COOLDOWN = 1000;
let startScore = false;

// test

let myGameArea = {
    canvas: document.createElement("canvas"),
    start: function ()
    {
        //sets the canvas width + height
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.canvas.style.margin = 0;
        this.canvas.style.padding = 0;
        // this.canvas.style.width = "100";
        // this.canvas.style.height = "100";
        // this.canvas.style.overflow = "hidden";
        // this.canvas.style.justifyContent = "center";
        // this.canvas.style.position = "relative";
        // this.canvas.style.alignItems = "center";

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
    clear: function ()
    {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.fillStyle = "#2bceff";
        this.context.fillRect(0, 0, myGameArea.canvas.width, myGameArea.canvas.height);
    },
}

function gameLoop(timeStamp)
{
    //calculate how much time has passed
    secondsPassed = (timeStamp - oldTimeStamp) / 1000;
    oldTimeStamp = timeStamp;


    myGameArea.frameNo++;



    myGameArea.clear();

    if (startScore)
    {
        score++;
        scoreText.innerText = score;

    }


    // console.log(f16SpeedMultiplier[speedMultiplierIndex]);






    //passed the time to update
    update(secondsPassed);

    window.requestAnimationFrame(gameLoop);

    playerPlane.draw();
    clouds.forEach((cloud) =>
    {
        cloud.draw();


    });

    // f16s.forEach((f16) =>
    // {
    //     f16.draw();
    // });

    // su27s.forEach((su27) =>
    // {
    //     su27.draw();
    // });

    blimps.forEach((blimp) =>
    {
        blimp.drawRotated(45);
  
    });

    // blimps2.forEach((blimp) =>
    // {
    //     blimp.drawRotated(225);

    // });


}
//game logic loop
function update(secondsPassed)
{

    timePassed += secondsPassed;
    playerPlane.update(timePassed);


   


    //itterate over each f16 and apply collision
    // f16s.forEach((f16) =>
    // {
    //     f16.update(5);
    //     collision(playerPlane, f16);
    // }
    // );

    // su27s.forEach((su27) =>
    // {
    //     su27.update(7);
    //     collision(playerPlane, su27);
    // }
    // );

    // blimps.forEach((blimp) =>
    // {
    //     blimp.updateRotated(5, 0);
    //     collision(playerPlane, blimp);

    // }
    // );

    // blimps2.forEach((blimp) =>
    //     {
    //         blimp.updateRotated(5, 0);
    //         collision(playerPlane, blimp);
    
    //     }
    //     );

}



//waits for page body to load then runs startGame
function startGame()
{
    startScreen.style.animation = "fade-out 3s forwards";
    gameCanvasDiv.style.display = "none";
    myGameArea.start();
    //set timer for 3 seconds to disply canvas
    setInterval(() =>
    {
        startScreen.style.display = "none";
        gameCanvasDiv.style.display = "block";
        healthContainer.style.display = "block";
    }, 3000);

    ctx = myGameArea.context;

    loopingCessnaAudio.volume = 0.25;

    loadImages(sources, function (images)
    {

        explosionImage = images.explosion;

        playerPlane = new Player(images.plane,
            128, //width 
            128, //height
            Math.ceil(myGameArea.canvas.width / 2 - 64), //Xpos
            Math.ceil(myGameArea.canvas.height * 0.7)); //Ypos



        window.requestAnimationFrame(gameLoop);


        // //spawn f16s
        // setInterval(() =>
        // {

        //     let w = 76;
        //     let h = 128;
        //     let x = Math.random() * Math.abs(myGameArea.canvas.width - w); //randomize X location to change spawning location
        //     let y = -100;
        //     f16s.push(new Entity(images.f16, w, h, x, y, "plane", true, 0));
        // }, getRandomInt(7000) + 3000);



        // //spawn su27
        // setInterval(() =>
        // {
        //     let w = 128;
        //     let h = 197;
        //     let x = Math.random() * Math.abs(myGameArea.canvas.width - w); //randomize X location to change spawning location
        //     let y = -100;
        //     su27s.push(new Entity(images.su27, w, h, x, y, "plane", true, 0));
        // }, getRandomInt(4000) + 3000);




        //spawn clouds
        setInterval(() =>
        {
            let w = 128;
            let h = 128;
            let x = Math.random() * Math.abs(myGameArea.canvas.width - w);
            let y = -100;

            clouds.push(new Entity(images.cloud1, w, h, x, y, "cloud", false));
        }, 300);

        setInterval(() =>
        {
            let w = 128;
            let h = 128;
            let x = Math.random() * Math.abs(myGameArea.canvas.width - w);
            let y = -100;

            clouds.push(new Entity(images.cloud2, w, h, x, y, "cloud", false));
        }, 300);

        //spawan blimps
        setInterval(() =>
        {
            let w = 73;
            let h = 126;
            let y = -500;
            let x = getRandomInt(900) - 200;
            //problem here
            blimps.push(new Entity(images.blimp, w, h, x, y, "blimp", false));

        }, 1000);

         //spawan blimps2
        //  setInterval(() =>
        //     {
        //         let w = 73;
        //         let h = 126;
        //         let y = -500;
        //         let x = -getRandomInt(900) + 200;
        //         //problem here
        //         blimps2.push(new Entity(images.blimp, w, h, x, y, "blimp", false));
    
        //     }, 1000);

    })
}

function endGame()
{
    console.log("game ended");
    startScore = false;
    finalScoreText.innerHTML = score;
    gameCanvasDiv.style.display = "none";
    myGameArea.canvas.style.display = "none";
    endGameContainer.style.display = "block";
    loopingCessnaAudio.autoplay = false;
    loopingCessnaAudio.loop = false;

};

let mobileTouch = {
    yPos: 0, xPos: 0, isPressed: false,

};




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


function keyDown(event)
{
    startScore = true;
    let key = keyMap[event.keyCode];
    keyPress[key] = true;
    loopingCessnaAudio.autoplay = true;
    loopingCessnaAudio.loop = true;
};

function keyUp(event)
{
    let key = keyMap[event.keyCode];
    keyPress[key] = false;
    speedMultiplierIndex = 1;

}

function touchHandler(event)
{
    if (event.touches)
    {
        mobileTouch.xPos = event.touches[0].pageX - myGameArea.canvas.offsetLeft - 128 / 2;
        mobileTouch.yPos = event.touches[0].pageY - myGameArea.canvas.offsetTop - 128 / 2;
        mobileTouch.isPressed = true;
    }
}

window.addEventListener("keydown", keyDown, false);
window.addEventListener("keyup", keyUp, false);
window.addEventListener("touchstart", touchHandler);
window.addEventListener("touchmove", touchHandler);


function Player(image, width, height, pX, pY)
{

    this.image = image;
    this.width = width;
    this.height = height;
    this.pX = pX;
    this.pY = pY;
    this.speed = 10; //10
    this.damageFrames = [1, 2, 3, 4, 5];
    this.isDamaged = false;
    this.currentFrame = 0;
    this.recentlyDamaged = false;
    this.lastDamageTime = 0;
    this.invulnerabilityPeriod = 1000;

    this.draw = function ()
    {

        if (this.recentlyDamaged)
        {
            playerDamageTimer++;
            if (playerDamageTimer < 360)
            {
                if (myGameArea.frameNo % 10)
                {
                    ctx.drawImage(this.image, this.damageFrames[this.currentFrame] * 128, 0, 128, 128, this.pX, this.pY, this.width, this.height);
                }
            } else
            {
                this.recentlyDamaged = false;
                playerDamageTimer = 0;
            }
        }
        else if (this.isDamaged)
        {
            // drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
            ctx.drawImage(this.image, this.damageFrames[this.currentFrame] * 128, 0, 128, 128, this.pX, this.pY, this.width, this.height);
        } else
        {

            // drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
            ctx.drawImage(this.image, 0, 0, 128, 128, this.pX, this.pY, this.width, this.height);
        }
    }

    this.update = function ()
    {
        const distance = this.speed;
        this.pX = Math.max(0, Math.min(myGameArea.canvas.width - this.width, this.pX));
        // this.pY = Math.max(0, Math.min(myGameArea.canvas.height - this.height, this.pY));



        if (keyPress.left)
        {
            this.pX -= distance;
            // if (this.pX <= 0) {
            //     this.pX = myGameArea.canvas.width - this.width;
            // }
        }

        if (keyPress.right)
        {
            this.pX += distance;
            // if (this.pX >= myGameArea.canvas.width - this.width) {
            //     this.pX = 0;
            // }
        }

        if (keyPress.up)
        {
            speedMultiplierIndex = 2;
            // this.pY -= distance;
            // if (this.pY <= 0) {
            //     this.pY = myGameArea.canvas.height - this.height;

            // }
        }

        if (keyPress.down)
        {
            speedMultiplierIndex = 0;
            // this.pY += distance;
            // if (this.pY >= myGameArea.canvas.height - this.height) {
            //     this.pY = 0;
            // }
        }

        if (mobileTouch.isPressed)
        {
            speedMultiplierIndex = 1;
            // this.pY = mobileTouch.yPos;
            this.pX = mobileTouch.xPos;
        }

        if (this.isDamaged)
        {
            if (myGameArea.frameNo % 10 == 0)
            {
                this.currentFrame++;
            }
            if (this.currentFrame >= this.damageFrames.length)
            {
                this.currentFrame = 1;
            }
        };

        this.takeDamage = function ()
        {

            this.isDamaged = true;
            this.recentlyDamaged = true;
            this.lastDamageTime = Date.now();
            currentHealth = Math.max(0, currentHealth - 25); // Ensure health doesn't go below 0
            if (currentHealth == 0)
            {
                endGame();
            }
            healthBar.style.width = currentHealth + "%";
        }

    }
}


class Entity
{
    constructor(img, width, height, pX, pY, type, collidable)
    {
        this.image = img;
        this.width = width;
        this.height = height;
        this.pX = pX;
        this.pY = pY;
        this.isDamaged = false;
        this.collidable = collidable;
        this.explosionFrame = 0;
        this.explosionFrameCounter = 0;
        this.type = type;
    }




    draw()
    {

        if (this.isDamaged)
        {
            if (this.explosionFrame > 32)
            {
                this.isDamaged = false;
                delete this.pY;
            }

            this.explosionFrameCounter++;

            if (this.explosionFrameCounter % 400)
            {
                this.explosionFrame++;
            }

            ctx.drawImage(explosionImage, this.explosionFrame * 64, 0, 64, 64, this.pX - 128, this.pY, 384, 384);
            // console.log(this.explosionFrame);
        }
        else (!this.isDamaged)
        {
            // drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
            ctx.drawImage(this.image, 0, 0, this.width, this.height, this.pX, this.pY, this.width, this.height);

        }

    }


    drawRotated(degrees)
    {
  
        
            ctx.save();
            // ctx.translate(myGameArea.canvas.width / 2, myGameArea.canvas.height / 2);
            ctx.translate(myGameArea.canvas.width / 2, myGameArea.canvas.height / 2);
            ctx.rotate(degrees * Math.PI / 180);
            ctx.translate(-myGameArea.canvas.width / 2, -myGameArea.canvas.height / 2);
            ctx.rotate(degrees * Math.PI / 180);
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(myGameArea.canvas.width, myGameArea.canvas.height );
            ctx.strokeStyle = "red";
            ctx.stroke();
            ctx.drawImage(this.image, 0, 0, this.width, this.height, this.pX, this.pY, this.width, this.height);
            ctx.restore();

        
    }

    update(speed)
    {

        this.pY = this.pY + f16SpeedMultiplier[speedMultiplierIndex] * speed;
 
    }


    
    updateRotated(speed, degrees){
        // ctx.save();
        // ctx.translate(myGameArea.canvas.width / 2, myGameArea.canvas.height / 2);
        // ctx.rotate(degrees * Math.PI / 180);
        // ctx.translate(-myGameArea.canvas.width / 2, -myGameArea.canvas.height / 2);
        // ctx.beginPath();
        // ctx.moveTo(0, 0);
        // ctx.lineTo(myGameArea.canvas.width, myGameArea.canvas.height);
        // ctx.stroke();
        // this.pY = this.pY + f16SpeedMultiplier[speedMultiplierIndex] * speed;
     
      
        // ctx.restore();
    }

}


function getRandomInt(max)
{
    return Math.floor(Math.random() * max);
}


function loadImages(sources, callback)
{
    var images = {};
    var loadedImages = 0;
    var numImages = 0;
    // get num of sources
    for (var src in sources)
    {
        numImages++;
    }
    for (var src in sources)
    {
        images[src] = new Image();
        images[src].onload = function ()
        {
            if (++loadedImages >= numImages)
            {
                callback(images);
            }
        };
        images[src].src = sources[src];
    }
}


function collision(player, object)
{


    if (
        player.pX + player.width >= object.pX &&  //check if player right hand side touches object left hand side
        object.pX + object.width >= player.pX && //check if object right hand side touches player left hand side
        player.pY + player.height >= object.pY && //check if player bottom side touches object top side
        object.pY + object.height >= player.pY //check if player top side touches object bottom side
    )
    {
        const currentTime = Date.now();
        if (currentTime - lastCollisionTime > COLLISION_COOLDOWN)
        {
            player.takeDamage();
            object.isDamaged = true;
            lastCollisionTime = currentTime;
        }
    }
}