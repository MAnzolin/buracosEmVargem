import { Issue } from "./main.js";
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
        "zipCode": "00000000"
    }


    let item1 = new Issue(name, address, photos, type, "fixed", "Julia Nogueira", createdAt, "123");
    let item2 = new Issue(name, address, photos, type, "pending", "Maria da Silva", createdAt, "321");
    let item3 = new Issue(name, address, photos, "tree", "fixed", "Maria da Silva", createdAt, "222");
    let item4 = new Issue(name, address, photos, "manhole", "fixed", "Julia Nogueira", createdAt, "111");
    let issues = [item1, item2, item3, item4];


    
    issues.forEach(item => {
        $(`#issues-list`).append(item.getIssueHTML());
    });

    const csrftoken = getCookie('csrftoken');
    
    let http = new XMLHttpRequest();
    http.open("POST", "insert-issues", true);
    http.setRequestHeader("Content-Type", "application/json");
    http.setRequestHeader("X-CSRFToken", csrftoken);
    http.onload = () => {
        if (http.readyState === XMLHttpRequest.DONE && http.status === 200) {
           console.log(http.response);
        }
    };

    let body = JSON.stringify({data: item4})
    http.send(body);

}

loadIssues();