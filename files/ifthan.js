var xhr = new XMLHttpRequest();

xhr.open('GET', 'phones.json', true);

xhr.send(); // (1)

xhr.onreadystatechange = function() { // (3)
  if (xhr.readyState != 4) return;

  button.innerHTML = 'Готово!';



var scenaries = {};

var scenaries_index = 0;

function b1(){
    var scenar = {};
    scenar.id = scenaries_index;
    scenaries[scenaries_index] = scenar;
    table(scenaries[scenaries_index]);
    scenaries_index++;
}
function b2(){
    var scenar = {};
    scenar.id = scenaries_index;
    scenaries[scenaries_index] = scenar;
    table(scenaries[scenaries_index]);
    scenaries_index++;
}


function table(scenary) {
    var row = $('<tr>');
    row.hide();



    var scenaryId = $('<td>');
    scenaryId.html(scenary.id);
    scenaryId.width('40px');

    var scenaryIf = $('<td>');


    var scenaryThan = $('<td>');



    row.append(scenaryId);
    row.append(scenaryIf);

    row.append(scenaryThan);


    var button2 = $('<td>');


    var uploadButton2 = $('<button>');
    uploadButton2.attr('class', 'mdl-button mdl-js-button mdl-button--icon mdl-button--colored');
    uploadButton2.attr('style', 'color: #ff5722;');
    uploadButton2.html('x');
    uploadButton2.click(function () {

        row.fadeOut(300, function () {
            $(this).remove();
        });

    });

    button2.append(uploadButton2);

    //row.append(scenaryInfo);

    // row.append(button1);
    row.append(button2);
    row.fadeIn();

    $('#files').prepend(row);
}
