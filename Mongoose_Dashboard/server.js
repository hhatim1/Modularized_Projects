// BASIC CONSTANTS
const express = require('express');
const path = require('path');
const app = express();
const PORT  = 8000;

// DEPENDENCY CONSTANTS
const bodyParser = require('body-parser');

// GENERAL CONFIGURATION
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './client/static')));
app.set('views', path.join(__dirname, './client/views'));
app.set('view engine', 'ejs');

// MONGOOSE
require('./server/config/mongoose.js');

// ROUTES
const routes_setter = require('./server/config/routes.js')
routes_setter(app);

// THE IMPORTANT SERVER BIT
app.listen(PORT, ()=>{
  console.log('listening on port' + PORT);
});