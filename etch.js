pixAmount=30;
let pixelize=90/pixAmount;


window.onload=function(){
    for(let i=0;i<pixAmount;i++){
        for(let c=0;c<pixAmount;c++){
        let div=document.createElement('div');
        div.style.height=`${pixelize}vh`;
        div.style.width=`${pixelize}vh`;
        div.setAttribute('class','pixel');
        div.addEventListener('mouseover', (event) => {div.style.backgroundColor='black'});
        document.getElementById("board").appendChild(div);
        }
    }
}

