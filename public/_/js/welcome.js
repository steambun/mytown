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
				'<h4>'+value.title+'</h4>'+
				'<p>'+value.description+'</p>'+
				phone_html(value.phone)+
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

function phone_html(phone) {
	if(phone){
		return '<p>Call: '+phone+'</p>'
	}
	else{
		return "";
	}
}