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

function sendForm(){
    const form = {};
    form.username = $("#username").val();
    form.password = $("#password").val();
    if(!form) return;

    let request = new XMLHttpRequest();
    request.open("POST", "get-session", true);
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
            else{
                alert(response.answer.msg)
            }
        }
    };

    let body = JSON.stringify({data: form})
    request.send(body);
}

function setSession(session){
    session.logged = true;
    localStorage.removeItem('user-session-bv');
    localStorage.setItem('user-session-bv', JSON.stringify(session));
}

const csrftoken = getCookie('csrftoken');