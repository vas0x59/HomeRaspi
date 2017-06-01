function table(scenary) {
    var row = $('<tr>');
    row.hide();



    var scenaryId = $('<td>');
    scenaryId.html(scenary.id);
    scenaryId.width('40px');

    var scenaryIf = $('<td>');
    scenaryIf.append(
          '<p style="display: inline;">in: </p><input style="width:75px;margin:5px;" id="' + scenary.id + 'In" />'
        + '<p style="display: inline;">vn: </p><input style="width:45px;margin:5px;" id="' + scenary.id + 'In" />'
        + '<p style="display: inline;">l: </p><input style="width:10px;margin:5px;" id="' + scenary.id + 'In" />'
        + '<p style="display: inline;">v: </p><input style="width:20px;margin:5px;" id="' + scenary.id + 'In" />'
    );

    var scenaryThan = $('<td>');
    scenaryThan.append(
          '<p style="display: inline;">out: </p><input style="width:75px;margin:5px;" id="' + scenary.id + 'In" />'
        + '<p style="display: inline;">vn: </p><input style="width:45px;margin:5px;" id="' + scenary.id + 'In" />'
        + '<p style="display: inline;">v: </p><input style="width:45px;margin:5px;" id="' + scenary.id + 'In" />'
    );


    row.append(scenaryId);
    row.append(scenaryIf);

    row.append(scenaryThan);
    row.fadeIn();

    $('#files').prepend(row);
}

var xhr = new XMLHttpRequest();

xhr.open('GET', 'alg/alg.json', true);

xhr.send(); // (1)

var scenaries_index = 0;
var scenaries = {};

xhr.onreadystatechange = function () { // (3)
    if (xhr.readyState != 4) return;

    button.innerHTML = 'Готово!';

    var dataInput = JSON.parse(xhr.responseText);

    scenaries = {};

    scenaries = dataInput;

    scenaries_index = Number(dataInput.count);



    for (var index = 1; index < scenaries_index; index++) {
        var element = scenaries[index];
        table(element);
    }





}

function b1() {
    var scenar = {};
    scenar.id = scenaries_index;
    scenaries[scenaries_index] = scenar;
    table(scenaries[scenaries_index]);
    scenaries_index++;
    scenaries.count = scenaries_index;
}
function b2() {
    var dataOut = JSON.stringify(scenaries)
    socket.emit('algJson',dataOut);
}
