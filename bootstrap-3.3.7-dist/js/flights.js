flights = [];

function loadFlights(){
	console.log("aguante el paco");
	var flightsList = document.getElementById('flightsDiv');
	for(var i = 0; i < flights.length-1; i++){
		var flight = flights[i];
		var tmpl = document.getElementById('flightTemplate').content.cloneNode(true);
		tmpl.querySelector('#airportLogo').source = flight.outbound_routes[0].segments[0].airline.id;
		tmpl.querySelector('#departureHourInfo').innerText = parseHour(flight.outbound_routes[0].segments[0].departure.date.split(" ")[1]) + " hs";
		tmpl.querySelector('#arrivalHourInfo').innerText = parseHour(flight.outbound_routes[0].segments[0].arrival.date.split(" ")[1]) + " hs";
		tmpl.querySelector('#duration').innerText = flight.outbound_routes[0].segments[0].duration + " hs";
		flightsList.appendChild(tmpl);
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
