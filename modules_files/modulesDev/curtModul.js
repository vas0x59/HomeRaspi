var gv = require('../globalVars.js');

var fs = require('fs');
var path = require('path');
const net = require('net');

function Curt(ipA, idm) {
    this.ip = ipA;

    this.idm = idm;

    this.tOnTime = 1;
    this.tOffTime = 1;

    var value = {};
    value.servo = 0;
    this.value = value;

    var data = {};
    data.ip = ipA;
    data.idm = idm;
    data.module = "curt";

    this.data = data;

    var file = fs.readFileSync(path.join(__dirname, "lampsConfigScenaries.json"), "utf-8");
    var config = JSON.parse(file);
    this.configTime = config[this.ip];

    //Lamp.prototype.idm = idm;
}

Curt.prototype.sendComande = function (body_array, typeOfmes) {

    const client = net.connect({ port: 4234, host: this.ip }, () => {
        var json_buffer = {};
        json_buffer.ip = this.ip;
        json_buffer.module = "curt";
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

Curt.prototype.parseInput = function (input_mes) {
    if (input_mes.type == "comande") {
        this.value.servo = input_mes.body.servo;
        this.sendComande(this.value, input_mes.type);
    }
    else if (input_mes.type == "save_time") {
        this.configTime.timeOn = input_mes.body.timeOn;
        this.configTime.timeOff = input_mes.body.timeOff;
        var fileTowrite = {};
        fileTowrite[this.ip] = this.configTime;
        fs.writeFile(path.join(__dirname, "curtsConfigScenaries.json"), JSON.stringify(fileTowrite), function (err) {
            console.error(err);
        });
    } else {
        console.log('else')
    }
}



Curt.prototype.pageHtml = function () {
    var data = String(fs.readFileSync(path.join(__dirname, "curt.html")));
    //var templates = JSON.parse(String(fs.readFileSync(path.join(__dirname, "lampHtmlTemplats.json"))));
    //var config = JSON.parse(String(fs.readFileSync(path.join(__dirname, "lampsConfig.json"))))[this.ip];

    //data = data.replace(/{{ch0_title}}/gmi, config["ch0_title"]);

    data = data.replace(/{{ip}}/gmi, this.ip);
    data = data.replace(/{{id}}/gmi, this.idm);
    console.log(data);
    return data;
}

Curt.prototype.pageHtmlConfig = function () {
    var data = String(fs.readFileSync(path.join(__dirname, "curtConfig.html")));
    //var templates = JSON.parse(String(fs.readFileSync(path.join(__dirname, "lampHtmlTemplats.json"))));
    var config = this.configTime;

    data = data.replace(/{{curttime}}/gmi, config["timeOn"]);
    data = data.replace(/{{curttime2}}/gmi, config["timeOff"]);

    data = data.replace(/{{ip}}/gmi, this.ip);
    data = data.replace(/{{id}}/gmi, this.idm);
    console.log(data);
    return data;
}

Curt.prototype.getData = function () {
    this.data.value = this.value;
    return this.data;
}

Curt.prototype.handleIntervalM = function () {
    var time = gv.modules[this.configTime.ipOfEmitter].value.time;
    console.log(time);
    console.log(this.configTime.timeOn);
    if (time == this.configTime.timeOn) {
        this.value.servo = 1;

        this.sendComande(this.value, "comande");
    }

    if (time == this.configTime.timeOff) {
        this.value.servo = 0;
        this.sendComande(this.value, "comande");
    }
}
Curt.prototype.type = "curt";

exports.Curt = Curt;