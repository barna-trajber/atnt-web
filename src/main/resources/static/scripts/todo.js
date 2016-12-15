
function initMenu() {
    // set this menuitem active
    $('#menuHome').removeClass('active');
    var $thisMenu = $('#menuToDo');
    if (!$thisMenu.hasClass('active')) {
        $thisMenu.addClass('active');
    }
}

function showBody() {
    var body = $("#divBody");
    body.fadeIn("fast");
}

$(document).ready(function () {
    // Init functions call        
    initMenu();
    showBody();
});

//# sourceURL=Todo.js