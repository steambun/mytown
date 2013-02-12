$(document).ready(function () {
	$('#submit-form').submit(function(e){
		
		/* stop form from submitting normally */
		e.preventDefault();
		
		var $form = $( "#summary-form" );
		
		/* Send the data using post */
	  	$.post( "/submit", $form.serialize(), function(response){  
			console.log("success! ["+response.some+"]");
			
			$.mobile.changePage('#sell-confirmation', "slideUp");
			
			$('#sellconfirm-listview').empty();
			$('#sellconfirm-listview').append(
				'<li>'+
				'<h3>'+'<Information from Server>'+'</h3>'+
				'<p>'+response.some+'</p>'+
				'</li>');

			$('#sellconfirm-listview').listview('refresh');
		},'json');
		
		return false;
	});
});