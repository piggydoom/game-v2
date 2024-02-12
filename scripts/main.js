let planeImage = new Image();




planeImage.src = "styles/Images/plane.png";

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
    },
}


//waits for page body to load then runs startGame
function startGame() {
    myGameArea.start();




}
let pX = 100;
function animate() {
    //set background to blue
    ctx.fillStyle = "#2bceff";
    ctx.fillRect(0, 0, myGameArea.canvas.width, myGameArea.canvas.height);




  
    window.requestAnimationFrame(animate);
};


function component(image, width, height, pX, pY){
    this.image = image;
    this.width = width;
    this.height = height;
    this.pX = pX;
    this.pY = pY;


    this.update = function(){
        ctx = myGameArea.context;
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