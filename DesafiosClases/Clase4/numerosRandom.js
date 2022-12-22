const objeto ={};

let n=0;
while (n<10000){
    const num = Math.floor(Math.random() * 20) + 1;
    n++;
    if(objeto[num]){
        objeto[num]++;
    }else{
        objeto[num] = 1;
    }
}

console.log(objeto);
