
var users = require('./../controllers/petscontroller');
console.log(users)
module.exports = function(app){

 app.get('/' , function(req, res){

    res.send('in routes for you')
     users.index(req, res)
 })




}