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

  var methods = {
    'GET': handleGet,
    'POST': handlePost,
    'OPTIONS': handleOptions
  };

  var path = request.url;

  var handleGet = function (data) {
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

  if (/\S*.\S*/.test(request.url)) {
    handleStaticFileRequest(request.url);
  } else if (request.url === '/classes/messages') {
    methods[request.method](JSON.stringify(messages));
  }




};

