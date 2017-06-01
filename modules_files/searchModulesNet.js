var dgram = require('dgram');

function searchModulesNet() {
    var message = Buffer.from('vasily-rpi');
    var client = dgram.createSocket('udp4');
    //client.setBroadcast(true);
    //client.setMulticastLoopback(true);

    var client2 = dgram.createSocket('udp4');
    //client2.setBroadcast(true);
    //client2.setMulticastLoopback(true);

    // search ESP8266 modules
    client.send(message, 3234, '239.255.255.50', (err) => {
        console.log(err)
        client.close();
    });

    // search Arduino modules
    client2.send(message, 3235, '239.255.255.51', (err) => {
        console.log(err)
        client2.close();
    });
}

exports.searchModulesNet = searchModulesNet;