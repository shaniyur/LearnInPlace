$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
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

(function($) {
    $.fn.serializeFiles = function() {
      var form = $(this),
          formData = new FormData(),
          formParams = form.serializeArray();
  
      $.each(form.find('input[type="file"]'), function(i, tag) {
        $.each($(tag)[0].files, function(i, file) {
          formData.append(tag.name, file);
        });
      });
  
      $.each(formParams, function(i, val) {
        formData.append(val.name, val.value);
      });
  
      return formData;
    };
  })(jQuery);

$(function() {
    $('form').submit(function() {
        var obj1 = $('form').serializeObject();
        var obj2 = {"person" : "tutor"};
        var data = $.extend({}, obj1, obj2);
        console.log(data);
        console.log(JSON.stringify(data));
        // this does creates a formData Object that has the files inside
        console.log(JSON.stringify($('form').serializeFiles()))
        // checks contents of form data
        var fd = $('form').serializeFiles()
        for (var pair of fd.entries()) {
            console.log(pair[0]+ ' - ' + pair[1]); 
        }
        // this converts it to a json, need to check the files tho, and error for motives
        console.log(JSON.stringify(Object.fromEntries(fd.entries())));

        var js = JSON.stringify(Object.fromEntries(fd.entries()));
        console.log("Let's see: "+ js.tutor_trans)

        // $.post('/tutorsubmit',fd, function(resp, fd) {
        //     console.log(JSON.stringify(fd));
        //     console.log(JSON.stringify(resp));
        //     if (resp.result === 'success') {
        //         console.log("sucess")
        //         alert(resp.message);
        //         window.location.replace('/tutorthankyou');
        //     }
        //     else if (resp.result === 'fail') {
        //         console.log('fail')
        //         alert(resp.message);
        //     }
        // }).fail(function() {
        //     alert( "Error registering" );
        //   });

        $.ajax({
            type: "POST",
            enctype: 'multipart/form-data', 
            url: '/tutorsubmit',
            data: fd,
            contentType: false, //this is requireded please see answers above
            processData: false, //this is requireded please see answers above
            cache: false, //not sure but works for me without this

        });
        
        
        // $.post('api/tutor/register', data, function(resp, data) {
        //     console.log(JSON.stringify(data));
        //     console.log(JSON.stringify(resp));
        //     if (resp.result === 'success') {
        //         console.log("sucess")
        //         alert(resp.message);
        //         window.location.replace('/tutorthankyou');
        //     }
        //     else if (resp.result === 'fail') {
        //         console.log('fail')
        //         alert(resp.message);
        //     }
        // }).fail(function() {
        //     alert( "Error registering" );
        //   });
        return false;
    });
});
