$(document).ready(function(){
	$('.spinUp').click(function(){
		var target = $(this).data("target");
		var val = parseInt(document.getElementById(target).value) + 1;
		if (val > 4){
			val = 4
		}
		document.getElementById(target).value=val ;
	});
});

$(document).ready(function(){
	$('.spinDown').click(function(){
		var target = $(this).data("target");
		var val = parseInt(document.getElementById(target).value) - 1;
		if (val < 0){
			val = 0
		}
		document.getElementById(target).value=val ;
	});
});

$(document).ready(function(){
	$("#idaYvuelta").change(function(){
		$( "#fechaLlegada" ).css("display", "block");
		$( "#fechaLlegada" ).hide().fadeIn(1000);
	});
});

$(document).ready(function(){
	$("#ida").change(function(){
		$( "#fechaLlegada" ).fadeOut(function() {$(this).css("display", "none");});
	});
});

$(function() {
  // This will select everything with the class smoothScroll
  // This should prevent problems with carousel, scrollspy, etc...
  $('.smoothScroll').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000); // The number here represents the speed of the scroll in milliseconds
        return false;
      }
    }
  });
});

var errormessage = "";

$(document).ready(function(){
	$("#searchFly").click(function(){
		errormessage = "";
		var oriVal = validateOrigenDestino($("#origen").val(),"#origen");
		var desVal = validateOrigenDestino($("#destino").val(),"#destino");
		var depDateVal = validateDepartureDate();
		var arrDateVal = validateArrivalDate();
		var passVal = validatePassengers();
		if(oriVal && desVal && depDateVal && arrDateVal && passVal){
			var oriID = null;
			var desID = null;
			for(i=0; i<cities.length-1; i++){
				if($("#origen").val() == cities[i].name){
					oriID = cities[i].id;
				}
				if($("#destino").val() == cities[i].name){
					desID = cities[i].id;
				}
			}
			var parameters = "adultos=" + $("#adultCount").val() +"&ninos=" +$("#ninosCount").val() + "&ori=" +  oriID + "&des=" + desID + "&fechaida=" + $("#departureDate").val().toString();
			if ($("#arrivalDate").css("display") != "block")
				parameters = parameters + "&llegada=" + ($("#arrivalDate").val()).split("-")[0];
			document.location.href = "ChoosePage.html?"+ parameters;
		} else {
			if(oriVal == 0) {
				errormessage += "Elija un aeropuerto de origen. "
			}
			if(desVal == 0) {
				errormessage += "Elija un aeropuerto de destino. "
			}
			if(depDateVal == 0) {
				errormessage += "Elija una fecha valida de partida. "
			}
			if(arrDateVal == 0) {
				errormessage += "Elija una fecha valida de llegada. "
			}
			if(passVal == 0) {
				errormessage += "Elija una cantidad valida de pasajeros. "
			}
			$("#errorBanner").html("<div class=\"alert alert-danger alert-dismissable\">\
          		<a href=\"#\" class=\"close\" data-dismiss=\"alert\" aria-label=\"close\">×</a>\
          		<strong>Error:</strong> " + errormessage +
        		"</div>");
		}
	});
});

function validateOrigenDestino(val,target){
	if($.inArray(val,optionNames) < 0){
		inputError(target);
		return false;
	}
	return true;
}

function validateDepartureDate(){
	depDate = ($("#departureDate").val()).split("-");
 	depDate = new Date(parseInt(depDate[0]),parseInt(depDate[1])-1,parseInt(depDate[2]));
	actualDate = new Date();
	if (!(!(depDate.getFullYear() - actualDate.getFullYear() <= 0 && depDate.getMonth() - actualDate.getMonth() <= 0) || depDate.getDate() - actualDate.getDate() >= 2) || isNaN(depDate.getTime())){
		inputError("#departureDate");
		return false;
	}
	return true;
}

function validateArrivalDate(){
	if ($("#arrivalDate").css("display") == "block")
		return true
	arrDate = ($("#arrivalDate").val()).split("-");
 	arrDate = new Date(parseInt(arrDate[0]),parseInt(arrDate[1])-1,parseInt(arrDate[2]));
 	depDate = ($("#departureDate").val()).split("-");
 	depDate = new Date(parseInt(depDate[0]),parseInt(depDate[1])-1,parseInt(depDate[2]));
 	if (isNaN(arrDate.getTime()) || !(!(arrDate.getFullYear() - depDate.getFullYear() <= 0 && arrDate.getMonth() - depDate.getMonth() <= 0) || arrDate.getDate() - depDate.getDate() >= 2)){
		inputError("#arrivalDate");
		return false;
	}
	return true;
}

