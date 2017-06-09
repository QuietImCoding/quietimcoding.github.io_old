var textboxes;
var boxcontainer;
var wordtable;

window.onload = function() {
    boxcontainer = document.getElementById("speech");
    textboxes = boxcontainer.getElementsByTagName("input");
    wordtable = document.getElementById("words");
    
    document.getElementById("makeesper").onclick = function(e) {
	while (wordtable.hasChildNodes()) {
	    wordtable.removeChild(wordtable.lastChild);
	}
	var words = []
	for (var i = 0; i < textboxes.length; i++) {
	    words.push(textboxes[i].value.split(" "));
	}
	
	var maxlen = 0;
	for (var i = 0; i < words.length; i++) {
	    if (words[i].length > maxlen) maxlen = words[i].length;
	}
	var grid = [];
	for (var i = 0 ; i < maxlen*2; i++) {
	    var row = []
	    for (var j = 0; j < maxlen*2; j++) {
		row.push("");
	    }
	    grid.push(row);
	}
	
	var type = function(x, y, sentence, xinc, yinc) {
	    console.log("XInc: " + xinc + ", YInc: " + yinc);
	    for (var i = 0 ; i < sentence.length ; i++) {
		console.log("X: " + x + ", Y: " + y);
		grid[y][x] = sentence[i];
		if (x + xinc < grid[0].length && x + xinc > 0) {
		    x += xinc;
		} else {
		    x = 0;
		}
		if (y + yinc < grid.length && y + yinc > 0) {
		    y += yinc;
		} else {
		    y = 0;
		}

	    }
	};

	
	for (var i = 0; i < words.length; i++) {
	    var XInc = Math.floor(Math.random()*2);
	    var YInc = Math.floor(Math.random()*2);
	    if (XInc == 0 && YInc == 0) {
		XInc = 1;
		YInc = 1;
	    }
	    type(Math.floor(Math.random()*maxlen*2), Math.floor(Math.random()*maxlen*2), words[i], XInc, YInc);
	}
	
	console.log(words);
	console.log(maxlen);
	console.log(grid);

	wordtable = document.getElementById("words");
	for (var row = 0; row < grid.length; row++) {
	    var tr = document.createElement("tr");
	    for (var col = 0; col < grid[row].length; col++) {
		var td = document.createElement("td");
		td.innerHTML = grid[row][col];
		tr.appendChild(td);
	    }
	    wordtable.appendChild(tr);
	}
    };
    
    document.getElementById("addspeaker").onclick = function(e) {
	var newbox = document.createElement("input");
	newbox.index = textboxes.length;
	newbox.type = "text";
	boxcontainer.appendChild(newbox);
	var bra = document.createElement("br");
	var brb = document.createElement("br");
	boxcontainer.appendChild(bra);
	boxcontainer.appendChild(brb);
	textboxes = boxcontainer.getElementsByTagName("input");
    };
}
