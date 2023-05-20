function changeTitle(type) {
    type = $("#type").val() || "hole";
    let formAction = $("#edit").is(":checked") ? "Editar" : "Cadastrar";

    switch (type) {
        case "hole": $(".form-title h2").text(`${formAction} buraco`); break;
        case "manhole": $(".form-title h2").text(`${formAction} tampa de bueiro solta`); break;
        case "tree": $(".form-title h2").text(`${formAction} árvore na rua`); break;
    }
}

function resetForm(type) {
    changeTitle(type);
    $("#name").val("");
    $("#type").val("hole");
    $("#status").val("pending");
    $("#edit").prop("checked", false);
    $("#zipcode").val("");
    $("#useZipCode").prop("checked", true);
    $("#street").val("");
    $("#neighborhood").val("");
    $("#city").val("");
    $("#state").val("");
    $("#error").text("");
    $("#issue-id").val("");
}

function editForm(id) {
    $("#issue-id").val(id);
    let request = new XMLHttpRequest();
    request.open("GET", `get-issue?record=${id}`, true);
    request.setRequestHeader("Content-Type", "application/json");
    request.setRequestHeader("X-CSRFToken", csrftokenMenu);
    request.onload = () => {
        if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
            let issue = JSON.parse(request.response);
            issue = issue.answer;
            $("#name").val(issue.name);
            $("#type").val(issue.type);
            $("#status").val(issue.status);
            $("#edit").prop("checked", true);
            $("#zipcode").val(issue.address.zipCode);
            $("#useZipCode").prop("checked", true);
            $("#street").val(issue.address.street);
            $("#neighborhood").val(issue.address.neighborhood);
            $("#city").val(issue.address.city);
            $("#state").val(issue.address.state);
            $("#error").text("");
            changeTitle(issue.type);
            toggleModal("show", false);
        }
    };

    request.send();
}

function toggleModal(modalAction, reset) {
    if (reset) resetForm(type);
    $("#issue-form").modal(modalAction);
}

function setAddress(cep) {
    let request = new XMLHttpRequest();
    request.open("get", `http://viacep.com.br/ws/${cep}/json/`, true);
    request.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let address = request.responseText || "";
            address = JSON.parse(address);
            $("#street").val(address.logradouro);
            $("#neighborhood").val(address.bairro);
            $("#city").val(address.localidade);
            $("#state").val(address.uf);
            $("#error").text("");
        }
        else if (this.readyState == 4) {
            $("#error").text("Oops... algo deu errado. Verifique se o CEP foi digitado corretamente.");
        }
    };
    request.send();
}

function searchAddress() {
    let useZipCode = $("#useZipCode").is(":checked");
    let cep = $("#zipcode").val() || "";
    cep = cep.replace("-", "");
    $("#zipcode").val(cep);
    if (useZipCode) {
        setAddress(cep);
    }
    else {
        $("#error").text("");
    }
}

function unlockFields() {
    let disable = $("#useZipCode").is(":checked");
    $("#street").prop("disabled", disable);
    $("#neighborhood").prop("disabled", disable);
    $("#city").prop("disabled", disable);
    $("#state").prop("disabled", disable);
}

function userSession() {
    let session = localStorage.getItem('user-session-bv');
    if (session) {
        session = JSON.parse(session);
        return session;
    }

    return { logged: false, "sex": "default" };
}

function setProfilePic() {
    let user = userSession();
    if (!user.logged) {
        $("#menu-pic").attr("href", "login");
        $("#my-issues").toggle("hide");
        $("#issue-btn").toggle("hide");
    }

    $("#menu-pic").html(`<img src="/static/galery/profile-${user.sex}-menu.svg" alt="profile" />`);
}

function getCookieMenu(name) {
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

function sendFormIssue() {
    let session = localStorage.getItem('user-session-bv') || '';
    session = JSON.parse(session);

    const form = { 'address': {}, "sendBy": session.id };
    form.name = $("#name").val();
    form.type = $("#type").val();
    form.status = $("#status").val();
    form.address.street = $("#street").val();
    form.address.neighborhood = $("#neighborhood").val();
    form.address.city = $("#city").val();
    form.address.state = $("#state").val();
    form.address.zipCode = $("#zipcode").val();

    let endpoint = "insert-issue";
    let action = "cadastrado";
    if ($("#edit").is(":checked")) {
        endpoint = "update-issue";
        action = "atualizado";
        form.id = $("#issue-id").val();
    }

    let request = new XMLHttpRequest();
    request.open("POST", endpoint, true);
    request.setRequestHeader("Content-Type", "application/json");
    request.setRequestHeader("X-CSRFToken", csrftokenMenu);
    request.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let issue = request.response || "";
            issue = JSON.parse(issue).answer;
            alert(`Registro ${action} com sucesso`);
            window.location.href = "/";
        }
    };

    let body = JSON.stringify({ data: form });
    request.send(body);
}

const csrftokenMenu = getCookieMenu('csrftoken');