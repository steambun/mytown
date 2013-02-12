// shred data from website console.log json information

var request = require('request');
var cheerio = require('cheerio');

var theurl = "http://hongkong.asiaxpat.com/classifieds/babies-kids-stuff/";
var pageIndex = 1;
var adIndex = 1;
var imagePrefix = "http://hongkong.asiaxpat.com";

parseClassified(pageIndex);

function parseClassified(pageIndex){
	url = theurl+pageIndex+"/";
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
		console.log('Title:'+$title);
		console.log('Description:'+$desc);
		console.log('Contact:'+$contact);
		console.log('Location:'+$loc);
		console.log('Date:'+$date);
		console.log('ID:'+$id);	
		$(link).find("[alt='Ad picture']").each(function(i,pic){
			var $pic = imagePrefix + $(pic).attr("src");
			console.log('Pic:'+$pic);
		});
		adIndex++;
	  });
	  if(foundAd){
		pageIndex++;
		parseClassified(pageIndex);	
	  }
	});
}
