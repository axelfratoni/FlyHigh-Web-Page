$(document).ready(function(){
	$("#spinUp").click(function(){
		var target = $(this).data("target");
		var val = parseInt(document.getElementById(target).value) + 1;
		if (val > 4){
			val = 0
		}
		document.getElementById(target).value=val ; 
	});	
});

$(document).ready(function(){
	$("#spinDown").click(function(){
		var target = $(this).data("target");
		var val = parseInt(document.getElementById(target).value) - 1;
		if (val < 0){
			val = 4
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