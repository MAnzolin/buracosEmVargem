function setValues(){
    let user = userSession();
    if(user){
        $("#name").val(user.name);
        $("#cpf").val(user.cpf);
        $("#username").val(user.username);
        $("#sex").val(user.sex);
    }

    $(".profile-pic").html(`<img src="/static/galery/profile-${user.sex}.svg" alt="profile"></img>`)
}

function sendForm(){
    
}