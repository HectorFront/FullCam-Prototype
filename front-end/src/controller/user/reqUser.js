let idUser = localStorage.getItem('id');

$.get(`http://localhost:8080/users/${idUser}`)
    .done(res => {
        
        console.log(res)

        $('#usuario_fullcam').html(res.nome);
        $('#modal-name').html(res.nome);
        $('#submodal-name').html(res.nome);
        $('#email_Modal').html(res.email);
       
    }).fail(() => {
        console.log('error in request user')
    });