function validatePassengers(){
	if(parseInt($("#adultCount").val()) + parseInt($("#ninosCount").val()) == 0){
		inputError(".psgrCount");
		return false
	}
	return true;
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

$(document).ready(function() {
	$(".psgrCount").focusin(function() {
		$(".psgrCount").css("border", "");
		$(".psgrCount").css("background-color", "");
	});
});

// passenger count spinners
$(document).ready(function(){
  $('#adultCountUp').on('click', function() {
    if(parseInt($('#adultCount').val(), 10) < $('#adultCount').attr('max') ) {
          $('#adultCount').val( parseInt($('#adultCount').val(), 10) + 1);
        }
  });
  $('#adultCountDown').on('click', function() {
    if(parseInt($('#adultCount').val(), 10) > $('#adultCount').attr('min')) {
          $('#adultCount').val( parseInt($('#adultCount').val(), 10) - 1);
        }
  });
  $('#ninosCountUp').on('click', function() {
    if(parseInt($('#ninosCount').val(), 10) < $('#ninosCount').attr('max')) {
          $('#ninosCount').val( parseInt($('#ninosCount').val(), 10) + 1);
        }
  });
  $('#ninosCountDown').on('click', function() {
    if(parseInt($('#ninosCount').val(), 10) > $('#ninosCount').attr('min')) {
          $('#ninosCount').val( parseInt($('#ninosCount').val(), 10) - 1);
        }
  });
});

// Manejo de la API de vuelos
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
          		}
          }
        });
});

airports = [];
optionNames = [];
airportPage = 1;
$(document).ready(function retrieveAirports(){
	$.ajax({
          url: "http://hci.it.itba.edu.ar/v1/api/geo.groovy?method=getairports&page=" + airportPage,
          dataType: "jsonp",
          success: function(data){
          		$.each(data.airports, function(index, value) {
	        		airports.push(value);
	        		optionNames.push(value.description);
        		});
          		if(airports.length < data.total){
          			airportPage += 1;
          			retrieveAirports();
          		}
          }
        });
});

$(document).ready(function() {
	/*$(".placeInput").autocomplete({
		minLength:1,
		source: cityNames
	});*/
	new Awesomplete(document.getElementById("origen"), {
		list: optionNames,
		minChars: 3,
		autoFirst: true}
	);

	new Awesomplete(document.getElementById("destino"), {
		list: optionNames,
		minChars: 3,
		autoFirst: true}
	);
});

$(document).ready(function() {
	$(".placeInput").on("change paste keyup click", function(){
		if($(this).val() != ''){
			$($(this).data("target")).css("display","block");
		} else {
			$($(this).data("target")).css("display","none");
		}
	});
});

$(document).ready(function() {
	$(".searchclear").click(function(){
		$($(this).data("target")).val('');
		$(this).css("display","none");
	});
});
	
$(document).ready(function retrieveDeals() {
	$.ajax({
		url: "http://hci.it.itba.edu.ar/v1/api/booking.groovy?method=getlastminuteflightdeals&from=BUE",
		dataType: "jsonp",
		success: function(data){
			var counter;

			$("#promos").append("<div class=\"row menuOptions\">");

			$.each(data.deals, function(index,value) {

				if(index == 0) {
					$("#promos").append("<div class=\"row menuOptions\">"); // la primera row estaba asi 
				} else if(index % 3 == 0) {
					$("#promos").append("<div class=\"row\">");
				}

				$("#promos").append("<div class=\"col-md-4\">\
					<div class=\"thumbnail\">\
					<a href=\"./images/" + (value.city.name.split(","))[0] + ".jpg\" target=\"_blank\">\
					<img src=\"./images/" + (value.city.name.split(","))[0] + ".jpg\" alt=" + (value.city.name.split(","))[0] + " style=\"width:100%\">\
					 <div class=\"caption\" id=\"promo1\">"
					+ (value.city.name.split(","))[0] +
					"<span class=\"precio\"> $" + value.price + "</span>\
					</div>\
					</div>\
					</a>\
					</div>\
					</div>");

				if(index % 3 == 2) {
					$("#promos").append("</div>");
				}

				counter = index;
			});

			if(counter % 3 != 2) {
				$("#promos").append("</div>");
			}
		}
	});
});
