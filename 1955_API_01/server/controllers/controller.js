var mongoose = require('mongoose');
var User = mongoose.model("User");

module.exports = {

    index: function (req, res) { //need this function to happen when it is fired from routes.
        //res.render('index.ejs')
        User.find({}, function(err, users){
            res.json(users);
        })
        //res.send('hi there --')
    },
    create: function(req, res){
        //res.json("made it here")
        User.create({name: req.params.name}, function(err, user){
            res.redirect('/');
        })
    },
    remove: function (req, res) {
        User.remove({ name: req.params.name }, function (err, user) {
            if (err) {
                console.log("something went wrong removing the user")
            } else {
                console.log("user removed")
                res.redirect("/");
            }
        })
    },
    find: function (req, res) {
        User.findOne({ name: req.params.name },
            function (err, user) {
                if (err) {
                    console.log("user not found");
                } else {
                    res.json(user);
                }
            });
    },
}
