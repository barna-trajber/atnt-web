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
var isExpense = (store.get('tran_isexpense') == null ? true : store.get('tran_isexpense'));
var dateTarget = kendo.toString(new Date(), "yyyy-MM-dd");

function showAjaxLoader() {
    $("#ajaxLoader").show();
}

function hideAjaxLoader() {
    $("#ajaxLoader").fadeOut(500);
}


// ----- INIT FUNCTIONS ------
function initTextInputs() {
    //$("#Note").val((transactionToEdit == null || transactionToEdit.Note == null) ? "" : transactionToEdit.Note);
}


function enableFormButtons() {
    $('#btnSave').removeAttr('disabled');
    $('#btnCancel').removeAttr('disabled');
}

function disableFormButtons() {
    $('#btnSave').attr('disabled', 'disabled');
    $('#btnCancel').attr('disabled', 'disabled');
}


function initMenu() {
    // set this menuitem active
    $('#menuHome').removeClass('active');
    var $thisMenu = $('#menuApplicationServices');
    if (!$thisMenu.hasClass('active')) {
        $thisMenu.addClass('active');
    }
}


// --- Other Transaction Page init functions ---
function initDateInputs() {
    // Datepicker   
    $("#TargetDate").kendoDatePicker(
    {
        format: "dd MMMM yyyy",
        parseFormats: ["yyyy-MM-dd", "dd MMMM yyyy"],
        culture: "en-US",
        value: dateTarget,
        change: function () {
            dateTarget = kendo.toString(this.value(), "yyyy-MM-dd");
        }
    });
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
    //body.slideDown('fast');
    body.fadeIn("slow");
}
// --------------------------------

function submitForm(form) {
    $.ajax({
        type: 'POST',
        url: $('form').attr('action'),
        data: form,
        success: function (data) {
            if (data == null || data == "" || data.iserror == null || data.iserror == false) {
                // No server validation error -> redirect to home!
                $("#menuProjects a").trigger("click");
            } else {
                // There was a server validation error
                enableFormButtons();
                // Show server validation error div
                showServerError(data.message);
            }
        },
        error: function (data) {
            // There was a communication error
            enableFormButtons();
            showServerError(data);
        }
    });
}

function initFormTitle() {
    var title = $('#frmSunsetRequest').data('formtitle');

    if (title != null && title != "undefined" && title.length > 0) {
        $('div #titleBar').html(title);
    }
}


$(document).ready(function () {
    // Init functions call          
    initMenu();
    initTextInputs();
    initDateInputs();
    showBody();

    $('form').on('keyup', 'input', function (e) {
        hideServerError();
    });

    $('form').on('change', 'input', function (e) {
        hideServerError();
    });

    $('form').on('click', 'ul', function (e) {
        hideServerError();
    });

    $('form').on('click', 'button', function (e) {
        hideServerError();
    });

  
    // Cancel button click 
    $("#btnCancel").on("click", function (e) {
        $("#menuHome").trigger("click");
        e.preventDefault();
    });

    // -- SUBMIT EVENT HANDLER --
    $('form').submit(function (e) {
        e.preventDefault();
        disableFormButtons();

        // Check if there was any client side validation error                     
        // --- 1. CLIENT VALIDATION ---
        // TODO!

        // Valid CLIENT data inputs -> Server validation & SUBMIT
        // --- 2. SERVER VALIDATION & SUBMIT ---
        var form = $(this).serialize();
        submitForm(form);

        //// Check if there was any client side validation error                     
        //// --- 1. CLIENT VALIDATION ---
        //if (validator.validate()) {
        //    // Valid Kendo Inputs
        //    if (isEqualized || refreshAndValidateSubTotal()) {
        //        // Valid CLIENT data inputs -> Server validation & SUBMIT                    

        //        // --- 2. SERVER VALIDATION & SUBMIT ---
        //        var form = $(this).serialize();
        //        submitForm(form);
        //    } else {
        //        // Subtotal is invalid (client validation)
        //        enableFormButtons();

        //        var clientErrorMsg = "Sub Total is not equal with Total Amount!";
        //        showServerError(clientErrorMsg);
        //    }
        //} else {
        //    // Invalid Kendo input
        //    enableFormButtons();
        //}
    });
});

//# sourceURL=Sunsetform.js