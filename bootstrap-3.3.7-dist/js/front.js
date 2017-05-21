
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

$(document).ready(function(){
	localStorage.clear();
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
		var adultos = $("#adultCount").val();
		localStorage.setItem("adultosCount", adultos);
		var ninos= $("#ninosCount").val();
		localStorage.setItem("ninosCount",ninos);
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
			var parameters = "adultos=" + adultos +"&ninos=" + adultos + "&infant=" + $("#infaCount").val() + "&ori=" +  oriID + "&des=" + desID + "&fechaida=" + $("#departureDate").val().toString();
			if ($("#idaYvuelta").is(':checked'))
				parameters = parameters + "&llegada=" + ($("#arrivalDate").val()).toString();
			if ($("#origen").val().split(" ")[0] == "Aeropuerto")
				parameters = parameters + "&oriAe=" + getAeId($("#origen").val());
			if ($("#destino").val().split(" ")[0] == "Aeropuerto")
				parameters = parameters + "&desAe=" + getAeId($("#destino").val());
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
	depDate = ($("#departureDate").val()).split("/");
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
	arrDate = ($("#arrivalDate").val()).split("/");
 	arrDate = new Date(parseInt(arrDate[0]),parseInt(arrDate[1])-1,parseInt(arrDate[2]));
 	depDate = ($("#departureDate").val()).split("/");
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
  $('#adultCountPUp').on('click', function(event) {
  	event.preventDefault();
    if(parseInt($('#adultCountP').val(), 10) < $('#adultCountP').attr('max') ) {
          $('#adultCountP').val( parseInt($('#adultCountP').val(), 10) + 1);
        }
  });
  $('#adultCountPDown').on('click', function() {
    if(parseInt($('#adultCountP').val(), 10) > $('#adultCountP').attr('min')) {
          $('#adultCountP').val( parseInt($('#adultCountP').val(), 10) - 1);
        }
  });
  $('#ninosCountPUp').on('click', function() {
    if(parseInt($('#ninosCountP').val(), 10) < $('#ninosCountP').attr('max')) {
          $('#ninosCountP').val( parseInt($('#ninosCountP').val(), 10) + 1);
        }
  });
  $('#ninosCountPDown').on('click', function() {
    if(parseInt($('#ninosCountP').val(), 10) > $('#ninosCountP').attr('min')) {
          $('#ninosCountP').val( parseInt($('#ninosCountP').val(), 10) - 1);
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

function getAeId(name){
	for (var i=0; i<airports.length; i++){
		if(airports[i].description == name){
			return airports[i].id;
		}
	}
	return null;
}

function getCityFromAirp(name){
	for (var i=0; i<airports.length; i++){
		if(airports[i].description == name){
			return airports[i].city.id;
		}
	}
	return null;
}

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

/* date pickers */
$(document).ready(function(){
	var options={
        format: 'dd/mm/yyyy',
        todayHighlight: true,
        autoclose: true,
        todayBtn:  1,
     	startDate: '+2d'
      };
    $("#departureDate").datepicker(options).on('changeDate', function (selected) {
        var minDate = new Date(selected.date.valueOf());
        $('#arrivalDate').datepicker('setStartDate', minDate);
    });

    $("#arrivalDate").datepicker(options).on('changeDate', function (selected) {
        var minDate = new Date(selected.date.valueOf());
        $('#departureDate').datepicker('setEndDate', minDate);
    });
    $("#birthDateInput").datepicker(options);
});

$(document).ready(function(){
    $(".myInputs").val("");
    $("#ida").prop("checked", true);
    $("#idaYvuelta").prop("checked", false);
});

/* Modal de promociones*/
clicked = 0;
$(document).ready(function(){
	$(".thumbnail").click(function(){
		clicked = ((dealIndex - 3 + $(this).data("num")) % deals.length);
		$('#myModal').modal("show");
	});
});

$(document).ready(function(){
	$('#myModal').on('show.bs.modal', function (event) {
		var button = $(event.relatedTarget);
		//var promo = deals[((dealIndex - 3 + button.data("num")) % deals.length)];
		var promo = deals[clicked];
		var data = "./images/" + promo.city.name.split(",")[0] + ".jpg";
		$("#myModal").find("img").attr("src", data);
		data = "Viaja de oferta a " + promo.city.name.split(",")[0];
		$("#myModal").find(".modal-title").text(data);
		$("#myModal").find(".compraPromo").data("target",clicked);
		console.log(promo.city.name.split(",")[0]);
	});
});

$(document).ready(function(){
	$(".compraPromo").click(function(){
		console.log($(this).data("target"));
		var target = $(this).data("target");
		findPromo(deals[target]);
	});
});


function findPromo(promo){
	var oriID = "BUE";
	var desID = promo.city.id;
	var depDate = new Date((new Date).getTime() + 2*24*60*60*1000);
	depDate = depDate.getFullYear() + "-" + (depDate.getMonth() + 1) + "-" + depDate.getDate();
	var adultCount = $("#adultCountP").val();
	var ninosCount = $("#ninosCountP").val();
	var infaCount = 0;
	console.log("http://hci.it.itba.edu.ar/v1/api/booking.groovy?method=getonewayflights&from=" + oriID + "&to=" + desID + "&dep_date=" + depDate + "&adults=" + adultCount + "&children=" + ninosCount + "&infants=" + 0);
	$.ajax({
		url: "http://hci.it.itba.edu.ar/v1/api/booking.groovy?method=getonewayflights&from=" + oriID + "&to=" + desID + "&dep_date=" + depDate + "&adults=" + adultCount + "&children=" + ninosCount + "&infants=" + 0,
		dataType: "jsonp",
		success: function(data){
			(function(cheapest){
				$.each(data.flights, function(index,value){/*
					if(promo.price == value.price.adults.base_fare){
						console.log("found");
						buyPromo(value);
					}*/
					if(cheapest == null || cheapest.price.total.total > value.price.total.total){
						cheapest = value;
					}
				});
				buyPromo(cheapest);
			})(null);
		}
	});
}

function buyPromo(flight){
	saveData(flight, "Ida");
	document.location.href = "InfoPage.html?adultos=" + $("#adultCountP").val() + "&ninos=" + $("#ninosCountP").val() ;
}

$(document).ready(function(){
	$('#myModal').on('show.bs.modal', function () {
		$('#myModal').bind( 'hide.bs.modal', dontClose );
	});
});

function dontClose(){
	console.log("no");
	return false;
}

$(document).ready(function(){
	$('#closeModal').click(function(){
		$('#myModal').unbind( 'hide.bs.modal', dontClose );
	});
});

savingParameters = ["airline" , "duration" , "price", "depAirp", "arrAirp", "arrDate", "depDate", "ori", "des", "arrAirpDesc", "depAirpDesc" , "number", "adultPrice", "kidPrice", "charges", "taxes"];

function saveData(flight, viaje){
	localStorage.setItem("adultosCount", $("#adultCountP").val());
	localStorage.setItem("ninosCount", $("#ninosCountP").val());
	var airline = flight.outbound_routes[0].segments[0].airline.id;
	var duration = flight.outbound_routes[0].duration;
	var price = flight.price.total.total;
	var depAirp = flight.outbound_routes[0].segments[0].departure.airport.id;
	var arrAirp = flight.outbound_routes[0].segments[0].arrival.airport.id;
	var arrDate = flight.outbound_routes[0].segments[0].arrival.date;
	var depDate = flight.outbound_routes[0].segments[0].departure.date;
	var ori = null;
	var dest = null;
	for(i=0; i<cities.length-1; i++){
		if($("#origen").val() == cities[i].name){
			ori = cities[i].id;
		}
		if($("#destino").val() == cities[i].name){
			des = cities[i].id;
		}
	}
//var ori = getParameterByName('ori');
//var dest = getParameterByName('des');
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
/*
<div class="col-md-4">
            <div class="thumbnail" id="promo1">
              <a href="#myModal" target="_blank" data-toggle="modal" data-target="#myModal" data-num="1">
                <img src="./images/city.jpg" alt="Lights" style="width:100%">
                <div class="caption">
                  <p></p>
                </div>
              </a>
            </div>
          </div>
          <div class="col-md-4">
            <div class="loader"></div>
            <div class="thumbnail" id="promo2">
              <a href="#myModal" target="_blank" data-toggle="modal" data-target="#myModal" data-num="2">
                <img src="./images/city.jpg" alt="Lights" style="width:100%">
                <div class="caption">
                  <p></p>
                </div>
              </a>
            </div>
          </div>
          <div class="col-md-4">
            <div class="thumbnail" id="promo3">
              <a href="#myModal" target="_blank" data-toggle="modal" data-target="#myModal" data-num="3">
                <img src="./images/city.jpg" alt="Lights" style="width:100%">
                <div class="caption">
                  <p></p>
                </div>
              </a>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4">
            <div class="thumbnail" id="promo4">
              <a href="#myModal" target="_blank" data-toggle="modal" data-target="#myModal" data-num="4">
                <img src="./images/city.jpg" alt="Lights" style="width:100%">
                <div class="caption">
                  <p></p>
                </div>
              </a>
            </div>
          </div>
          <div class="col-md-4">
            <div class="thumbnail" id="promo5">
              <a href="#myModal" target="_blank" data-toggle="modal" data-target="#myModal" data-num="5">
                <img src="./images/city.jpg" alt="Lights" style="width:100%">
                <div class="caption">
                  <p></p>
                </div>
              </a>
            </div>
          </div>
          <div class="col-md-4">
            <div class="thumbnail" id="promo6">
              <a href="#myModal" target="_blank" data-toggle="modal" data-target="#myModal" data-num="6">
                <img src="./images/city.jpg" alt="Lights" style="width:100%">
                <div class="caption">
                 <p></p>
                </div>
              </a>
            </div>
          </div>
*/
