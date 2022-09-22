pixAmount=16;
let pixelize=90/pixAmount;


window.onload=function(){
    for(let i=0;i<pixAmount;i++){
        for(let c=0;c<pixAmount;c++){
        let div=document.createElement('div');
        div.style.border='solid red';
        div.style.height='10px';
        div.style.height=`${pixelize}vh`;
        div.style.width=`${pixelize}vh`;
        div.setAttribute('class','pixel');
        document.getElementById("board").appendChild(div);
        }
    }
}
//gfdgd