
function initMenu() {
    // set this menuitem active
    $('#menuHome').removeClass('active');
    var $thisMenu = $('#menuProjects');
    if (!$thisMenu.hasClass('active')) {
        $thisMenu.addClass('active');
    }
}

function showBody() {
    var body = $("#divBody");
    //body.slideDown('fast');
    body.fadeIn("slow");
}


<!-- ------------KENDO UI GRID-------------- -->
function initProjectsKendoGrid() {
    var grid = $("#grid").kendoGrid({
        dataSource: {
            type: "json",
            transport: {
                read: "/project/getAllAppDeploymentData"
            },
            schema: {
                model: {
                    fields: {
                        id: {type: "int"},
                        assetName: {type: "string"},
                        assetId: {type: "string"},

                        assetType: {type: "string"},
                        assetStatus: {type: "string"},

                        domainName: {type: "string"},

                        subDomainName: {type: "string"},
                        targetDate: {type: "datetime"},
                        accountId: {type: "string"},
                        note: {type: "string"},

                        dpm: {type: "string"},
                        apm_spm: {type: "string"},
                        status: {type: "string"},
                        releaseType: {type: "string"}
                    }
                }

            },
            pageSize: 20
        },
        height: 700,
        groupable: true,
        sortable: true,
        pageable: {
            refresh: true,
            pageSizes: true,
            buttonCount: 5
        },
        columns: [
            {
                field: "id",
                title: "Id",
                hidden: true

            }, {
                template: "<div class='customer-photo'></div>" +
                "<div class='customer-name'>#: assetName #</div>",
                field: "assetName",
                title: "Project Name",
                width: 300
            }, {
                field: "releaseType",
                title: "Release Type"
            }, {
                field: "status",
                title: "Status"
            }, {
                field: "accountId",
                title: "Customer"
            }, {
                field: "targetDate",
                title: "Target Date",
                template: "#= kendo.toString(kendo.parseDate(targetDate, 'yyyy-MM-dd'), 'dd/MM/yyyy') #"
            },
            {
                field: "dpm",
                title: "DPM"
            }, {
                field: "apm_spm",
                title: "APM / SPM"
            }, {
                field: "note",
                title: "Note"
            },
            // Custom commands
            {
                command: [
                    {text: "Assign", click: showDetails},
                    {text: "Iterate", click: iterateRecord}
                ],
                title: " ",
                width: "235px",
                attributes: { style: "text-align: left" }
            },
        ],
        dataBound: function (e) { redesignIterateButton(e, this); },
        group: function (e) { redesignIterateButton(e, this); }
    }).data('kendoGrid');
}

function redesignIterateButton (e, kendogrid) {
    // get all Assign buttons and set CSS style
    var allAssignButtons = e.sender.tbody.find(".k-grid-Assign");
    allAssignButtons.css({ "color": "#fff", "background-color": "#f0ad4e", "border-color": "#eea236", "margin-right": "10px" });
    allAssignButtons.find(" > span").addClass("glyphicon glyphicon-tags").css({ "margin-right": "5px" });

    // get all Iterate buttons and set CSS style
    var allIterateButtons = e.sender.tbody.find(".k-grid-Iterate");
    allIterateButtons.css({ "width": "105px" });

    var data = kendogrid.dataSource.view();
         
    // Iterating through table rows
    for (var i = 0; i < data.length; i++) {
        var dataItem = data[i];
        // Get all records from the Grid
        var tr = $("#grid").find("[data-uid='" + dataItem.uid + "']");

        // Get current iterate button CSS style that need to be applied               
        var currentStyle = getIterateForwardButtonStyle(dataItem.nextStatus);
  
        // Set iterate button style
        var iterateButton = tr.find(".k-grid-Iterate");
        iterateButton.css(currentStyle);

        // Set iterate button text
        iterateButton.after().text(dataItem.nextStatus);               
    }

    // Re-set iterated buttons inner span (logo)
    allIterateButtons.prepend('<span class="glyphicon glyphicon-play-circle" style="margin-right: 5px;"></span>');
}

function getIterateForwardButtonStyle(status) {
    var css = {};
    switch (status) {
        case "Iterated":
            css = { "color": "#fff", "background-color": "#337ab7", "border-color": "#2e6da4" };
            break;

        case "Completed":
            //css = { "color": "#fff", "background-color": "#c9302c", "border-color": "#c12e2a" };                  
            css = { "color": "#fff", "background-color": "#449d44", "border-color": "#398439" };
            break;

        case "":
        default:
            css = { "display": "none" };
            break;
    }

    return css;
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

function showDetails(e) {
    e.preventDefault();
    // Get current row from the grid
    var data = this.dataItem($(e.currentTarget).closest("tr"));

    $.get('/appservices/getassignmodal_partial', function (e) {
        $("#divChangeStatusModal").empty();
        $("#divChangeStatusModal").append(e);

        $('#modalProjectsAssign input[id="projectid"]').val(data.id);
        //formAssign.data("projectid", data.id);

        $('#modalProjectsAssign').modal('show');
    });
}

function iterateRecord(e) {
    e.preventDefault();
    // Get current row from the grid
    var data = this.dataItem($(e.currentTarget).closest("tr"));

    var recId = data.id;

    if (recId) {
        recId = recId.toString();
    }

    //console.log(recId);

    $.ajax({
        type: 'POST',
        url: '/project/iterateStatusForward',
        data: { "recId": recId },
        success: function (data) {
            if (data == null || data == "" || data.iserror == null || data.iserror == false) {
                hideServerError();

                // refresh grid
                $('#grid').data('kendoGrid').dataSource.read();


            } else {
                // There was a server validation error
                showServerError(data.message);
            }
        },
        error: function (data) {
            // There was a communication error
            console.log("Iteration: communication error!");
        }
    });
}

$(document).ready(function () {
    // Init functions call        
    initMenu();
    initProjectsKendoGrid();
    showBody();
});

//# sourceURL=Projects.js