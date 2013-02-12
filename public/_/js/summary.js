$(document).ready(function () {
	$('#summary-form').submit(function(e){
		
		// changes the navigation to another page anchor where we will
		// show the user a summary of what they want to sell... before confirming
		// and then eventually send the data to the server
		$.mobile.changePage('#sell-summary', "slideUp");
		
		var title = $("#title").val();
		var desc = $("#description").val();
		var price = $("#price").val();
		var file = $("#file").val();	
		var imageurl;
		
		if(!file) {
			imageurl = "_/images/thumbnail-placeholder.jpg";
		}
		
		$('#sellsummary-listview').empty();
		$('#sellsummary-listview').append(
			'<li>'+
			'<img src="'+imageurl+'" />'+
			'<h3>'+title+'</h3>'+
			'<p>'+desc+'</p>'+
			'<p class="ui-li-aside"><strong>'+price+' HKD</strong></p>'+
			'</li>');
		
		$('#sellsummary-listview').listview('refresh');
		
		// returning false prevents the form submission from taking place
		// therefore we will remain on the sell-summary page where
		// the user can review what they'd like to do before actually need to submit
		return false; 
	});
});