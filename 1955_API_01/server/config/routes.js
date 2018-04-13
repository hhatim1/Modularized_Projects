var users = require('./../controllers/controller');
//var controller = require('./../controllers/controller');
    //console.log(users)
module.exports = function (app) {
    app.get('/', function (req, res) {
        //console.log('hellow from outside');
        //res.send('in routes for you')
        //res.json('sadsfafafaf')
        users.index(req, res);
    })
    app.get('/new/:name', function(req, res){
        //res.josn(req.params.name)  //the name is the listener and 
        users.create(req, res);
    })
    app.get('/remove/:name', function (req, res) {
        //res.josn(req.params.name)  //the name is the listener and 
        users.remove(req, res);
    })
    app.get('/:name', function (req, res) {
        users.find(req, res);
    });

}

