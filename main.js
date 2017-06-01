var gv = require('./modules_files/globalVars.js');
var modulesTcp = require("./modules_files/modulesTcp.js");
var alg = require('./alg/alg');

//tcp server

modulesTcp.start();

//searching(udp multi)
require("./modules_files/searchModulesNet.js").searchModulesNet();

//express http server

// setTimeout(function () {
//     function handleInterval() {
//         gv.modules["192.168.0.61"].handleIntervalM();
//     }

//     setInterval(handleInterval, 30000);
// }, 2000);
var expressServer = require("./expressServer");

expressServer.startExpress(8080); 

setTimeout(function () {
    setInterval(function (){
        alg.alg();    
    }, 5000);
}, 2000);  