var fs = require('fs');
var gv = require('../modules_files/globalVars.js');

var data = JSON.parse(fs.readFileSync("./alg.json", "utf-8"));

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


    for (var index = 0; index < data.count; index++) {
        var element = data[index];
        if (logicFunc(gv.modules[element.if.in].value[element.if.valueName], element.if.l, element.if.rvalue)) {
            console.log("true" + index)
        }
    }
}