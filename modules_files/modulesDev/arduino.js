var SerialPort = require('serialport');
var port = new SerialPort('COM3', {
  baudRate: 115200
});

var nesLcd = new Buffer('{"lcd"}Test<>Node.js<>', "utf-8")
var nesTemp = new Buffer('{"getTemp"}', "utf-8") 
port.on('open', function() {
  setTimeout(function () {
    port.write(nesTemp , function(err) {
    if (err) {
      return console.log('Error on write: ', err.message);
    }
    console.log('message written');
    port.on('data', function (data) {
  console.log('Data: ' + data);
});
    });
  },2000)
  
  
});
 
// open errors will be emitted as an error event 
port.on('error', function(err) {
  console.log('Error: ', err.message);
})

