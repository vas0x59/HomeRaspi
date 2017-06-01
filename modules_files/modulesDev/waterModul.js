var fs = require('fs');

const net = require('net');

function Water(ipA, idm) {
    this.ip = ipA;

    this.idm = idm;

    var value = {};
    value.water = 0;

    
    this.value = value;

    var data = {};
    data.ip = ipA;
    data.idm = idm;
    data.module = "water";

    this.data = data;

}

Water.prototype.sendComande = function(body_array, typeOfmes) {

    const client = net.connect({ port: 4234, host: this.ip }, () => {
        var json_buffer = {};
        json_buffer.ip = this.ip;
        json_buffer.module = "water";
        json_buffer.type = typeOfmes;
        json_buffer.body = body_array;
        var result_json = JSON.stringify(json_buffer);
        console.log(result_json);
        client.write(result_json + '\r\n');

    });
    client.on('end', () => {
        console.log('disconnected from server');
    });
}

Water.prototype.parseInput = function(input_mes) {
    // if (input_mes.type == "comande") {
    //     this.value.ch0 = input_mes.body.ch0;
    //     this.value.ch1 = input_mes.body.ch1;
    //     this.value.ch2 = input_mes.body.ch2;
    //     this.value.ch3 = input_mes.body.ch3;
    //     this.sendComande(this.value, input_mes.type);
    // } else 
    if (input_mes.type == "post") {
        this.value.water = input_mes.body.water;
        
        console.log(input_mes)
    } else {
        console.log('else')
    }
}

var path = require('path');

Water.prototype.pageHtml = function() {
    var data = String(fs.readFileSync(path.join(__dirname, "water.html")));
    
    data = data.replace(/{{ip}}/gmi, this.ip);
    data = data.replace(/{{id}}/gmi, this.idm);
    console.log(data);
    return data;
}

Water.prototype.getData = function() {
    this.data.value = this.value;
    return this.data;
}

Water.prototype.type = "water";



exports.Water = Water;