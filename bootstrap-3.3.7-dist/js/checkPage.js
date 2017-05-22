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
			pasajeros.push(addPassenger("adult", i));
		}
		n = localStorage.getItem("ninosCount");
		for(var i = 1; i <= n ; i++){
			pasajeros.push(addPassenger("kid", i));
		}
		var phoneNumber = localStorage.getItem("cardOwnerPhone").slice(0,4) + "-" + localStorage.getItem("cardOwnerPhone").slice(4,8);
		var credit_card =  {"number": localStorage.getItem("cardNumber"), "expiration": localStorage.getItem("expiryMonth") + (localStorage.getItem("expiryYear")-2000), "security_code": localStorage.getItem("cvv"), "first_name": localStorage.getItem("cardOwnerName").split(" ")[0], "last_name": localStorage.getItem("cardOwnerName").split(" ")[1]};
		var billing_address = {"city": {"id": localStorage.getItem("cardOwnerCityId"), "state": localStorage.getItem("cardOwnerProvince"), "country": { "id": localStorage.getItem("cardOwnerCountryId")}}, "zip_code": parseInt(localStorage.getItem("cardOwnerPostalCode")), "street": localStorage.getItem("cardOwnerAddress"), "floor": "", "apartment": ""}
		var contact = {"email": localStorage.getItem("cardOwnerMail"), "phones": [phoneNumber]};
		var pago = {"installments": 0, "credit_card": credit_card, "billing_address": billing_address};
		var preParse = {"flight_id": parseInt(localStorage.getItem("numberIda")), "passengers" : pasajeros, "payment": pago , "contact": contact};
		var postParse = JSON.stringify(preParse);
		console.log(postParse);
		var ajaxRequest = $.ajax({
		  type: "POST",
		  url: 'http://hci.it.itba.edu.ar/v1/api/booking.groovy?method=bookflight',
		  data: postParse,
		 	contentType: "application/json; charset=utf-8",
		  dataType: "json"
		  });
		ajaxRequest.done(function(data){
			console.log(JSON.stringify(data));
		});
	});
});
function addPassenger(age, i){
	var fname = localStorage.getItem(age + i + "Name");
	var lname = localStorage.getItem(age + i + "LastName");
	var birthDate = localStorage.getItem(age + i + "BirthDate");
	var idType;
	if(localStorage.getItem(age + i + "DocumentType" ) == "DNI"){	idType = 1;
	}else{	idType = 2;
	}
	var id = localStorage.getItem(age + i + "Document");
	return {"first_name": fname, "last_name": lname, "birthdate": birthDate, "id_type": idType, "id_number": id};
}

$(document).ready(function(){
	localStorage.setItem("paymentPage", "true");
});
