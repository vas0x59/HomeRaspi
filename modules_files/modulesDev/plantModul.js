var gv = require('../globalVars.js');

var fs = require('fs');
const net = require('net');
var path = require('path');

function Plant(ipA, idm) {
    this.ip = ipA;

    this.idm = idm;

    this.tOnTime = 1;
    this.tOffTime = 1;

    var value = {};
    //value.ch0 = 0;
    value.r = 0;
    value.g = 0;
    value.b = 0;
    value.temp = 0;
    value.humid = 0;
    value.humidM = 0;
    this.value = value;

    var data = {};
    data.ip = ipA;
    data.idm = idm;
    data.module = "plant";

    this.data = data;

}

Plant.prototype.sendComande = function (body_array, typeOfmes) {

    const client = net.connect({ port: 4234, host: this.ip }, () => {
        var json_buffer = {};
        json_buffer.ip = this.ip;
        json_buffer.module = "plant";
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

Plant.prototype.parseInput = function (input_mes) {
    if (input_mes.type == "comande") {
        this.value.r = input_mes.body.r;
        this.value.g = input_mes.body.g;
        this.value.b = input_mes.body.b;
        
        this.sendComande(this.value, input_mes.type);
    } else if (input_mes.type == "post") {
        this.value.temp = input_mes.body.temp;
        this.value.humid = input_mes.body.humid;
        this.value.humidM = input_mes.body.humidM;
        
        console.log(input_mes)
    } else if (input_mes.type == "comande_pompa") {
        console.log(input_mes)
        this.sendComande(input_mes.body, input_mes.type);

    } else {
        console.log('else')
    }
}



Plant.prototype.pageHtml = function () {
    var data = String(fs.readFileSync(path.join(__dirname, "plant.html")));
    //var templates = JSON.parse(String(fs.readFileSync(path.join(__dirname, "lampHtmlTemplats.json"))));
    //var config = JSON.parse(String(fs.readFileSync(path.join(__dirname, "lampsConfig.json"))))[this.ip];

    // data = data.replace(/{{ch0_title}}/gmi, config["ch0_title"]);
    // data = data.replace(/{{ch1_title}}/gmi, config["ch1_title"]);
    // data = data.replace(/{{ch2_title}}/gmi, config["ch2_title"]);
    // data = data.replace(/{{ch3_title}}/gmi, config["ch3_title"]);

    data = data.replace(/{{ip}}/gmi, this.ip);
    data = data.replace(/{{id}}/gmi, this.idm);
    console.log(data);
    return data;
}
// Plant.prototype.pageHtmlConfig = function () {
//     var data = String(fs.readFileSync(path.join(__dirname, "lampConfig.html")));
//     //var templates = JSON.parse(String(fs.readFileSync(path.join(__dirname, "lampHtmlTemplats.json"))));
//     var config = this.configTime;

//     data = data.replace(/{{ip}}/gmi, this.ip);
//     data = data.replace(/{{id}}/gmi, this.idm);
//     console.log(data);
//     return data;
// }
Plant.prototype.getData = function () {
    this.data.value = this.value;
    return this.data;
}

Plant.prototype.type = "plant";


// Plant.prototype.handleIntervalM = function () {
//     var time = gv.modules[this.configTime.ipOfEmitter].value.time;
//     console.log(time);
//     console.log(this.configTime.timeOn);
//     if (time == this.configTime.timeOn) {
//         this.value.ch0 = 1;
//         this.value.ch1 = 1;
//         this.value.ch2 = 1;
//         this.value.ch3 = 1;
//         //this.tOnTime = 0;
//         this.sendComande(this.value, "comande");
//     }

//     if (time == this.configTime.timeOff) {
//         this.value.ch0 = 0;
//         this.value.ch1 = 0;
//         this.value.ch2 = 0;
//         this.value.ch3 = 0;
//         //this.tOffTime = 0;
//         this.sendComande(this.value, "comande");
//     }
//     // else {
//     //     this.tOffTime = 1;
//     // }
// }


exports.Plant = Plant;