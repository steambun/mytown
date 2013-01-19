var express = require('express'),
    path = require('path'),
    http = require('http');

var app = express();

app.configure(function(){
	app.set('port', process.env.PORT || 5000);
    app.use(express.logger('dev'));
    app.use(express.bodyParser())
    app.use(express.static(path.join(__dirname, 'public')));
});

app.get('/welcome', function(request, response) {
	console.log("Request handler 'welcome' was called.");	

	var item = [
	{
	  name: 'Green Bustin Skateboard',
	  description: 'Awesome bustin skateboard ridden only once, once in a life time opportunity',
	  price: '$50,000'
	},
	{
	  name: 'Blue Bustin Skateboard',
	  description: 'Old had-it skateboard not fit for any one',
	  price: '$10,000'
	}
	];
	
	response.writeHead(200, {"Content-Type": "application/json"});
	response.write(JSON.stringify(item));
	response.end();
});

http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});
