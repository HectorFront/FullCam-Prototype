$('#filterCam').keyup(function () {

    // Search text
    let text = $(this).val().toLowerCase();

    // Hide all content class element
    $('.tr-cams').hide();

    // Search 
    $('.tr-cams .info-nome').each(function () {

        if ($(this).text().toLowerCase().indexOf("" + text + "") != -1) {
            $(this).closest('.tr-cams').show();
        }
    });
});