$(document).ready(function(){

    function numberToTime(num){
        let frac = num % 1;
        let min = (60 * frac);
        let hr = (num - frac);
        if (min < 10){
            min = '0' + min;
        }
        if (hr < 10){
            hr = '0' + hr;
        }
        return hr + ':' + min;
    }

    let times = [20, 21, 22, 23, 0, 1, 2, 3, 4];
    var i;
    for (i=1;i<=31;i++){
        $("#day").append($('<option></option>').val(i).html(i));
    }
    for (i=1;i<=12;i++){
        $("#month").append($('<option></option>').val(i).html(i));
    }
    for (i=2018;i<=2025;i++){
        $("#year").append($('<option></option>').val(i).html(i));
    }

    var j

    for (i in times){
        for(j=0; j<4; j++){
            $("#openTime").append($('<option></option>').val(times[i] + j/4).html(numberToTime(times[i] + j/4)));
            $("#closeTime").append($('<option></option>').val(times[i] + j/4).html(numberToTime(times[i] + j/4)));
            $("#chargeTime").append($('<option></option>').val(times[i] + j/4).html(numberToTime(times[i] + j/4)));
        }
    }

    $("#price").on("keypress keyup blur", function (event) {
        $(this).val($(this).val().replace(/[^0-9\.]/g,''));
        if ((event.which != 46 || $(this).val().indexOf('.') != -1) && (event.which < 48 || event.which > 57)) {
            event.preventDefault();
        }
    });

    $("#capacity").on("keypress keyup blur", function (event) {
        $(this).val($(this).val().replace(/[^\d].+/, ""));
        if ((event.which < 48 || event.which > 57)) {
            event.preventDefault();
        }
    });

});
