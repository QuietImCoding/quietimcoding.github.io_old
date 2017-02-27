var canvas, ctx;
var height;
var width;

var animate = function() {
    var draw = function() {
	ctx.fillStyle = "#FFFFFF";
	ctx.fillRect(0, 0, width, height);
	for (i = 0; i < circles.length; i++) {
	    ctx.beginPath();
	    ctx.arc((circles[i].x/widthinit)*width, (circles[i].y/heightinit)*height, circles[i].r, 0, Math.PI * 2);
	    ctx.fillStyle = circles[i].color;
	    ctx.fill();
	    if (isMoving) {
		circles[i].x += (width/widthinit) * Math.sin(toRadians(rid+i));
		circles[i].y += (height/heightinit) * Math.cos(toRadians(rid+i));
	    }
	}
	rid = window.requestAnimationFrame(draw);
    };

    var dist = function(x1, y1, x2, y2) {
	return Math.sqrt(Math.pow(x2-x1, 2) + Math.pow(y2-y1, 2));
    };

    var toRadians = function(angle) {
	return angle * (Math.PI / 180);
    };
    
    var randInt = function(cap) {
	return Math.floor(Math.random() * cap);
    };
    
    var getRandomColor = function() {
	return "rgb(" + randInt(255) + ", " + randInt(255) + ", " + randInt(255) + ")";
    };
    
    var splitCircle = function(x, y, r) {
	var c1 = { x:x - r/2, y:y - r/2, r:r/2, color:getRandomColor() };
	var c2 = { x:x - r/2, y:y + r/2, r:r/2, color:getRandomColor() };
	var c3 = { x:x + r/2, y:y - r/2, r:r/2, color:getRandomColor() };
	var c4 = { x:x + r/2, y:y + r/2, r:r/2, color:getRandomColor() };
	return [c1, c2, c3, c4];
    };

    var checkSplit = function(e) {
	isMoving = true;
	for (i = 0; i < circles.length; i++) {
	    if (dist((circles[i].x/widthinit)*width, (circles[i].y/heightinit)*height, e.offsetX, e.offsetY) < circles[i].r) {
		var x = circles[i].x;
		var y = circles[i].y;
		var r = circles[i].r;
		circles.splice(i, 1);
		circles = circles.concat(splitCircle(x, y, r));
	    }
	}
    };
    
    canvas = document.getElementById("doodle");
    canvas.addEventListener('mousemove', checkSplit);
    ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    height = canvas.height;
    width = canvas.width;
    var heightinit = height;
    var widthinit = width;
    window.onresize = function() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	height = canvas.height;
	width = canvas.width;
    }
    var circles = [{x:width/2, y:height/2, r:Math.min(height, width)/2,color:getRandomColor()}];
    var rid = 0;
    var isMoving = false;
    draw();
};

window.onload = function() {
    animate();
}



