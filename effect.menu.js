const color = {
    'home': '#000',
    'web': '#f00',
    'mobile': '#0f0',
    'blog': '#00f',
    'contacto': '#ff0'
}

let links = document.querySelectorAll('.home ul li a');

for (let link of links) {

    link.addEventListener('click', (e) => {
        markColor();

        title = e.target.getAttribute('title');
        setColorBackground(color[title])
        e.target.style.color = color[title];

        document.querySelector('.container-info').classList.add('show')

        component(datas[title]);
    })
}

function markColor() {
    for (let link of links) link.style.color = "#000";
}

function component(data) {
    const container = document.querySelector('.container').children;
    container[0].textContent = data.title;
    container[1].children[0].innerHTML = data.content;

}