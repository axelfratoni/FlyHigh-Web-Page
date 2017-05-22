parametersLocalStorage = ["Name" , "LastName", "DocumentType", "Document", "BirthDate"];
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
				data = "Niño: $" + localStorage.getItem(parameters[13] + idaVuelta[0])
				$(this).find(".pNino").text(data);
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
function handlePrevious(){
	var aux = "";
	if(localStorage.getItem("esPromo") == "true"){
		document.location.href = "index.html";
	}
	if(localStorage.getItem("idaYvuelta") == "true"){
		aux = "adultos=" + localStorage.getItem("adultosCount") +"&ninos=" + localStorage.getItem("ninosCount") + "&infant=0&ori=" +  localStorage.getItem("oriVuelta") + "&des=" + localStorage.getItem("desVuelta") + "&fechaida=" + parseDate(localStorage.getItem("depDateVuelta").split(" ")[0]);
	}else{
		aux = "adultos=" + localStorage.getItem("adultosCount") +"&ninos=" + localStorage.getItem("ninosCount") + "&infant=0&ori=" +  localStorage.getItem("oriIda") + "&des=" + localStorage.getItem("desIda") + "&fechaida=" + parseDate(localStorage.getItem("depDateIda").split(" ")[0]);
	}
	document.location.href = "ChoosePage.html?" + aux;
}


function parseDate(num){
	num = num.split("-");
	return num[2] + "/" + num[1] + "/" + num[0];
}

function handleNext(){

	if(validateForm() && typeof(Storage) !== "undefined"){
		var ninosCount = localStorage.getItem("ninosCount");
		var adultosCount = localStorage.getItem("adultosCount");
		for(var i = 1; i <= adultosCount; i++){
			localStorage.setItem(adult[0] + i + parametersLocalStorage[0], $("#" + parametersId[0] + adult[1] + i).val());
			localStorage.setItem(adult[0] + i + parametersLocalStorage[1], $("#" + parametersId[1] + adult[1] + i).val());
			localStorage.setItem(adult[0] + i + parametersLocalStorage[2], $("#" + parametersId[2] + adult[1] + i).val());
			localStorage.setItem(adult[0] + i + parametersLocalStorage[3], $("#" + parametersId[3] + adult[1] + i).val());
			localStorage.setItem(adult[0] + i + parametersLocalStorage[4], $("#" + parametersId[4] + adult[1] + i).val());
		}
		for(var i = 1; i <= ninosCount; i++){
			localStorage.setItem(kid[0] + i + parametersLocalStorage[0], $("#" + parametersId[0] + kid[1] + i).val());
			localStorage.setItem(kid[0] + i + parametersLocalStorage[1], $("#" + parametersId[1] + kid[1] + i).val());
			localStorage.setItem(kid[0] + i + parametersLocalStorage[2], $("#" + parametersId[2] + kid[1] + i).val());
			localStorage.setItem(kid[0] + i + parametersLocalStorage[3], $("#" + parametersId[3] + kid[1] + i).val());
			localStorage.setItem(kid[0] + i + parametersLocalStorage[4], $("#" + parametersId[4] + kid[1] + i).val());
		}
		localStorage.setItem("adultosCount", adultosCount);
		localStorage.setItem("ninosCount", ninosCount);
		document.location.href = "PaymentPage.html";
	}
};

parametersId = ["nameInput" , "lastNameInput", "documentDropDown", "documentInput", "birthDateInput", "dropDownDiv", "dropDown"];
var errormessage = "";

function validateForm(){
	var ninosCount = localStorage.getItem("ninosCount");
	var adultosCount = localStorage.getItem("adultosCount");
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
		if(validateBirthDateInput(num, "adult")){
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
		if(validateBirthDateInput(num, "kid")){
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
	var ninosCount = localStorage.getItem("ninosCount");
	var adultosCount = localStorage.getItem("adultosCount");
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
		return $(`<div class=\"col-md-1 col-md-offset-9\">
                  <button type=\"button\" class=\"btn btn-primary\" id=\"nextButton\">Ir al pago</button>
                </div>`).click(handleNext);
	});
	if(localStorage.getItem("infoPage") == "true"){
		loadData();
	}
});

function loadData(){
	var ninosCount = localStorage.getItem("ninosCount");
	var adultosCount = localStorage.getItem("adultosCount");
	for(var i = 1; i <= adultosCount; i++){
		$("#" + parametersId[0] + adult[1] + i).val(localStorage.getItem(adult[0] + i + parametersLocalStorage[0]));
		$("#" + parametersId[1] + adult[1] + i).val(localStorage.getItem(adult[0] + i + parametersLocalStorage[1]));
		$("#" + parametersId[2] + adult[1] + i).val(localStorage.getItem(adult[0] + i + parametersLocalStorage[2]));
		$("#" + parametersId[3] + adult[1] + i).val(localStorage.getItem(adult[0] + i + parametersLocalStorage[3]));
		$("#" + parametersId[4] + adult[1] + i).val(localStorage.getItem(adult[0] + i + parametersLocalStorage[4]));
	}
	for(var i = 1; i <= ninosCount; i++){
		$("#" + parametersId[0] + kid[1] + i).val(localStorage.getItem(kid[0] + i + parametersLocalStorage[0]));
		$("#" + parametersId[1] + kid[1] + i).val(localStorage.getItem(kid[0] + i + parametersLocalStorage[1]));
		$("#" + parametersId[2] + kid[1] + i).val(localStorage.getItem(kid[0] + i + parametersLocalStorage[2]));
		$("#" + parametersId[3] + kid[1] + i).val(localStorage.getItem(kid[0] + i + parametersLocalStorage[3]));
		$("#" + parametersId[4] + kid[1] + i).val(localStorage.getItem(kid[0] + i + parametersLocalStorage[4]));
	}
}

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
