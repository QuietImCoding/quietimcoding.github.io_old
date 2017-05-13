var textbox, pass;

var httpRequest = function(site) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
	    // Action to be performed when the document is read;
	    pass.innerHTML = xhttp.responseText;
	}
    };
    xhttp.open("GET", "https://www.qiller.net/" + site);
    xhttp.send();
};

window.onload = function() {
    txtbox = document.getElementById("noot");
    pass = document.getElementById("pass");
    txtbox.oninput = function(e) {
	if (txtbox.value != "") {
	    httpRequest(txtbox.value);
	} else {
	    pass.innerHTML = "";
	}
    }
    //alert("hello");
}
