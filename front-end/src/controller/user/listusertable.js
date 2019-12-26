$(document).ready(()=> {

$.get('http://localhost:8080/users')
    .done(rows => {
        console.log(rows);

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
