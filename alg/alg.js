var fs = require('fs');
var gv = require('../modules_files/globalVars.js');
var path = require('path');
var data = JSON.parse(fs.readFileSync(path.join(__dirname, 'alg.json'), "utf-8"));

function logicFunc(val1, l, val2) {
    var returnsVal = false;
    switch (l) {
        case ">":
            if (val1 > val2) {
                returnsVal = true;
            }
            break;
        case "<":
            if (val1 < val2) {
                returnsVal = true;
            }
            break;
        case "=":
            if (val1 == val2) {
                returnsVal = true;
            }
            break;

        default:
            break;
    }
    return returnsVal;
}
function alg() {

    fs.readFile(path.join(__dirname, 'alg.json'), 'utf-8', function (err, filedaa) {
        console.log(err);
        data = JSON.parse(filedaa);
        var boolWriteToFile = false;
        for (var index = 1; index < data.count; index++) {
            var element = data[index];
            if (gv.modules[element.if.in] != null) {
                if (logicFunc(gv.modules[element.if.in].value[element.if.valueName], element.if.l, element.if.rvalue)) {
                    if (data[index].toggled == "0") {
                        console.log("true" + index);
                        boolWriteToFile = true;
                    }
                    else {
                        if (boolWriteToFile != true) {
                            boolWriteToFile = false;
                        }
                    }
                    data[index].toggled = "1";
                }
                else {
                    if (data[index].toggled == "1") {
                        boolWriteToFile = true;
                    }
                    else {
                        if (boolWriteToFile != true) {
                            boolWriteToFile = false;
                        }
                    }
                    data[index].toggled = "0";
                }
            }
        }
        if (boolWriteToFile == true) {
            fs.writeFile(path.join(__dirname, 'alg.json'), JSON.stringify(data), function (err) {
                console.error(err)
            });
        }
    });
}
exports.alg = alg;