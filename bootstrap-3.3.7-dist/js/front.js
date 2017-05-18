
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
			var parameters = "adultos=" + $("#adultCount").val() +"&ninos=" +$("#ninosCount").val()+ "&infant=" + $("#infaCount").val() + "&ori=" +  oriID + "&des=" + desID + "&fechaida=" + $("#departureDate").val().toString();
			if ($("#idaYvuelta").is(':checked'))
				parameters = parameters + "&llegada=" + ($("#arrivalDate").val()).toString();
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
	if ($("#ida").is(':checked'))
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
  $('#infaCountUp').on('click', function() {
    if(parseInt($('#infaCount').val(), 10) < $('#infaCount').attr('max')) {
          $('#infaCount').val( parseInt($('#infaCount').val(), 10) + 1);
        }
  });
  $('#infaCountDown').on('click', function() {
    if(parseInt($('#infaCount').val(), 10) > $('#infaCount').attr('min')) {
          $('#infaCount').val( parseInt($('#infaCount').val(), 10) - 1);
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
	
deals = []
dealsReady = false;
dealIndex = 2;
$(document).ready(function retrieveDeals() {
	$.ajax({
		url: "http://hci.it.itba.edu.ar/v1/api/booking.groovy?method=getlastminuteflightdeals&from=BUE",
		dataType: "jsonp",
		success: function(data){
			
			$(".loader").css("display","none");
			$.each(data.deals, function(index,value){
				deals.push(value);
			});
			deals = shuffleArray(deals);

			for(var i=1; i<7; i++){
					$("#promo"+i).css("display","block");
					var data = "./images/" + deals[i-1].city.name.split(",")[0] + ".jpg";
					$("#promo"+i).find("a").attr("href", data);
					$("#promo"+i).find("img").attr("src", data);
					data = deals[i-1].city.name.split(",")[0];
					$("#promo"+i).find("p").text(data);
					data = deals[i-1].price;
					$("#promo"+i).find("p").append('<span class="dealPrice">   $' + deals[i-1].price + '</span>');
			}
			$(".dealPrice").css("color", "green");
			$(".dealPrice").css("font-weight", "bold");
			dealsReady = true;
		}
	});
});

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

$(document).ready(function(){
	setInterval(function(){
		if(dealsReady){
			if(dealIndex > deals.length - 6){
				dealIndex = 1;
			}

			for(var i=0; i<6; i++){
				a = ((dealIndex -1 + i) % deals.length) + 1;
				(function(a,i){
					$("#promo"+(i+1)).fadeOut(function(){
						var data = "./images/" + deals[a-1].city.name.split(",")[0] + ".jpg";
						$("#promo"+(i+1)).find("a").attr("href", data);
						$("#promo"+(i+1)).find("img").attr("src", data);
						data = deals[a-1].city.name.split(",")[0];
						$("#promo"+(i+1)).find("p").text(data);
						data = deals[a-1].price;
						$("#promo"+(i+1)).find("p").append('<span class="dealPrice">   $' + deals[a-1].price + '</span>');
					});
					$("#promo"+(i+2)).fadeOut();
					$("#promo"+(i+1)).fadeIn();
					$(".dealPrice").css("color", "green");
					$(".dealPrice").css("font-weight", "bold");
				})(a,i);
			}
			dealIndex += 1;
		}
	},6000);
});