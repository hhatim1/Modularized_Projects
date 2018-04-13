const mongoose = require('mongoose');
const Shark = mongoose.model('Shark');
const sharks = require('../controllers/sharks.js');

module.exports = (app)=>{
  app.get('/', (req,res)=>{sharks.show(req, res)});
  app.get('/sharks/new', (req, res)=>{res.render('newShark');});
  app.get('/sharks/edit/:id', (req, res)=>{sharks.edit(req, res)});
  app.post('/sharks/destroy/:id', (req, res)=>{sharks.destroyThis(req, res)});
  app.get('/sharks/:id', (req, res)=>{sharks.showThis(req, res)});
  app.post('/sharks/:id', (req, res)=>{sharks.updateThis(req, res)});
  app.post('/sharks', (req, res)=>{sharks.newShark(req, res)});
}