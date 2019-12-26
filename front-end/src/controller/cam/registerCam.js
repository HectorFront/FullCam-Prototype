$(document).ready(()=>{

  let idUser = localStorage.getItem('id');

  $('#register-cam').on('submit', (event)=>{
  event.preventDefault();
      
  let data = {  
      nome: $('#nameCam').val(),
      localidade: $('#locationCam').val(),
      url: $('#urlHls').val()
  };

   $.ajax({
       url: `http://localhost:8080/cameras/${idUser}`,
       data: data,
       method: 'POST'

   }).then(()=>{

      swal("Câmera cadastrada!", "Clique em ok para sair", "success")
      .then(() => {
          $("#myModalAdd").modal('hide');

          $.get(`http://localhost:8080/cameras/${idUser}`)
          .done(res => {
        
          let listcamtable = "";
  
          res.map(res => {
      

                 listcamtable += 
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
  
              $("#table-cam").html(listcamtable);
  
          }).fail(() => {
          
            console.log("Erro listar cameras")
      
          });
      });
   }).catch(()=>{

      swal("Câmera não cadastrada!", "Clique em ok para sair", "error")
      .then(() => {
        $("#myModalAdd").modal('hide');
      });
   });

    });
  });
