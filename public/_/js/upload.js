$(document).ready(function() {
	$('#upload-form').submit(function(e){
		
		e.preventDefault();
		var form = $(this);
		$.ajax({ 	           
	           type: 'POST',
			   url: '/upload',
	           cache: false, 
	           data: form.serialize(), 
			   dataType: 'json',
	           success: function(response){
	              console.log(response);
	           }
	           , error: function(jqXHR, textStatus, err){
					console.log('text status '+textStatus+', err '+err);
	               alert('text status '+textStatus+', err '+err);
	           }
		})
	});
});