function createField(width, height, bombs) {
    const body = document.querySelector('body');
    const conatiner = document.createElement('table');
    const button = document.createElement('button');
    button.classList.add('reset');
    button.innerHTML = 'RESET';
    conatiner.append(button);
    button.addEventListener('click', () => {
        conatiner.remove();
        createField(16, 16, 40);
    })
    for (let i =0; i < height; i++){
        const row = document.createElement('tr');
        row.setAttribute('class', 'row')
        for(let j = 0; j < width; j++){
            const cell = document.createElement('td');
            cell.setAttribute('class', 'cell');
            cell.addEventListener('click', e => {
                if(checked.includes(e.target)){
                    return;
                }
                if(e.target.classList.contains('lock')){
                   return
                }
                openCells(e.target, bombsArr, allCells, checked)
            })
            cell.addEventListener('contextmenu', e => {
                e.preventDefault();
                if(checked.includes(e.target)){
                    return;
                }
                e.target.classList.toggle('lock');
            })
            row.append(cell);
        }
        conatiner.append(row)
    };
    body.append(conatiner);
    
    
    const allCells = [...document.querySelectorAll('.cell')];
    const bombsArr = [];
    const checked = [];


    (function(){
        for(let i = 0; i < bombs; i++){
            let position;
            do{
                position = Math.floor(Math.random() * (width * height))
            } while(bombsArr.indexOf(position) != -1);
            bombsArr.push(position)
        }
    })();   
};

function openCells (target, bombsArr, allCells, checked) {
    if(checked.includes(target)){
         return;
    }

    if(checked.length > (allCells.length - bombsArr.length - 2)){
        bombsArr.forEach(item => {
            allCells[item].classList.add('lock')
        })
        setTimeout(() => {
            alert('YOU WON!!!')
        }, 100)
    }
    if(checkBomb(target, bombsArr, allCells, checked)){
        bombsArr.forEach(item => {
            allCells[item].classList.add('bomb')
        })
        // allCells.forEach(item => {
        //     const num = checkNeighbors(item, bombsArr, allCells, checked);
        //     checked.push(item)
        //     if(!num || item.classList.contains('bomb') || item.classList.contains('lock')){
        //         return
        //     }
        //     item.classList.add('open')
        //     item.innerHTML = num;
        // })
        target.innerHTML = '';
        target.classList.add('bomb', 'bomb_detonate');
        endGame(allCells, checked);
    };
    if(checkNeighbors(target, bombsArr, allCells, checked)){
        target.classList.remove('lock')
        if(target.classList.contains('bomb') ){
            return;
        }
        target.innerHTML = checkNeighbors(target, bombsArr, allCells, checked);
        target.classList.add('open');
        checked.push(target)
        return;
    };
    if(checkNeighbors(target, bombsArr, allCells, checked) === 0){
        target.classList.remove('lock');
        target.classList.add('open')
        checked.push(target);
        const index = target.cellIndex;
        const arr = [] ;
        if(target.parentNode.previousSibling && target.parentNode.previousSibling.children[index - 1]){
            arr.push(target.parentNode.previousSibling.children[index - 1]);  
        };
        if(target.parentNode.previousSibling && target.parentNode.previousSibling.children[index]){
            arr.push(target.parentNode.previousSibling.children[index]);  
        };
        if(target.parentNode.previousSibling && target.parentNode.previousSibling.children[index + 1]){
            arr.push(target.parentNode.previousSibling.children[index + 1]);  
        };
        if(target.previousSibling){
            arr.push(target.previousSibling);  
        };
        if(target.nextSibling){
            arr.push(target.nextSibling);  
        };
        if(target.parentNode.nextSibling && target.parentNode.nextSibling.children[index - 1]){
            arr.push(target.parentNode.nextSibling.children[index - 1]);  
        };
        if(target.parentNode.nextSibling && target.parentNode.nextSibling.children[index]){
            arr.push(target.parentNode.nextSibling.children[index]);  
        };
        if(target.parentNode.nextSibling && target.parentNode.nextSibling.children[index + 1]){
            arr.push(target.parentNode.nextSibling.children[index + 1]);  
        };
        arr.forEach(item => {
            openCells(item, bombsArr, allCells, checked);
        })
    }


}

function checkNeighbors(target, bombsArr, allCells){
    const index = target.cellIndex;
    const arr = [] ;
    if(target.parentNode.previousSibling && target.parentNode.previousSibling.children[index - 1]){
        arr.push(target.parentNode.previousSibling.children[index - 1]);  
    };
    if(target.parentNode.previousSibling && target.parentNode.previousSibling.children[index]){
        arr.push(target.parentNode.previousSibling.children[index]);  
    };
    if(target.parentNode.previousSibling && target.parentNode.previousSibling.children[index + 1]){
        arr.push(target.parentNode.previousSibling.children[index + 1]);  
    };
    if(target.previousSibling){
        arr.push(target.previousSibling);  
    };
    if(target.nextSibling){
        arr.push(target.nextSibling);  
    };
    if(target.parentNode.nextSibling && target.parentNode.nextSibling.children[index - 1]){
        arr.push(target.parentNode.nextSibling.children[index - 1]);  
    };
    if(target.parentNode.nextSibling && target.parentNode.nextSibling.children[index]){
        arr.push(target.parentNode.nextSibling.children[index]);  
    };
    if(target.parentNode.nextSibling && target.parentNode.nextSibling.children[index + 1]){
        arr.push(target.parentNode.nextSibling.children[index + 1]);  
    };
    let count = 0;
    arr.forEach(item => {
        if(checkBomb(item, bombsArr, allCells)){
            count++;
        };
    })
    return count;
}

function checkBomb(target, bombsArr, allCells){
    const index = allCells.indexOf(target)
    return bombsArr.includes(index);
}

function endGame (allCells, checked){
    allCells.forEach(item => {
        checked.push(item);
    })

}

createField(16, 16, 40);


