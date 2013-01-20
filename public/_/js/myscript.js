$(document).ready(function() {
	$.ajax({
	  type: "GET",
	  dataType: "json",
	  url: "/welcome", 
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
				'<p class="ui-li-aside"><strong>'+value.price+' HKD</strong></p>'+
				'</li>');
 	     });
 	     
 	     $('#item-listview').listview('refresh');
	  },
	  error: function () {
		  alert('Unable to load... still'); // should have what's wrong	
	  }
	});
});