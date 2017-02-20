var canvas, ctx;
var height;
var width;
var img = new Image();

var animate = function() {
    var h = 0;
    var vr = 1;
    var r = 1;
    var colorNow;
    var circledraw = false;
    var DVDdraw = false;
    var buttons = ["red", "white", "blue"];
    var x = 100;
    var y = 300;
    var vx = 2;
    var vy = 2;
    
    var draw = function() {
	background();
	if (circledraw) {
	    circle();
	}
	if (DVDdraw) {
	    DVD();
	}

	drawButtons();
	//ctx.fillStyle = "hsl(" + (h+180)%360 + ", 100%, 70%)";

	window.requestAnimationFrame(draw);
    };

    var background = function() {
	// Draw the background
	ctx.fillStyle = "hsl(" + h%360 + ", 100%, 70%)";
	ctx.fillRect(0, 0, width, height);
	h++;
    };

    var circle = function() {
	// The circle
	ctx.fillStyle = "#000000";
	ctx.beginPath();
	ctx.arc(canvas.width/2, canvas.height/2, r, 0, Math.PI * 2);
	ctx.fill();
	ctx.beginPath();
	r += vr;
	if ( r >= Math.min(width/2, height/2) || r <= 0) {
	    vr = -vr;
	}
    };

    var DVD = function() {
	rwidth = width/5;
	rheight = height/5;
	ctx.fillStyle = "hsl(" + (h+180)%360 + ", 100%, 70%)";
	//ctx.fillRect(x, y, width/10, height/10);
	ctx.drawImage(img, x, y, rwidth, rheight);
	x += vx;
	y += vy;
	if (x <= 0 || x >= width-rwidth) { vx = -vx; }
	if (y <= 0 || y >= height-rheight) { vy = -vy; }
    };

    var drawButtons = function() {
	// Draw the buttons
	ctx.fillStyle = buttons[0];
	ctx.fillRect(width-200, height-30, 70, 20);
	ctx.fillStyle = buttons[1];
	ctx.fillRect(width-120, height-30, 50, 20);
	ctx.fillStyle = buttons[2];
	ctx.fillRect(width-60, height-30, 50, 20);
	ctx.font='15px Courier New';
	ctx.fillStyle = "#000000";
	ctx.fillText("Circle", width - 193, height-15);
	ctx.fillText("DVD", width - 110, height-15);
	ctx.fillText("Stop", width - 55, height-15)
	ctx.fill();
	ctx.fillStyle = "hsl(" + (h+180)%360 + ", 100%, 70%)";
	if (buttons[0] != "#FFFFFF") { buttons[0] = ctx.fillStyle; } 
	if (buttons[1] != "#FFFFFF") { buttons[1] = ctx.fillStyle; }
	if (buttons[2] != "#FFFFFF") { buttons[2] = ctx.fillStyle; }
    };

    var checkButtons = function(e) {
	for (i=0; i < buttons.length; i++) {
	    if (isHovering(e.offsetX, e.offsetY, i)) {
		buttons[i] = "#FFFFFF";
	    } else {
		buttons[i] = ctx.fillStyle;
	    }
	}
    };

    var pickFunction = function(e) {
	if (isHovering(e.offsetX, e.offsetY, 0)) {
	    circledraw = true;
	    if (DVDdraw) {
		DVDdraw = false;
	    }
	}
	if (isHovering(e.offsetX, e.offsetY, 1)) {
	    DVDdraw = true;
	    if (circledraw) {
		circledraw = false;
	    }
	}
	if (isHovering(e.offsetX, e.offsetY, 2)) {
	    circledraw = false;
	    DVDdraw = false;
	}
    };


    var isHovering = function(x, y, num) {
	var bools = [x > width - 200 && y > height-30 && x < width - 130 && y < height - 10, x > width - 120 && y > height-30 && x < width - 70 && y < height - 10, x > width - 60 && y > height-30 && x < width - 10 && y < height - 10 ];
	return bools[num];
    };

    canvas = document.getElementById("doodle");
    canvas.addEventListener('mousemove', checkButtons);
    canvas.addEventListener('click', pickFunction);
    ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    height = canvas.height;
    width = canvas.width;
    window.onresize = function() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	height = canvas.height;
	width = canvas.width;
    }
    img.src = "https://upload.wikimedia.org/wikipedia/en/thumb/1/18/Dvd-video-logo.svg/1280px-Dvd-video-logo.svg.png";
    
    draw();
};

window.onload = function() {
    animate();
}



