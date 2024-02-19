let playerPlane;
let planeImage = new Image();
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
        this.context.fillStyle = "#2bceff";
        this.context.fillRect(0, 0, myGameArea.canvas.width, myGameArea.canvas.height);
    },

    //clearing the screen
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
}


//waits for page body to load then runs startGame
function startGame() {
    myGameArea.start();
    window.onload = function(){
        playerPlane = new component(planeImage, 128, 128, myGameArea.canvas.innerWidth / 2, myGameArea.canvas.innerHeight * 0.8);
        ctx = myGameArea.context;
    }
   
    planeImage.src = "styles/Images/plane.png";
  
}
function animate() {
    console.log("test");
   playerPlane.update();
   




  
    window.requestAnimationFrame(animate);
};


function component(image, width, height, pX, pY){
    this.image = image;
    this.width = width;
    this.height = height;
    this.pX = pX;
    this.pY = pY;


    this.update = function(){

        // drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
        ctx.drawImage(this.image, 0, 0, 128, 128, myGameArea.canvas.innerWidth / 2, myGameArea.canvas.innerHeight / 2, 128, 128 )
    }
};

addEventListener("keydown", (event) => { });

onkeydown = (event) => {
    // console.log(event.key);

    if (event.key == "a" || event.key == "A") {
        pX += 5;
    }

};


window.requestAnimationFrame(animate);