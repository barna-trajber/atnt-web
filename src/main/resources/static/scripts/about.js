
function hideLoginInputServerError() {
    var loginErrorDiv = $('#loginError');
    loginErrorDiv.hide('fast'); // hide error div
}

function showLoginInputServerError() {
    var loginErrorDiv = $('#loginError');
    loginErrorDiv.show("fast"); // show error div
}



function initMenu() {
    // set this menuitem active
    $('#menuHome').removeClass('active');
    var $thisMenu = $('#menuAbout');
    if (!$thisMenu.hasClass('active')) {
        $thisMenu.addClass('active');
    }
}

function showBody() {
    var body = $("#divBody");
    body.fadeIn("slow");
}


// disable buttons on submit
$(document).ready(function () {
    initMenu();
    showBody();    
});
