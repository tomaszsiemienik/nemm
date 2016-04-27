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

//list of the books
router.get('/books', function(req, res, next) {
  booksData.find({}).select({ "name": 1, "_id": 1, "author": 1})
      .then(function(docs) {
          res.status(200)
              .type('json')
              .json({books: docs})
              .end();
      });
});


//add book
router.post('/books', function(req, res, next) {
    var book = new booksData({
        name: req.body.name,
        author: req.body.author
    });

    book.save()
       .then(function() {
            res.status(201)
                .type('json')
                .json(book.toJSON())
                .end();
       });
});

//get single book
router.get('/books/:id', function(req, res, next) {
    booksData.findById(req.params.id, function(err, data) {
        if (err) {
            res.status(404)
                .type('json')
                .json({
                    error: 'book with id ' + req.params.id + ' can not be found'
                })
                .end();
        } else {
            res.status(200)
                .type('json')
                .json(data.toJSON())
                .end();
        }
    });

});

//update book
router.put('/books/:id', function(req, res, next) {
    booksData.findById(req.params.id, function(err, doc) {
        doc.name = req.body.name;
        doc.author = req.body.author;
        doc.save()
            .then(function() {
            res.status(200)
                .type('json')
                .json(doc.toJSON())
                .end();
        });
    });
});

//remove book
router.delete('/books/:id', function(req, res, next) {
    booksData.findById(req.params.id, function(err, data) {
        if (err) {
           res.status(404)
               .type('json')
               .json({
                   error: 'book with id ' + req.params.id + ' can not be found'
               })
               .end();
        }

        booksData.findByIdAndRemove(req.params.id).exec();

        //deleted
        res.status(204)
            .type('json')
            .end();

    });
});

module.exports = router;