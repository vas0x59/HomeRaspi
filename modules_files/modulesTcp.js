var lampModul = require('./modulesDev/lampModul.js');
var mainModul = require('./modulesDev/mainModul.js');
var tempModul = require('./modulesDev/tempModul.js');
var curtModul = require('./modulesDev/curtModul.js');
var plantModul = require('./modulesDev/plantModul.js');
var waterModul = require('./modulesDev/waterModul.js');
var gv = require('./globalVars.js');

var net = require('net');
function start() {
    var tcpserver = net.createServer(function (stream) {
        stream.setEncoding('utf8');

        stream.addListener('data', function (data) {
            console.log(data);
            if (data.indexOf("type") > 0 ) {
                var mes = JSON.parse(data);

                if (mes.type == "searchModule") {
                    if (gv.modules[mes.ip] == null || gv.modules[mes.ip] == 0) {
                        var iml = gv.modules_count;
                        switch (mes.module) {
                            case "lamp":

                                gv.modules[mes.ip] = new lampModul.Lamp(mes.ip, iml);
                                gv.modules_index[iml] = mes.ip;
                                gv.modules_count = iml + 1;
                                console.log(gv.modules);
                                break;

                            case "main":

                                gv.modules[mes.ip] = new mainModul.Main(mes.ip, iml);
                                gv.modules_index[iml] = mes.ip;
                                gv.modules_count = iml + 1;
                                console.log(gv.modules);
                                break;
                            case "temp":

                                gv.modules[mes.ip] = new tempModul.Temp(mes.ip, iml);
                                gv.modules_index[iml] = mes.ip;
                                gv.modules_count = iml + 1;
                                console.log(gv.modules);
                                break;
                            case "curt":

                                gv.modules[mes.ip] = new curtModul.Curt(mes.ip, iml);
                                gv.modules_index[iml] = mes.ip;
                                gv.modules_count = iml + 1;
                                console.log(gv.modules);
                                break;
                            case "plant":

                                gv.modules[mes.ip] = new plantModul.Plant(mes.ip, iml);
                                gv.modules_index[iml] = mes.ip;
                                gv.modules_count = iml + 1;
                                console.log(gv.modules);
                                break;
                            case "water":

                                gv.modules[mes.ip] = new waterModul.Water(mes.ip, iml);
                                gv.modules_index[iml] = mes.ip;
                                gv.modules_count = iml + 1;
                                console.log(gv.modules);
                                break;

                            default:
                                break;
                        }
                    }
                    else {
                        console.log("It has found!");
                    }
                }
                else {
                    gv.modules[mes.ip].parseInput(mes);
                }
            }
        });


    });

    tcpserver.listen(1337);
}

exports.start = start;
