$('#filterUser').keyup(function () {

    // Search text
    let text = $(this).val().toLowerCase();

    // Hide all content class element
    $('.tr-users').hide();

    // Search 
    $('.tr-users .info-nome').each(function () {

        if ($(this).text().toLowerCase().indexOf("" + text + "") != -1) {
            $(this).closest('.tr-users').show();
        }
    });
});