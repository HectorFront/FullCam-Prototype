$(document).ready(()=> {
    
  let idUser = localStorage.getItem('id');
  let idMosaic = localStorage.getItem('idMosaic');

  $.get(`http://localhost:8080/mosaicView/${idMosaic}`)
   .done(res=>{

        $.get(`http://localhost:8080/cameras/${idUser}/${res.CamOne}`)
        .done(rowOne=>{

            console.log(rowOne.url)

        $.get(`http://localhost:8080/cameras/${idUser}/${res.CamTwo}`)
        .done(rowTwo=>{
        
        $.get(`http://localhost:8080/cameras/${idUser}/${res.CamThree}`)
        .done(rowThree=>{

        $.get(`http://localhost:8080/cameras/${idUser}/${res.CamFour}`)
         .done(rowFour=>{

        $.get(`http://localhost:8080/cameras/${idUser}/${res.CamFive}`)
         .done(rowFive=>{

        $.get(`http://localhost:8080/cameras/${idUser}/${res.CamSix}`)
         .done(rowSix=>{

        $.get(`http://localhost:8080/cameras/${idUser}/${res.CamSeven}`)
         .done(rowSeven=>{

        $.get(`http://localhost:8080/cameras/${idUser}/${res.CamEight}`)
         .done(rowEight=>{
            
        $.get(`http://localhost:8080/cameras/${idUser}/${res.CamNine}`)
         .done(rowNine=>{
         
   
    mosaicView = '';

    mosaicView +=

    `
    <div class="col-lg-4">
            <img src="${rowOne.url}" width="100%" height="400px" alt="Offline">
    </div>

    <div class="col-lg-4">
            <img src="${rowTwo.url}" width="100%" height="400px" alt="Offline">
    </div>

    <div class="col-lg-4">
            <img src="${rowThree.url}" width="100%" height="400px" alt="Offline">
    </div>

    <div class="col-lg-4">
            <img src="${rowFour.url}" width="100%" height="400px" alt="Offline">
    </div>

    <div class="col-lg-4">
            <img src="${rowFive.url}" width="100%" height="400px" alt="Offline">
    </div>

    <div class="col-lg-4">
            <img src="${rowSix.url}" width="100%" height="400px" alt="Offline">
    </div>

    <div class="col-lg-4">
            <img src="${rowSeven.url}" width="100%" height="400px" alt="Offline">
    </div>

    <div class="col-lg-4">
            <img src="${rowEight.url}" width="100%" height="400px" alt="Offline">
    </div>

    <div class="col-lg-4">
            <img src="${rowNine.url}" width="100%" height="400px" alt="Offline">
    </div>
    `

    $('#mosaic').html(mosaicView);

   }).fail(()=>{
       console.log('Erro ao listar câmeras em mosaicos')
   });
   });
   });
   });
   });
   });
   });
   });
   });
   });
   });