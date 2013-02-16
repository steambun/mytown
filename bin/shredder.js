// shred data from website console.log json information

var request = require('request');
var cheerio = require('cheerio');

var port = process.env.PORT || 5000;

var topicArray = new Array(
		"babies-kids-stuff/"
	/**
		,
		"computers-accessories/",
		"antiques/",
		"debentures-memberships/",
		"cameras-accessories/",
		"electronics-tvs-stereos/",
		"handbags-wallets-luggage/",
		"home-furnishings/",		
		"items-under-$50/",
		"musical-instruments/",
		"other/",
		"pets-pet-products/",
		"sporting-goods-accessories-bicycles/",
		"toys-games/",
		"artwork-paintings/",
		"books-magazines/",
		"clothing-apparel/",
		"cosmetics-personal-care/",
		"dvds-vcds-cds/",
		"free/",
		"home-appliances/",
		"internet-cable-contracts/",
		"jewellery-watches/",
		"maternity-clothes-items/",
		"office-equipment-stationery/",
		"outdoor-garden-items/",
		"phones-accessories/",
		"tickets-vouchers/"**/
	);
var theurl = "http://hongkong.asiaxpat.com/classifieds/";
var adIndex = 1;
var imagePrefix = "http://hongkong.asiaxpat.com";

topicArray.forEach(function(item){
	var startPageIndex= 1;
	var topicUrl = theurl+item;
	console.log("Trying to shred topic["+item+"]")
	parseClassifiedSection(startPageIndex,topicUrl);
});

function parseClassifiedSection(pageIndex,topicUrl){
	url = topicUrl+pageIndex+"/";
	console.log("Trying to shred url["+url+"]");
	
	var foundAd = false;
	request(url, function(err, resp, body){
	  $ = cheerio.load(body);
	  links = $('.helper'); //use your CSS selector here
	  $(links).each(function(i, link){
		foundAd = true;
		console.log("Ad #"+adIndex);
		var $title = $(link).find('.person').text();
		var $desc = $(link).find('p:nth-child(2)').text();
		var $contact = $(link).find('.browseColumn:nth-child(1) li:first-child').text().substring(8);
		var $loc = $(link).find('.browseColumn:nth-child(2) li:first-child').text().substring(9);
		var $date = $(link).find('.browseColumn:nth-child(3) li:first-child').text().substring(7);		
		var $id = $(link).find('p:last-child').text();
		var $pic;
		console.log('Title:'+$title);
		console.log('Description:'+$desc);
		console.log('Contact:'+$contact);
		console.log('Location:'+$loc);
		console.log('Date:'+$date);
		console.log('ID:'+$id);	
		$(link).find("[alt='Ad picture']").each(function(i,pic){
			$pic = imagePrefix + $(pic).attr("src");
			console.log('Pic:'+$pic);
		});
		
		// send post request to webserver.js
		// node: missing DATE, LOCATION, FOREIGN-ID, CONTACT and all but last PIC
		var form = {"title":$title,"description":$desc,"price":"100","file":$pic,"id":$id};
		console.log(form);
		request.post("http://localhost:"+port+"/submit").form(form);
		
		adIndex++;
	  });
	  if(foundAd){
		pageIndex++;
		parseClassifiedSection(pageIndex,topicUrl);	
	  }
	});
}
