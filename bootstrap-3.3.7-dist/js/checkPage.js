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
		tmpl.querySelector('#name').id = "nameAdult" + i;
		tmpl.querySelector('#document').id = "documentAdult" + i;
		tmpl.querySelector('#birthDate').id = "bithDateAdult" + i;
		personsList.appendChild(tmpl);
	}
	var n = localStorage.getItem("ninosCount");
	for(var i = 1; i <= n ; i++){
		var tmpl = document.getElementById('personTemplate').content.cloneNode(true);
		tmpl.querySelector('#title').innerText = "Datos del niño " + i;
		tmpl.querySelector('#name').innerText = localStorage.getItem("kid" + i + "Name") + " " + localStorage.getItem("kid" + i + "LastName");;
		tmpl.querySelector('#document').innerText = localStorage.getItem("kid" + i + "DocumentType" ) + " : " + localStorage.getItem("kid" + i + "Document");
		tmpl.querySelector('#birthDate').innerText = localStorage.getItem("kid" + i + "BirthDate");
		tmpl.querySelector('#name').id = "nameKid" + i;
		tmpl.querySelector('#document').id = "documentKid" + i;
		tmpl.querySelector('#birthDate').id = "bithDateKid" + i;
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
		var pasajeros = [];
		var n = localStorage.getItem("adultosCount");
		for(var i = 1; i <= n ; i++){
			pasajeros.push(addPassenger("Adult", i));
		}
		n = localStorage.getItem("ninosCount");
		for(var i = 1; i <= n ; i++){
			pasajeros.push(addPassenger("Kid", i));
		}
		var tarjeta =  {"number": localStorage.getItem("cardNumber"), "expiration": localStorage.getItem("expiryMonth") + (localStorage.getItem("expiryYear")-2000), "security_code": localStorage.getItem("cvv"), "first_name": localStorage.getItem("cardOwnerName").split(" ")[0], "last_name": localStorage.getItem("cardOwnerName").split(" ")[1]};
		$("#cardOwnerCity").text(localStorage.getItem("cardOwnerCity"));
		$("#cardOwnerAddress").text(localStorage.getItem("cardOwnerAddress"));
		$("#cardOwnerPostalCode").text(localStorage.getItem("cardOwnerPostalCode"));
		$("#cardOwnerCountry").text(localStorage.getItem("cardOwnerCountry"));
		$("#cardOwnerPhone").text(localStorage.getItem("cardOwnerPhone"));
		$("#cardOwnerProvince").text(localStorage.getItem("cardOwnerProvince"));
		$("#cardOwnerMail").text(localStorage.getItem("cardOwnerMail"));
		$("#cardOwnerID").text(localStorage.getItem("cardOwnerID"));

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
function addPassenger(age, i){
	var fname = $("#name" + age + i).split(" ")[0];
	var lname = $("#name" + age + i).split(" ")[1];
	var birthDate = $("birthDate" + age + i);
	var idType;
	if($("#document" + age + i).split(" ")[0] == "DNI"){
		idType = 1;
	}else{
		idType = 2;
	}
	var id = $("#document" + age + i).split(" ")[2];
	return {"first_name": fname, "last_name": lname, "birthdate": birthDate, "id_type": idType, "id_number": id};
}
$(document).ready(function(){
	localStorage.setItem("paymentPage", "true");
});
