function doneEdit() {
    $('#show-editor').show();
    $('.description-content').parent().removeClass('editable')
}

function saveEdit(simplemde) {
    $(".description").val(simplemde.value());
    $('.js-save-edit').click();
    doneEdit();
}

function checkDone() {
    if($('.description-edit').is(":visible")){
        window.setTimeout(checkDone, 100);
    } else {
        doneEdit();
    }
}

function attacheEditor() {
    if ($('.window').is(":visible")) {
        
        if (!$('#show-editor').length) {
            $('.js-edit-desc').hide();
            $('.js-edit-desc').first().after($('.js-edit-desc-button').clone().attr({
                class: 'nch-button ml-4',
                id: 'show-editor'
            }).show())
            $('.description-content').parent().removeClass('editable')

            var simplemde;
            $('#show-editor').on("click", function() {
                $('.description-content').parent().addClass('editable')
                $('#show-editor').hide();

                if ($('#desc').length) {     
                    $('.js-show-with-desc').click();
                    simplemde.value($('.description').val());
                } else {      
                    // 
                    $('.description').after("<textarea id='desc' col='0' rows='0'></textarea><div id='edit-controls'><a class='nch-button nch-button--primary' href='#' id='save-change'>Save</a><a class='icon-lg icon-close dark-hover cancel js-cancel-edit' id='cancel-change' href='#'></a></div>");

                    simplemde = new SimpleMDE({
                        toolbar: ["bold", "italic", "heading", "|", "quote", "unordered-list", "ordered-list", "|", "link", "image", "|", "preview"],
                        element: document.getElementById("desc")
                    });
                    $('.js-show-with-desc').click();
                    simplemde.value($('.description').val());

                    $('#save-change').bind("click", function() {
                        saveEdit(simplemde);
                    });

                    $('#cancel-change').bind("click", function() {
                        doneEdit();
                    });
                }

                // To handle the "Escape" key
                checkDone();

                $(".description").hide();
                $(".edit-controls").hide();
            });

            // When there is no description
            if($('.current').text() === "") {                            
                $('.description-content').parent().removeClass('editing')
            }
        }

    }
}

setInterval(attacheEditor, 200);
