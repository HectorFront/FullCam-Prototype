$(document).ready(()=> {

    let idUser = localStorage.getItem('id');

    $.get(`http://localhost:8080/cameras/${idUser}`)
        .done(res => {
       
        let listcam = "";

        res.map(res => {
    
              listcam +=
                `
                <div class="card-cam">
                  <div id="zoom" class="panel panel-default">
                     <div class="panel-body">
                        <img src="../images/image-listcam.jpeg" alt="stream cam1" class="img-responsive col-lg-6 col-md-12" />
                     <div class="col-lg-6 col-md-12">
                        <h4 class="info-cam">${res.nome} <small> Fullcam</small></h4>
                        <p id="cam">${res.localidade}</p>
                        <a href="viewCameras.html"><button onclick="storageCamIndex(${res.id})" class="btn btn-default btn-block btn-o-primary">Visualizar</button></a>
                        </div>
                    </div>
                    </div>
                </div>
               `
            });

            $("#list-cam").html(listcam);

        }).fail(() => {
        
          console.log("Erro listar cameras")
    
        });
});