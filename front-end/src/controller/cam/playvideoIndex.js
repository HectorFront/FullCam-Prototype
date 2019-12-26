$(document).ready(()=>{

   let idUser = localStorage.getItem('id');
   let idCam = localStorage.getItem('idCam');

   $.get(`http://localhost:8080/cameras/${idUser}/${idCam}`)
    .done(res=>{

   let viewCam = '';

   viewCam += `
                <img id ='video-live' style="color: white; font-size: 30px;" src="${res.url}" width="100%" alt="Offline">
              `

   $('#viewCam').html(viewCam);
   $('#name-cam').html(res.nome);
   $('#location-cam').html(res.localidade);

}).fail(()=>{
   console.log('Error in request cam');
});
   
});




