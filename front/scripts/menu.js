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
}

function editForm(id) {

    let issue = {
        "name": "Buraco 1",
        "type": "hole",
        "status": "pending",
        "address": {
            "street": "Rua Bananeira",
            "neighborhood": "Jardim Holanda",
            "city": "Vargem Grande Paulista",
            "state": "SP",
            "zipCode": "00000-000"
        }
    }

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
    if (useZipCode) {
        let cep = $("#zipcode").val() || "";
        cep = cep.replace("-", "");
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
    //return { logged: false, "sex": "default" };
    return {
        "logged": true,
        "name": "Maria da Silva",
        "cpf": "123.456.789-98",
        "username": "maria.d.silva",
        "sex": "woman"
    }
}

function setProfilePic() {
    let user = userSession();
    if (!user.logged){
        $("#menu-pic").attr("href", "login.html");
        $("#my-issues").toggle("hide");
        $("#issue-btn").toggle("hide");
    }

    $("#menu-pic").html(`<img src="/front/galery/profile-${user.sex}-menu.svg" alt="profile" />`);

}