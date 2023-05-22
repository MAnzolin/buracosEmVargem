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
    let request = new XMLHttpRequest();
    request.open("GET", "get-all-issues", true);
    request.setRequestHeader("Content-Type", "application/json");
    request.setRequestHeader("X-CSRFToken", csrftoken);
    request.onload = () => {
        if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
            let issues = JSON.parse(request.response);
            issues.forEach(item => {
                let issue = new Issue(item.name,item.address,null,item.issue_type,item.status,item.send_by,item.created_at,item.id)
                $(`#issues-list`).append(issue.getIssueHTML());
            });
        }
    };

    request.send();
}

const csrftoken = getCookie('csrftoken');
loadIssues();