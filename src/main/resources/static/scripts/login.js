
function hideLoginInputServerError() {
    var loginErrorDiv = $('#loginError');
    loginErrorDiv.hide('fast'); // hide error div
}

function showLoginInputServerError() {
    var loginErrorDiv = $('#loginError');
    loginErrorDiv.show("fast"); // show error div
}


function isValidInput() {
    if ($("span.field-validation-error").length > 0) {
        // JQuery validation error
        return false;
    }

    if ($("div[class='control-group error']").length > 0) {
        // Server validation error
        return false;
    }

    // There was no validation error -> OK
    return true;
}



function initMenu() {
    // set this menuitem active
    $('#menuHome').removeClass('active');
    var $thisMenu = $('#menuLogin');
    if (!$thisMenu.hasClass('active')) {
        $thisMenu.addClass('active');
    }
}

function showBody() {
    var body = $("#divBody");
    body.fadeIn("slow");
}


//resetButtons();
//hideLoginInputServerError();


// disable buttons on submit
$(document).ready(function () {
    initMenu();
    showBody();

    $("#frmLogin").submit(function() {
        // check if there was any validation errors
        //if (!isValidInput()) {
        //    resetButtons();
        //    return;
        //}
        //loadButtons();
    });

    $("button.registerLoginButton").click(function() {
        //loadButtons();
    });

    $("#inputEmail").on('keyup', function() {
        hideLoginInputServerError(); // hide error div
    });

    $("#password").on('keyup', function() {
        hideLoginInputServerError(); // hide error div
    });
});
