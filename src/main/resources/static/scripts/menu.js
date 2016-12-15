// Local storage (HTML5) wrapper
function LocalStorage() {
    this.get = function(name) {
        return JSON.parse(window.localStorage.getItem(name));
    };

    this.set = function(name, value) {
        window.localStorage.setItem(name, JSON.stringify(value));
    };

    this.clear = function() {
        window.localStorage.clear();
    };
}

var localstorage = new LocalStorage();

// Page navigation function (AJAX)
function navigateToPageAjax(url, params) {
    //console.log(url + "_PartialView?" + params + " executed");
    //+ '&random=' + Math.random()
    $.get(url + '_partial' + '?' + params)
        .done(function (e) {
            $("#divBody").hide();
            $("#divBody").empty();
            $("#divBody").append(e);            

            var baseurl = window.location.protocol + "//" + window.location.host;
            // rewrite url:
            history.pushState('', '', baseurl + url);

            hideAjaxLoader();
        })
        .fail(function (jqXHR) {
            console.log("Page navigation error: " + jqXHR);
        });
}

function showAjaxLoader() {
    $("#ajaxLoader").show();
}

function hideAjaxLoader() {
    $("#ajaxLoader").fadeOut(500);
}

// Set currency convert color
function initCurrencyConvert() {
    if ($("#currConvert").text() == "ON") {
        $("#currConvert").css("color", "#468847").css("border-color", "#d6e9c6");
    } else {
        $("#currConvert").css("color", "#b94a48").css("border-color", "#eed3d7");
    }
}

function showUser() {
    var user = $("li.global-account");    
    user.fadeIn("slow");
}


$(document).ready(function() {
    showUser();

    // ------ EVENT HANDLERS ----------
    $("#deleteUser").on("click", function(e) {
        e.preventDefault();
        // Show user delete confirm dialog
        $('#modalDeleteUser').modal('show');
    });

    $("#menuBarChart").on("click", function(e) {
        localstorage.set('rep_charttype', 'BarChart');
    });

    $("#menuPieChart").on("click", function(e) {
        localstorage.set('rep_charttype', 'PieChart');
    });

    // Menu navigate handler -> load page (AJAX)
    $("div.menubar a.menuitem").on("click", function(e) {
        showAjaxLoader();

        var url = $(this).attr("href");
        var urlArray = url.split('?');
        var locationurl = urlArray[0];
        var params = null;
        if (urlArray.length > 1) {
            params = urlArray[1];
        }

        navigateToPageAjax(locationurl, params);
        e.preventDefault();
    });

    // THIS EVENT MAKES SURE THAT THE BACK/FORWARD BUTTONS WORK AS WELL
    window.onpopstate = function (event) {
        //$("#loading").show();
        var url = location.pathname;
        navigateToPageAjax(url);
    };

});

//# sourceURL=Menu.js