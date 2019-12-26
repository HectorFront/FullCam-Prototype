const PlayVideo = (idCam)=>{

    let idUser = localStorage.getItem('id');
  

    $.get(`http://localhost:8080/cameras/${idUser}/${idCam}`)
    .done(res=>{

    viewCamReplace = '';

    viewCamReplace += `
                <img id ='video-live' style="color: white; font-size: 30px;" src="${res.url}" width="100%" alt="Offline">
            `

    $('#viewCam').html(viewCamReplace);
    $('#name-cam').html(res.nome);
    $('#location-cam').html(res.localidade);

    }).fail(()=>{
       console.log('Error in request cam');
    })
    
 }