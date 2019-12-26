$(document).ready(function() {

$('#filterCard').keyup(function () {

    // Search text
    let text = $(this).val().toLowerCase();

    // Hide all content class element
    $('.card-cam').hide();

    // Search 
    $('.card-cam .info-cam').each(function () {

        if ($(this).text().toLowerCase().indexOf("" + text + "") != -1) {
            $(this).closest('.card-cam').show();
        }
    });
 });
});