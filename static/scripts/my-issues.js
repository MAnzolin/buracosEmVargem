import { Issue } from "./main.js";

function loadIssues() {
    let name = "Buraco 1";
    let photos = [];
    let type = "hole";
    let createdAt = new Date("2020-12-03 00:00:00");
    let address = {
        "street": "Rua Bananeira",
        "neighborhood": "Jardim Holanda",
        "city": "Vargem Grande Paulista",
        "state": "SP",
        "zipCode": "00000-000"
    }

    let item1 = new Issue(name, address, photos, type, "pending", "Maria da Silva", createdAt, "321");
    let item2 = new Issue(name, address, photos, "tree", "fixed", "Maria da Silva", createdAt, "222");
    let issues = [item1, item2];

    issues.forEach(item => {
        $(`#issues-list`).append(item.getIssueHTML());
    })
}

loadIssues();