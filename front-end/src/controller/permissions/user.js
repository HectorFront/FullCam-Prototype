$(document).ready(()=>{

let idStorage = localStorage.getItem('id');

$.get(`http://localhost:8080/users/${idStorage}`)
 .done(res=>{

let userConected = res.nome;

let adminUser = "Hector Silva";

if(userConected == adminUser){
    $("#register_users").show();

}else{
    $("#register_users").hide();
}

});

});
