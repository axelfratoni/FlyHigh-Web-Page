flights = [];

var desde = getQueryVariable("ori");
var hasta = getQueryVariable("des");
var adults = getQueryVariable("adults");
var children = getQueryVariable("child");
var infants = getQueryVariable("infants");
var passengersAd = adults!="0"?(adults!="1"?(adults+" adults"):(adults+" adult")):"";
var passengersCh = children!="0"?(children!="1"?(", "+children+" children"):(", " +children+" child")):"";
var passengersIn = infants!="0"?(infants!="1"?(", "+infants+" infants"):(", " +infants+" infant")):"";

function loadFlights(){
	for(var i = 0; i < flights.length-1; i++){
		var ticket = drawTicket(flights[i]);
		$("#vuelosDiv").append(ticket);
	}
};

$(document).on('click','.botonCompra', function() {
    
    if (getParameterByName('llegada') == null){
			if(!sessionStorage.getItem('idaYvuelta')){
				sessionStorage.setItem('idaYvuelta', false);
				//sessionStorage.setItem("idaTicket", drawTicket(getFlight(this.getAttribute("fNumber"))));
			}
			handleBuy(this.getAttribute("fNumber"));
	} else {
		sessionStorage.setItem('idaYvuelta', true);
		sessionStorage.setItem("idaTicket", drawTicketNoButton(getFlight(this.getAttribute("fNumber"))));
		handleVuelta(this.getAttribute("fNumber"));
	}
   
}); 

function handleBuy(flightnumber){
    var flight = getFlight(flightnumber);
		if(sessionStorage.getItem('idaYvuelta') == "true"){
			console.log("Vuelta");
			saveData(flight, "Vuelta");
			sessionStorage.setItem("vueltaTicket", drawTicketNoButton(getFlight(flightnumber)));
		}else{
			console.log("Ida");
			saveData(flight, "Ida");
			sessionStorage.setItem("idaTicket", drawTicketNoButton(getFlight(flightnumber)));
		}
		document.location.href = "InfoPage.html?adultos=" + getParameterByName('adultos') + "&ninos=" + getParameterByName('ninos');

}

