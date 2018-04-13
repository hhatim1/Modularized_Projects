var mongoose = require('mongoose');
var path = require('path');
var mp = path.join( __dirname + './../models');
var fs = require('fs'); //file system reads and wirte files


mongoose.connect('mongodb://localhost/some_db');

/////////////////////////////////////////////////////////

fs.readdirSync(mp).forEach(function(file){
	if(file.indexOf('.js') >=0){
		require(mp +'/' + file)
	}
})  //read the model path directory syncoronsly