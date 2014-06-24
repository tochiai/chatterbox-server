/* You should implement your request handler function in this file.
 * And hey! This is already getting passed to http.createServer()
 * in basic-server.js. But it won't work as is.
 * You'll have to figure out a way to export this function from
 * this file and include it in basic-server.js so that it actually works.
 * *Hint* Check out the node module documentation at http://nodejs.org/api/modules.html. */
var allMessages = {};
allMessages.results = [];

var room1Messages = {};
room1Messages.results = [];

var handleRequest = function(request, response) {
  /* the 'request' argument comes from nodes http module. It includes info about the
  request - such as what URL the browser is requesting. */

  /* Documentation for both request and response can be found at
   * http://nodemanual.org/0.8.14/nodejs_ref_guide/http.html */

  console.log("Serving request type " + request.method + " for url " + request.url);

  var statusCode;

  var dataBuffer = '';
  /* Without this line, this server wouldn't work. See the note
   * below about CORS. */
  var headers = defaultCorsHeaders;
  headers['Content-Type'] = "text/plain";

  if(request.method === 'GET') {
    if(request.url === "/classes/messages"){
      statusCode = 200;
      response.writeHead(statusCode, headers);
      response.end(JSON.stringify(allMessages));
    } else if(request.url === "/classes/room1"){
      statusCode = 200;
      response.writeHead(statusCode, headers);
      response.end(JSON.stringify(room1Messages));
    } else {
      response.statusCode = 404;
      response.end();
    }
  } else if(request.method === 'POST') {
    if (request.url === "/classes/messages") {
      statusCode = 201;
      request.on('data', function (data) {
        dataBuffer += data;
      });
      request.on('end', function () {
        allMessages.results.push(JSON.parse(dataBuffer));
      });
      response.writeHead(statusCode, headers);
      response.end();
    } else if (request.url === "/classes/room1") {
      statusCode = 201;
      request.on('data', function (data) {
        dataBuffer += data;
      });
      request.on('end', function () {
        room1Messages.results.push(JSON.parse(dataBuffer));
      });
      response.writeHead(statusCode, headers);
      response.end();
    }
  } else if (request.method === 'OPTIONS') {
    statusCode = 200;
    response.writeHead(statusCode, headers);
    response.end();
  }

  /* .writeHead() tells our server what HTTP status code to send back */

  /* Make sure to always call response.end() - Node will not send
   * anything back to the client until you do. The string you pass to
   * response.end() will be the body of the response - i.e. what shows
   * up in the browser.*/


};

/* These headers will allow Cross-Origin Resource Sharing (CORS).
 * This CRUCIAL code allows this server to talk to websites that
 * are on different domains. (Your chat client is running from a url
 * like file://your/chat/client/index.html, which is considered a
 * different domain.) */
var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept, X-HTTP-Method-Override",
  "access-control-max-age": 10 // Seconds.
};

module.exports = handleRequest;

