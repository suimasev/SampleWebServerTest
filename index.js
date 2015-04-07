/* Sample Web Server Test
A sample test suite around a http web server
*/

var http = require('http');                 //node.js http library
var should = require('should');             //Should assertion library
var req = require("./httpClient");          //Custom http client module 

//constants
var SERVER_PORT = 8888;
var SERVER_MSG = "NodeJS Mocha Fun"

//Verify that the web server can be accessed
describe('Example Web Server: ', function() {
    
    var server;     //Server
    var client;     //Client request
    
    /*********************************** Test Setup *********************************************/

    before(function() {
       //start http server
        server = http.createServer(function(request, response) {
            response.writeHead(200, {"Content-Type":"text/plain"});
            response.write(SERVER_MSG);
            response.end();
        }).listen(SERVER_PORT); 
    });
        
    after(function () {
        //Shut down server
        server.stop;
    });

    beforeEach(function(){
        //Create a new client connection
        client = new req.httpClient; 
    });

    /*********************************** Test Cases *********************************************/
    

    describe('When I contact the HTTP server', function() {

        //Verify that the correct http status code is returned
        it ('status should be 200', function (done) {  
            client.send(function(request) {                
                request.status.should.equal(200);
                done();
            });
        });
        
        //Verify that the correct data is returned
        it ('response message should be \'' + SERVER_MSG + '\'', function (done) {  
            client.send(function(request) {
                request.data.should.equal(SERVER_MSG);
                done();
            });
        });
        
        //Example test that will cause a fail
        it ('this test should fail', function (done) {  
            client.send(function(request) {
                request.data.should.equal("Different data");
                done();
            });
        });

    }); 
});









