$(document).ready(function () {
	$('#upload-form').submit(function(e){
		
		// changes the navigation to another page anchor where we will
		// show the user a summary of what they want to sell... before confirming
		// and then eventually send the data to the server
		$.mobile.changePage('#sell-summary');
		
		$('#sellsummary-listview').append(
			'<li>'+
			'<h3>'+'BLAH'+'</h3>'+
			'<p>'+'BLAH'+'</p>'+
			'</li>');
		
		//$('#sellsummary-listview').listview('refresh');
		
		// returning false prevents the form submission from taking place
		// therefore we will remain on the sell-summary page where
		// the user can review what they'd like to do before actually need to submit
		return false; 
		
		/*
		$.ajax({
		  type: "GET",
		  dataType: "json",
		  url: "/upload", 
		  complete: function() {
		  	alert ('Load complete');
		  },
	  
		  success: function(data){
	 	     alert('Load success!! '+data);
 	     
	 	     
		  },
		  error: function () {
			  alert('Unable to load... still'); // should have what's wrong	
		  }
		});**/
	});
});