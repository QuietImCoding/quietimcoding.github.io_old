var textbox, pass;

var httpRequest = function(site) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
	    // Action to be performed when the document is read;
	    pass.innerHTML = xhttp.responseText;
	}
    };
    xhttp.open("GET", "https://qiller.net/api/passgen/" + site);
    xhttp.send();
};

var getUpdoot = function() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
	    alert('updooted?');
	    //console.log(xhttp.responseText);
	}
    };
    xhttp.open("GET", "https://qiller.net/api/passgen_updoot/");
    xhttp.send();
};

var updoot = function() {
    var lorenz = document.getElementById('lorenz');
    var name = document.getElementById('name');
    var city = document.getElementById('city');
    var age = document.getElementById('age');
    var pkey = document.getElementById('pkey');
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
	    lorenz.parentNode.removeChild(lorenz);
	    console.log(xhttp.responseText);
	}
    };
    var params = 'city='+city.value+'&name='+name.value+'&age='+age.value+'&pkey='+pkey;
    console.log(params);
    xhttp.open("POST", "https://qiller.net/api/passgen_updoot");
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(params);
}

window.onload = function() {
    getUpdoot();
    txtbox = document.getElementById("noot");
    pass = document.getElementById("pass");
    txtbox.oninput = function(e) {
	if (txtbox.value != "") {
	    httpRequest(txtbox.value);
	} else {
	    pass.innerHTML = "";
	}
    }
    var button = document.getElementById('button');
    button.onclick = updoot;
    //alert("hello");
}
