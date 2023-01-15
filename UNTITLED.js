/*
@title - Dodging Game
@author - Esha Singh
*/
const player = "p";
const obstacle = "o";
const dirt = "d";
const grass = "g";
var interval = 1000;
var obstaclesSpawned = 0;
var number = 10;
var gameRunning = true;
setLegend(// what image to display
  [player, bitmap`
....0000000.....
....0.....00....
...00.0.0..00...
...0........0...
...0..000..00...
...00......0....
....00000000....
.......0........
....00000000....
.......0........
.......0........
.......0........
.......0........
.....00.00......
....0.....0.....
................`],
  [obstacle, bitmap`
................
.......9........
................
.....9.3.9......
.......9........
.....3.3.3......
...9.9.3.9.9....
..93939393939...
..33333333333...
...333333333....
....3333333.....
......333.......
.......3........
................
................
................`],
  [dirt, bitmap`
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC`],
  [grass, bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
CDDCDCCCDCDDCDCC
DCCCDCDDCCDCCDDC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC`]
); 

setMap(map`
g.........g
d.........d
d.........d
d.........d
d....p....d
dgggggggggd`);//set maps

setSolids([player, dirt, grass]);

//controls
onInput("a", ()=> {
  if (gameRunning)
  {getFirst(player).x -= 1;}
  
});
onInput("d", ()=> {
  if (gameRunning)
  {getFirst(player).x += 1;}
  
});

function spawnObstacle()
{
  let y = 0;
  let  x = Math.ceil(Math.random() * 9);
    
    addSprite(x,y,obstacle);
  obstaclesSpawned += 1;
}
function despawnObstacle()
{
  let allObstacles = getAll(obstacle);
 
  for (var i = 0; i < allObstacles.length; i++) 
  {
    if (allObstacles[i].y == 4) 
    {
      allObstacles[i].remove();
    }
  }
}
function moveObstacle()
{
    let allObstacles = getAll(obstacle);
 
    for (let i = 0; i < allObstacles.length; i++) 
    {
    allObstacles[i].y += 1;
    }
  }

function playerHit() {
  let allObstacles = getAll(obstacle);
  let p = getFirst(player);
 
  for (var i = 0; i < allObstacles.length; i++) 
  {
    if (allObstacles[i].x == p.x && allObstacles[i].y == p.y) 
    {
      return true;
    }
  }
  return false;
}
var gameLoop;
function gameProgram()
     {
       settingInterval();
      gameLoops();
     }

function settingInterval()
 {
    if (gameRunning)
    {
      if (obstaclesSpawned > number)
      {
      number = number * 2.5;
      interval = interval/1.1; 
    
    clearInterval(gameLoop);
    setInterval(gameProgram, interval);
      }
    } 
}

function gameLoops(){
  if (gameRunning)
  {
  despawnObstacle();
  moveObstacle();  
  spawnObstacle();
    if (playerHit()) {
    clearInterval(gameLoop);
    addText("Game Over", {x: 5,y: 6,
      color: color`3`});
     gameRunning = false;
  }
  }
   
}

   var gameLoop = setInterval(() => {
    if (gameRunning)
    {gameProgram();}
  
  
}, interval); 
    



