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

$(function() {
    $('form').submit(function() {
        var obj1 = $('form').serializeObject();
        var obj2 = {"person" : "tutor"};
        var data = $.extend({}, obj1, obj2);
        console.log(data)
        console.log(JSON.stringify(data))
        
        
        // $.post('/tutorsubmit', data, function(JSON.stringify(data)) {
        //     alert('successdfsfdsfds');
        // });

        // $.post('api/tutor/register', JSON.stringify(data), function(JSON.stringify(data)) {
        //     alert('successdfsfdsfds');
        // });

        $.post('api/tutor/register', data, function(resp, data) {
            console.log(JSON.stringify(data));
            console.log(JSON.stringify(resp));
            if (resp.result === 'success') {
                console.log("sucess")
                alert(resp.message);
                window.location.replace('/tutorthankyou');
            }
            else if (resp.result === 'fail') {
                console.log('fail')
                alert(resp.message);
            }
        }).fail(function() {
            alert( "Error registering" );
          });

        // $.post('/api/', data, function(data) {
        //     alert('successdfsfdsfds');
        // });
        

        //alert(JSON.stringify($('form').serializeObject()));
        // if success redirect them to the thankyou page
        // $.ajax({type: 'POST', url: "/api/tutor/register", data,
        //  success: function(result){
        //  console.log(result)
        //  console.log("form submit works")
        // }});
        
        //$(location).attr('href', './tutorthankyou.html')
        return false;
    });
});
