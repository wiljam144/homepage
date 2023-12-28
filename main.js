const img = document.getElementById("img");

const welcome = document.getElementById("welcome");

const tabs = document.querySelectorAll(".tab");

const bookmarks = document.getElementById("bookmarks");

let tab_funcs = [];

function change_image() {
    const images = [
        "./img/anime1.png",
        "./img/anime2.png",
        "./img/anime4.png",
        "./img/anime5.png",
    ]

    img.src = images[Math.floor((Math.random() * images.length))];
}

function get_message() {
    const date = new Date();
    const hour = date.getHours();

    if (hour >= 0 && hour <= 5) {
        return "Good Night";
    }
    else if (hour > 5 && hour <= 12) {
        return "Good Morning";
    }
    else if (hour > 12 && hour <= 20) {
        return "Good Afternoon";
    }
    else if (hour >= 20 && hour <= 23) {
        return "Good Evening";
    }
}

function setup(data) {
    welcome.innerHTML = welcome.innerHTML.replace("{{Message}}", get_message());
    welcome.innerHTML = welcome.innerHTML.replace("{{Name}}", data.name);

    for (let i = 0; i < tabs.length; i++) {
        tabs[i].innerHTML = tabs[i].innerHTML.replace("{{Tab}}", data.tabs[i].name);

        tab_funcs[i] = () => {
            let html = "";

            for (let [key, value] of Object.entries(data.tabs[i].links)) {
                html += `<a href="${value}">${key}</a>`;
            }

            bookmarks.innerHTML = html;
        }

        tabs[i].addEventListener("click", tab_funcs[i], false);
    }
}


fetch("./config.json")
    .then(response => response.json())
    .then(json => setup(json));

change_image();
