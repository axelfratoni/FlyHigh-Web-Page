$(function(){
	 $(".dropdown-menu li a").click(function(){
		 $("#documentDropDown").text($(this).text());
		 $("#documentDropDown").val($(this).text());
	});
});

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
		$( "#fechas" ).append($('<div class="form-group row" id="fechaLlegada"><label class="col-md-3 col-form-label" for="arrivalDate"><h5>Fecha de Llegada:</h5></label><div class="col-md-4"><input class="form-control" type="date" id="arrivalDate" placeholder="Ingrese su fecha de llegada" ></div></div>').hide().fadeIn(1000));
	});
});

$(document).ready(function(){
	$("#ida").change(function(){
		$( "#fechaLlegada" ).fadeOut(function() {$(this).remove();});
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

$(document).ready(function(){
	$("#searchFly").click(function(){
		if(validateDepartureDate() && validatePassengers() && 
			validateOrigenDestino($("#origen").val(),"#origen") && 
			validateOrigenDestino($("#destino").val(),"#destino"))
		{			
			retrieveFlights();
		}
	});
});

function validateOrigenDestino(val,target){
	if($.inArray(val,cityNames) < 0){
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

function validatePassengers(){
	if(parseInt($("#adultCount").val()) + parseInt($("#ninosCount").val()) == 0){
		return false
	} 
	return true;
}


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


// Manejo de la API de vuelos
cities = [];
cityNames = [];
cityPage = 1;
$(document).ready(function retrieveCities(){	
	$.ajax({
          url: "http://hci.it.itba.edu.ar/v1/api/geo.groovy?method=getcities&page=" + cityPage,
          dataType: "jsonp",
          success: function(data){
          		$.each(data.cities, function(index, value) {
	        		cities.push(value);
	        		cityNames.push(value.name);
        		});          	
          		if(cities.length < data.total){
          			cityPage += 1;
          			retrieveCities();
          		} 
          }    
        });    
});

airports = [];
airportNames = [];
airportPage = 1;
$(document).ready(function retrieveAirports(){	
	$.ajax({
          url: "http://hci.it.itba.edu.ar/v1/api/geo.groovy?method=getairports&page=" + airportPage,
          dataType: "jsonp",
          success: function(data){
          		$.each(data.airports, function(index, value) {
	        		airports.push(value);
	        		airportNames.push(value.description);
        		});        	
          		if(airports.length < data.total){
          			airportPage += 1;
          			retrieveAirports();
          		} 
          }    
        });    
});

$(document).ready(function() {
	$(".placeInput").autocomplete({
		minLength:1,
		source: cityNames
	});
});

deals = [];
$(document).ready(function retrieveDeals(){
	$.ajax({
		url: "http://hci.it.itba.edu.ar/v1/api/booking.groovy?method=getlastminuteflightdeals&from=BUE",
		dataType: "jsonp",
		success: function(data){
			$.each(data.deals, function(index,value){
				deals.push(value);
			});
			deals = shuffleArray(deals);	
			for (var i = 1; i < 7; i ++){
				$("#promo" + i).append((deals[i-1].city.name.split(","))[0]);
				$("#promo" + i).append('<span id="precio' + i + '">   $' + deals[i-1].price + '</span>');
				$("#precio" + i).css("color", "green");
				$("#precio" + i).css("font-weight", "bold");
			}		
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

flights = [];
function retrieveFlights(){
	var depDate = $("#departureDate").val();
	var adultCount = $("#adultCount").val();
	var ninosCount = $("#ninosCount").val();
	var infantCount = 0;
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
	console.log("http://hci.it.itba.edu.ar/v1/api/booking.groovy?method=getonewayflights&from=" + oriID + "&to=" + desID + "&dep_date=" + depDate + "&adults=" + adultCount + "&children=" + ninosCount + "&infants=" + infantCount);
	$.ajax({
		url: "http://hci.it.itba.edu.ar/v1/api/booking.groovy?method=getonewayflights&from=" + oriID + "&to=" + desID + "&dep_date=" + depDate + "&adults=" + adultCount + "&children=" + ninosCount + "&infants=" + infantCount,
		dataType: "jsonp",
		success: function(data){
			$.each(data.flights, function(index,value){
				flights.push(value);
			});
			for (var i = 0; i < flights.length-1; i++) {
				console.log("Vuelo " + i);
				console.log("Airline: " + flights[i].outbound_routes);
				console.log("Duration: " + String(flights[i].outbound_routes.duration));
				console.log("Precio: $" + flights[i].price.adults.base_fare);
				console.log(" ");
			}
			console.log("asd");
		}
	});
		
}