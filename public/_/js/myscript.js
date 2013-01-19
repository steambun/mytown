$(document).ready(function() {
	$.ajax({
	  type: "GET",
	  dataType: "json",
	  url: "http://localhost:5000/welcome",
	  complete: function() {
	  	//alert ('Load complete');
	  },
	  
	  success: function(data){
 	     //alert('Load success!! '+data);
 	     
 	     $.each(data, function (key, value) {
 	     	$('#item-listview').append(
				'<li>'+
				'<h3>'+value.name+'</h3>'+
				'<p>'+value.description+'</p>'+
				'</li>');
 	     });
 	     
 	     $('#item-listview').listview('refresh');
	  },
	  error: function () {
		  alert('Unable to load... still'); // should have what's wrong	
	  }
	});
});