const express = require('express');
const app = express();
const routes = require('./routes/routes');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/', routes);

//fix deprecation warnings
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

//connect to the database
mongoose.connect('mongodb+srv://dusandjuric:1234@cluster0-10got.gcp.mongodb.net/oglasi?retryWrites=true&w=majority');
mongoose.Promise = global.Promise; //mongodb promise is deprecated

app.listen(3000, function(){
    console.log('Listening to port 3000');
});