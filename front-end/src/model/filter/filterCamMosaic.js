$('.filterMosaicModal').keyup(function () {

    // Search text
    let text = $(this).val().toLowerCase();

    // Hide all content class element
    $('.tablemodal-mosaic').hide();

    // Search 
    $('.tablemodal-mosaic .info-cam').each(function () {

        if ($(this).text().toLowerCase().indexOf("" + text + "") != -1) {
            $(this).closest('.tablemodal-mosaic').show();
        }
    });
});