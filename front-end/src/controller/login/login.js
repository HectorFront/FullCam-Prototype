$('#login').on('submit', (event)=> {
    event.preventDefault();
    let data = {
        login: $('#user').val(),
        senha: $('#pass').val(),
    };
	
    $.ajax({

        url: 'http://localhost:8080/login',
        data: data,
        method: 'POST'

    }).then((res)=> {
        
        localStorage.setItem("id", res.id);
        window.location.href="index.html";

    }).catch(()=> {

        window.location.href="loginInvalid.html";
        console.log("Usuário inválido");

    });

});

