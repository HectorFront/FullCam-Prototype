$(document).ready(()=>{

  let idUser = localStorage.getItem('id');

$.get('http://localhost:8080/countusers')
 .done(resUser =>{

$.get(`http://localhost:8080/camerasCount/${idUser}`)
 .done(resCam =>{

$('#users-totais-box').html(resUser.count);
$('#cams-totais-box').html(resCam.count);


$('.info-box-number').each(function () {

    $(this).prop('Counter', 0).animate({

    Counter: $(this).text()
        }, {

    duration: 500, easing: 'swing',
    step: function (now) {

    $(this).text(Math.ceil(now));
     }
  });
});

}).fail(()=>{
    console.log("Falha na contagem de todos os usuários");
});

}).fail(()=>{
    console.log("Falha na contagem de todas as câmeras");
});

})