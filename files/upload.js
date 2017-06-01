function JSUploader() {
    this.allFiles = [];
    var baseClass = this;

    this.addFiles = function (files) {
        $.each(files, function (i, file) {
            var temp = { file: file, progressTotal: 0, progressDone: 0, element: null, valid: false };

            temp.valid = (file.type == 'image/png'
                || file.type == 'image/jpeg'
                || file.type == 'text/html'
                || file.type == 'text/css'
                || file.type == 'application/javascript'
                || file.type == 'image/jpg') && file.size / 1024 / 1024 < 2;

            temp.element = baseClass.attachFileToView(temp);
            baseClass.allFiles.unshift(temp);
        });
    };

    this.uploadFile = function (index) {
        var file = baseClass.allFiles[index];

        if (file.valid) {
            var data = new FormData();
            data.append('uploadFile', file.file);

            $.ajax({
                url: '/myFile',
                data: data,
                cache: false,
                contentType: false,
                processData: false,
                type: 'POST',
                success: function (response) {
                    var message = file.element.find('td.message');
                    if (response.status == 'ok') {
                        message.html(response.text);
                        file.element.find('button.uploadButton').remove();
                    }
                    else {
                        message.html(response.errors);
                    }
                },
                xhr: function () {
                    var xhr = $.ajaxSettings.xhr();

                    if (xhr.upload) {
                        console.log('xhr upload');

                        xhr.upload.onprogress = function (e) {
                            file.progressDone = e.position || e.loaded;
                            file.progressTotal = e.totalSize || e.total;
                            baseClass.updateFileProgress(index, file.progressDone, file.progressTotal, file.element);
                            baseClass.totalProgressUpdated();
                            console.log('xhr.upload progress: ' + file.progressDone + ' / ' + file.progressTotal + ' = ' + (Math.floor(file.progressDone / file.progressTotal * 1000) / 10) + '%');
                        };
                    }

                    return xhr;
                }
            });
        }
    };

    this.uploadAllFiles = function () {
        $.each(baseClass.allFiles, function (i, file) {
            baseClass.uploadFile(i);
        });

    };

    this.updateFileProgress = function (index, done, total, view) {
        var percent = (Math.floor(done / total * 1000) / 10);

        console.log(percent);
    };

    this.updateTotalProgress = function (done, total) {
        var percent = (Math.floor(done / total * 1000) / 10);
        console.log(percent + 'utp');
        $('.bar1').width(percent + '%');
    };

    this.totalProgressUpdated = function () {
        var done = 0.0;
        var total = 0.0;

        $.each(baseClass.allFiles, function (i, file) {
            done += file.progressDone;
            total += file.progressTotal;
        })

        baseClass.updateTotalProgress(done, total);
    };

    this.attachFileToView = function (file) {
        var row = $('<tr>');
        row.hide();

        var isValidType = (file.file.type == 'image/png'
            || file.file.type == 'image/jpeg'
            || file.file.type == 'text/html'
            || file.file.type == 'text/css'
            || file.file.type == 'application/javascript'
            || file.file.type == 'image/jpg');

        var isValidSize = file.file.size / 1024 / 1024 < 2;

        //create preview
        var preview = $('<td>');
        preview.width('100px');


        //create file info column
        var fileInfo = $('<td>');
        fileInfo.width('200px');

        var fileName = $('<div>');
        fileName.html(file.file.name);

        var fileType = $('<div>');
        fileType.html(file.file.type);

        var fileSize = $('<div>');
        var size = file.file.size;

        if ((file.file.size / 1024 / 1024) > 1.0) {
            fileSize.html(Math.floor(file.file.size / 1024 / 1024) + ' MB');
        }
        else if ((file.file.size / 1024) > 1.0) {
            fileSize.html(Math.floor(file.file.size / 1024) + ' KB');
        }
        else {
            fileSize.html(file.file.size + ' bytes');
        }


        fileInfo.append(fileName);
        fileInfo.append(fileType);
        fileInfo.append(fileSize);

        //create message column
        var messageColumn = $('<td>');
        messageColumn.attr('class', 'message');
        messageColumn.width('200px');
        if (!isValidType) {
            messageColumn.html('Unsupported mimetype ' + file.file.type);
        }
        if (!isValidSize) {
            messageColumn.html(messageColumn.html() + 'File size is ' + Math.floor(file.file.size / 1024 / 1024) + ' MB. Limit is 2MB.');
        }

        //create progress


        //create buttons
        var button1 = $('<td>');


        var uploadButton = $('<a>');
        uploadButton.attr('class', 'mdl-button mdl-js-button');
        uploadButton.attr('style', 'color: #8bc34a;');
        uploadButton.html('Upload');
        uploadButton.click(function () {
            baseClass.uploadFile(row.index());
        });
        if (file.valid) {
            button1.append(uploadButton);
        }

        var button2 = $('<td>');


        var uploadButton2 = $('<button>');
        uploadButton2.attr('class', 'mdl-button mdl-js-button mdl-button--icon mdl-button--colored');
        uploadButton2.attr('style', 'color: #ff5722;');
        uploadButton2.html('<i class="material-icons">close</i>');
        uploadButton2.click(function () {
            $('.bar1').width(0 + '%');
            baseClass.allFiles.splice(row.index(), 1);
            row.fadeOut(300, function () {
                $(this).remove();
            });

        });
        
        button2.append(uploadButton2);

        row.append(fileInfo);

        row.append(button1);
        row.append(button2);
        row.fadeIn();

        $('#files').prepend(row);

        return row;
    };
}

