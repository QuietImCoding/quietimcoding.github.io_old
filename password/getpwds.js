var httpGet = function(theUrl) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

window.onload = function() {
    input = document.getElementById("noot");
    pass = document.getElementById("pass");
    input.addEventListener("oninput", function(e) {
	pass.innerHTML = httpGet("danwashere.ddns.net/" + input.value);
    });
}
