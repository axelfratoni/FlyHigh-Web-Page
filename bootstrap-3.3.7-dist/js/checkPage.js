parameters = ["airline" , "duration" , "price", "depAirp", "arrAirp", "arrDate", "depDate", "ori", "des", "arrAirpDesc", "depAirpDesc" , "number", "adultPrice", "kidPrice", "charges", "taxes"];

idaVuelta = ["Ida" , "Vuelta"];
$(document).ready(function(){
		$("#vuelosDivIda").load("FlightsTemplate.html", function(){
			var data = parseHour(localStorage.getItem(parameters[6] + idaVuelta[0])) + " hs";
			$(this).find(".oriHora").find("p").text(data);
			data = parseHour(localStorage.getItem(parameters[5] + idaVuelta[0])) + " hs";
			$(this).find(".desHora").find("p").text(data);
			data = localStorage.getItem(parameters[3] + idaVuelta[0]);
			$(this).find(".oriID").find("p").text(data);
			data = localStorage.getItem(parameters[4] + idaVuelta[0]);
			$(this).find(".desID").find("p").text(data);
			data = localStorage.getItem(parameters[10] + idaVuelta[0]).split(",");
			$(this).find(".ori").find("p").text(data[1] + ", " + data[2]);
			data = localStorage.getItem(parameters[9] + idaVuelta[0]).split(",");
			$(this).find(".des").find("p").text(data[1] + ", " + data[2]);
			data = localStorage.getItem(parameters[1] + idaVuelta[0]) + " hs";
			$(this).find(".duration").find("span").text(data);
			data = "Nro:" + localStorage.getItem(parameters[11] + idaVuelta[0]);
			$(this).find(".fliNum").find("p").text(data);
			data = "U$D " + localStorage.getItem(parameters[2] + idaVuelta[0]);
			$(this).find(".price").find("p").text(data);
			data = "Adulto: $" + localStorage.getItem(parameters[12] + idaVuelta[0]);
			$(this).find(".pAdulto").text(data);
			if(localStorage.getItem("ninosCount") > 0){
				$(this).find(".pNino").text(localStorage.getItem(parameters[13] + idaVuelta[0]));
			}
			data = "Cargo: $" + localStorage.getItem(parameters[14] + idaVuelta[0]);
			$(this).find(".pCargo").text(data);
			data = "Impuestos: $" + localStorage.getItem(parameters[15] + idaVuelta[0]);
			$(this).find(".pImpuestos").text(data);
		});
		if(localStorage.getItem("idaYvuelta") == "true"){
			$("#vuelosDivVuelta").load("FlightsTemplate.html", function(){
				var data = parseHour(localStorage.getItem(parameters[6] + idaVuelta[1])) + " hs";
				$(this).find(".oriHora").find("p").text(data);
				data = parseHour(localStorage.getItem(parameters[5] + idaVuelta[1])) + " hs";
				$(this).find(".desHora").find("p").text(data);
				data = localStorage.getItem(parameters[3] + idaVuelta[1]);
				$(this).find(".oriID").find("p").text(data);
				data = localStorage.getItem(parameters[4] + idaVuelta[1]);
				$(this).find(".desID").find("p").text(data);
				data = localStorage.getItem(parameters[10] + idaVuelta[1]).split(",");
				$(this).find(".ori").find("p").text(data[1] + ", " + data[2]);
				data = localStorage.getItem(parameters[9] + idaVuelta[1]).split(",");
				$(this).find(".des").find("p").text(data[1] + ", " + data[2]);
				data = localStorage.getItem(parameters[1] + idaVuelta[1]) + " hs";
				$(this).find(".duration").find("span").text(data);
				data = "Nro:" + localStorage.getItem(parameters[11] + idaVuelta[1]);
				$(this).find(".fliNum").find("p").text(data);
				data = "U$D " + localStorage.getItem(parameters[2] + idaVuelta[1]);
				$(this).find(".price").find("p").text(data);
				data = "Adulto: $" + localStorage.getItem(parameters[12] + idaVuelta[1]);
				$(this).find(".pAdulto").text(data);
				if(localStorage.getItem("ninosCount") > 0){
					$(this).find(".pNino").text(localStorage.getItem(parameters[13] + idaVuelta[1]));
				}
				data = "Cargo: $" + localStorage.getItem(parameters[14] + idaVuelta[1]);
				$(this).find(".pCargo").text(data);
				data = "Impuestos: $" + localStorage.getItem(parameters[15] + idaVuelta[1]);
				$(this).find(".pImpuestos").text(data);
			});
		}
});

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
		}/*
		var phoneNumber = localStorage.getItem("cardOwnerPhone").slice(0,4) + "-" + localStorage.getItem("cardOwnerPhone").slice(4,8);
		var credit_card =  {"number": localStorage.getItem("cardNumber"), "expiration": localStorage.getItem("expiryMonth") + (localStorage.getItem("expiryYear")-2000), "security_code": localStorage.getItem("cvv"), "first_name": localStorage.getItem("cardOwnerName").split(" ")[0], "last_name": localStorage.getItem("cardOwnerName").split(" ")[1]};
		var billing_address = {"city": {"id": localStorage.getItem("cardOwnerCityId"), "state": localStorage.getItem("cardOwnerProvince"), "country": { "id": localStorage.getItem("cardOwnerCountryId")}}, "zip_code": parseInt(localStorage.getItem("cardOwnerPostalCode")), "street": localStorage.getItem("cardOwnerAddress"), "floor": "", "apartment": ""}
		var contact = {"email": localStorage.getItem("cardOwnerMail"), "phones": [phoneNumber]};
		var pago = {"installments": 0, "credit_card": credit_card, "billing_address": billing_address};*/
		//var preParse = {"flight_id": parseInt(localStorage.getItem("numberIda")), "passengers" : pasajeros, "payment": pago , "contact": contact};
		var preParse = {"flight_id":93480,"passengers":[{"first_name":"John","last_name":"Doe","birthdate":"1969-06-02","id_type":1,"id_number":"17155171"}],"payment":{"installments":6,"credit_card":{"number":"4567899999888","expiration":"1213","security_code":"123","first_name":"John","last_name":"Doe"},"billing_address":{"city":{"id":"BUE","state":"Buenos Aires","country":{"id":"AR"}},"zip_code":1435,"street":"Av. Madero 299","floor":"","apartment":""}},"contact":{"email":"john.doe@hotmail.com","phones":["555-5555"]}}
		var postParse = (JSON.stringify(preParse)).replace(/{/gi,"%7b").replace(/ /gi,"%20").replace(/}/gi,"%7d");
		var link = 'http://hci.it.itba.edu.ar/v1/api/booking.groovy?method=bookflight2' + "&booking=" + postParse;
		console.log(link);
		var ajaxRequest = $.ajax({
		  type: "POST",
		  url: link,
		  });
		ajaxRequest.done(function(data){
			console.log(JSON.stringify(data));
			//if(data.booking == true) {
				$("#confirmBanner").html("<div class=\"alert alert-success alert-dismissable\">\
	      		<a href=\"#\" class=\"close\" data-dismiss=\"alert\" aria-label=\"close\">×</a>\
	      		<strong>Exito!</strong> Has reservado tu vuelo. <a href=\"index.html\"> Volver al inicio.\
	    		</a></div>");
			//} else {
			//	$("#confirmBanner").html("<div class=\"alert alert-danger alert-dismissable\">\
	      	//	<a href=\"#\" class=\"close\" data-dismiss=\"alert\" aria-label=\"close\">×</a>\
	      	//	<strong>Ha ocurrido un error en la solicitud.</strong> Intente de vuelta mas tarde. <a href=\"index.html\"> Volver al inicio.\
	    	//	</a></div>");
			//}
			window.scrollTo(0,document.body.scrollHeight);
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

function parseHour(hour){
	var h = hour.split(":");
	return h[0]+":"+h[1];
}
