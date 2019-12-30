$('#filterMosaicTable').keyup(function () {

    // Search text
    let text = $(this).val().toLowerCase();

    // Hide all content class element
    $('.tr-mosaic').hide();

    // Search 
    $('.tr-mosaic .info-nome').each(function () {

        if ($(this).text().toLowerCase().indexOf("" + text + "") != -1) {
            $(this).closest('.tr-mosaic').show();
        }
    });
});
