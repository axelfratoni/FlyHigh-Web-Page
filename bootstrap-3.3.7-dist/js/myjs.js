$(document).ready(function(){
	$("#spinUp").on("click",function(){
		var target = $(this).data("target");
		var val = parseInt(document.getElementById(target).value) + 1;
		if (val > 4){
			val = 0
		}
		document.getElementById(target).value=val ; 
	});	
});

$(document).ready(function(){
	$("#spinDown").on("click",function(){
		var target = $(this).data("target");
		var val = parseInt(document.getElementById(target).value) - 1;
		if (val < 0){
			val = 4
		}
		document.getElementById(target).value=val ; 
	});	
})