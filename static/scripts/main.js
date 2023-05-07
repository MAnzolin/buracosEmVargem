export function appendHtmlContent(page,id){
    if(!page || !id) return;

    const contentReq = new XMLHttpRequest();
    contentReq.open('GET', page, true);
    contentReq.onreadystatechange= function() {
        if (this.readyState!==4) return;
        if (this.status!==200) return;
        if($(`#${id}`))
            $(`#${id}`).append(this.responseText);
    };
    contentReq.send();
}

export function userSession(){
    //return { logged: false, "sex": "default"};
    return {
        "logged": true,
        "name": "Maria da Silva",
        "cpf": "123.456.789-98",
        "username": "maria.d.silva",
        "sex": "woman"
    }
}

class Address {
    constructor(address){
        if(!address || typeof address != "object") address = {};

        this.street = address.street || address.logradouro || "";
        this.neighborhood = address.neighborhood || address.bairro || "";
        this.city = address.city || address.localidade || "";
        this.state = address.state || address.uf || "";
        this.zipCode = address.zipCode || address.cep || "";
    }

    getAddressJSON(){
        return {
            "street": this.street,
            "neighborhood": this.neighborhood,
            "city": this.city,
            "state": this.state,
            "zipCode": this.zipCode,
        }
    }

    getStringAddres(){
        return `${this.street}, ${this.neighborhood}, ${this.city} - ${this.state}, ${this.zipCode}`
    }
}

export class Issue {
    constructor(name, address, photos, type, status, sendBy, createdAt, id){
        let user = userSession();

        this.name = name;
        this.address = new Address(address);
        this.photos = photos && photos.length > 0 ? photos : [];
        this.type = type || "hole";
        this.status = status || "pending";
        this.sendBy = sendBy;
        this.createdAt = new Date(createdAt);
        this.myIssue = sendBy == user.name;
        this.id = id;
    }

    getIssueJSON(){
        return {
            "name": this.name,
            "address": this.address.getAddressJSON(),
            "photos": this.photos
        }
    }

    getPrettyDate(){
        let date = this.createdAt.toLocaleString("pt-BR");
        date = date.slice(0, date.length - 3);
        return  date;
    }

    getIssueHTML(){
        let onclickF = this.myIssue ? `editForm(${this.id})` : "false";
        let faceIcon = this.status == "fixed" ? "happy-face.svg" : "unhappy-face.svg";
        let editable = this.myIssue ? "editable" : "";
        let type = "";
        let typeIcon = "";
        switch (this.type) {
            case "hole": type = "buraco"; typeIcon = "hole-icon.svg"; break;
            case "manhole": type = "tampa de bueiro solta"; typeIcon = "manhole-icon.svg"; break;
            case "tree": type = "árvore na rua"; typeIcon = "tree-icon.svg"; break;
        }

        return `<div class="issue ${this.id} ${editable}" onclick="${onclickF}">
                    <div class="issue__icon">
                        <img src="/static/galery/${typeIcon}" alt="issue icon">
                    </div>
                    <div class="issue__text">
                        <div class="address">${this.address.getStringAddres()}</div>
                        <div class="simple-text">Tipo: ${type}</div>
                        <div class="simple-text">Enviado por: ${this.sendBy}</div>
                        <div class="simple-text">Data de envio: ${this.getPrettyDate()}</div>
                    </div>
                    <div class="issu__status">
                        <img src="/static/galery/${faceIcon}" alt="status">
                    </div>
                </div>`;
    }
}

appendHtmlContent("menu", "menu");