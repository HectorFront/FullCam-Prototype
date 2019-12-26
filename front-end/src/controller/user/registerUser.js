$(document).ready(()=>{

let idUser = localStorage.getItem('id');
let countHourUser = localStorage.getItem('RegisterPerHour');
let count = countHourUser;

$('#register-user').on('submit', (event)=> {
    event.preventDefault();

    count++;
    localStorage.setItem('RegisterPerHour', count);

    let data = {
        nome: $('#nome').val(),
        login: $('#login').val(),
        email: $('#email').val(),
        cpf: $('#cpf').val(),
        senha: $('#senha').val(),
        telefone: $('#tel').val(),
        estado: $('#estado').val()
    };

    $.ajax({
        url: 'http://localhost:8080/users',
        data: data,
        method: 'POST'

    }).then(()=> {

        swal("Usuário cadastrado!", "Clique em ok para sair", "success")
        .then(()=>{
            $("#myModalAdd").modal('hide');

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
        });

      }).catch(()=> {

        swal("Usuário não cadastrado!", "Clique em ok para sair", "error")
        .then(()=>{
            $('#myModalAdd').modal('hide');
        });
    });


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
});

    let RegisterPerHour = localStorage.getItem('RegisterPerHour');
    
    let date = new Date();
    let minutes = date.getMinutes();

    if(minutes != 00){
      $('#cad_hour').html(RegisterPerHour);

    }else if(minutes == 00){
      localStorage.setItem('RegisterPerHour', 0);
    }
  
    $.get('http://localhost:8080/countusers')
     .done(res=>{

     
    let users = res.count;

    let mediaHour = (RegisterPerHour * 800);
    let mediaDay = (users * 800);

    localStorage.setItem('MediaDay', mediaDay);
    localStorage.setItem('MediaHour', mediaHour);

   }).fail(()=>{
      console.log('Error in request count users')
   });
});



