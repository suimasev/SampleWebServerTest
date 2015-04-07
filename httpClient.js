/* httpClient.js
Client to connect to http server
*/

var http = require('http');

//Server constants
var SERVER_HOST = 'localhost';
var SERVER_PORT = 8888;

//Constructor
function httpClient() {
    //Server connection details for basic GET call
    this.options = {
        host: SERVER_HOST,
        port: SERVER_PORT
    }; 

    //Set default response values
    this.data = '';
    this.status = 0;
}

//Send http request to specified server and save response values
//Callback is necessary because we want to make sure the response is parsed 
//before we retrieve values for validation
httpClient.prototype.send = function(done) {
    that = this;
    function parseResponse(response) {
        //Get any response data
        response.on('data', function(chunk) {
            that.data += chunk;
        });

        //Some error occurred
        response.on('error', function(e) {
            console.log("Error with request: " + e);
        });

        //Get status and return obj as callback
        response.on('end', function() {
            that.status = response.statusCode;
            done(that);
        });
    }
    //Contact the server
    http.request(this.options, parseResponse).end();
}

//Allow the class to be accessed as 'httpClient'
exports.httpClient = httpClient;
