$(document).ready(function(){
	$("#cardNumber").text(localStorage.getItem("cardType") + " " + localStorage.getItem("cardNumber"));
	$("#expiryDateAndCVV").text(localStorage.getItem("expiryMonth") + "/" + localStorage.getItem("expiryYear") + " " + localStorage.getItem("cvv"));
	$("#cardOwnerName").text(localStorage.getItem("cardOwnerName"));
	$("#cardOwnerCity").text(localStorage.getItem("cardOwnerCity"));
	$("#cardOwnerAddress").text(localStorage.getItem("cardOwnerAddress"));
	$("#cardOwnerPostalCode").text(localStorage.getItem("cardOwnerPostalCode"));
	$("#cardOwnerCountry").text(localStorage.getItem("cardOwnerCountry"));
	$("#cardOwnerPhone").text(localStorage.getItem("cardOwnerPhone"));
	$("#cardOwnerProvince").text(localStorage.getItem("cardOwnerProvince"));
	$("#cardOwnerMail").text(localStorage.getItem("cardOwnerMail"));
	$("#cardOwnerID").text(localStorage.getItem("cardOwnerID"));

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
$(document).ready(function(){
	$("#backButton").click(function(){
		localStorage.setItem("cardNumber", null);
		document.location.href = "PaymentPage.html";
	});
});

$(document).ready(function(){
	$("#nextButton").click(function(){
		var pasajeros = [{"first_name": "pepe", "last_name": "pepe", "birthdate": "1990-06-02", "id_type": 1, id_number: "30000000"}];
		var tarjeta =  {"number": "4567899999888", "expiration": "1231", "security_code": "213", "first_name": "pepe", "last_name": "pepon"};
		var lugarPago = {"city": {"id": "BUE", "state": "Buenos Aires", "country": "AR"}, "zip_code": 123, "street": "asd 123", "floor": "", "apartment": ""};
		var contacto = {"email": "asd@asd.com", "phones": ["12313"]};
		var pago = {"installments": 1, "credit_card": tarjeta, "billing_address": lugarPago, "contact": contacto};
		var preParse = {"flight_id": 93480, "passengers" : pasajeros, "payment": pago};
		console.log(JSON.stringify(preParse));
		var postParse = JSON.stringify(preParse);
		$.ajax({
		  type: "POST",
		  url: 'http://hci.it.itba.edu.ar/v1/api/booking.groovy?method=bookflight',
		  data: postParse,
		  dataType: "json",
		  success: function(data){
		  	console.log(JSON.stringify(data));
		  },
		  error: function(data){
		  	console.log(JSON.stringify(data));
		  }
		});
	});
});

$(document).ready(function(){
	localStorage.setItem("paymentPage", "true");
});
