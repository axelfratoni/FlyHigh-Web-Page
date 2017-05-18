$(document).ready(function(){
	$("#cardNumber").text(localStorage.getItem("cardNumber"));
	$("#expiryDateAndCVV").text(localStorage.getItem("expiryMonth") + "/" + localStorage.getItem("expiryYear") + " " + localStorage.getItem("cvv"));
	$("#cardOwnerName").text(localStorage.getItem("cardOwnerName").split(" ")[0]);
	$("#cardOwnerCity").text(localStorage.getItem("cardOwnerCity"));
	$("#cardOwnerAddress").text(localStorage.getItem("cardOwnerAddress"));
	$("#cardOwnerPostalCode").text(localStorage.getItem("cardOwnerPostalCode"));
	$("#cardOwnerCountry").text(localStorage.getItem("cardOwnerCountry"));
	$("#cardOwnerPhone").text(localStorage.getItem("cardOwnerPhone"));
	
	var personsList = document.getElementById('personsDiv');
	var n = localStorage.getItem("adultosCount");
	for(var i = 1; i <= n ; i++){
		var tmpl = document.getElementById('personTemplate').content.cloneNode(true);
		tmpl.querySelector('#title').innerText = "Datos del adulto " + i;
		tmpl.querySelector('#name').innerText = localStorage.getItem("adult" + i + "Name") + " " + localStorage.getItem("adult" + i + "LastName");
		tmpl.querySelector('#document').innerText = localStorage.getItem("adult" + i + "DocumentType" ) + " : " + localStorage.getItem("adult" + i + "Document" );
		tmpl.querySelector('#birthDate').innerText = localStorage.getItem("adult" + i + "BirthDate");

		personsList.appendChild(tmpl);
	}
	var n = localStorage.getItem("ninosCount");
	console.log(n);
	for(var i = 1; i <= n ; i++){
		var tmpl = document.getElementById('personTemplate').content.cloneNode(true);
		tmpl.querySelector('#title').innerText = "Datos del niño " + i;
		tmpl.querySelector('#name').innerText = localStorage.getItem("kid" + i + "Name") + " " + localStorage.getItem("kid" + i + "LastName");;
		tmpl.querySelector('#document').innerText = localStorage.getItem("kid" + i + "DocumentType" ) + " : " + localStorage.getItem("kid" + i + "Document");
		tmpl.querySelector('#birthDate').innerText = localStorage.getItem("kid" + i + "BirthDate");

		personsList.appendChild(tmpl);
	}


	
});