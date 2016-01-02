var canvas = document.getElementById('main');
var ctx = canvas.getContext('2d');
ctx.fillStyle = 'skyblue';
ctx.strokeStyle = 'black';

var canvasOffset = $("#main").offset();
var offsetX = canvasOffset.left;
var offsetY = canvasOffset.top;
var isDown = false;
var startX;
var startY;

var circle = {
  x: 50,
  y: 50,
  r: 20,
};

var rect = {
  x: 100,
  y: 100,
  w: 40,
  h: 40,
};

draw();

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.arc(circle.x, circle.y, circle.r, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.strokeRect(rect.x, rect.y, rect.w, rect.h);
}

function handleMouseDown(e) {
    e.preventDefault();
    startX = parseInt(e.clientX - offsetX);
    startY = parseInt(e.clientY - offsetY);

    // Put your mousedown stuff here
    var dx = startX - circle.x;
    var dy = startY - circle.y;
    isDown = (dx * dx + dy * dy < circle.r * circle.r);
}

function handleMouseUp(e) {
    e.preventDefault();
    isDown = false;
}

function handleMouseOut(e) {
    e.preventDefault();
    isDown = false;
}

function handleMouseMove(e) {
    e.preventDefault();

    // Put your mousemove stuff here
    if (!isDown) {
        return;
    }
    mouseX = parseInt(e.clientX - offsetX);
    mouseY = parseInt(e.clientY - offsetY);
    var dx = mouseX - startX;
    var dy = mouseY - startY;
    startX = mouseX;
    startY = mouseY;
    circle.x += dx;
    circle.y += dy;

    // if (RectCircleColliding(circle, rect)) {
    //     ctx.fillStyle = "red";
    // } else {
    //     ctx.fillStyle = "skyblue";
    // }
    var V = SAT.Vector;
    var c = new SAT.Circle(new V(circle.x, circle.y), circle.r)
    var p = new SAT.Box(new V(rect.x, rect.y), rect.w, rect.h).toPolygon();
    var response = new SAT.Response();
    var collided = SAT.testPolygonCircle(p, c, response);
    if (collided) {
      console.log(response.overlapV);
    }

    draw();
}

$("#main").mousedown(function (e) {
    handleMouseDown(e);
});
$("#main").mousemove(function (e) {
    handleMouseMove(e);
});
$("#main").mouseup(function (e) {
    handleMouseUp(e);
});
$("#main").mouseout(function (e) {
    handleMouseOut(e);
});
