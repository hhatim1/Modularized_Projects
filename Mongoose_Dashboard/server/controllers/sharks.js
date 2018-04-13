const mongoose = require('mongoose');
const Shark = mongoose.model('Shark');
var errors = [];

module.exports = {
  show: (req, res)=>{
    Shark
      .find()
      .exec()
      .then((sharks)=>{
        res.render('index', {sharks: sharks, errors: errors}); 
      })
      .catch((err)=>{
        console.log(err);
        res.redirect('http://www.google.com');
      })
  },
  edit: (req, res)=>{
    errors = [];
    Shark
      .findById(req.params.id)
      .exec()
      .then((thisShark)=>{
        res.render('editThisShark', {thisShark: thisShark})
      })
      .catch((err)=>{
        errors.push(err);
        res.redirect('/');
      });
  },
  showThis: (req, res)=>{
    errors = [];
    Shark
      .findById(req.params.id)
      .exec()
      .then((shark)=>{
        res.render('thisShark', {thisShark: shark})
      })
      .catch((err)=>{
        errors.push(err);
        res.redirect('/');
      });
  },
  destroyThis: (req, res)=>{
    // console.log('POST DATA', req.body);
    errors = [];
    Shark
      .findByIdAndRemove(req.params.id, (err)=>{
        if (err){errors.push(err);};
        res.redirect('/');
      });
  },
  updateThis: (req, res)=>{
    errors = [];
    Shark
      .findByIdAndUpdate(
        req.params.id,
        {$set: {
          name: req.body.name,
          age: req.body.age
        }}
      )
      .then((shark)=>{  
        res.redirect('/sharks/' + shark.id)
      })
      .catch((err)=>{
        errors.push(err);
        res.redirect('/')
      })
  },
  newShark:(req, res)=>{
    console.log('POST DATA', req.body);
    let sharkInstance = new Shark();
    sharkInstance.name = req.body.name;
    sharkInstance.age = req.body.age;
    sharkInstance
      .save((err)=>{
        if (err) {
          console.log('something went wrong!');
          res.redirect('/sharks/new');};
      });
    res.redirect('/')}
}