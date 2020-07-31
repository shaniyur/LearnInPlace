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

        $.each(form.find('input[type="file"]'), function (i, tag) {
            $.each($(tag)[0].files, function (i, file) {
                let name = tag.name + "_" + username;
                formData.append(tag.name, file, name);
            });
        });
        return formData;
    };
})(jQuery);

$(function () {
    $('form').submit(function () {
        var data = $('form').serializeObject();
        var fd = $('form').serializeFiles();

        for (var pair of fd.entries()) {
            console.log(pair[0] + ' - ' + pair[1]);
        }

        var result = $.post('api/tutor/register', data, function (data, resp) {
            console.log(JSON.stringify(resp));
            if (resp === 'success') {
                console.log("response success")
                return 'success';
            }
            else if (resp === 'fail') {
                console.log('fail')
                alert(resp.message);
            }
            return JSON.stringify(resp);
        }).success(function () {
            console.log("Extended success");
            $.ajax({
                type: "POST",
                enctype: 'multipart/form-data',
                url: '/tutorfiles',
                data: fd,
                contentType: false, //this is requireded please see answers above
                processData: false, //this is requireded please see answers above
                cache: false, //not sure but works for me without this
                success: function (resp) {
                    if (resp.result === 'success') {
                        console.log("Upload success")
                        alert(resp.message);
                    }
                    else if (resp.result === 'fail') {
                        console.log('fail')
                        alert(resp.message);
                    }
                }
            })
            window.location.replace('/tutorthankyou');
        }).fail(function () {
            alert("Error registering");
        });
        return false;
    });
});
