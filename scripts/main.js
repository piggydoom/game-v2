let playerPlane;
let cloud1;
const planeImage = new Image();
const cloudImage = new Image();
let ctx;








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
        window.requestAnimationFrame(animate);

    


        // console.log(Math.ceil(myGameArea.canvas.width / 2));
        // console.log(myGameArea.canvas.width);


    }


    cloudImage.onload = function () {
        cloud1 = new Component(cloudImage,
            32,
            32,
            getRandomInt(myGameArea.canvas.width),
            getRandomInt(myGameArea.canvas.height))
    }


    planeImage.src = "styles/Images/plane.png";

}
function animate() {

    myGameArea.clear();
    playerPlane.update();
    cloud1.update();





    window.requestAnimationFrame(animate);
};


function Player(image, width, height, pX, pY) {
    this.image = image;
    this.width = width;
    this.height = height;
    this.pX = pX;
    this.pY = pY;


     
    this.update = function () {
        //controls
        addEventListener("keydown", (event) => { });

        onkeydown = (event) => {
            console.log(event.key);
            
            //move left when a is pressed
            if (event.key == "a" || event.key == "A") {
                this.pX += -5;
            }

            //move right when d is pressed
            else if (event.key == "d" || event.key == "D"){
                this.pX += 5;
            }
            
            //move up when w is pressed
            else if (event.key == "w" || event.key == "W"){
                this.pY += -5;
            }

            //move down when s is pressed

            else if (event.key == "s" || event.key == "S"){
                this.pY += 5;
            }
        };


        // drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
        ctx.drawImage(this.image, 0, 0, 128, 128, this.pX, this.pY, 128, 128)
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

