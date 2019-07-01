/*
  Önder ALTINTAŞ 23.05.2016
  Server application.
*/

// BASE SETUP
// =============================================================================
// call the packages we need
var path = require("path");
var express    = require('express');        // call express
var app        = express();                 // define app using express
var bodyParser = require('body-parser');
var compression = require('compression'); //for gzip compression
var cookieParser = require('cookie-parser');
var config = require("./config.js");
var MainWebServiceManager = require('./webservices/mainwebservicemanager');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true, limit: '100mb'}));
app.use(bodyParser.json({limit: '100mb'}));
app.use(cookieParser());
app.use(compression());
if(config.minify === 1)
{
  var minify = require('express-minify');
  app.use(minify());
}


var port = process.env.PORT || config.serverPort;        // set server port

// ROUTING
// =============================================================================
var router = express.Router();              // get an instance of the express Router
var webServiceManager = new MainWebServiceManager(router);
webServiceManager.start();

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/presentation/public/index.html'));
});

// REGISTER ROUTES -------------------------------
app.use('/', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Server application is running on port ' + port);

process.on('uncaughtException', function (err) {
	console.log(err.message);
	console.error(err.stack);
	process.exit(0);
});
