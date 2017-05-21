parameterssessionStorage = ["Name" , "LastName", "DocumentType", "Document", "BirthDate"];
parametersId = ["nameInput" , "lastNameInput", "documentDropDown", "documentInput", "birthDateInput", "dropDownDiv", "dropDown"];
adult = ["adult" , "Adult"];
kid = ["kid" , "Kid"];

function handleDropDown(){
	 $(".dropdown-menu li a").click(function(){
     var arr = $(this).attr('id').split('-');
     if(arr[0].includes(adult[1])){
	     $("#" + parametersId[2] + adult[1] + arr[1]).val($(this).text());
	     $("#" + parametersId[2] + adult[1] + arr[1]).text($(this).text());
	 }else{
	 	$("#" + parametersId[2] + kid[1]+ arr[1]).val($(this).text());
	    $("#" + parametersId[2] + kid[1]+ arr[1]).text($(this).text());
	 }
	});
};

//             0            1            2         3         4          5           6
parameters = ["airline" , "duration" , "price", "depAirp", "arrAirp", "arrDate", "depDate"];
idaVuelta = ["Ida" , "Vuelta"];
$(document).ready(function(){
	console.log(sessionStorage.getItem("idaYvuelta"));
	console.log(sessionStorage.getItem(parameters[1] + idaVuelta[0]) + " hs");

});

function handlePrevious(){
	document.location.href = "ChoosePage.html";
}

$(document).ready(function() {

  var ticket1 = sessionStorage.getItem("idaTicket");
  $("#vuelosDivIda").append(ticket1);

  if(sessionStorage.getItem("idaYvuelta") == "true"){
    var ticket2 = sessionStorage.getItem("vueltaTicket");
    $("#ticketShowcase").append('<div class="centerText" id="titleVuelta"><h4>Vuelta</h4></div>');
    $("#ticketShowcase").append('<div class="col-md-12 " id="vuelosDivVuelta"></div>');
    $("#vuelosDivVuelta").append(ticket2);
  }

});

function handleNext(){
	if(validateForm() && typeof(Storage) !== "undefined"){
		console.log($("#birthDateInputAdult1").val());
		var ninosCount = getParameterByName('ninos');
		var adultosCount = getParameterByName('adultos');
		for(var i = 1; i <= adultosCount; i++){
			sessionStorage.setItem(adult[0] + i + parameterssessionStorage[0], $("#" + parametersId[0] + adult[1] + i).val());
			sessionStorage.setItem(adult[0] + i + parameterssessionStorage[1], $("#" + parametersId[1] + adult[1] + i).val());
			sessionStorage.setItem(adult[0] + i + parameterssessionStorage[2], $("#" + parametersId[2] + adult[1] + i).val());
			sessionStorage.setItem(adult[0] + i + parameterssessionStorage[3], $("#" + parametersId[3] + adult[1] + i).val());
			sessionStorage.setItem(adult[0] + i + parameterssessionStorage[4], $("#" + parametersId[4] + adult[1] + i).val());
		}
		for(var i = 1; i <= ninosCount; i++){
			sessionStorage.setItem(kid[0] + i + parameterssessionStorage[0], $("#" + parametersId[0] + kid[1] + i).val());
			sessionStorage.setItem(kid[0] + i + parameterssessionStorage[1], $("#" + parametersId[1] + kid[1] + i).val());
			sessionStorage.setItem(kid[0] + i + parameterssessionStorage[2], $("#" + parametersId[2] + kid[1] + i).val());
			sessionStorage.setItem(kid[0] + i + parameterssessionStorage[3], $("#" + parametersId[3] + kid[1] + i).val());
			sessionStorage.setItem(kid[0] + i + parameterssessionStorage[4], $("#" + parametersId[4] + kid[1] + i).val());
		}
		sessionStorage.setItem("adultosCount", adultosCount);
		sessionStorage.setItem("ninosCount", ninosCount);
		document.location.href = "PaymentPage.html";
	}
};
parametersId = ["nameInput" , "lastNameInput", "documentDropDown", "documentInput", "birthDateInput", "dropDownDiv", "dropDown"];
var errormessage = "";

