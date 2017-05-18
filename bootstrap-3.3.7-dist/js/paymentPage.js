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
  if(num.length == 0){
    errormessage += "Seleccione algun tipo de tarjeta. ";
    inputError("#cardTypeButton");
		ret = false;
  }

  num = $("#cardNumberInput").val();
  if(num.length == 0 || num.search(/[^0-9]/) != -1 || num.length != 16){
    errormessage += "Numero de tarjeta incorrecto. ";
    inputError("#cardNumberInput");
		ret = false;
  }
  num = $("#monthButton").val();
  if(num.length == 0){
    errormessage += "Seleccione el mes de vencimiento. ";
    inputError("#monthButton");
		ret = false;
  }
	num = $("#yearButton").val();
  if(num.length == 0){
    errormessage += "Seleccione el año de vencimiento. ";
    inputError("#yearButton");
		ret = false;
  }
  num = $("#cvvInput").val();
  if(num.length == 0 || num.search(/[^0-9]/) != -1 || num.length != 3){
    errormessage += "Codigo de seguridad incorrecto. ";
    inputError("#cvvInput");
		ret = false;
  }
  num = $("#nameInput").val();
  if(num.length == 0 ){
    errormessage += "Nombre invalido.";
    inputError("#nameInput");
		ret = false;
  } else{
    num = num.split(" ");
    if(num.length > 2){
      errormessage += "Ingrese su primer nombre y primer apellido. ";
      inputError("#nameInput");
			ret = false;
    }else if(num[0].search(/[^A-Za-z]/) != -1 || num[1].search(/[^A-Za-z]/) != -1){
      errormessage += "Nombre invalido. ";
      inputError("#nameInput");
			ret = false;
    }
  }
  num = $("#cityInput").val();
  if(num.length == 0 || num.search(/[^A-Za-z\s]/) != -1 ){
    errormessage += "Ciudad invalida. ";
    inputError("#cityInput");
		ret = false;
  }
  num = $("#addressInput").val();
  if(num.length != 0){
    num = num.split(" ");
    for(var i = 0; i < num.length ; i++){
      if(i == num.length-1){
        if(num[i].search(/[^0-9]/) != -1){
          errormessage += "Direccion invalida.";
          inputError("#addressInput");
					ret = false;
        }
      }else{
        if(num[i].search(/[^A-Za-z]/) != -1 ){
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
  num = $("#postalCodeInput").val();
  if(num.length == 0 || num.search(/[^0-9\s]/) != -1 || num.length != 4){
    errormessage += "Direccion invalida.";
    inputError("#postalCodeInput");
		ret = false;
  }

  num = $("#countryInput").val();
  if(num.length == 0 || num.search(/[^A-Za-z\s]/) != -1 ){
    errormessage += "Pais invalido. ";
    inputError("#countryInput");
		ret = false;
  }
  num = $("#phonenumberInput").val();
  if(num.length == 0 || num.search(/[^0-9]/) != -1 || num.length != 8){
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
