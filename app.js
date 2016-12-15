var express = require('express')
  , Primus = require('primus.io')
  , http = require('http')
  , net = require('net')
  , winston = require('winston')
  , app = express()
  , tcpServer = net.createServer()
  , server = http.createServer(app);

var PORT = 4001;

winston.remove(winston.transports.Console);
var logger = winston.add(winston.transports.Console, {
    timestamp: true,
    colorize: true
});

logger.stream = {
    write: function(message, encoding) {
        logger.info(message);
    }
}; 

// Primus server
var primus = new Primus(server);

primus.on('connection', function(spark) {

    spark.on('form_data', function (data) {
        console.log('@@@ form_data',data);

        primus.send('form_data_response', { message: 'from server' });

    });

});

server.listen(PORT, function() {
	winston.info('HTTP - Socket Initialized listening on port | %s',4002)
});

