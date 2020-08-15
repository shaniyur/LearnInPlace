$.fn.serializeObject = function () {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function () {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

(function ($) {
    $.fn.serializeFiles = function () {
        var form = $(this),
            formData = new FormData(),
            formParams = form.serializeArray();
        let username;
        $.each(formParams, function (i, val) {
            formData.append(val.name, val.value);
            if (val.name === "tutor_email") {
                username = val.value;
            }
        });
        // const path = require('path');
        $.each(form.find('input[type="file"]'), function (i, tag) {
            $.each($(tag)[0].files, function (i, file) {
                let name = tag.name + "_" + username + ".pdf";
                formData.append(tag.name, file, name);
            });
        });
        return formData;
    };
})(jQuery);

$(function () {
    $('form').submit(function () {
        var formData = $('form').serializeObject();
        var fd = $('form').serializeFiles();

        for (var pair of fd.entries()) {
            console.log(pair[0] + ' - ' + pair[1]);
        }

        var result = $.post('api/tutor/register', formData, function (data, resp) {
            if (data.result === 'success') {
                console.log("response success")
                // --------------------------
                $.ajax({
                    type: "POST",
                    enctype: 'multipart/form-data',
                    url: '/api/tutorfileslocal',
                    data: fd,
                    contentType: false, //this is requireded please see answers above
                    processData: false, //this is requireded please see answers above
                    cache: false, //not sure but works for me without this
                    success: function (resp) {
                        console.log(resp)
                        if (resp === 'success') {
                            console.log("Upload success")
                            // window.location.replace('/tutorthankyou');
                        }
                        else {
                            console.log('fail')
                            alert(resp.message);
                        }
                    }
                })
                $.ajax({
                    type: "POST",
                    enctype: 'multipart/form-data',
                    url: '/api/tutorfiles',
                    data: fd,
                    contentType: false, //this is requireded please see answers above
                    processData: false, //this is requireded please see answers above
                    cache: false, //not sure but works for me without this
                    success: function (resp) {
                        console.log(resp)
                        if (resp === 'success') {
                            console.log("Upload success")
                            window.location.replace('/thankyou');
                        }
                        else {
                            console.log('fail')
                            alert(resp.message);
                        }
                    }
                })

                //----------------------------
                $.post('/api/sendEmail', formData, function (err) {
                    if (err) {
                        console.log(Error);
                    }
                });
            }
            else if (data.result === 'fail') {
                console.log('fail')
                alert(data.message);
            }
            return JSON.stringify(resp);
        })
            .fail(function () {
                alert("Error registering");
            });

        return false;
    });
});
