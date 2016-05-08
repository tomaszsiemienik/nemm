/**
 * Created by tomek on 23/04/16.
 */

var request = require("supertest");
var expect = require('chai').expect;
var app = require ("../app.js");

describe("GET /books", function(){
    it ("get list of books", function(done){
        request(app)
            .get("/books")
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) return done(err);
                var books = res.body.books;
                books.forEach(function(book){
                    expect(book.name).is.a("String");
                    expect(book.author).is.a("String");
                });
                done();
            });
    });
});

describe("GET /books/:id", function(){
    it ("get single book", function(done){
        request(app)
            .get("/books/571d05104708c868a039cc9c/")
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) return done(err);
                var book = res.body;
                expect(book._id).is.equal("571d05104708c868a039cc9c")
                expect(book.name).is.equal("MongoDB Reference Cards ");
                expect(book.author).is.equal("Mongo Inc.");
                done();
            });
    });
});


describe("GET /books/:id", function(){
    it ("404 when book doesn't exist", function(done){
        request(app)
            .get("/books/5xyz/")
            .expect(404)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) return done(err);
                var body = res.body;
                expect(body.error).is.equal("book with id 5xyz can not be found")
                done();
            });
    });
});

describe("Book CRUD", function(){
    var bookId;
    it ("404 to short name adding book", function(done){
        request(app)
            .post("/books")
            .send(
                {
                    "name": "C",
                    "author": "Tomasz Siemienik"
                }
            )
            .expect(404)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) return done(err);
                var body = res.body;
                body.forEach(function(message){
                    expect(message.param).is.equal("name");
                    expect(message.msg).is.equal("Name of the book is required (10-500 characters).");
                    expect(message.value).is.equal("C");
                });
                done();
            });
    });

    it ("404 to short name adding book", function(done){
        request(app)
            .post("/books")
            .send(
                {
                    "name": "Critical blockers in rapid developement",
                    "author": "T"
                }
            )
            .expect(404)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) return done(err);
                var body = res.body;
                body.forEach(function(message){
                    expect(message.param).is.equal("author");
                    expect(message.msg).is.equal("Author of the book is required (3-100 characters).");
                    expect(message.value).is.equal("T");
                });
                done();
            });
    });

    it ("add new book", function(done){
        request(app)
            .post("/books")
            .send(
                {
                    "name": "Critical blockers in rapid developement",
                    "author": "Tomasz Siemienik"
                }
            )
            .expect(201)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) return done(err);
                var book = res.body;
                expect(book.name).is.equal("Critical blockers in rapid developement");
                expect(book.author).is.equal("Tomasz Siemienik");
                bookId = book._id;
                console.log(bookId);
                done();
            });
    });

    it ("404 to short name updating book", function(done){
        request(app)
            .put("/books/"+bookId)
            .send(
                {
                    "name": "C",
                    "author": "Tomasz Siemienik"
                }
            )
            .expect(404)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) return done(err);
                var body = res.body;
                body.forEach(function(message){
                    expect(message.param).is.equal("name");
                    expect(message.msg).is.equal("Name of the book is required (10-500 characters).");
                    expect(message.value).is.equal("C");
                });
                done();
            });
    });

    it ("404 to short name adding book", function(done){
        request(app)
            .put("/books/"+bookId)
            .send(
                {
                    "name": "Critical blockers in rapid developement",
                    "author": "T"
                }
            )
            .expect(404)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) return done(err);
                var body = res.body;
                body.forEach(function(message){
                    expect(message.param).is.equal("author");
                    expect(message.msg).is.equal("Author of the book is required (3-100 characters).");
                    expect(message.value).is.equal("T");
                });
                done();
            });
    });


    it ("update book", function(done){
        request(app)
            .put("/books/"+bookId)
            .send(
                {
                    "name": "Critical blockers in rapid developement UPDATED",
                    "author": "Tomasz Siemienik UPDATED"
                }
            )
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) return done(err);
                var book = res.body;
                expect(book.name).is.equal("Critical blockers in rapid developement UPDATED");
                expect(book.author).is.equal("Tomasz Siemienik UPDATED");
                done();
            });
    });

    it ("delete book", function(done){
        request(app)
            .delete("/books/"+bookId)
            .expect(204)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) return done(err);
                var book = res.body;
                expect(book).is.equal("");
                done();
            });
    });
});