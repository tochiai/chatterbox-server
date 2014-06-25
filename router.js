  //require('url')
  //pathname = url.parse(request.url).pathname
  //route[request.method](pathname)
  //get: function (){ if getting valid path, 200, else 404}
  //  hardcode all endpoints
  //  sendResponse(){set statuscode, writehead, end}
  //post:
  //  buffer, store messages, writehead, end
  //options:
  //  make sure to send back those fancy headers + 200
var messages = {};
messages.results = [{username: 'tyler', message: 'hi'},
                    {username: 'tom', message: 'hai'}];

var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "application/json"
};

var url = require('url');
var fs = require('fs');

var handleRequest = function (request, response) {

  var path = request.url;

  var handleGetMessages = function (data) {
    response.writeHead(200, headers);
    response.end(data);
  };

  var handleStaticFileRequest = function(staticFilePath) {
    var staticFileStream = fs.createReadStream('.' + staticFilePath);
    staticFileStream.on('data', function () {
      staticFileStream.pipe(response);
    });

    staticFileStream.on('error', function () {
      response.statusCode = 404;
      response.end();
    });
  };

  var persistData = function() {
    var dataBuffer = '';
    request.on('data', function(data) {
      dataBuffer += data;
    });
    request.on('end', function() {
      messages.results.push(JSON.parse(dataBuffer));
    });
  };

  if(request.method === 'GET'){
    if (/\S*.\S*/.test(request.url)) {
      handleStaticFileRequest(request.url);
    } else if (request.url === '/classes/messages') {
      handleGetMessages((JSON.stringify(messages));
    } else if(request.url === '/'){
      handleStaticFileRequest('./index.html');
    } else {
      response.statusCode = 404;
      response.end();
    }
  } else if(request.method === 'POST') {
    if (request.url === '/classes/messages'){
      persistData();
      response.writeHead(201, headers);
      response.end();
    } else {
      response.statusCode(404);
      response.end();
    }
  }






};

