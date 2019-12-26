const editUser = (usuario) => {

    let idUser = localStorage.getItem('id');
    
    $.get(`http://localhost:8080/users/${usuario}`)
    .done(res => {
      
    $('#nome-edit').val(res.nome);
    $('#login-edit').val(res.login);
    $('#email-edit').val(res.email);
    $('#senha-edit').val(res.senha);
    $('#cpf-edit').val(res.cpf);
    $('#tel-edit').val(res.telefone);
    $('#estado-edit').val(res.estado);
    
   });

   $('#update-user').on('submit', (event)=> {
    event.preventDefault();
    let data = {
        nome: $('#nome-edit').val(),
        login: $('#login-edit').val(),
        email: $('#email-edit').val(),
        cpf: $('#cpf-edit').val(),
        senha: $('#senha-edit').val(),
        telefone: $('#tel-edit').val(),
        estado: $('#estado-edit').val(),
    };
	
    $.ajax({
        url: `http://localhost:8080/users/${usuario}`,
        data: data,
        method: 'PUT'

    }).then(()=> {
       
        swal("Usuário atualizado!", "Clique em ok para sair", "success")
        .then(()=>{
            $("#EditModal").modal('hide');

     $.get('http://localhost:8080/users')
      .done(rows => {

        let datatable = "";

        rows.map(row => {

            datatable += `
                <tr class="tr-users">
                    <td>${row.id}</td>
                    <td class="info-nome">${row.nome}</td>
                    <td>${row.login}</td>
                    <td>${row.email}</td>
                    <td>${row.cpf}</td>
                    <td>${row.data_registro[8]+row.data_registro[9]+'/'+row.data_registro[5]+row.data_registro[6]+'/'+row.data_registro[0]+row.data_registro[1]+row.data_registro[2]+row.data_registro[3]}</td>
                    <td id='info-tel'>${row.telefone}</td>
                    <td id='info-estado'>${row.estado}</td>
                    <td><button onclick="editUser(${row.id})" style='background-color: rgb(17, 17, 17); border: none; color: white;  margin-bottom: 5px; padding: 4px 7px;' class='btn btn-sm btn-info edit' data-toggle='modal' data-target='#EditModal'><i class='fa fa-edit'></i></button></td>
                    <td><button onclick="deleteUser(${row.id})" style='background-color: rgb(231, 30, 30); border: none; color: white;  margin-bottom: 5px; padding: 4px 7px;'class='btn btn-sm btn-danger delete' data-toggle='modal' data-target='#DeleteModal'><i class='fa fa-trash'></i></button></td>
                </tr>
            `
        });
            $("#table-user").html(datatable);

            }).fail(() => {
            
            console.log("Erro inserir dados da request na tabela")

            });

            $.get(`http://localhost:8080/countusers`)
            .done(res =>{

            $('#users_total').html(res.count);
            $('#users-totais-box').html(res.count);
            

            }).fail(()=>{

                console.log("Falha na contagem de todos os usuários")

            });
        });
        
    }).catch((err)=> {

        swal("Usuário não atualizado!", "Clique em ok para sair", "error")
        .then(()=>{
            $("#EditModal").modal('hide');

         });
      });
   });
}

