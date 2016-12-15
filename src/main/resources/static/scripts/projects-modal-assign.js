function setProjectId() {
    var id = $("#modalProjectsAssign").parent().data("projectid");
    if (id != null) {
        $("#projectid").val(id);
    }
}


function initComboAPM() {
    // create ComboBox from input HTML element
    $("#comboAPM").kendoComboBox({
        dataTextField: "fullName",
        dataValueField: "id",
        //template: '<span class="k-state-default"><h3>#: data.fullName #</h3><p>#: data.userName #</p></span>',
        dataSource: {
            type: "json",
            transport: {
                read: "/AppServices/GetAllAPM"
            }
        },
        filter: "contains",
        suggest: true,
        index: 3
        });
}

function getComboBoxData() {
    showAjaxLoader();
    $.get('/appservices/getAllAPM', function (data) {
        $(".modal.detailsModal #divGroups").html(data);
        initComboAPM();
        hideAjaxLoader();
    });
}



function submitModal(form) {
    $.ajax({
        type: 'POST',
        url: $('.modal').parent().attr('action'),
        data: form,
        success: function (data) {
            if (data == null || data == "" || data.iserror == null || data.iserror == false) {
                // No server validation error
                // Hide this modal & reload page
                $('.modal.addOrEditModal.active').hide('fast', function () {
                    $('.modal-backdrop').remove();
                    $("#menuTransactions a.menuRecTran").trigger("click");
                });
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

$(document).ready(function () {
    setProjectId();
    //getComboBoxData();
    initComboAPM();

    var comboAPM = $("#comboAPM").data("kendoComboBox");
});

//# sourceURL=Projects-Modal.js