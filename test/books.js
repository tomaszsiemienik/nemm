/**
 * Created by tomek on 23/04/16.
 */

var request = require("supertest");
var expect = require('chai').expect;
var app = require ("../app.js");
var base_url = "http://ec2-52-27-184-247.us-west-2.compute.amazonaws.com:3001/";

describe("GET /books", function(){
    it ("returns 200 status code", function(done){
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
