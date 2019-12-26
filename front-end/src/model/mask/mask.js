$(document).ready(() => {
    $('#cep').mask('00000-000');
    $('#cepEdit').mask('00000-000');
    $('#tel').mask('(00)0000-0000');
    $('#cpf').mask('00000000000');
    $('#tel-edit').mask('(00)0000-0000');
    $('#cpf-edit').mask('00000000000');
});

$(".senha").on('click', function () {
    let $show = $(".usuario_senha");
    if ($show.attr('type') === 'password') {
        $show.attr('type', 'text');
    } else {
        $show.attr('type', 'password');
    }
});

$(".confirmsenha").on('click', function () {
    let $show = $(".confirmusuario_senha");
    if ($show.attr('type') === 'password') {
        $show.attr('type', 'text');
    } else {
        $show.attr('type', 'password');
    }
});

$(document).ready(function () {
    $("#nascimentoInsert").datepicker({
        language: 'pt-BR'
    });

    $("#nascimentoEdit").datepicker({
        language: 'pt-BR'
    });

});

