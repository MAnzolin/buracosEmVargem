/*function userSession(){
    return { logged: false, "sex": "default"};
    return {
        "logged": true,
        "name": "Maria da Silva",
        "cpf": "123.456.789-98",
        "username": "maria.d.silva",
        "sex": "woman"
    }
}*/


function setValues(){
    let user = userSession();
    if(user){
        $("#name").val(user.name);
        $("#cpf").val(user.cpf);
        $("#username").val(user.username);
        $("#sex").val(user.sex);
    }

    $(".profile-pic").html(`<img src="/front/galery/profile-${user.sex}.svg" alt="profile"></img>`)
}

function sendForm(){
    
}