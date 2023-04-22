import { Issue } from "./main.js";

function loadIssues() {
    let name = "Buraco 1";
    let photos = [];
    let type = "hole";
    let sendBy = "Julia Nogueira";
    let createdAt = new Date("2020-12-03 00:00:00");
    let address = {
        "street": "Rua Bananeira",
        "neighborhood": "Jardim Holanda",
        "city": "Vargem Grande Paulista",
        "state": "SP",
        "zipCode": "00000-000"
    }


    let item = new Issue(name, address, photos, type, sendBy, createdAt);
    let issues = [item, item];

    issues.forEach(item => {
        $(`#issues-list`).append(item.getIssueHTML());
    })
}

loadIssues();