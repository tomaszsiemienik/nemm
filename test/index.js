/**
 * Created by tomek on 23/04/16.
 */

var request = require("supertest");
var assert = require('assert');
var app = require ("../app.js");
var base_url = "http://ec2-52-27-184-247.us-west-2.compute.amazonaws.com:3001/";

describe("GET /", function(){
    it ("returns 200 status code", function(done){
        request(app)
            .get("/")
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) return done(err);
                assert.equal("hooray! welcome to our api!", res.body);
                done();
            });
    });
});
