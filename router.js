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

var url = require('url');
var fs = require('fs');

var methods = {
  'GET': handleGet,
  'POST': handlePost,
  'OPTIONS': handleOptions
};

