flights = [];

function loadFlights(){
	for(var i = 0; i < flights.length-1; i++){
		var flight = flights[i];
		$("#vuelosDiv").append('<div id="vuelo' + i + '"><div id="template' + i + '"></div></div>');
		(function(i,flight){
			$("#template" + i).load("FlightsTemplate.html", function(){
				var data = parseHour(flight.outbound_routes[0].segments[0].departure.date.split(" ")[1]) + " hs";
				$(this).find(".departureHourInfo").append('<p>'+ data +'</p>');
				data = parseHour(flight.outbound_routes[0].segments[0].arrival.date.split(" ")[1]) + " hs";
				$(this).find(".arrivalHourInfo").append('<p>'+ data +'</p>');
				data = flight.outbound_routes[0].segments[0].duration + " hs";
				$(this).find(".duration").append('<p>'+ data +'</p>');
				data = flight.price.total.total;
				$(this).find(".price").append('<p class="rightText">'+ data +'</p>');
				data = flight.outbound_routes[0].segments[0].airline.id;
				$(this).find(".airportLogo").attr("src",data);
			});
		})(i,flight);
	}
};

function parseHour(hour){
	var h = hour.split(":");
	return h[0]+":"+h[1];
}

$(document).ready(function(){
	var depDate = getParameterByName('fechaida');
	var adultCount = getParameterByName('adultos');
	var ninosCount = getParameterByName('ninos');
	var infantCount = 0;
	var oriID = getParameterByName('ori');
	var desID = getParameterByName('des');
	console.log(depDate);

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
				console.log("Airline: " + flights[i].outbound_routes[0].segments[0].airline.id);
				console.log("Duration: " + String(flights[i].outbound_routes[0].duration));
				console.log("Precio: $" + flights[i].price.adults.base_fare);
				console.log(" ");
			}
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
