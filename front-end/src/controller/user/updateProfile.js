let id = localStorage.getItem('id');
console.log(`id user: ${id}`);

$('#edit-profile').on('submit', (event)=> {
    event.preventDefault();
    
if($('#senha').val() ==  $('.confirmusuario_senha').val()){
    let data = {
        login: $('#login').val(),
        senha: $('#senha').val()
    };

    $.ajax({
        url: `http://localhost:8080/perfil/${id}`,
        data: data,
        method: 'PUT'

    }).then(()=> {

        swal("Perfil atualizado!", "Clique em ok para sair", "success");

    }).catch(()=> {

        swal("Erro ao atualizar perfil!", "Tente novamente mais tarde", "error");

       });
    }else{
        swal("Erro ao atualizar perfil!", "Confirme sua senha corretamente!", "error");
    }
});


