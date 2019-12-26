const editCam = (camera) => {

    console.log(camera);
    
    let idUser = localStorage.getItem('id');

    $.get(`http://localhost:8080/cameras/${idUser}/${camera}`)
    .done(res=> {

    $('#EditnameCam').val(res.nome);
    $('#EditlocationCam').val(res.localidade);
    $('#EditurlHls').val(res.url);   
    
   });

   $('#update-cam').on('submit', (event)=> {
    event.preventDefault();
    let data = {
        nome: $('#EditnameCam').val(),
        localidade: $('#EditlocationCam').val(),
        url: $('#EditurlHls').val()
    };
	
    $.ajax({
        url: `http://localhost:8080/cameras/${camera}`,
        data: data,
        method: 'PUT'

    }).then(()=> {
       
        swal("Câmera atualizada!", "Clique em ok para sair", "success")
        .then(()=>{
            $("#EditModal").modal('hide');

     $.get(`http://localhost:8080/cameras/${idUser}`)
      .done(res => {

        let rechargedlistcamtable = "";
                
                        res.map(res => {
                
                            rechargedlistcamtable += 
                                `
                                <tr class="tr-cams">
                                    <td>${res.id}</td>
                                    <td class="info-nome">${res.nome}</td>
                                    <td>${res.localidade}</td>
                                    <td>${res.url}</td>
                                    <td><button onclick="editCam(${res.id})" style='background-color: rgb(17, 17, 17); border: none; color: white;  margin-bottom: 5px; padding: 4px 7px;' class='btn btn-sm btn-info edit' data-toggle='modal' data-target='#EditModal'><i class='fa fa-edit'></i></button></td>
                                    <td><button onclick="deleteCam(${res.id})" style='background-color: rgb(231, 30, 30); border: none; color: white;  margin-bottom: 5px; padding: 4px 7px;'class='btn btn-sm btn-danger delete' data-toggle='modal' data-target='#DeleteModal'><i class='fa fa-trash'></i></button></td>
                                </tr>
                                `
                      });
                
        $("#table-cam").html(rechargedlistcamtable);

         }).fail(() => {
            
            console.log("Erro listar cameras")

        });
     });
    }).catch(()=> {

        swal("Câmera não atualizada!", "Clique em ok para sair", "error")
        .then(()=>{
            $("#EditModal").modal('hide');
        });
      });
   });
}