function validateForm(){
	var ninosCount = getParameterByName('ninos');
	var adultosCount = getParameterByName('adultos');
	var ret = true;
	for(var i = 1; i <= adultosCount; i++){
		var num =$("#" + parametersId[0] + adult[1] + i).val();
		if(onlyLetters(num)){
			errormessage += "Nombre del adulto " + i + "es invalido.";
			inputError("#" + parametersId[0] + adult[1] + i);
			ret = false;
		}
		num = $("#" + parametersId[1] + adult[1] + i).val();
		if(onlyLetters(num)){
			errormessage += "Apellido del adulto " + i + "es invalido.";
			inputError("#" + parametersId[1] + adult[1] + i);
			ret = false;
		}
		num = $("#" + parametersId[2] + adult[1] + i).val();
		if(lengthIsZero(num)){
			errormessage += "Seleccione un documento para el adulto  " + i;
			inputError("#" + parametersId[2] + adult[1] + i);
			ret = false;
		}
		num = $("#" + parametersId[3] + adult[1] + i).val();
		if(validatePhoneNumberInput(num)){
			errormessage += "Documento del adulto " + i + " es invalido.";
			inputError("#" + parametersId[3] + adult[1] + i);
			ret = false;
		}
		num = $("#" + parametersId[4] + adult[1] + i).val();
		if(validateBirthDateInput(num)){
			errormessage += "Fecha de nacimiento del adulto " + i + " es invalido.";
			inputError("#" + parametersId[4] + adult[1] + i);
			ret = false;
		}
	}
	for(var i = 1; i <= ninosCount; i++){
		var num =$("#" + parametersId[0] + kid[1] + i).val();
		if(onlyLetters(num)){
			errormessage += "Nombre del niño " + i + "es invalido.";
			inputError("#" + parametersId[0] + kid[1] + i);
			ret = false;
		}
		num = $("#" + parametersId[1] + kid[1] + i).val();
		if(onlyLetters(num)){
			errormessage += "Apellido del niño " + i + "es invalido.";
			inputError("#" + parametersId[1] + kid[1] + i);
			ret = false;
		}
		num = $("#" + parametersId[2] + kid[1] + i).val();
		if(lengthIsZero(num)){
			errormessage += "Seleccione un documento para el niño  " + i;
			inputError("#" + parametersId[2] + kid[1] + i);
			ret = false;
		}
		num = $("#" + parametersId[3] + kid[1] + i).val();
		if(validatePhoneNumberInput(num)){
			errormessage += "Documento del niño " + i + " es invalido.";
			inputError("#" + parametersId[3] + kid[1] + i);
			ret = false;
		}
		num = $("#" + parametersId[4] + kid[1] + i).val();
		if(validateBirthDateInput(num)){
			errormessage += "Fecha de nacimiento del niño " + i + " es invalido.";
			inputError("#" + parametersId[4] + kid[1] + i);
			ret = false;
		}
	}
	if(!ret){
		$("#errorBanner").html("<div class=\"alert alert-danger alert-dismissable\">\
							<a href=\"#\" class=\"close\" data-dismiss=\"alert\" aria-label=\"close\">×</a>\
							<strong>Error:</strong> " + errormessage +
						"</div>");
	}
	return ret;
};

function appendDropDowns(ninosCount, adultosCount){
	for(var i = 1; i <= adultosCount ; i++){
		$("#dropDownAdult" + i).append(function(){
			return $(`<div class="dropdown">
		  <button class="btn btn-default dropdown-toggle myInputs" id="documentDropDownAdult` + i + `" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
		    <span class="caret"></span>
		  </button>
		  <ul class="dropdown-menu" aria-labelledby="dropdownMenu" id="documentDropDown">
		    <li><a href="#" data-value="dniAdult-` + i + `" id="dniAdult-` + i + `">DNI</a></li>
		    <li><a href="#" data-value="pasAdult-` + i + `" id="pasAdult-` + i + `">Pasaporte</a></li>
		  </ul>
		</div>`).click(handleDropDown);
		});
	}
	for(var i = 1; i <= ninosCount ; i++){
		$("#dropDownKid" + i).append(function(){
			return $(`<div class="dropdown">
		  <button class="btn btn-default dropdown-toggle myInputs" id="documentDropDownKid` + i + `" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
		    <span class="caret"></span>
		  </button>
		  <ul class="dropdown-menu" aria-labelledby="dropdownMenu" id="documentDropDown">
		    <li><a href="#" data-value="dniKid-` + i + `" id="dniKid-` + i + `">DNI</a></li>
		    <li><a href="#" data-value="pasKid-` + i + `" id="pasKid-` + i + `">Pasaporte</a></li>
		  </ul>
		</div>`).click(handleDropDown);
		});
	}
}

$(document).ready(function(){
	console.log()
	var ninosCount = getParameterByName('ninos');
	var adultosCount = getParameterByName('adultos');
	var personsList = document.getElementById('personsDiv');
	var last;
	for(var i = 1; i <= adultosCount; i++){
		var tmpl = document.getElementById('personTemplate').content.cloneNode(true);
		tmpl.querySelector('#title').innerText = "Datos del adulto " + i;
		tmpl.querySelector("#" + parametersId[0]).id = parametersId[0] + adult[1] + i;
		tmpl.querySelector("#" + parametersId[1]).id = parametersId[1] + adult[1] + i;
		tmpl.querySelector("#" + parametersId[3]).id = parametersId[3] + adult[1] + i;
		tmpl.querySelector("#" + parametersId[4]).id = parametersId[4] + adult[1] + i;
		tmpl.querySelector("#" + parametersId[5]).id = parametersId[6] + adult[1] + i;
		personsList.appendChild(tmpl);
	}
	for(var i = 1; i <= ninosCount; i++){
		var tmpl = document.getElementById('personTemplate').content.cloneNode(true);
		tmpl.querySelector('#title').innerText = "Datos del niño " + i;
		tmpl.querySelector("#" + parametersId[0]).id = parametersId[0] + kid[1] + i;
		tmpl.querySelector("#" + parametersId[1]).id = parametersId[1] + kid[1] + i;
		tmpl.querySelector("#" + parametersId[3]).id = parametersId[3] + kid[1] + i;
		tmpl.querySelector("#" + parametersId[4]).id = parametersId[4] + kid[1] + i;
		tmpl.querySelector("#" + parametersId[5]).id = parametersId[6] + kid[1] + i;
		personsList.appendChild(tmpl);
	}
	appendDropDowns(ninosCount, adultosCount);
	$("#personsDiv").append(`<div class=\"row menuOptions form-group\" id=\"buttonsRow\"> </div>` );
	$("#buttonsRow").append(function(){
		return $(`<div class=\"col-md-1\">
                  <button type=\"button\" class=\"btn btn-primary\" id=\"backButton\">Volver</button>
                </div>`).click(handlePrevious);
	});
	$("#buttonsRow").append(function(){
		return $(`<div class=\"col-md-1\">
                  <button type=\"button\" class=\"btn btn-primary\" id=\"nextButton\">Ir al pago</button>
                </div>`).click(handleNext);
	});
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

function parseHour(hour){
	var h = hour.split(":");
	return h[0]+":"+h[1];
}
