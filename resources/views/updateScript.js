$(document).ready(function(){

    let conf = false;

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



    let club = getUrlParameter('club');

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
    });

    $("#capacity").on("keypress keyup blur", function (event) {
        $(this).val($(this).val().replace(/[^\d].+/, ""));
        if ((event.which < 48 || event.which > 57)) {
            event.preventDefault();
        }
    });

});