function handleVuelta(flightnumber){
	var flight = getFlight(flightnumber);
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
	sessionStorage.setItem(parameters[0] + viaje , airline);
	sessionStorage.setItem(parameters[1] + viaje , duration);
	sessionStorage.setItem(parameters[2] + viaje , price );
	sessionStorage.setItem(parameters[3] + viaje , depAirp);
	sessionStorage.setItem(parameters[4] + viaje , arrAirp);
	sessionStorage.setItem(parameters[5] + viaje , arrDate);
	sessionStorage.setItem(parameters[6] + viaje , depDate);
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
	console.log(sessionStorage.getItem('idaYvuelta'));
	console.log(getParameterByName('llegada'));

	if(getParameterByName('llegada') == null && sessionStorage.getItem("idaYvuelta") != "true"){
		console.log("xD");
		sessionStorage.setItem('idaYvuelta', false);
	}else{
		console.log(":p");
		sessionStorage.setItem('idaYvuelta', true);
	}
	console.log(sessionStorage.getItem("idaYvuelta"));
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

function getQueryVariable(variable)
{
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}

function drawTicket(flight) {
		var dur = joinHour(flight.outbound_routes[0].segments[0].duration);
		var price = flight.price.total.total;
		var airID = flight.outbound_routes[0].segments[0].airline.id;
		var depDate = flight.outbound_routes[0].segments[0].departure.date.substring(8, 10)+ "/" + flight.outbound_routes[0].segments[0].departure.date.substring(5, 7)+"/"+ flight.outbound_routes[0].segments[0].departure.date.substring(0, 4);
		var flightNumber = flight.outbound_routes[0].segments[0].number;
		var airline = flight.outbound_routes[0].segments[0].airline.name;
		var depAirportInfo = flight.outbound_routes[0].segments[0].departure.airport.description;
      	var arrAirportInfo = flight.outbound_routes[0].segments[0].arrival.airport.description;
      	var flightNumber = flight.outbound_routes[0].segments[0].number;
      	var depOrArr = (getQueryVariable("departure") == false)?"departure":"arrival";
      	var ticket = "<div>" +
                "<div class=\"row row-ticket\" id=\"rowTicketTop\">" +
                  "<div class=\"col-md-2\">" +
                    //"<h4><span class=\"label label-info\">"+ depOrArr +"</span></h4>" +
                  "</div>" +  
                  "<div class=\"col-md-2\">" +
                    "<h4>Desde: "+ desde +"</h4>" +
                  "</div>" +
                  "<div class=\"col-md-2\">" +
                    "<h4>Hasta: "+ hasta +"</h4>" +
                  "</div>" +  
                  "<div class=\"col-md-2\">" +
                    "<h4>Duracion:</h4>" +
                  "</div>" +  
                  "<div class=\"col-md-2\">" +
                    "<h4>Numero:</h4>" +
                  "</div>" +
                  "<div class=\"col-md-2 dark\" id=\"rightBorderTop\">" +
                    "<h4>"+ parseInt(flight.price.total.total) +" USD</h4>" +
                  "</div>" +
                "</div>" +
                "<div class=\"row row-ticket\">" +
                  "<div class=\"col-md-2\">" +
                    "<h4>"+ depDate +"</h4>" +
                  "</div>" +  
                  "<div class=\"col-md-2\">" +
                    "<h6>"+ depAirportInfo +"</h6>" +
                  "</div>" +
                  "<div class=\"col-md-2\">" +
                    "<h6>"+ arrAirportInfo +"</h6>" +
                  "</div>" +  
                  "<div class=\"col-md-2\">" +
                    "<h4>"+ flight.outbound_routes[0].segments[0].duration +"hs</h4>" +
                  "</div>" +
                  "<div class=\"col-md-2\">" +
                    "<h4>"+ flightNumber +"</h4>" +
                  "</div>" +
                  "<div class=\"col-md-2 dark\">" +
                    "<h7>"+ passengersAd + passengersCh + passengersIn +"</h7>" +
                  "</div>" +
                "</div>" +
                
                "<div class=\"row row-ticket\" id=\"rowTicketBottom\">" +
                  "<div class=\"col-md-2\" id=\"leftBorderBotton\">" +
                    "<h4>"+ airline +"</h4>" +
                  "</div>" +  
                  "<div class=\"col-md-2\">" +    
                    "<h4>"+ parseHour(flight.outbound_routes[0].segments[0].departure.date.split(" ")[1]) +"hs</h4>" +
                  "</div>" +
                  "<div class=\"col-md-2\">" +
                    "<h4>"+ parseHour(flight.outbound_routes[0].segments[0].arrival.date.split(" ")[1]) +"hs</h4>" +
                  "</div>"  +
                  "<div class=\"col-md-2\">" +
                    "<h4></h4>" +
                  "</div>" +  
                  "<div class=\"col-md-2\">" +
                      //"<div id=\"star"+ i +"\">" +

                      //"</div>" + 
                  "</div>" +
                  "<div class=\"col-md-2 dark\" id=\"rightBorderBottom\">" +
                    "<button type=\"button\" class=\"btn btn-primary botonCompra\" fNumber=\""+ flightNumber +"\">comprar</button>" +
                  "</div>" +
                "</div>" +
            "</div>";
		return ticket;
}

function drawTicketNoButton(flight) {
		var dur = joinHour(flight.outbound_routes[0].segments[0].duration);
		var price = flight.price.total.total;
		var airID = flight.outbound_routes[0].segments[0].airline.id;
		var depDate = flight.outbound_routes[0].segments[0].departure.date.substring(8, 10)+ "/" + flight.outbound_routes[0].segments[0].departure.date.substring(5, 7)+"/"+ flight.outbound_routes[0].segments[0].departure.date.substring(0, 4);
		var flightNumber = flight.outbound_routes[0].segments[0].number;
		var airline = flight.outbound_routes[0].segments[0].airline.name;
		var depAirportInfo = flight.outbound_routes[0].segments[0].departure.airport.description;
      	var arrAirportInfo = flight.outbound_routes[0].segments[0].arrival.airport.description;
      	var flightNumber = flight.outbound_routes[0].segments[0].number;
      	var depOrArr = (getQueryVariable("departure") == false)?"departure":"arrival";
      	var ticket = "<div>" +
                "<div class=\"row row-ticket\" id=\"rowTicketTop\">" +
                  "<div class=\"col-md-2\">" +
                    //"<h4><span class=\"label label-info\">"+ depOrArr +"</span></h4>" +
                  "</div>" +  
                  "<div class=\"col-md-2\">" +
                    "<h4>Desde: "+ desde +"</h4>" +
                  "</div>" +
                  "<div class=\"col-md-2\">" +
                    "<h4>Hasta: "+ hasta +"</h4>" +
                  "</div>" +  
                  "<div class=\"col-md-2\">" +
                    "<h4>Duracion:</h4>" +
                  "</div>" +  
                  "<div class=\"col-md-2\">" +
                    "<h4>Numero:</h4>" +
                  "</div>" +
                  "<div class=\"col-md-2 dark\" id=\"rightBorderTop\">" +
                    "<h4>"+ parseInt(flight.price.total.total) +" USD</h4>" +
                  "</div>" +
                "</div>" +
                "<div class=\"row row-ticket\">" +
                  "<div class=\"col-md-2\">" +
                    "<h4>"+ depDate +"</h4>" +
                  "</div>" +  
                  "<div class=\"col-md-2\">" +
                    "<h6>"+ depAirportInfo +"</h6>" +
                  "</div>" +
                  "<div class=\"col-md-2\">" +
                    "<h6>"+ arrAirportInfo +"</h6>" +
                  "</div>" +  
                  "<div class=\"col-md-2\">" +
                    "<h4>"+ flight.outbound_routes[0].segments[0].duration +"hs</h4>" +
                  "</div>" +
                  "<div class=\"col-md-2\">" +
                    "<h4>"+ flightNumber +"</h4>" +
                  "</div>" +
                  "<div class=\"col-md-2 dark\">" +
                    "<h7>"+ passengersAd + passengersCh + passengersIn +"</h7>" +
                  "</div>" +
                "</div>" +
                
                "<div class=\"row row-ticket\" id=\"rowTicketBottom\">" +
                  "<div class=\"col-md-2\" id=\"leftBorderBotton\">" +
                    "<h4>"+ airline +"</h4>" +
                  "</div>" +  
                  "<div class=\"col-md-2\">" +    
                    "<h4>"+ parseHour(flight.outbound_routes[0].segments[0].departure.date.split(" ")[1]) +"hs</h4>" +
                  "</div>" +
                  "<div class=\"col-md-2\">" +
                    "<h4>"+ parseHour(flight.outbound_routes[0].segments[0].arrival.date.split(" ")[1]) +"hs</h4>" +
                  "</div>"  +
                  "<div class=\"col-md-2\">" +
                    "<h4></h4>" +
                  "</div>" +  
                  "<div class=\"col-md-2\">" +
                      //"<div id=\"star"+ i +"\">" +

                      //"</div>" + 
                  "</div>" +
                  "<div class=\"col-md-2 dark\" id=\"rightBorderBottom\">" +
                  "</div>" +
                "</div>" +
            "</div>";
		return ticket;
}

function getFlight(flightnumber) {
	for(var i = 0; i < flights.length-1; i++){
		var flight = flights[i];
		if(flight.outbound_routes[0].segments[0].number == flightnumber) {
			return flight;
		}
	}
}