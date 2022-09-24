const DPR= window.devicePixelRatio;//specific device pixel ratio 
let CANVAS_H;
let CANVAS_W;
//controler location size and angle
let controlX=450;
let controlY=1000;
let controlR=300;
let angle;

let boardMargTop;
let boardMargLeft;
let ctx;

window.onload=function(){
    
    //the board margin is required in order to now the exact location of the controler
    //not a good way to actually do things, should change in the future
    let board=window.getComputedStyle(document.getElementById('board'));
    boardMargTop=parseInt(board.marginTop.slice(0,3));
    boardMargLeft=parseInt(board.marginLeft.slice(0,2));
  

    //draws the canvas and controler
    ctx=getCanvas('board');
    ctx.fillStyle = "white";
    ctx.fillRect(0,0,CANVAS_W,CANVAS_H);
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(controlX, controlY, controlR, 0, 2 * Math.PI);
    ctx.lineWidth=5;
    ctx.stroke();
    ctx.fillRect(controlX-25,controlY-25,50,50)

    //initizlize the listner for controloer touch movement
    initListeners();
}

function rectUpdate(angle, context){
    ctx.fillStyle = "white";
    ctx.fillRect(0,0,CANVAS_W,CANVAS_H);
    ctx.fillStyle = "black";
    let x=Math.cos(angle)*controlR;
    let y=Math.sin(angle)*controlR;
    console.log(x+' x   y '+y);
    context.fillRect(controlX+x,controlY+y,50,50);

}


//getting canvas context for drawing 
function getCanvas(element){
    let canvas=document.getElementById(`${element}`);
    canvas.height=canvas.offsetHeight;    //adjusting device pixel ratio to canvas size
    canvas.width=canvas.offsetWidth;
    CANVAS_H=canvas.height;
    CANVAS_W=canvas.width;
    return canvas.getContext('2d'); 
}

let lastRotation=0;
let lastPlus=true;


//listenes for controler touch movement and calculates its new position
function initListeners()
{
    
    let speedLimit=Math.PI*0.1; //determins controler behaveior, high values leads to bigger "jumps"
    
    window.addEventListener('touchmove',
    (event)=>{
         //atan2 calculates the angle between the x axis
        //(of the center of the controler) and the users input
        let rotation = Math.atan2(event.touches[0].pageY-controlY-boardMargTop,   
                  event.touches[0].pageX-controlX-boardMargLeft);


         /*inorder to control the movement, and make is users cant drag straight lines inorder to
         move to controler, we store the last rotation angle and compare it to the new one,
         if the distance is to great than we dont move the controler.
         technically the movement is never actually rotation, so its a compromoise
         
         
        /*this overly verbose if statment checks if the new rotation value is
        within the boundries of the "speedlimit",*/

        if((lastRotation>rotation&&lastRotation<rotation+speedLimit)||      
        lastRotation<rotation&&lastRotation>rotation-speedLimit){
        lastRotation=rotation;}

        /*in the left part of the x axis, the value of the angle changes from +Pi to -Pi,
        so this statement is requried for movement to fllow there, if this statement is removed the 
        controler will not move freely acros the x axis in the left part*/

        if(lastRotation>3 && rotation<-3)
            lastRotation=rotation;
        if(lastRotation<-3 && rotation>3)
            lastRotation=rotation;


            
        rectUpdate(lastRotation,ctx)
    })
}