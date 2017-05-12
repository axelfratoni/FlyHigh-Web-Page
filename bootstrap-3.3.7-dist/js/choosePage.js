$(document).ready(function(){
	var split = window.location.href.split("ChoosePage.html");
	var url = split[0] + "FlightsTemplate.html" + split[1];
	document.getElementById('iframe-id').src = url;
});
