var canvas, ctx;
var h = 0;
var r = 0;
var circle = function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    //ctx.moveTo(canvas.width/2, canvas.height/2);
    ctx.arc(canvas.width/2, canvas.height/2, r, 0, Math.PI * 2);
    document.getElementsByTagName("BODY")[0].style.background = "hsl(" + h%360 + ", " + (r/Math.min(canvas.width, canvas.height)*100) + "%, " + (r/Math.min(canvas.width, canvas.height)*100) + "%)";
    ctx.fillStyle = "hsl(" + (h+180)%360 + ", " + (r/Math.min(canvas.width, canvas.height)*100) + "%, " + (r/Math.min(canvas.width, canvas.height)*100) +"%)";
    ctx.fill();
    h++;
    window.requestAnimationFrame(circle);
};

var resize = function(e) {
    r =  Math.sqrt(Math.pow(canvas.width/2 - e.offsetX, 2)+Math.pow(canvas.height/2 - e.offsetY, 2))
}

window.onload = function() {
    canvas = document.getElementById("doodle");
    canvas.addEventListener('mousemove', resize);
    ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    r = canvas.width/3;
    circle();
}



