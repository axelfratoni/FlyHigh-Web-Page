months = ["ene" , "feb" , "mar" , "may" , "jun" , "jul" , "aug", "sep", "oct", "nov", "dic"]
cards = ["visa" , "mastercard"]
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

$(document).ready(function() {

  var ticket1 = sessionStorage.getItem("idaTicket");
  $("#vuelosDivIda").append(ticket1);

  if(sessionStorage.getItem("idaYvuelta") == "true"){
    var ticket2 = sessionStorage.getItem("vueltaTicket");
    $("#vuelosDivVuelta").append(ticket2);
  }

});


$(document).ready(function(){
	$("#nextButton").click(function(){
		if (typeof(Storage) !== "undefined") {
 		 localStorage.setItem("nombre", $("#nameInput").val());
 	 }
    if(validateForm()){

			saveInfo();
      console.log(localStorage.getItem("cardNumber"));
      window.alert("Bien pibe");
      document.location.href = "CheckPage.html";

    }
  });
});

function saveInfo(){
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
}

var errormessage = "";
function validateForm(){
	var ret = true;
  var num = $("#cardTypeButton").val();
  if(lengthIsZero(num)){
    errormessage += "Seleccione algun tipo de tarjeta. ";
    inputError("#cardTypeButton");
		ret = false;
  }

  num = $("#cardNumberInput").val();
  if(validateCreditCardNumber(num)){
    errormessage += "Numero de tarjeta incorrecto. ";
    inputError("#cardNumberInput");
		ret = false;
  }
  num = $("#monthButton").val();
  if(lengthIsZero(num)){
    errormessage += "Seleccione el mes de vencimiento. ";
    inputError("#monthButton");
		ret = false;
  }
	num = $("#yearButton").val();
  if(lengthIsZero(num)){
    errormessage += "Seleccione el año de vencimiento. ";
    inputError("#yearButton");
		ret = false;
  }
  num = $("#cvvInput").val();
  if(validateCvv(num)){
    errormessage += "Codigo de seguridad incorrecto. ";
    inputError("#cvvInput");
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
    }else if(validateName(num[0]) || validateName[1]){
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
		console.log("xd");
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

parameters = ["airline" , "duration" , "price", "depAirp", "arrAirp", "arrDate", "depDate"];
idaVuelta = ["Ida" , "Vuelta"];
$(document).ready(function(){
	console.log(localStorage.getItem("idaYvuelta"));
	console.log(localStorage.getItem(parameters[1] + idaVuelta[0]) + " hs");
		$("#vuelosDivIda").load("FlightsTemplate.html", function(){
			// Aca poner el logo no el id de aerolinea
			var data = localStorage.getItem(parameters[0] + idaVuelta[0]);
			$(this).find(".airportLogo").attr("src",data);
			data = localStorage.getItem(parameters[1] + idaVuelta[0]) + " hs";
			$(this).find(".duration").append('<p>'+ data +'</p>');
			data = parseInt(localStorage.getItem(parameters[2] + idaVuelta[0]));
			$(this).find(".price").append('<p>$'+ data +'</p>');
			data = parseHour(localStorage.getItem(parameters[5] + idaVuelta[0]).split(" ")[1]) + " hs";
			$(this).find(".arrivalHourInfo").append('<p>'+ data +'</p>');
			data = parseHour(localStorage.getItem(parameters[6] + idaVuelta[0]).split(" ")[1]) + " hs";
			$(this).find(".departureHourInfo").append('<p>'+ data +'</p>');
		});
		if(localStorage.getItem("idaYvuelta") == "true"){
			$("#vuelosDivVuelta").load("FlightsTemplate.html", function(){
				// Aca poner el logo no el id de aerolinea
				var data = localStorage.getItem(parameters[0] + idaVuelta[1]);
				$(this).find(".airportLogo").attr("src",data);
				$("#titleVuelta").append( "<h4>Vuelta</h4>");
				data = localStorage.getItem(parameters[1] + idaVuelta[1]) + " hs";
				$(this).find(".duration").append('<p>'+ data +'</p>');
				data = parseInt(localStorage.getItem(parameters[2] + idaVuelta[1]));
				$(this).find(".price").append('<p>$'+ data +'</p>');
				data = parseHour(localStorage.getItem(parameters[5] + idaVuelta[1]).split(" ")[1]) + " hs";
				$(this).find(".arrivalHourInfo").append('<p>'+ data +'</p>');
				data = parseHour(localStorage.getItem(parameters[6] + idaVuelta[1]).split(" ")[1]) + " hs";
				$(this).find(".departureHourInfo").append('<p>'+ data +'</p>');
			});
		}
});

function parseHour(hour){
	var h = hour.split(":");
	return h[0]+":"+h[1];
}
