flights = [];

function loadFlights(){
	for(var i = 0; i < flights.length-1; i++){
		var flight = flights[i];
		var dur = joinHour(flight.outbound_routes[0].segments[0].duration);
		var price = flight.price.total.total;
		var airID = flight.outbound_routes[0].segments[0].airline.id;
		$("#vuelosDiv").append('<div class="vuelos" id="vuelo' + i + '" data-dur="' + dur +'" data-price="'+ price +'" data-air="'+ airID +'"><div id="template' + i + '"></div></div>');
		(function(i,flight){
			$("#template" + i).load("FlightsTemplate.html", function(){
				var data = parseHour(flight.outbound_routes[0].segments[0].departure.date.split(" ")[1]) + " hs";
				$(this).find(".departureHourInfo").append('<p>'+ data +'</p>');
				data = parseHour(flight.outbound_routes[0].segments[0].arrival.date.split(" ")[1]) + " hs";
				$(this).find(".arrivalHourInfo").append('<p>'+ data +'</p>');
				data = flight.outbound_routes[0].segments[0].duration + " hs";
				$(this).find(".duration").append('<p>'+ data +'</p>');
				data = parseInt(flight.price.total.total);
				$(this).find(".price").append('<p>$'+ data +'</p>');
				data = flight.outbound_routes[0].segments[0].airline.id;
				$(this).find(".airportLogo").attr("src",data);
				$(this).find(".buy").append(function(){
					if (getParameterByName('llegada') == null)
						return $('<button class="btn btn-warning" data-target="'+ i +'">Comprar</button>').click(handleBuy);
					return $('<button class="btn btn-warning" data-target="'+ i +'">Elegir y buscar vuelta</button>').click(handleVuelta);
				});  
			});
		})(i,flight);

	}
};

function joinHour(hour){
	var h = hour.split(":");
	return h[0] + h[1];
}

function parseHour(hour){
	var h = hour.split(":");
	return h[0]+":"+h[1];
}

$(document).ready(function(){
	$("#minDur").click(function(){
		$("#vuelosDiv .vuelos").sort(function(a,b){
			return $(a).data("dur") > $(b).data("dur");
		}).appendTo("#vuelosDiv");
		$("#orderBy").find("p").text("Menor duración");
	});
});

$(document).ready(function(){
	$("#prMin").click(function(){
		$("#vuelosDiv .vuelos").sort(function(a,b){
			return $(a).data("price") > $(b).data("price");
		}).appendTo("#vuelosDiv");
		$("#orderBy").find("p").text("Menor precio");
	});
});

$(document).ready(function(){
	$("#airID").click(function(){
		$("#vuelosDiv .vuelos").sort(function(a,b){
			return $(a).data("air") > $(b).data("air");
		}).appendTo("#vuelosDiv");
		$("#orderBy").find("p").text("Aerolínea");
	});
});

function handleBuy(){
	var flight = flights[$(this).data("target")];
	console.log(parseInt(flight.price.total.total));
}

function handleVuelta(){
	var arrDate = getParameterByName('llegada');
	var adultCount = getParameterByName('adultos');
	var ninosCount = getParameterByName('ninos');
	var infantCount = getParameterByName('infant');;
	var oriID = getParameterByName('ori');
	var desID = getParameterByName('des');
	var parameters = "adultos=" + adultCount +"&ninos=" + ninosCount + "&infant=" + infantCount  + "&ori=" +  desID + "&des=" + oriID + "&fechaida=" + arrDate;
	document.location.href = "ChoosePage.html?"+ parameters;
}

$(document).ready(function(){
	var depDate = getParameterByName('fechaida');
	var arrDate = getParameterByName('llegada');
	var adultCount = getParameterByName('adultos');
	var ninosCount = getParameterByName('ninos');
	var infantCount = getParameterByName('infant');
	var oriID = getParameterByName('ori');
	var desID = getParameterByName('des');

	console.log("http://hci.it.itba.edu.ar/v1/api/booking.groovy?method=getonewayflights&from=" + oriID + "&to=" + desID + "&dep_date=" + depDate + "&adults=" + adultCount + "&children=" + ninosCount + "&infants=" + infantCount);
	$.ajax({
		url: "http://hci.it.itba.edu.ar/v1/api/booking.groovy?method=getonewayflights&from=" + oriID + "&to=" + desID + "&dep_date=" + depDate + "&adults=" + adultCount + "&children=" + ninosCount + "&infants=" + infantCount,
		dataType: "jsonp",
		success: function(data){
			$(".loader").css("display","none");
			$.each(data.flights, function(index,value){
				flights.push(value);
			});/*
			for (var i = 0; i < flights.length-1; i++) {
				console.log("Vuelo " + i);
				console.log("Airline: " + flights[i].outbound_routes[0].segments[0].airline.id);
				console.log("Duration: " + String(flights[i].outbound_routes[0].duration));
				console.log("Precio: $" + flights[i].price.adults.base_fare);
				console.log(" ");
			}*/
			loadFlights();
		}
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
