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
 	     
		var imageurl = "_/images/thumbnail-placeholder.jpg";

 	     $.each(data, function (key, value) {
 	     	$('#item-listview').append(
				'<li>'+
				'<img src="'+imageurl+'" />'+
				'<h4>'+value.title+'</h4>'+
				'<p >'+value.description+'</p>'+
				phone_html(value.phone)+
				price_html(value.price)+
				'</li>');
 	     });
 	     
 	     $('#item-listview').listview('refresh');
	  },
	  error: function () {
		  alert('Unable to load... still'); // should have what's wrong	
	  }
	});
});

function price_html(price){
	if(price){
		return '<p class="ui-li-aside"><strong>'+price+' HKD</strong></p>';
	}
	else{
		return "";
	}
}

function phone_html(phone) {
	if(phone){
		return '<p>Call: '+phone+'</p>'
	}
	else{
		return "";
	}
}