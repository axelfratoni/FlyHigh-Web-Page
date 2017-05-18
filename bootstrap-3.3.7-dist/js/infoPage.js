parametersLocalStorage = ["Name" , "LastName", "DocumentType", "Document", "BirthDate", "male", "female"];
parametersId = ["nameInput" , "lastNameInput", "documentDropDown", "documentInput", "birthDateInput", "male", "female", "dropDownDiv", "dropDown"];
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


function handlePrevious(){
	document.location.href = "ChoosePage.html";
}



function handleNext(){

	if(validateForm() && typeof(Storage) !== "undefined"){
		console.log($("#birthDateInputAdult1").val());
		var ninosCount = getParameterByName('ninos');
		var adultosCount = getParameterByName('adultos');
		for(var i = 1; i <= adultosCount; i++){
			localStorage.setItem(adult[0] + i + parametersLocalStorage[0], $("#" + parametersId[0] + adult[1] + i).val());
			localStorage.setItem(adult[0] + i + parametersLocalStorage[1], $("#" + parametersId[1] + adult[1] + i).val());
			localStorage.setItem(adult[0] + i + parametersLocalStorage[2], $("#" + parametersId[2] + adult[1] + i).val());
			localStorage.setItem(adult[0] + i + parametersLocalStorage[3], $("#" + parametersId[3] + adult[1] + i).val());
			localStorage.setItem(adult[0] + i + parametersLocalStorage[4], $("#" + parametersId[4] + adult[1] + i).val());
			localStorage.setItem(adult[0] + i + parametersLocalStorage[5], $("#" + parametersId[5] + adult[1] + i).val());
			localStorage.setItem(adult[0] + i + parametersLocalStorage[6], $("#" + parametersId[6] + adult[1] + i).val());
		}
		for(var i = 1; i <= ninosCount; i++){
			localStorage.setItem(kid[0] + i + parametersLocalStorage[0], $("#" + parametersId[0] + kid[1] + i).val());
			localStorage.setItem(kid[0] + i + parametersLocalStorage[1], $("#" + parametersId[1] + kid[1] + i).val());
			localStorage.setItem(kid[0] + i + parametersLocalStorage[2], $("#" + parametersId[2] + kid[1] + i).val());
			localStorage.setItem(kid[0] + i + parametersLocalStorage[3], $("#" + parametersId[3] + kid[1] + i).val());
			localStorage.setItem(kid[0] + i + parametersLocalStorage[4], $("#" + parametersId[4] + kid[1] + i).val());
			localStorage.setItem(kid[0] + i + parametersLocalStorage[5], $("#" + parametersId[5] + kid[1] + i).val());
			localStorage.setItem(kid[0] + i + parametersLocalStorage[6], $("#" + parametersId[6] + kid[1] + i).val());
		}
		localStorage.setItem("adultosCount", adultosCount);
		localStorage.setItem("ninosCount", ninosCount);
		document.location.href = "PaymentPage.html";
	}
};

function validateForm(){
	return true;
}

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
		console.log($("#dropDownAdult1"));

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
		tmpl.querySelector("#" + parametersId[5]).id = parametersId[5] + adult[1] + i;
		tmpl.querySelector("#" + parametersId[6]).id = parametersId[6] + adult[1] + i;
		tmpl.querySelector("#" + parametersId[7]).id = parametersId[8] + adult[1] + i;
		personsList.appendChild(tmpl);
	}
	for(var i = 1; i <= ninosCount; i++){
		var tmpl = document.getElementById('personTemplate').content.cloneNode(true);
		tmpl.querySelector('#title').innerText = "Datos del niño " + i;
		tmpl.querySelector("#" + parametersId[0]).id = parametersId[0] + kid[1] + i;
		tmpl.querySelector("#" + parametersId[1]).id = parametersId[1] + kid[1] + i;
		tmpl.querySelector("#" + parametersId[3]).id = parametersId[3] + kid[1] + i;
		tmpl.querySelector("#" + parametersId[4]).id = parametersId[4] + kid[1] + i;
		tmpl.querySelector("#" + parametersId[5]).id = parametersId[5] + kid[1] + i;
		tmpl.querySelector("#" + parametersId[6]).id = parametersId[6] + kid[1] + i;
		tmpl.querySelector("#" + parametersId[7]).id = parametersId[8] + kid[1] + i;
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


