var gv = require('./modules_files/globalVars.js');

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var urlParser = require('url');
var fs = require('fs');
var path = require('path');

app.get('/', function (req, res) {
    res.setHeader("Content-type", "text/html; charset=utf-8");

    var moduleshtml = "";
    for (var i = 0; i < gv.modules_index.length; i += 1) {
        console.log(gv.modules_index[i]);
        var element = gv.modules[gv.modules_index[i]];
        moduleshtml += element.pageHtml();
    }

    moduleshtml += "</div></body></html>";
    fs.readFile("./files/header.html", 'utf-8', function (err, data) {
        if (err) throw err;
        res.end(data + moduleshtml);
    });
});

app.get('/config', function (req, res) {
    res.setHeader("Content-type", "text/html; charset=utf-8");

    var moduleshtml = "";
    for (var i = 0; i < gv.modules_index.length; i += 1) {
        console.log(gv.modules_index[i]);
        var element = gv.modules[gv.modules_index[i]];
        if (element.pageHtmlConfig != null){
            moduleshtml += element.pageHtmlConfig();
        }
        
    }

    moduleshtml += "</div></body></html>";
    fs.readFile("./files/header.html", 'utf-8', function (err, data) {
        if (err) throw err;
        res.end(data + moduleshtml);
    });
});


io.on('connection', function (socket) {
    socket.on('dataIn', function (msg) {
        var body = JSON.parse(msg);
        gv.modules[body.ip].parseInput(body);
        //console.log('ioo');
        socket.emit('dataOut' + body.ip, JSON.stringify(gv.modules[body.ip].getData()));
    });
    socket.on('dataIn2', function (msg) {
        var body = JSON.parse(msg);
        gv.modules[body.ip].parseInput(body);
        console.log('ioo2');
        
    });
    socket.on('dataGet', function (msg) {
        var body = JSON.parse(msg);

        //console.log('iowo ' + msg );
        console.log(JSON.stringify(gv.modules[body.ip].getData()));

        socket.emit('dataOut' + body.ip, JSON.stringify(gv.modules[body.ip].getData()));

    });
});

// app.post('/data', function (req, res) {
//     console.log(req.body);
//     var body = JSON.parse(req.body);
//     var ip = urlParser.parse(req.url, true).query.ip;

//     gv.modules[ip].parseInput(body);
//     console.log(gv.modules[ip].value);

//     res.send(gv.modules[ip].getData());
//     res.end();
// });

app.use(express.static('files'));

function startExpress(port) {

    http.listen(port, function () {
        console.log('Example app listening on port ' + port);
    });
}


exports.startExpress = startExpress;