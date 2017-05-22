months = ["ene" , "feb" , "mar" , "may" , "jun" , "jul" , "aug", "sep", "oct", "nov", "dic"]
cards = ["visa" , "mastercard", "amex", "diners"]
years = ["siete" , "ocho" , "nueve" , "cero" , "uno" , "dos" , "tres" , "cuatro" , "cinco", "seis"]
$(function(){
	 $(".dropdown-menu li a").click(function(){
     if(jQuery.inArray( $(this).attr('id'), cards ) >=0){
       $("#cardTypeButton").text($(this).text());
       $("#cardTypeButton").val($(this).text());
     } else if(jQuery.inArray( $(this).attr('id'), months ) >=0){
       $("#monthButton").text($(this).text());
       $("#monthButton").val($(this).text());
     } else if(jQuery.inArray( $(this).attr('id'), years ) >=0){
       $("#yearButton").text($(this).text());
       $("#yearButton").val($(this).text());
     }
	});
});


$(document).ready(function(){
	$("#nextButton").click(function(){
		validateCreditCard();
  });
});

function saveInfo(cityId, countryId){
  localStorage.setItem("cardType", $("#cardTypeButton").val());
  localStorage.setItem("cardNumber", $("#cardNumberInput").val());
  localStorage.setItem("expiryMonth", $("#monthButton").val());
  localStorage.setItem("expiryYear", $("#yearButton").val());
  localStorage.setItem("cvv", $("#cvvInput").val());
  localStorage.setItem("cardOwnerName", $("#nameInput").val());
  localStorage.setItem("cardOwnerCity", $("#cityInput").val());
  localStorage.setItem("cardOwnerAddress", $("#addressInput").val());
  localStorage.setItem("cardOwnerPostalCode", $("#postalCodeInput").val());
  localStorage.setItem("cardOwnerCountry", $("#countryInput").val());
  localStorage.setItem("cardOwnerPhone", $("#phonenumberInput").val());
	localStorage.setItem("cardOwnerMail", $("#mailInput").val());
	localStorage.setItem("cardOwnerID", $("#dniInput").val());
	localStorage.setItem("cardOwnerProvince", $("#provinceInput").val());
	localStorage.setItem("cardOwnerCityId", cityId);
	localStorage.setItem("cardOwnerCountryId", countryId);

}

var errormessage = "";
function validateForm(creditCardIsInvalid){
	var ret = true;
	if(creditCardIsInvalid == "true"){
		errormessage += "Tarjeta invalida.";
		inputError($("#cardNumberInput"));
	  inputError($("#monthButton"));
	  inputError($("#yearButton"));
	  inputError($("#cvvInput"));
		ret = false;
	}
  num = $("#nameInput").val();
	if(lengthIsZero(num) ){
    errormessage += "Nombre invalido.";
    inputError("#nameInput");
		ret = false;
  } else{
    num = num.split(" ");
    if(num.length != 2){
      errormessage += "Ingrese su primer nombre y primer apellido. ";
      inputError("#nameInput");
			ret = false;
    }else if(validateName(num)){
      errormessage += "Nombre invalido. ";
      inputError("#nameInput");
			ret = false;
    }
  }
	num = $("#dniInput").val();
	if(validatePhoneNumberInput(num)){
		errormessage += "Numero de dni invalido.";
		inputError("#dniInput");
		ret = false;
	}
	num = $("#postalCodeInput").val();
	if(validatePostalCode(num)){
		errormessage += "Codigo postal invalido.";
		inputError("#postalCodeInput");
		ret = false;
	}
  num = $("#addressInput").val();
  if(!lengthIsZero(num)){
    num = num.split(" ");
    for(var i = 0; i < num.length ; i++){
      if(i == num.length-1){
        if(validateAddressNumber(num[i])){
          errormessage += "Direccion invalida.";
          inputError("#addressInput");
					ret = false;
        }
      }else{
        if(validateAddressName(num[i]) ){
          errormessage += "Direccion invalida.";
          inputError("#addressInput");
					ret = false;
        }
      }
    }
  }else{
    errormessage += "Direccion invalida.";
    inputError("#addressInput");
		ret = false;
  }
	num = $("#mailInput").val();
	if(validateEmail(num)){
    errormessage += "Mail invalido.";
    inputError("#mailInput");
		ret = false;
  }
	num = $("#phonenumberInput").val();
  if(validatePhoneNumberInput(num)){
    errormessage += "Numero de telefono invalido.";
    inputError("#phonenumberInput");
		ret = false;
  }
	if(!ret){
  	$("#errorBanner").html("<div class=\"alert alert-danger alert-dismissable\">\
	            <a href=\"#\" class=\"close\" data-dismiss=\"alert\" aria-label=\"close\">×</a>\
	            <strong>Error:</strong> " + errormessage +
	          "</div>");
	}
	return ret;
};

function inputError(target){
	$(target).css("border", "1px solid red");
	$(target).css("background-color", "#FF9494");
	$(target).css("color", "black");
}

$(document).ready(function(){
	$(".myInputs").focusin(function(){
		$(this).css("border", "");
		$(this).css("background-color", "");
	});
});

