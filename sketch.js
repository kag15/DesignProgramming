// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Game of Life
// Video: https://youtu.be/FWSR_7kZuYg

let startDraw = false;

function make2DArray(cols, rows) {
    let arr = new Array(cols);
    for (let i = 0; i < arr.length; i++) {
      arr[i] = new Array(rows);
    }
    return arr;
  }
  
  let grid;
  let cols;
  let rows;
  let resolution = 25;

function preload() {
  img_dirt = loadImage("dirt.png");
  img_sprout = loadImage("sprout.png");
  img_flower = loadImage("flower.png");
}

function start() {
  startDraw = true;
}
  
function setup() {
  createCanvas(windowWidth/2, windowHeight);
  cols = floor(width / resolution);
  rows = floor(height / resolution);

  let button = createButton("Start");
  button.mousePressed(start);
  
  grid = make2DArray(cols, rows);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = floor(random(2));
    }
  }

}

  
function draw() {
  background(216, 195, 175);
  frameRate(1);


    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        let x = i * resolution;
        let y = j * resolution;
        if (grid[i][j] == 0) {
          image(img_dirt, x, y, resolution - 1, resolution - 1);
        } 
        if (grid[i][j] == 1) {
          image(img_sprout, x, y, resolution - 1, resolution - 1);
        }
        if (grid[i][j] == 2) {
          image(img_flower, x, y, resolution - 1, resolution - 1);
        }
      }
    }

    if (startDraw) {
    
    let next = make2DArray(cols, rows);
    
    // Compute next based on grid
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        let state = grid[i][j];

        // Count live neighbors
        let sum = 0;
        let neighbors = countNeighbors(grid, i, j);
          
        // If dead and has three neighbors --> Sprout
        if (state == 0 && neighbors == 3) {
          next[i][j] = 1;
        // If alive and has less than two or more than three neighbors --> Dead
        } else if ((state > 0) && (neighbors < 2 || neighbors > 3)) {
          next[i][j] = 0;
        // If a sprout, and has three neighbors --> Flower
        } else if (state == 1 && neighbors == 3) {
          next[i][j] = 2;
        // Otherwise, stays the same 
        } else {
          next[i][j] = state;
        }
      }
    }
    
    grid = next;
  }
    
  }

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
  
function countNeighbors(grid, x, y) {
  let sum = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      let col = (x + i + cols) % cols;
      let row = (y + j + rows) % rows;
      if (grid[col][row] === 1 || grid[col][row] === 2) {
        sum++;
      }
    }
  }
  sum -= grid[x][y];
  return sum;
}