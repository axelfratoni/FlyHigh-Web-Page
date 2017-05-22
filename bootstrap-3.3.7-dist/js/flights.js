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
				if(localStorage.getItem("ninosCount") > 0){
					data = "Nino: $" + parseInt(flight.price.children.base_fare);
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
			});
		})(i,flight);
	}	
	startPagination();	
};

function joinHour(hour){
	var h = hour.split(":");
	return h[0] + h[1];
}

function parseHour(hour){
	var h = hour.split(":");
	return h[0]+":"+h[1];
}
loaded = 0;
function startPagination(){
	$("#vuelosDiv .vuelos").each(function(){
		$(this).css("display","none");
	});
	loaded = 10;
	loadMore();
}

function loadMore(){
	(function(i){
		$("#vuelosDiv .vuelos").each(function(){
			if(i >= (loaded))
				return;
			$(this).css("display","block");
			i += 1;
		});
	})(0);
}

$(document).ready(function(){
	$("#vuelosDiv").scroll(function(){
		if((100 * loaded) < $("#vuelosDiv").scrollTop()){
			loaded += 10;
			loadMore();
		}
	});
});

$(document).ready(function(){
	$("#minDur").click(function(){
		$("#vuelosDiv .vuelos").sort(function(a,b){
			return $(a).data("dur") > $(b).data("dur");
		}).appendTo("#vuelosDiv");
		$("#orderBy").find("p").text("Menor duración");
		startPagination();
	});
});

$(document).ready(function(){
	$("#prMin").click(function(){
		$("#vuelosDiv .vuelos").sort(function(a,b){
			return $(a).data("price") > $(b).data("price");
		}).appendTo("#vuelosDiv");
		$("#orderBy").find("p").text("Menor precio");
		startPagination();
	});
});

$(document).ready(function(){
	$("#airID").click(function(){
		$("#vuelosDiv .vuelos").sort(function(a,b){
			return $(a).data("air") > $(b).data("air");
		}).appendTo("#vuelosDiv");
		$("#orderBy").find("p").text("Aerolínea");
		startPagination();
	});
});

savingParameters = ["airline" , "duration" , "price", "depAirp", "arrAirp", "arrDate", "depDate", "ori", "des", "arrAirpDesc", "depAirpDesc" , "number", "adultPrice", "kidPrice", "charges", "taxes"];

function saveData(flight, viaje){
	var airline = flight.outbound_routes[0].segments[0].airline.id;
	var duration = flight.outbound_routes[0].duration;
	var price = flight.price.total.total;
	var depAirp = flight.outbound_routes[0].segments[0].departure.airport.id;
	var arrAirp = flight.outbound_routes[0].segments[0].arrival.airport.id;
	var arrDate = flight.outbound_routes[0].segments[0].arrival.date;
	var depDate = flight.outbound_routes[0].segments[0].departure.date;
	var ori = getParameterByName('ori');
	var dest = getParameterByName('des');
	console.log(depAirpDesc + " " + ori);
	debugger;
	var arrAirpDesc = flight.outbound_routes[0].segments[0].arrival.airport.description;
	var depAirpDesc = flight.outbound_routes[0].segments[0].departure.airport.description;
	var number = flight.outbound_routes[0].segments[0].number;
	var adultPrice = parseInt(flight.price.adults.base_fare);
	if(localStorage.getItem("ninosCount") > 0){
		localStorage.setItem(savingParameters[13] + viaje, parseInt(flight.price.children.base_fare));
	}
	var charges = parseInt(flight.price.total.charges);
	var taxes = parseInt(flight.price.total.taxes);
	localStorage.setItem(savingParameters[0] + viaje , airline);
	localStorage.setItem(savingParameters[1] + viaje , duration);
	localStorage.setItem(savingParameters[2] + viaje , price );
	localStorage.setItem(savingParameters[3] + viaje , depAirp);
	localStorage.setItem(savingParameters[4] + viaje , arrAirp);
	localStorage.setItem(savingParameters[5] + viaje , arrDate);
	localStorage.setItem(savingParameters[6] + viaje , depDate);
	localStorage.setItem(savingParameters[7] + viaje , ori);
	localStorage.setItem(savingParameters[8] + viaje , dest);
	localStorage.setItem(savingParameters[9] + viaje , arrAirpDesc);
	localStorage.setItem(savingParameters[10] + viaje , depAirpDesc);
	localStorage.setItem(savingParameters[11] + viaje , number);
	localStorage.setItem(savingParameters[12] + viaje , adultPrice);
	localStorage.setItem(savingParameters[14] + viaje , charges);
	localStorage.setItem(savingParameters[15] + viaje , taxes);



	console.log("DEST: " + dest);
	console.log(localStorage.getItem(savingParameters[8] + viaje) +  " , " + dest);
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
		document.location.href = "InfoPage.html" ;
}

function handleVuelta(){
	var flight = flights[$(this).data("target")];
	saveData(flight, "Ida");
	var arrDate = getParameterByName('llegada');
	var infantCount = 0;
	var oriID = getParameterByName('ori');
	var desID = getParameterByName('des');
	var parameters = "&ori=" +  desID + "&des=" + oriID + "&fechaida=" + arrDate;
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
	var adultCount = localStorage.getItem("adultosCount");
	var ninosCount = localStorage.getItem("ninosCount")
	var infantCount = getParameterByName('infant');
	var oriID = getParameterByName('ori');
	var desID = getParameterByName('des');

	console.log("http://hci.it.itba.edu.ar/v1/api/booking.groovy?method=getonewayflights&from=" + oriID + "&to=" + desID + "&dep_date=" + depDate + "&adults=" + adultCount + "&children=" + ninosCount + "&infants=0");
	$.ajax({
		url: "http://hci.it.itba.edu.ar/v1/api/booking.groovy?method=getonewayflights&from=" + oriID + "&to=" + desID + "&dep_date=" + depDate + "&adults=" + adultCount + "&children=" + ninosCount + "&infants=" + 0,
		dataType: "jsonp",
		timeout: 10000,
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
		},
		error: function(){
          	alert("Algo salió mal. Comprobá tu conexión de internet y recargá la página.");
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
