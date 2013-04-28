// tdd style of test unit with suites'n'tests
var assert = require('assert')
	, findPrice = require('./../shredder').findPrice
	, findPriceInDesc=require('./../shredder').findPriceInDesc
	, findPhoneNumber = require('./../shredder').findPhoneNumber;

suite("findPrice", function() {

	test("should return number if only one price",function(){
		assert.equal(findPriceInDesc("Selling a cot for $123 only"),"123");
	});
	
	test("should return dollars if more than one price in description",function(){
		assert.equal(findPriceInDesc("Selling A for $323 and B for $545 only"),"$$$");
	});
	
	test("should return larger of 2 dollars if more than one price more digits than the other price in description",function(){
		assert.equal(findPriceInDesc("Selling A for $323 and B for $5455 only"),"$$$$");
	});
	
	test("should return price if prefixed by HKD",function(){
		assert.equal(findPriceInDesc("bicyle for HKD342"),"342");
	});
	
	test.skip("should return price if number contains ,",function(){
		assert.equal(findPriceInDesc("$1,200 or $1,201"),"$$$$");
	});
	
	test("should return price if contains space between numbers and sign",function(){
		assert.equal(findPrice("bicycle for HKD 324"),"324");
	});
	
	test("should return title price if price is in title",function(){
		assert.equal(findPrice("Cot $123","Selling a cot for $234"),"123");
	});
	
	test("should return desc price if no price is in title",function(){
		assert.equal(findPrice("Vtech First Walker","Hardly used Vtech First Walker, with detachable interactive play centre.Price $180If interested text 91631395"),"180");
	});
});

suite("findPhoneNumber",function(){
	test("should return phone number if provided 8 consequective digits",function(){
		assert.equal(findPhoneNumber("call me on 12345432"),"12345432");
	});
	test("should return phone number if provided 4 digits <space> 4 digits",function(){
		assert.equal(findPhoneNumber("call me on 1234 1234"),"12341234");
	});
});