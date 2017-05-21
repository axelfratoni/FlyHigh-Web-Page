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
				$(this).find(".oriHora").find("p").text(data);
				data = parseHour(flight.outbound_routes[0].segments[0].arrival.date.split(" ")[1]) + " hs";
				$(this).find(".desHora").find("p").text(data);
				data = flight.outbound_routes[0].segments[0].departure.airport.id;
				$(this).find(".oriID").find("p").text(data);
				data = flight.outbound_routes[0].segments[0].arrival.airport.id;
				$(this).find(".desID").find("p").text(data);
				data = flight.outbound_routes[0].segments[0].departure.airport.description.split(",");
				$(this).find(".ori").find("p").text(data[1] + ", " + data[2]);
				data = flight.outbound_routes[0].segments[0].arrival.airport.description.split(",");
				$(this).find(".des").find("p").text(data[1] + ", " + data[2]);
				data =  flight.outbound_routes[0].segments[0].duration + " hs";
				$(this).find(".duration").find("span").text(data);
				data = "Nro:" + flight.outbound_routes[0].segments[0].number;
				$(this).find(".fliNum").find("p").text(data);
				data = "U$D " + parseInt(flight.price.total.total);
				$(this).find(".price").find("p").text(data);
				data = "Adulto: $" + parseInt(flight.price.adults.base_fare);
				$(this).find(".pAdulto").text(data);
				if(getParameterByName('ninos') > 0){
					data = data = "Nino: $" + parseInt(flight.price.children.base_fare);
					$(this).find(".pNino").text(data);
				}
				data = "Cargo: $" + parseInt(flight.price.total.charges);
				$(this).find(".pCargo").text(data);
				data = "Impuestos: $" + parseInt(flight.price.total.taxes);
				$(this).find(".pImpuestos").text(data);
				$(this).find(".buy").append(function(){
					if (getParameterByName('llegada') == null){
						return $('<button class="btn btn-primary" data-target="'+ i +'">Comprar</button>').click(handleBuy);
					}
					return $('<button class="btn btn-primary" data-target="'+ i +'">Comprar</button>').click(handleVuelta);
				});
				/*var data = parseHour(flight.outbound_routes[0].segments[0].departure.date.split(" ")[1]) + " hs";
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
					if (getParameterByName('llegada') == null){
						return $('<button class="btn btn-warning" data-target="'+ i +'">Comprar</button>').click(handleBuy);
					}
					return $('<button class="btn btn-warning" data-target="'+ i +'">Elegir y buscar vuelta</button>').click(handleVuelta);
				});*/
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

parameters = ["airline" , "duration" , "price", "depAirp", "arrAirp", "arrDate", "depDate"];

function saveData(flight, viaje){
	var airline = flight.outbound_routes[0].segments[0].airline.id;
	var duration = flight.outbound_routes[0].duration;
	var price = flight.price.total.total;
	var depAirp = flight.outbound_routes[0].segments[0].departure.airport.id;
	var arrAirp = flight.outbound_routes[0].segments[0].arrival.airport.id;
	var arrDate = flight.outbound_routes[0].segments[0].arrival.date;
	var depDate = flight.outbound_routes[0].segments[0].departure.date;
	localStorage.setItem(parameters[0] + viaje , airline);
	localStorage.setItem(parameters[1] + viaje , duration);
	localStorage.setItem(parameters[2] + viaje , price );
	localStorage.setItem(parameters[3] + viaje , depAirp);
	localStorage.setItem(parameters[4] + viaje , arrAirp);
	localStorage.setItem(parameters[5] + viaje , arrDate);
	localStorage.setItem(parameters[6] + viaje , depDate);
}

function handleBuy(){
    var flight = flights[$(this).data("target")];
		if(localStorage.getItem('idaYvuelta') == "true"){
			console.log("Vuelta");
			saveData(flight, "Vuelta");
		}else{
			console.log("Ida");
			saveData(flight, "Ida");
		}
		document.location.href = "InfoPage.html?adultos=" + getParameterByName('adultos') + "&ninos=" + getParameterByName('ninos') ;
}

function handleVuelta(){
	var flight = flights[$(this).data("target")];
	saveData(flight, "Ida");
	var arrDate = getParameterByName('llegada');
	var adultCount = getParameterByName('adultos');
	var ninosCount = getParameterByName('ninos');
	var infantCount = 0;
	var oriID = getParameterByName('ori');
	var desID = getParameterByName('des');
	var parameters = "adultos=" + adultCount +"&ninos=" + ninosCount + "&ori=" +  desID + "&des=" + oriID + "&fechaida=" + arrDate;
	if(getParameterByName('oriAe') != null)
		parameters = parameters + '&desAe=' +  getParameterByName('oriAe');
	if(getParameterByName('desAe') != null)
		parameters = parameters + '&oriAe=' +  getParameterByName('desAe');
	document.location.href = "ChoosePage.html?"+ parameters;
}

$(document).ready(function(){
	var depDate = getParameterByName('fechaida');
	depDate = parseDate(depDate);
	var arrDate = getParameterByName('llegada');
	if(arrDate != null)
		arrDate = parseDate(arrDate);
	console.log(depDate + "  " + arrDate);
	var adultCount = getParameterByName('adultos');
	var ninosCount = getParameterByName('ninos');
	var infantCount = getParameterByName('infant');
	var oriID = getParameterByName('ori');
	var desID = getParameterByName('des');

	console.log("http://hci.it.itba.edu.ar/v1/api/booking.groovy?method=getonewayflights&from=" + oriID + "&to=" + desID + "&dep_date=" + depDate + "&adults=" + adultCount + "&children=" + ninosCount + "&infants=0");
	$.ajax({
		url: "http://hci.it.itba.edu.ar/v1/api/booking.groovy?method=getonewayflights&from=" + oriID + "&to=" + desID + "&dep_date=" + depDate + "&adults=" + adultCount + "&children=" + ninosCount + "&infants=" + 0,
		dataType: "jsonp",
		success: function(data){
			$(".loader").css("display","none");
			$.each(data.flights, function(index,value){
				depAeId = value.outbound_routes[0].segments[0].departure.airport.id;
				arrAeId = value.outbound_routes[0].segments[0].arrival.airport.id;
				oriAe = getParameterByName('oriAe');
				desAe = getParameterByName('desAe');
				if((oriAe == null || oriAe == depAeId) && (desAe == null || desAe == arrAeId))
					flights.push(value);
			});
			loadFlights();
		}
	});
	console.log(localStorage.getItem('idaYvuelta'));
	console.log(getParameterByName('llegada'));

	if(getParameterByName('llegada') == null && localStorage.getItem("idaYvuelta") != "true"){
		console.log("xD");
		localStorage.setItem('idaYvuelta', false);
	}else{
		console.log(":p");
		localStorage.setItem('idaYvuelta', true);
	}
	console.log(localStorage.getItem("idaYvuelta"));
});

function parseDate(date){
	var aux = date.split("/");
	return aux[2] + "-" + aux[1] + "-" + aux[0];
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
