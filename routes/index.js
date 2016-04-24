exports.index = function(req, res){
  res.render('index', { title: 'Express!!!' })
};

exports.books = function(req, res){
  // New Code
  var mongo = require('mongodb');
  var monk = require('monk');
  var db = monk('localhost:27017/testdb');

  var collection = db.get('bookscollection');
  collection.find({},{},function(e,docs){
    res.render('books', {
      title: 'List of the books',
      books: docs
    });
  });
};