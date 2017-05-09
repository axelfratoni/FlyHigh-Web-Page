$(document).ready(function(){
	$('.spinUp').click(function(){
		var target = $(this).data("target");
		var val = parseInt(document.getElementById(target).value) + 1;
		if (val > 4){
			val = 0
		}
		document.getElementById(target).value=val ; 
	});	
});

$(document).ready(function(){
	$('.spinDown').click(function(){
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