//             0            1            2         3         4          5           6        7       8       9              10              11        12           13           14         15
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
	if(localStorage.getItem("paymentPage") == "true"){
	  $("#nameInput").val(localStorage.getItem("cardOwnerName"));
	  $("#cityInput").val(localStorage.getItem("cardOwnerCity"));
	  $("#addressInput").val(localStorage.getItem("cardOwnerAddress"));
	  $("#postalCodeInput").val(localStorage.getItem("cardOwnerPostalCode"));
	  $("#countryInput").val(localStorage.getItem("cardOwnerCountry"));
	  $("#phonenumberInput").val(localStorage.getItem("cardOwnerPhone"));
		$("#mailInput").val(localStorage.getItem("cardOwnerMail"));
		$("#mailInput").val(localStorage.getItem("cardOwnerMail"));
		$("#dniInput").val(localStorage.getItem("cardOwnerID"));
		$("#provinceInput").val(localStorage.getItem("cardOwnerProvince"));
	}
});

$(document).ready(function(){
	localStorage.setItem("infoPage", "true");
});

$(document).ready(function(){
	$("#backButton").click(function(){
		document.location.href = "InfoPage.html";
	});
});
function parseHour(hour){
	var h = hour.split(":");
	return h[0]+":"+h[1];
}
function validateCreditCard(){
  var cardNumber = $("#cardNumberInput").val();
  var cardMonth = $("#monthButton").val();
  var cardYear = $("#yearButton").val() - 2000;
  var cardCVV = $("#cvvInput").val();
  var url = "http://hci.it.itba.edu.ar/v1/api/booking.groovy?method=validatecreditcard&number=" + cardNumber + "&exp_date=" + cardMonth + cardYear + "&sec_code=" + cardCVV;
  console.log(url);
  $.ajax({
          url: url,
          dataType: "jsonp",
          success: function(data){
            if(data.valid != null){
							validateLocation();
            }else{
							validateForm("true");
						}
          }
  });
}

function validateLocation(){
	var isCorrect = false;
	var ret = true;
	var country = $("#countryInput").val();
	var cityID;
	var countryID;
	console.log("pais: " + country);
	for(var i = 0; i < countries.length; i++){
		console.log("comparing countries: " + countries[i].name);
		if(country == countries[i].name){
			countryID = countries[i].id;
			isCorrect = true;
			break;
		}
	}
	if(isCorrect == false){
		errormessage += "Pais invalido.";
		inputError("#countryInput");
		ret = false;
	}
	isCorrect = false;
	var state = $("#provinceInput").val();
	console.log("provincia: " + state);
	for(var i = 0; i < cities.length; i++){
		console.log("comparing states: " +cities[i].name.split(", ")[1]);
		if(state == cities[i].name.split(", ")[1] && cities[i].country.id == countryID){
			cityID = cities[i].id;
			isCorrect = true;
			break;
		}
	}
	if(isCorrect == false){
		errormessage += "Provincia invalida.";
		inputError("#provinceInput");
		ret = false;
	}
	isCorrect = false;
	var city = $("#cityInput").val();
	console.log("ciudad: " + city);
	for(var i = 0; i < cities.length; i++){
		console.log("comparing cities: " +cities[i].name.split(",")[0]);
		if(city == cities[i].name.split(",")[0] && cityID == cities[i].id ){
			isCorrect = true;
			break;
		}
	}
	if(isCorrect == false){
		errormessage += "Ciudad invalida.";
		inputError("#cityInput");
		ret = false;
	}
	if(ret == true){
		if(validateForm("false")){
			saveInfo(cityID, countryID);
			document.location.href = "CheckPage.html";
		}
	}else{
		validateForm("false");
	}
}


countries = [];
countryPage = 1;
$(document).ready(function retrieveCountries(){
	$.ajax({
          url: "http://hci.it.itba.edu.ar/v1/api/geo.groovy?method=getcountries&page=" + countryPage,
          dataType: "jsonp",
          success: function(data){
          		$.each(data.countries, function(index, value) {
	        		countries.push(value);
        		});
          		if(countries.length < data.total){
          			countryPage += 1;
          			retrieveCountries();
          		}else{
								console.log(countries);
							}
          }
        });
});

cities = [];
optionNames = [];
cityPage = 1;
$(document).ready(function retrieveCities(){
	$.ajax({
          url: "http://hci.it.itba.edu.ar/v1/api/geo.groovy?method=getcities&page=" + cityPage,
          dataType: "jsonp",
          success: function(data){
          		$.each(data.cities, function(index, value) {
	        		cities.push(value);
	        		optionNames.push(value.name);
        		});
          		if(cities.length < data.total){
          			cityPage += 1;
          			retrieveCities();
          		}else{
								console.log(cities);
							}
          }
        });
});
/*
num = $("#countryInput").val();
if(validateCountry(num) ){
	errormessage += "Pais invalido. ";
	inputError("#countryInput");
	ret = false;
}
num = $("#provinceInput").val();
if(validateCountry(num)){
	errormessage += "Provincia invalida.";
	inputError("#provinceInput");
	ret = false;
}
num = $("#cityInput").val();
if(validateCity(num)){
	errormessage += "Ciudad invalida. ";
	inputError("#cityInput");
	ret = false;
}
*/
function validCreditCard(){
	$("#cardNumberInput").css("border", "");
	$("#cardNumberInput").css("background-color", "");
	$("#monthButton").css("border", "");
	$("#monthButton").css("background-color", "");
	$("#yearButton").css("border", "");
	$("#yearButton").css("background-color", "");
	$("#cvvInput").css("border", "");
	$("#cvvInput").css("background-color", "");
}
