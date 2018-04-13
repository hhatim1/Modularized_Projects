var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var path = require('path');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/quoting_dojo');
var QuoteSchema = new mongoose.Schema({
	name: String,
	quote: String
});
mongoose.model('Quote', QuoteSchema);
var Quote = mongoose.model('Quote');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, './static')));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');


///////////  add routes here    //////////
app.get('/', function(req, res){
	res.render('index');
});

app.post('/quotes', function(req, res){
	console.log('POST DATA', req.body);
	var quotes = new Quote({name:req.body.name, quote:req.body.quote});
	quotes.save(function(err){
		if(err){
			console.log('Something went wrong getting that quote');
		}
		else{
			console.log('Yay you got that quote!');
			res.redirect('/quotes');
		}
	});
})

app.get('/quotes', function(req, res){
	Quote.find({}, function(err, quotes){
		if(err){
			console.log('Something went wrong getting that quote');
		}
		else{
			console.log('You got it!');
			res.render('main', {quotes:quotes});
		}
	});
});


/////////////////////////////

var server = app.listen(8000, function(){
	console.log('Listening to Quoting Dojo on port 8000');
})