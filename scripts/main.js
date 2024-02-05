let myGameArea = {
    canvas : document.createElement("canvas"),
    start : function(){
        this.canvas.width=480;
        this.canvas.width=270;
        this.context = this.canvas.getContext("2d");
        // document.getElementById("gameCanvas").appendChild(this.canvas);
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
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

}

let planeImage = new Image();
let ctx = myGameArea.context;
// console.log(myGameArea.canvas);
ctx.drawImage(planeImage, 100, 100);


planeImage.onload = function(){
  
    
}

planeImage.src = "styles/Images/plane.png";