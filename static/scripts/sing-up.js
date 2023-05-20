function validForm() {
    let errorMsg = 'Os seguintes campos não foram preenchidos: ';
    let abort = false;
    const form = {};

    form.name = $("#fullname").val();
    form.cpf = $("#cpf").val();
    form.username = $("#username").val();
    form.sex = $("#sex").val();
    form.password = $("#password").val();
    form.confirmPassword = $("#confirm-password").val();
    const fieldLabels = ["Nome", "CPF", "Username", "Sexo", "Senha", "Confirme a senha"];

    if(form.cpf){
        form.cpf = form.cpf.replaceAll('.','');
        form.cpf = form.cpf.replaceAll('-','');
        const regex =  /[0-9]|\./;
        const validCPF = regex.test(form.cpf);

        if(!validCPF){
            alert("CPF inválido.")
            return;
        }
    }

    Object.keys(form).forEach((key, i) => {
        if (!form[key]) {
            errorMsg += fieldLabels[i] + ', ';
            abort = true;
        }
    });

    if (abort) {
        errorMsg = errorMsg.slice(0, errorMsg.length - 2);
        alert(errorMsg);
        return;
    }

    if (form.password != form.confirmPassword) {
        alert("Suas senhas estão diferentes, após alterá-las, tente novamente.");
        return;
    }

    return form;
}

function sendForm(){
    const form = validForm();
    if(!form) return;

    let request = new XMLHttpRequest();
    request.open("POST", "insert-user", true);
    request.setRequestHeader("Content-Type", "application/json");
    request.setRequestHeader("X-CSRFToken", csrftoken);
    request.onload = () => {
        if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
            let response = request.response || "";
            response = JSON.parse(response) || {};
            if(response.answer && response.answer.id){
                setSession(response.answer);
                window.location.href = "/";
            }
        }
    };

    let body = JSON.stringify({data: form})
    request.send(body);
}

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
    
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function setSession(session){
    session.logged = true;
    localStorage.removeItem('user-session-bv');
    localStorage.setItem('user-session-bv', JSON.stringify(session));
}


const csrftoken = getCookie('csrftoken');