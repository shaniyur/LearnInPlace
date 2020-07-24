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
        //const data = $('#result').text(JSON.stringify($('form').serializeObject()));
        // call to back end
        // var newForm = $.extend({}, $('form'), {type:'tutor'})
        // var data = JSON.stringify(newForm.serializeObject());
        //$('form').append('<input type="hidden" name="type" value="tutor">');
        //$( '#tutorsignups' ).append( JSON.stringify( {type: "tutor"} ) ); 
        //$.extend(this,{type:data});
        //original one is below
        //const data = JSON.stringify($('form').serializeObject());
        //$.extend(data, JSON.stringify({type: 'tutor'}));

        var obj1 = $('form').serializeObject();
        var obj2 = {person: "tutor"};
        var data = $.extend({}, obj1, obj2);

        
        $.post('/tutorsubmit', data, function() {
            console.log('Server got tutor data');
        });
        //alert(JSON.stringify($('form').serializeObject()));
        // if success redirect them to the thankyou page
        $(location).attr('href', './tutorthankyou.html')
        return false;
    });
});