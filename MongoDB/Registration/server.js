///////////////////////////////////////////
var express = require('express'); 
var app = express(); 
var path = require('path');
var bodyParser = require('body-parser');
var port = 8000;
var session = require('express-session');
/////////////////////////////////////////////////////////////////////////////
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({ secret: 'codingdojorocks' , saveUninitialized: true})); 
app.use(express.static(path.join(__dirname, './static')));
/////////////////////////////////////////////////////////////////////////////
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
/////////////////////////////////////////////////////////////////////////////
var mongoose = require('mongoose');
bcrypt = require('bcrypt')


mongoose.connect('mongodb://localhost/dojo3_userdb'); //new database is bcrypt is added

////////////////////////////////////////////////////////////////////////////
var UserSchema = new mongoose.Schema({
    first_name: {type: String, required: [true, minlength = 3 , "first_name is required."]},
    last_name: { type: String, required: [true, minlength = 3 , "last_name is required."]},
    username: {type:String, unique: true, required:[true, "Username is required."]},
   // email: { type: String, required: [true, minlength = 3 , "email is required."] },//
    email: {type:String, unique: true, validate: {validator: function(email){
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email)
      },
      message: "Please provide a valid email."
    },
    required: [true, "Please provide a valid email"],
  },
////////////////////
    age: {type: Number, min: 1, max: 200, required: [true, "age is required."]},

    password:{type:String,
    validate:{validator: function(password){
        var re = /^(?=.*?[a-z])(?=.*?[0-9]){8,32}/;
        return re.test(password);
      },
      message: "Password failed validation, password must be 8 characters in length with at least 1 number"
    },
    required:[true, "Password is required"]
  },

}, {timestamps: true})
///////////////////////////////////////////////////////////////////////////
// //login: function(req, res){
//     User.login({email: req.body.email}, function(err, user){
//       console.log(err)
//       console.log(user)
//       if(!user){
//         res.json('Your login is incorrect')
//         }
//        else if (bcrypt.compareSync(req.body.password, user.password)==false) {
//         res.json('Your password is incorrect')
//         } else {
//           console.log('logged in');
//           console.log(user);
//           res.json(user)
//         }
//     })
//   //},//end login

  /////////////////////////////////////////////////////////


















mongoose.model('User', UserSchema); 
var User = mongoose.model('User'); // come after the UserSchema declaration //
// Use native promisescopy
mongoose.Promise = global.Promise;
//////////////////////////////////////////////////////////////////////////////
User.findOne({name:" "}, function(err, user){

})
//////////////////////////////////////////////////////////////////////////////
User.remove({_id: " "}, function(err, user){

})
////////////////////////////////////////////////////////////////////////////////
User.update({name:" "}, function(err, user){

})

////////////////////////////    add routes here    //////////////////////////
app.get('/', function (req, res) {
    res.render('index');
});

/////////////////////////////////////////
app.post('/', function(req, res){
    
    //var user = new User({first_name: req.body.name, last_name: req.body.name, email: req.body.name, age: req.body.name });
    var user = new User(req.body);
    console.log("POST DATA", req.body);
    req.session.user = req.body;
    user.save(function(err){
        if(err){
            console.log("registration unsuccessful");
            res.render('index', {errors: user.errors});
        }else{
            //console.log('You made it!');
            res.redirect('/main');
        }
    });
})

///////////////////////////////////////////////////////////////////////////////////
app.post('/main', function(req, res){
//app.post('/login', User.login){



//}
    
    //var user = new User({first_name: req.body.name, last_name: req.body.name, email: req.body.name, age: req.body.name });
    var user = new User(req.body);
    console.log("POST DATA", req.body);
    req.session.user = req.body;
    user.save(function(err){
        if(err){
            console.log("registration unsuccessful");
            res.render('index', {errors: user.errors});
        }else{
            //console.log('You made it!');
            res.redirect('/main');
        }
    });
})






//////////////////////////////////////////////////////////////////////////////////////
app.get('/main', function (req, res) {
    User.find({}, function (err, user) {
        if (err) {
            console.log('Something went wrong getting that quote');
        }
        else {
            console.log('You got it!');
            res.render('main' , {User}); //render post.ejs
        }
    });
});
///////////////////////////////////////////////////////////////////////////////////////




///////////////////////////////////////////////////////////////////////////////////////
app.listen(8000, function() {console.log("listening on port 8000");})   //callback



