var fs = require('fs');

const net = require('net');

function Main(ipA, idm) {
    this.ip = ipA;

    this.idm = idm;

    var value = {};
    value.temp = 0;
    value.humid = 0;
    value.press = 0;
    value.time = 0;
    this.lcd = "";
    this.value = value;

    var data = {};
    data.ip = ipA;
    data.idm = idm;
    data.module = "main";

    this.data = data;

}

Main.prototype.sendComande = function(body_array, typeOfmes) {

    const client = net.connect({ port: 4234, host: this.ip }, () => {
        var json_buffer = {};
        json_buffer.ip = this.ip;
        json_buffer.module = "main";
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

Main.prototype.parseInput = function(input_mes) {
    // if (input_mes.type == "comande") {
    //     this.value.ch0 = input_mes.body.ch0;
    //     this.value.ch1 = input_mes.body.ch1;
    //     this.value.ch2 = input_mes.body.ch2;
    //     this.value.ch3 = input_mes.body.ch3;
    //     this.sendComande(this.value, input_mes.type);
    // } else 
    if (input_mes.type == "post") {
        this.value.temp = input_mes.body.temp;
        this.value.humid = input_mes.body.humid;
        this.value.press = input_mes.body.press;
        this.value.time = input_mes.body.time;
        console.log(input_mes)
    } else {
        console.log('else')
    }
}

var path = require('path');

Main.prototype.pageHtml = function() {
    var data = String(fs.readFileSync(path.join(__dirname, "main.html")));
    
    //var config = JSON.parse(String(fs.readFileSync(path.join(__dirname, "mainsConfig.json"))))[this.ip];
    
    // data = data.replace(/{{ch0_title}}/gmi, config["ch0_title"]);
    // data = data.replace(/{{ch1_title}}/gmi, config["ch1_title"]);
    // data = data.replace(/{{ch2_title}}/gmi, config["ch2_title"]);
    // data = data.replace(/{{ch3_title}}/gmi, config["ch3_title"]);

    data = data.replace(/{{ip}}/gmi, this.ip);
    data = data.replace(/{{id}}/gmi, this.idm);
    console.log(data);
    return data;
}

Main.prototype.getData = function() {
    this.data.value = this.value;
    return this.data;
}

Main.prototype.type = "main";



exports.Main = Main;