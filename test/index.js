/**
 * Created by tomek on 23/04/16.
 */

var request = require("request");
var assert = require("assert");
var base_url = "http://ec2-52-27-184-247.us-west-2.compute.amazonaws.com:3001/";
var application = require ("../app.js");

describe("GET /", function(){
    it ("returns 200 status code", function(){
        request.get(base_url, function (error, response, body) {
            application.closeServer();
            assert.isEqual(200, response.statusCode);
            //assert.isEqual("hooray! welcome to our api!", body);
            done();
        });
    });
});
