let idProfile = localStorage.getItem('id');

$.get(`http://localhost:8080/users/${idProfile}`)
   .done(res=>{

    $('#user-email').html(res.email);
    $('#userboxName').html(res.login);


    $('#login').val(res.login);
    $('#senha').val(res.senha);
    $('.confirmusuario_senha').val(res.senha);

}).fail(()=>{
    console.log('Error in request user profile');
})