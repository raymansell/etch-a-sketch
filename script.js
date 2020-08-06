let container = document.querySelector('#container');
let gridSize = 16;
let squares; // Will reference the number of squares in the current grid

function setGrid(gridSize) {
    for(let i = 0; i < gridSize ** 2; i++){
        let square = document.createElement('div');
        square.className = 'squares';
        square.id = `square ${i}`;
        container.appendChild(square);
    }

    // Setting the grid with CSS-Grid
    container.setAttribute('style', `display: grid; grid-template-columns: repeat(${gridSize},${100/gridSize}%); grid-template-rows: repeat(${gridSize},${100/gridSize}%);`);

    squares = document.querySelectorAll('.squares');
    squares.forEach((square) => {
        square.addEventListener('mouseenter', defaultColor);
    });
}

setGrid(gridSize);

// Change square colors to black default
function defaultColor(e) {
    e.target.classList.add('blackBox');
}

// Clear Grid button and event
let resetBtn = document.querySelector('#clear');
resetBtn.addEventListener('click', clearGrid);

function clearGrid(e) {
    squares.forEach((square) => {
        square.classList.remove('blackBox');
        square.removeAttribute("style");
    });
}

//New Grid Size button and event
let sizeBtn = document.querySelector('#newSize');
sizeBtn.addEventListener('click', changeSize);

function changeSize(e) {
    let newSize = prompt('Set new grid size', 10);
    if (!newSize || newSize <= 0) {return};
    gridSize = newSize;
    squares.forEach((square) => {
        container.removeChild(square);
    });
    setGrid(gridSize);
}

//Default Mode (black only) button and event 
let default_ = document.querySelector('#default');
//this event restarts color to black
default_.addEventListener('click', (e) => {
    clearGrid(e);
    squares.forEach((square) => {
        square.removeEventListener('mouseenter', randomPalette);
        square.addEventListener('mouseenter', defaultColor);
    });
})


//Rainbow button and event
let rainbow = document.querySelector('#rainbow');
rainbow.addEventListener('click', rainbowMode);

function randomPalette(e){
    if(e.target.hasAttribute("style")){
        let rgb = e.target.style.backgroundColor;
        rgb = rgb.replace(/[^\d,]/g, '').split(',');
        let darkR = Math.floor(+rgb[0] * 0.7);
        let darkG = Math.floor(+rgb[1] * 0.7);
        let darkB = Math.floor(+rgb[2] * 0.7);
        e.target.style.backgroundColor = `rgb(${darkR},${darkG},${darkB})`;
    } else {
        let red = Math.floor(Math.random() * 255);
        let green = Math.floor(Math.random() * 255);
        let blue = Math.floor(Math.random() * 255);
        e.target.style.backgroundColor = `rgb(${red},${green},${blue})`;
    }
}

function rainbowMode(e) {
    clearGrid(e);
    squares.forEach((square) => {
        square.removeEventListener('mouseenter', defaultColor);
        square.addEventListener('mouseenter', randomPalette);
    });
}

