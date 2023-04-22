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
    constructor(name, address, photos, type, sendBy, createdAt){
        this.name = name;
        this.address = new Address(address);
        this.photos = photos && photos.length > 0 ? photos : [];
        this.type = type || "hole";
        this.sendBy = sendBy;
        this.createdAt = new Date(createdAt);
    }

    getIssueJSON(){
        return {
            "name": this.name,
            "address": this.address.getAddressJSON(),
            "photos": this.photos
        }
    }

    getPrettyDate(){
        return this.createdAt.toLocaleString("pt-BR")
    }

    getIssueHTML(){
        return `<div class="issue">
                    <div class="issue__icon">
                        <img src="/galery/${this.type}-icon.svg" alt="issue icon">
                    </div>
                    <div class="issue__text">
                        <div class="address">${this.address.getStringAddres()}</div>
                        <div class="simple-text">Enviado por: Maria do Carmo Pereira</div>
                        <div class="simple-text">Data de envio: ${this.getPrettyDate()}</div>
                    </div>
                    <div class="issu__status">
                        <img src="/galery/happy-face.svg" alt="status">
                    </div>
                </div>`;
    }
}

appendHtmlContent("menu.html", "menu");
appendHtmlContent("issue-form.html", "modal-form");