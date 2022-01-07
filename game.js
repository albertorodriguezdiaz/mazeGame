let c = document.getElementById('canvas');
let ctx = c.getContext('2d');
let tileSize = 50;

let map = [
    [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 2],
    [0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [3, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0]
];

let collBox = [];
let mapLength = map[0].length;
let mapHeight = map.length;

// Imagenes
let ladrillo = new Image();
ladrillo.src = './img/ladrillo.jpg';

// Dibujamos el Mapa
function drawMap(m){
    for (let i = 0; i < m.length; i++) {
        collBox.push([]);
        for (let j = 0; j < m[i].length; j++) {
            if(m[i][j]===1){
                ctx.beginPath();
                // ctx.fillStyle = "#000";
                // ctx.fillRect(j*tileSize, i*tileSize, tileSize, tileSize);
                ctx.drawImage(ladrillo, j*tileSize, i*tileSize, tileSize, tileSize);

            }else if(m[i][j]===2){
                ctx.beginPath();
                ctx.fillStyle = "#00ff00";
                ctx.fillRect(j*tileSize, i*tileSize, tileSize, tileSize);
            }
            else if(m[i][j]===3){
                ctx.beginPath();
                ctx.fillStyle = "#b354e8";
                ctx.fillRect(j*tileSize, i*tileSize, tileSize, tileSize);
            }

            collBox[i].push({
                x: j*tileSize, 
                y: i*tileSize, 
                status: m[i][j]===1 
                    ? 1 
                    : (m[i][j]===2
                        ? 2
                        : (m[i][j]===3
                            ? 3
                            : 0
                           )
                       )
            });
        }
        
    }
}

// Dibujamos el Jugador
function drawPlayer(x,y){
    ctx.beginPath();
    ctx.fillStyle = "#ff0000";
    ctx.fillRect(x, y, tileSize, tileSize);
}

let player = {
    x: 0,
    y: 0,
    newX: 0,
    newY: 0
}

// Funcion para mover el jugador
function move(x,y){
    ctx.clearRect(0, 0, mapLength*tileSize, mapHeight*tileSize);
    drawPlayer(x,y);
    drawMap(map);

    player.x = player.newX;
    player.y = player.newY;
}

// Validar movimientos del jugador 
function checkColl(){
    for (let i = 0; i < mapHeight; i++) {
        for (let j = 0; j < mapLength; j++) {
            let b = collBox[i][j];

            if(player.newX === b.x && player.newY === b.y){
                if(b.status === 1){
                    console.log('Hit Rock');
                }else if(b.status === 2){
                    console.log('Win');
                    move(player.newX, player.newY);
                }else if(b.status === 3){
                    console.log('Pregunta');
                }else{
                    move(player.newX, player.newY);
                }
            }else if(player.newX < 0 || player.newX >= mapLength*tileSize || player.newY < 0 || player.newY >= mapHeight*tileSize){
                console.log('Hit Wall');
            }
            
        }
        
    }
}

// Acciones al precionar las teclas
window.onkeydown = function(e){
    if (e.keyCode === 37) { player.newX = player.x-tileSize; player.newY = player.y; console.log('Izquierda');}
    if (e.keyCode === 38) { player.newY = player.y-tileSize; player.newX = player.x; console.log('Arriba');}
    if (e.keyCode === 39) { player.newX = player.x+tileSize; player.newY = player.y; console.log('Derecha');}
    if (e.keyCode === 40) { player.newY = player.y+tileSize; player.newX = player.x; console.log('Abajo');}
    checkColl();
}

// Mostrar el juego
window.onload = function(){
    drawMap(map);
    drawPlayer(0,0);
}