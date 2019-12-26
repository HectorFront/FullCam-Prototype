$(document).ready(()=> {

    let idUser = localStorage.getItem('id');

    $.get(`http://localhost:8080/cameras/${idUser}`)
        .done(res => {
       
        let listcamMosaic = "";

        res.map(res => {
    
              listcamMosaic +=
                `
                 <tr class="tablemodal-mosaic">
                    <td>${res.id}</td>
                    <td class="info-cam">${res.nome}</td>
                    <td><div class="checkbox">
                    <label class="checkbox__container">
                        <input class="checkbox__toggle" onclick="selectCam()" value="${res.id}" type="checkbox"></input>
                        <span class="checkbox__checker"></span>
                        <span class="checkbox__cross"></span>
                        <span class="checkbox__ok"></span>
                        <svg class="checkbox__bg" space="preserve" style="enable-background:new 0 0 110 43.76;" version="1.1" viewbox="0 0 110 43.76">
                        <path class="shape" d="M88.256,43.76c12.188,0,21.88-9.796,21.88-21.88S100.247,0,88.256,0c-15.745,0-20.67,12.281-33.257,12.281,S38.16,0,21.731,0C9.622,0-0.149,9.796-0.149,21.88s9.672,21.88,21.88,21.88c17.519,0,20.67-13.384,33.263-13.384,S72.784,43.76,88.256,43.76z"></path>
                        </svg>
                    </label>
                  </div></td>
                </tr>
                `
            });

            $("#table-selectcams").html(listcamMosaic);
            $('#table-selectcamsUpdate').html(listcamMosaic);

        }).fail(() => {
        
          console.log("Erro ao listar cameras");
    
        });
});