var filesInDirRes = {};

var uploader = new JSUploader();

function del_b() {
    // 1. Создаём новый объект XMLHttpRequest
    var xhr = new XMLHttpRequest();

    // 2. Конфигурируем его: GET-запрос на URL 'phones.json'
    xhr.open('PUT', "/del?file=" + document.getElementById('del_name').value, false);

    // 3. Отсылаем запрос
    xhr.send();
}
var indexT = 0;
function list_b() {
    // 1. Создаём новый объект XMLHttpRequest
    var xhr = new XMLHttpRequest();
    // 2. Конфигурируем его: GET-запрос на URL 'phones.json'
    xhr.open('GET', "/list?dir=" + document.getElementById('dir_name').value, false);

    // 3. Отсылаем запрос
    xhr.send();
    if (xhr.status != 200) {
        // обработать ошибку
        alert(xhr.status + ': ' + xhr.statusText); // пример вывода: 404: Not Found
    } else {
        $('#file_list').html("");
        filesInDirRes = JSON.parse(xhr.responseText);
        for (indexT = 0; indexT < filesInDirRes.len + 0; indexT++) {
            // вывести результат
            var row = $('<tr>');
            row.attr('id', 'fileInDir' + indexT)
            row.hide();


            //create file info column
            var fileInfo = $('<td>');
            fileInfo.width('200px');

            var fileName = $('<div>');
            fileName.html(filesInDirRes[indexT]);


            fileInfo.append(fileName);

            //create buttons
            var button1 = $('<td>');


            var uploadButton = $('<a>');
            uploadButton.attr('class', 'mdl-button mdl-js-button');
            uploadButton.attr('style', 'color: #8bc34a;');
            uploadButton.attr('href', '/files/' + filesInDirRes[indexT]);
            uploadButton.attr('download', '');
            uploadButton.html('Download');
            

            button1.append(uploadButton);


            var button2 = $('<td>');


            var uploadButton2 = $('<button>');
            uploadButton2.attr('class', 'mdl-button mdl-js-button');
            uploadButton2.attr('id', '#fileInDirB' + indexT);
            uploadButton2.attr('onclick', 'button_del_file(' + indexT + ');');
            uploadButton2.attr('style', 'color: #ff5722;');
            uploadButton2.html('del');

            button2.append(uploadButton2);


            row.append(fileInfo);

             row.append(button1);
            row.append(button2);
            row.fadeIn();

            $('#file_list').prepend(row);

        }
        

    }


}

function button_del_file(num) {
    var qwertyui = '#fileInDir' + num;
    console.log(qwertyui);
    $(qwertyui).fadeOut(300, function () {
         $(qwertyui).remove();
    });
    var xhr = new XMLHttpRequest();

    // 2. Конфигурируем его: GET-запрос на URL 'phones.json'
    xhr.open('PUT', "/del?file=" + filesInDirRes[num] + '&dir=' + document.getElementById('dir_name').value, false);

    // 3. Отсылаем запрос
    xhr.send();
    
}

$(document).ready(function () {
    $("#addFilesButton").click(function () {
        $("#uploadFiles").replaceWith($("#uploadFiles").clone(true));
        $("#uploadFiles").click();
    });

    $("#uploadAllFilesButton").click(function () {
        uploader.uploadAllFiles();
    });

    $("#uploadFiles").change(function () {
        var files = this.files;

        uploader.addFiles(files);
    });

    $("#del_b").click(function () {
        del_b();
    });

});
