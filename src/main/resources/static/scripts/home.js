// Local storage (HTML5) wrapper
function Storage() {
    this.get = function (name) {
        return JSON.parse(window.localStorage.getItem(name));
    };

    this.set = function (name, value) {
        window.localStorage.setItem(name, JSON.stringify(value));
    };

    this.clear = function () {
        window.localStorage.clear();
    };
}

// Global variables
var store = new Storage();

function initMenuItem() {
    // set this menuitem active
    $('div.menubar li').removeClass('active');
    var $thisMenu = $('#menuHome');
    if (!$thisMenu.hasClass('active')) {
        $thisMenu.addClass('active');
    }
}

function hideServerError() {
    var loginErrorDiv = $("#serverValidationError");
    $("#serverValidationError div").empty();
    loginErrorDiv.hide('fast'); // hide error div
}

function showServerError(msg) {
    var loginErrorDiv = $("#serverValidationError");
    $("#serverValidationError div").append(msg);

    loginErrorDiv.show("fast"); // show error div
}

function showBody() {
    var body = $("#divBody");
    body.fadeIn("fast");
}

$(document).ready(function () {
    initMenuItem();
    showBody();

    // --- EVENT HANDLERS ---
    // Menu 'tile' click: Call corresponding menu item click handler (async page load)
    $("div.mainPage a").on('click', function (e) {
        var menuclass = $(this).attr('class').split(' ')[0];
        $("div.menubar a.menuitem." + menuclass).trigger('click');
        e.preventDefault();
    });
});

//# sourceURL=home.js