$(function(){
	 $(".dropdown-menu li a").click(function(){
		 $("#documentDropDown").text($(this).text());
		 $("#documentDropDown").val($(this).text());
	});
});


$(document).ready(function(){
	var ninosCount = getParameterByName('ninos');
	var adultosCount = getParameterByName('adultos');
	var personsList = document.getElementById('personsDiv');
	var last;
	for(var i = 1; i <= adultosCount; i++){
		var tmpl = document.getElementById('personTemplate').content.cloneNode(true);
		tmpl.querySelector('#title').innerText = "Datos del adulto " + i;
		tmpl.querySelector('#nameInput').id = "nameInputAdult" + i;
		tmpl.querySelector('#lastNameInput').id = "lastNameInputAdult" + i;
		tmpl.querySelector('#documentDropDown').id = "documentDropDownAdult" + i;
		tmpl.querySelector('#documentInput').id = "documentInputAdult" + i;
		tmpl.querySelector('#birthDateInput').id = "birthDateInputAdult" + i;
		tmpl.querySelector('#male').id = "maleAdult" + i;
		tmpl.querySelector('#female').id = "femaleAdult" + i;
		tmpl.querySelector('#buttonsRow').id = "buttonsRowAdult" + i;
		personsList.appendChild(tmpl);
	}
	for(var i = 1; i <= ninosCount; i++){
		var tmpl = document.getElementById('personTemplate').content.cloneNode(true);
		tmpl.querySelector('#title').innerText = "Datos del niño " + i;
		tmpl.querySelector('#nameInput').id = "nameInputKid" + i;
		tmpl.querySelector('#lastNameInput').id = "lastNameInputKid" + i;
		tmpl.querySelector('#documentDropDown').id = "documentDropDownKid" + i;
		tmpl.querySelector('#documentInput').id = "documentInputKid" + i;
		tmpl.querySelector('#birthDateInput').id = "birthDateInputKid" + i;
		tmpl.querySelector('#male').id = "maleKid" + i;
		tmpl.querySelector('#female').id = "femaleKid" + i;
		tmpl.querySelector('#buttonsRow').id = "buttonsRowKid" + i;
		personsList.appendChild(tmpl);
	}
	if(ninosCount == 0){
		$("#buttonsRowAdult" + adultosCount).css("display", "block");
	}else{
		$("#buttonsRowKid" + ninosCount).css("display", "block");
	}

});


function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
