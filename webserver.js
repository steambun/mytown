var express = require('express'),
    path = require('path'),
    http = require('http');

var app = express();

// global item stack
var item = [
{
  title: 'Green Bustin Skateboard',
  description: 'Awesome bustin skateboard ridden only once, once in a life time opportunity',
  price: '500'
},
{
  title: 'Blue Bustin Skateboard',
  description: 'Old had-it skateboard not fit for any one',
  price: '100'
},
{
  title: 'Honda Motor Bike',
  description: 'New retro black stealthy honda bike only riden for 53 meters before fatal collision!',
  price: '2500'
}
];

app.configure(function(){
	app.set('port', process.env.PORT || 5000);
    app.use(express.logger('dev'));
    app.use(express.bodyParser())
    app.use(express.static(path.join(__dirname, 'public')));
});

app.get('/welcome', function(request, response) {
	console.log("Request handler 'welcome' was called.");	
	
	response.writeHead(200, {"Content-Type": "application/json"});
	response.write(JSON.stringify(item));
	response.end();
	
});

app.post('/submit',function (request,response){
    console.log("Post handler 'submit' was called");

	var rtitle = request.param('title');
	var rdesc = request.param('description');
	var rprice = request.param('price');
	var rfile = request.param('file');
	console.log("Parse POST ["+rtitle+"]["+rdesc+"]["+rprice+"]["+rfile+"]");
	
	item.push({
	  title: rtitle,
	  description: rdesc,
	  price: rprice
	});
	
	response.contentType("json");
	response.send({some:'json'});
});

http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});
