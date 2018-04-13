var express = require('express'); //requrire the express module
var app = express(); //invoke var express and store the resulting application
var path = require('path');
var bodyParser = require('body-parser');
var port = 8000;
var session = require('express-session');
//////////////////////////////////////////////////////////////////////////////////////////
app.use(express.static(path.join(__dirname, "./client")));
//// this is the line that tells our server to use the "/static" folder for static content
//app.use(express.static(__dirname + "./client"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//app.set('views', path.join(__dirname, './client'));
//app.set('view engine', 'ejs');
//app.set('views', __dirname + '/client');
app.use(session({ secret: 'keyboard', saveUninitialized: true, resave: true }));

//////////////////////////////////////////////////////////////////////////////////////////
require('./server/config/mongoose');
//require('./server/config/routes')(app);

require('./server/config/routes')(app);

//////////////////////////////////////////////////////////////////////////////////////////
app.listen(port, function () {
    console.log(`server running on port ${port}`);
});
//////////////////////////////////////////////////////////////////////////////////////////
// app.listen(8000, function() {console.log("listening on port 8000");});
//////////////////////////////////////////////////////////////////////////////////////////

