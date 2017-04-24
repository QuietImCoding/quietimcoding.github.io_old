var bg;
var title;
var music;
var bees;
var k = 0;

var flip = function(j) {
    k += 180;
    j.style.transform = "rotatey(" + k + "deg)";
    k = k%360;
}

var animate = function() {
    for (i=0; i < bees.length; i++) {
	thisbee= bees[i];
	vx = parseInt(thisbee.getAttribute("vx"));
	vy = parseInt(thisbee.getAttribute("vy"));
	x = thisbee.style.left;
	x = parseFloat(x.substring(0, x.indexOf("%")));
	y = thisbee.style.top;
	y = parseFloat(y.substring(0, y.indexOf("%")));
	x += vx/4;
	y += vy/4;
	if ( x == 0 || x == 90) {
	    flip(thisbee);
	    vx = -vx;
	}
	if ( y == 0 || y == 83) {
	    vy = -vy;
	}

	thisbee.setAttribute("vx", vx);
	thisbee.setAttribute("vy", vy);
	thisbee.style.left = x + "%";
	thisbee.style.top = y + "%";
    }
    window.requestAnimationFrame(animate);
}

var getPlusOrMinus = function() {
    if (Math.random() > 0.5) {
	return 1;
    } else {
	return -1;
    }
}
window.onload = function () {
    title = document.getElementById("frozen");
    music = document.getElementById("music");
    bg = document.getElementById("bg");
    bg.width = window.innerWidth;
    bg.height = window.innerHeight;
    bg.addEventListener("click", function(e) {
	if (music.paused) {
	    music.play();
	} else {
	    music.pause();
	}
    } );
    bees = document.getElementsByClassName("bee");
    for (i = 0; i < bees.length; i++) {
	bees[i].style.left = Math.floor(90 * Math.random()) + "%";
	bees[i].style.top = Math.floor(83 * Math.random()) + "%";
	var spd = getPlusOrMinus();
	bees[i].setAttribute("vx", spd);
	if (spd > 0) {
	    flip(bees[i]);
	}
	bees[i].setAttribute("vy", getPlusOrMinus());
    }
    animate();
};
