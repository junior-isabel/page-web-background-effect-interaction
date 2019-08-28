window.__color = "#444";
const MAX_OBJECT = 70;
const DISTANCE_CONNECTION = 120;
let __width = canvas.width;
let __height = canvas.height;
const RAIO = 3;
function drawBall(x = 0, y = 0) {
    ctx.fillStyle = window.__color;
    ctx.beginPath()
    ctx.arc(x, y, RAIO, 0, 2 * Math.PI)
    ctx.fill()
}

const positions = (() => {
    let lista = [];

    for (let i = 0; i < MAX_OBJECT; i++) {

        let x = Math.floor(Math.random() * __width)
        let y = Math.floor(Math.floor(Math.random() * __height));
        lista.push({ x: x, y: y });
    }
    return Object.assign([], lista);
})();
const velocitys = (() => {
    let lista = [];

    for (let i = 0; i < MAX_OBJECT; i++) {
        let v = {
            x: Math.random() * 0.1,
            y: Math.random() *  0.1,
        }
        lista.push(v);
    }
    return Object.assign([], lista);
})();
function definerOpacity(dist){
    return ((1 * dist) / DISTANCE_CONNECTION);
}
function add() {
    for (let i = 0; i < MAX_OBJECT; i++) {
        positions[i].x += velocitys[i].x;
        positions[i].y += velocitys[i].y;
        constraint(positions[i], velocitys[i]);
    }
}
function constraint(pos, vel) {
    if (pos.x < RAIO) {
        vel.x *= -1;
        pos.x = RAIO;
    }
    if (pos.x > __width - RAIO) {
        vel.x *= -1;
        pos.x = __width - RAIO;
    }
    if (pos.y < RAIO) {
        vel.y *= -1;
        pos.y = RAIO;
    }
    if (pos.y > __height) {
        vel.y *= -1;
        pos.y = __height - RAIO;
    }
}

function distance(pos1, pos2) {
    const dist = Math.sqrt(((pos2.x - pos1.x) ** 2) + ((pos2.y - pos1.y) ** 2));

    return dist;
}
function calculeDistance(index) {

    for (let i in positions) {
        if (index === i) continue;
        const dist = distance(positions[index], positions[i]);

        if (dist < DISTANCE_CONNECTION) {
            let opacity = definerOpacity(dist);
            
            brigde(positions[index], positions[i], opacity);
        }

    }
}
function brigde(pos1, pos2, opacity) {
   
    ctx.globalAlpha = opacity;
    ctx.strokeStyle= window.__color;
    ctx.moveTo(pos1.x, pos1.y);
    ctx.lineTo(pos2.x, pos2.y);
    ctx.stroke();
   
}
function draw() {
    ctx.clearRect(0, 0, __width, __height);
    for (let index in positions) {
        let position = positions[index];
        add();
        drawBall(position.x, position.y);
        ctx.save();
        calculeDistance(parseInt(index))
        ctx.restore();
    }
}

function setColorBackground(color){
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    window.__color = color;
   
}

window.setInterval(() => {
    draw();
}, 60);