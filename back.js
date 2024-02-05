var servidor = require('http');
var archivo = require('fs');

servidor.createServer(function(req, res) {
res.writeHead(200, {'Content-Type': 'text/html'});
  archivo.readFile('front.html', 'utf8', function(err, data) {
      
      res.write(data);
      res.end();
    });
 
}).listen(8080)
