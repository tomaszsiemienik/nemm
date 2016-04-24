// Dependencies

var express = require('express'),
    routes = require('./routes');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/books', routes.books);
app.get('/index', routes.index);
app.get('/test', function(req, res) {
  res.json({ok:'true'});
});

app.get('/', function(req, res) {
  res.json('hooray! welcome to our api!');
});

if (!module.parent) {
  app.listen(3001, function () {
    console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
  });
}