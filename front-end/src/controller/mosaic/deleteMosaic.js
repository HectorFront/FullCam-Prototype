const deleteMosaic = (idMosaic)=>{

    let idUser = localStorage.getItem('id');

     $('#delete-mosaic').on('submit', (event)=> {
            event.preventDefault();
            
        $.ajax({
                url: `http://localhost:8080/mosaicDelete/${idMosaic}/${idUser}`,
                method: 'DELETE'
        
        }).then(()=> {
     
                swal("Mosaico deletado com sucesso!", "Clique em ok para sair", "success")
                .then(()=>{
                    $('#modalMosaicDelete').modal('hide');
    
             $.get(`http://localhost:8080/mosaicTable/${idUser}`)
              .done(res => {
            
              let listMosaicTable = "";
      
              res.map(res => {
    
                     listMosaicTable += 
                      `
                      <tr class='tr-mosaic'>
                            <td>${res.id}</td>
                            <td class='info-nome'>${res.name_mosaic}</td>
                            <td>9 câmeras</td>
                            <td>
                                    <button onclick="viewMosaic(${res.id})"
                                        style="border: none; background-color: rgb(209, 209, 209); border-radius: 5px; height: 25px;"><img
                                        src="https://icons-for-free.com/iconfiles/png/512/eyes+face+makeup+red+eye+see+vision+icon+icon-1320086626360232113.png"
                                        width="15px" height="15px"></img>
                                    </button>
                            </td>
                            <td><button onclick="editMosaic(${res.id})" style='background-color: rgb(17, 17, 17); border: none; color: white;  margin-bottom: 5px; padding: 4px 7px;' class='btn btn-sm btn-info edit' data-toggle='modal' data-target='#modalMosaicUpdate'><i class='fa fa-edit'></i></button></td>
                            <td><button onclick="deleteMosaic(${res.id})" style='background-color: rgb(231, 30, 30); border: none; color: white;  margin-bottom: 5px; padding: 4px 7px;'class='btn btn-sm btn-danger delete' data-toggle='modal' data-target='#modalMosaicDelete'><i class='fa fa-trash'></i></button></td>
                    </tr>
                      `
                  });
      
                  $("#table-mosaic").html(listMosaicTable);
      
              }).fail(() => {
              
                console.log("Erro ao listar mosaicos na tabela")
          
              });
    
                });
        
            }).catch(()=> {
    
                swal("Mosaico não deletado!", "Clique em ok para sair", "error")
                .then(()=>{
    
                    $('#modalMosaicDelete').modal('hide');
            });         
        });
    });
}