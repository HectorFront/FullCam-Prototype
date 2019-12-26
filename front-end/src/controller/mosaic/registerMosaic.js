const selectCam = ()=> {

        let values = new Array;

        let checkboxCam = $('.checkbox__toggle:checked');

        $(".checkbox__toggle:checkbox").click(function(){
            if ($(".checkbox__toggle:checked").length > 9){

                swal("Limite de câmeras selecionadas atingido!", "clique em ok para sair", "error");
                return false;
            }
        });

        for (let i = 0; i < checkboxCam.length; i++) { 
            values.push(checkboxCam[i].value);
     }
        return values;
}

 $(document).ready(()=>{

    let idUser = localStorage.getItem('id');

    $('#register-mosaic').on('submit', (event)=>{
            event.preventDefault();

        if($(".checkbox__toggle:checked").length == 0){
                swal("Erro, nenhuma câmera selecionada!", "clique em ok para sair", "error");
        }else{

        let data = {
            name: $('#name').val(),
            CamOne:  selectCam()[0],
            CamTwo: selectCam()[1],
            CamThree: selectCam()[2],
            CamFour: selectCam()[3],
            CamFive: selectCam()[4],
            CamSix: selectCam()[5],
            CamSeven: selectCam()[6],
            CamEight: selectCam()[7],
            CamNine: selectCam()[8]
};

           

            data.CamOne == undefined ? data.CamOne = 0 : null;
            data.CamTwo == undefined ? data.CamTwo = 0 : null;
            data.CamThree == undefined ? data.CamThree = 0 : null;
            data.CamFour == undefined ? data.CamFour = 0 : null;
            data.CamFive == undefined ? data.CamFive = 0 : null;
            data.CamSix == undefined ? data.CamSix = 0 : null;
            data.CamSeven == undefined ? data.CamSeven = 0 : null;
            data.CamEight == undefined ? data.CamEight = 0 : null;
            data.CamNine == undefined ? data.CamNine = 0 : null;
     
$.ajax({
             url: `http://localhost:8080/mosaic/${idUser}`,
             data: data,
             method: 'POST'
      
}).then(()=>{

    let idUser = localStorage.getItem('id');

    $.get(`http://localhost:8080/mosaicTable/${idUser}`)    
    .done(res=>{
                
    let mosaicTable = '';

    res.map(res=>{
            
    mosaicTable +=
        `
              <tr class='tr-mosaic'>
                    <td>${res.id}</td>
                    <td class='info-nome'>${res.name_mosaic}</td>
                    <td>9 câmeras</td>
                    <td><button onclick="viewMosaic(${res.id})" style="border: none; background-color: rgb(209, 209, 209); border-radius: 5px; height: 25px;"><img src="https://icons-for-free.com/iconfiles/png/512/eyes+face+makeup+red+eye+see+vision+icon+icon-1320086626360232113.png"
                    width="15px" height="15px"></img></button></td>
                    <td><button onclick="editMosaic(${res.id})" style='background-color: rgb(17, 17, 17); border: none; color: white;  margin-bottom: 5px; padding: 4px 7px;' class='btn btn-sm btn-info edit' data-toggle='modal' data-target='#modalMosaicUpdate'><i class='fa fa-edit'></i></button></td>
                    <td><button onclick="deleteMosaic(${res.id})" style='background-color: rgb(231, 30, 30); border: none; color: white;  margin-bottom: 5px; padding: 4px 7px;'class='btn btn-sm btn-danger delete' data-toggle='modal' data-target='#modalMosaicDelete'><i class='fa fa-trash'></i></button></td>
              </tr>
        `
});
              $('#table-mosaic').html(mosaicTable);
});
              swal("Mosaico criado!", "Clique em ok para sair", "success")
              .then(()=>{

              $("#modalMosaic").modal('hide');
              $('#name').val('');
});

}).fail(()=>{
             swal("Erro ao criar mosaico!", "Tente novamente mais tarde, clique em ok para sair", "error")
             .then(()=>{
                 
             $("#modalMosaic").modal('hide');
    });
   });
  }
});

    let checkboxesCam = $('.checkbox__toggle');

    for (let i = 0; i < checkboxesCam.length; i++) {
             checkboxesCam[i].addEventListener('click', selectCam, false);
}

});