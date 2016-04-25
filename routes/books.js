var express = require('express');
var router = express.Router();

// New Code
var mongoose = require('mongoose');
mongoose.connect('localhost:27017/testdb');
var schema = mongoose.Schema;
var booksSchema = new schema({
    'name': String,
    'author': String
}, {collection: 'bookscollection'});

var booksData = mongoose.model('booksData', booksSchema);

router.get('/books', function(req, res, next) {
  booksData.find({}).select({ "name": 1, "_id": 0, "author": 1})
      .then(function(docs) {
          res.status(200)
              .type('json')
              .json({books: docs})
              .end();
      });
});

module.exports = router;