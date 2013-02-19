var express = require('express'),
    path = require('path'),
    http = require('http');

var app = express();

// global item stack
var dupCheck ={};

var item =[];
/** = [
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
];**/

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
	var rid = request.param('id');
	var rphone = request.param('phone');
	if(typeof(rid) === 'undefined'){
		rid = guid();
	}
	
	// check for a duplicate
	var foundDup = dupCheck[rid];
	if(foundDup!==undefined)
	{
		console.log("Ignore - found duplicate submit ["+rid+"]");
		response.contentType("json");
		response.send({message:"Failed submission, duplicate entry found"});
		return;
	}
	else
	{
		// print out the activity
		console.log("Parse POST ["+rtitle+"]["+rdesc+"]["+rprice+"]["+rfile+"]["+rid+"]["+rphone+"]");
		var data = {title: rtitle,description: rdesc,price: rprice,id : rid,phone:rphone	};
		dupCheck[rid]={};
		item.push(data);	
		
		response.contentType("json");
		response.send({message:"Successful submission processed"});
	}
	
});

http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});

function s4() {
  return Math.floor((1 + Math.random()) * 0x10000)
             .toString(16)
             .substring(1);
};

function guid() {
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
         s4() + '-' + s4() + s4() + s4();
}