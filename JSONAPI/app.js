const btnCargar = document.querySelector("#cargar");
btnCargar.addEventListener('click', cargarApi)

function cargarApi() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts', true);
    xhr.onload = function() {
        if (this.status === 200) {
            const listado = JSON.parse(this.responseText)
            let html = ``
            listado.forEach(post => {
                html += `
                <h3>${post.title}</h3>
                <p>${post.body}</p>`
            });
            document.querySelector("#listado").innerHTML = html
        }
    }
    xhr.send();
}