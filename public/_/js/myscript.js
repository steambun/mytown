$(document).ready(function() {
	$.ajax({
	  type: "GET",
	  dataType: "json",
	  url: "http://localhost:5000/welcome",
	  complete: function() {
	  	//alert ('Load complete');
	  },
	  
	  success: function(data){
 	     alert('Load success!! '+data);
 	     
 	     //$.each(result, function (key, value) {
 	     //	$('#ItemList').append(key);//'<li>'+value+'</li>');
 	     //});
 	     
 	     //$('#ItemList').listview('refresh');
	  },
	  error: function () {
		  alert('Unable to load... still'); // should have what's wrong	
	  }
	});
});