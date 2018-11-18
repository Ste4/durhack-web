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
};

function numberToPrice(num){
    let s = "" + num;
    if (s.length == 1){
        return num + ".00";
    }
    if (s.length == 3){
        return num + "0";
    }
    return num;
};


$(document).ready(function(){

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
            $("#openTime").append($('<option></option>').val(numberToTime(times[i] + j/4)).html(numberToTime(times[i] + j/4)));
            $("#closeTime").append($('<option></option>').val(numberToTime(times[i] + j/4)).html(numberToTime(times[i] + j/4)));
            $("#chargeTime").append($('<option></option>').val(numberToTime(times[i] + j/4)).html(numberToTime(times[i] + j/4)));
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

    let conf = false;

    times = [20, 21, 22, 23, 0, 1, 2, 3, 4];

    let events = {'name':'Test Event', 'year':2018, 'month':11, 'day':18, 'openTime':20, 'closeTime':3, 'description':'Test event lorem ipsum', 'price':3.23};

    let club = getUrlParameter('club');

    for (var i in times){
        for(j=0; j<4; j++){
            $("#openTime").append($('<option></option>').val(times[i] + j/4).html(numberToTime(times[i] + j/4)));
            $("#closeTime").append($('<option></option>').val(times[i] + j/4).html(numberToTime(times[i] + j/4)));
        }
    }

    function getUrlParameter(sParam) {
        var sPageURL = window.location.search.substring(1),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
            }
        }
    };

    //$("#cal").append(createCalendarEntry(events));

    $("#clubName").attr("placeholder", club);

    $("#clubName").click(function(e){
        if (conf == false){
            conf = confirm("Are you sure you want to change the name of your club");
        }
        if (conf == true){
            $("#clubName").removeAttr("readonly");
        }
    });

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

let monthLookup = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
let weekLookup = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function createCalendarEntry(event){
    let date = event.date.split("\/");
    let mmddyyyy = date[1] + "\/" + date[0] + "\/" + date[2];

    dateIcon = '<div class="row row-striped"><div class="col-2 text-right"><h1 class="display-4"><span class="badge badge-secondary">'
                + date[0] + '</span></h1><h2>' + monthLookup[parseInt(date[1])-1] + '</h2></div>';
    title = '<div class="col-10"><h3 class="text-uppercase"><strong>' + 'Event' + '</strong></h3><ul class="list-inline">';
    list = '<li class="list-inline-item"><i class="fa fa-calendar-o" aria-hidden="true"></i> ' + weekLookup[new Date(mmddyyyy).getDay()]
            + '</li><li class="list-inline-item"><i class="fa fa-clock-o" aria-hidden="true"></i> ' + event.open + ' - ' + event.close
            + '</li><li class="list-inline-item"><i class="fa fa-gbp" aria-hidden="true"></i> ' + numberToPrice(event.charge_cost) + '</li></ul>';
    //description = '<p>' + event['description'] + '</p></div></div></div>';
    return dateIcon + title + list;// + description;
};