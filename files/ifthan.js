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

/*<!-- Simple Textfield -->
<form action="#">
  <div class="mdl-textfield mdl-js-textfield">
    <input class="mdl-textfield__input" type="text" id="sample1">
    <label class="mdl-textfield__label" for="sample1">Text...</label>
  </div>
</form>*/

    var scenaryId = $('<td>');
    scenaryId.html(scenary.id);
    scenaryId.width('40px');   

    var scenaryIf = $('<td>');
    var scenaryIfD = $('<div class="mdl-textfield mdl-js-textfield">');
    scenaryIfD.width('200px');
    var scenaryIfI = $('<input class="mdl-textfield__input" type="text" id="ifS'+ scenary.id + '">');
    scenaryIfI.attr("value", scenary.ifS);
    scenaryIfD.append(scenaryIfI);
    scenaryIf.append(scenaryIfD);
    scenaryIf.width('200px');

    var scenaryIfVal = $('<td>');
    var scenaryIfValD = $('<div class="mdl-textfield mdl-js-textfield">');
    scenaryIfValD.width('100px');
    var scenaryIfValI = $('<input class="mdl-textfield__input" type="text" id="ifvalS'+ scenary.id + '">');
    scenaryIfValI.attr("value", scenary.ifvalS);
    scenaryIfValD.append(scenaryIfValI);
    scenaryIfVal.append(scenaryIfValD);
    scenaryIfVal.width('100px'); 

    var scenaryThan = $('<td>');
    var scenaryThanD = $('<div class="mdl-textfield mdl-js-textfield">');
    scenaryThanD.width('200px');
    var scenaryThanI = $('<input class="mdl-textfield__input" type="text" id="thanS'+ scenary.id + '">');
    scenaryThanI.attr("value", scenary.thanS);
    scenaryThanD.append(scenaryThanI);
    scenaryThan.append(scenaryThanD);
    scenaryThan.width('200px'); 


    row.append(scenaryId);
    row.append(scenaryIf);
    row.append(scenaryIfVal);
    row.append(scenaryThan);

    //create buttons
    // var button1 = $('<td>');


    // var uploadButton = $('<a>');
    // uploadButton.attr('class', 'mdl-button mdl-js-button');
    // uploadButton.attr('style', 'color: #8bc34a;');
    // uploadButton.attr('id', 'scenaryB' + scenary.id);
    // uploadButton.html('Save');
    // uploadButton.click(function () {
    //     scenaries[scenary.id].save();
    // });
    // button1.append(uploadButton);

    var button2 = $('<td>');


    var uploadButton2 = $('<button>');
    uploadButton2.attr('class', 'mdl-button mdl-js-button mdl-button--icon mdl-button--colored');
    uploadButton2.attr('style', 'color: #ff5722;');
    uploadButton2.html('<i class="material-icons">close</i>');
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
