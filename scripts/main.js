let myGameArea = {
    canvas : document.createElement("canvas"),
    start : function(){
        this.canvas.width=100 * window.innerWidth / 100;
        this.canvas.height=95 * window.innerHeight / 100;
        this.context = this.canvas.getContext("2d");
        document.getElementById("gameCanvas").appendChild(this.canvas);
        // document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        // this.interval = setInterval(updateGameArea, 20);
        },
//     clear : function() {
//         this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
//     },
//     stop : function() {
//         clearInterval(this.interval);
//     }
}



function startGame() {
    myGameArea.start();
    let ctx = myGameArea.context;

    ctx.fillStyle = "#2bceff";
    ctx.fillRect(0, 0, myGameArea.canvas.width, myGameArea.canvas.height);
    // drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
    ctx.drawImage(planeImage, 0, 0, 128, 128, myGameArea.canvas.width / 2, myGameArea.canvas.height / 2, 64, 64);
    
}

let planeImage = new Image();




planeImage.src = "styles/Images/plane.png";