var debug = require('debug')('app');
var express = require('express');
var session = require('express-session');
//var exphbs = require('express-handlebars');
//var hbs = require('express-handlebars').create();
var logger = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var errorHandler = require('errorhandler');
var mysql = require('mysql');
var path = require('path');
var _ = require('lodash');
var connection = mysql.createConnection({
    host: '10.10.30.14',
    user: 'gogo',
    password: 'qwe123',
    database: 'anyclick_nac'
});
var log = require('loglevel');
//log.enableAll()
var app = express();
app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
// var option = {
//     extname: '.hbs',
//     partialsDir: path.join(__dirname, "view/partial"),
//     layoutsDir: path.join(__dirname, "view/layout"),
//     defaultLayout: path.join(__dirname + "/view/layout/main.hbs")
// }
//app.set('views', path.join(__dirname, 'view'));
//app.engine('.hbs', exphbs(option));
//app.set('view engine', '.hbs');
app.enable("view_cache");
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(methodOverride());
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'uwotm8'
}));
var router = require('./router.js');
app.use('/', router);
var server = app.listen(app.get('port'), function() {
    log.debug('Express server listening on port ' + app.get('port'));
});