const txtBtn = document.querySelector("#txtBtn");
const jsonBtn = document.querySelector("#jsonBtn");
const apiBtn = document.querySelector("#apiBTN");

txtBtn.addEventListener('click', cargarTxt);
jsonBtn.addEventListener('click', cargarJson);
apiBtn.addEventListener('click', cargarApi);

function cargarTxt() {
    fetch('datos.txt')
        .then(res => res.text())
        .then(data => document.querySelector("#resultado").innerHTML = data)
        .catch(error => document.querySelector("#resultado").innerHTML = error)
}

function cargarJson() {
    fetch('empleados.json')
        .then(res => res.json())
        .then(data => {
            let html = ``
            data.forEach(empleado => {
                html += `<li>${empleado.nombre} - ${empleado.puesto}</li>`
            });
            document.querySelector("#resultado").innerHTML = html;
        })
        .catch(error => document.querySelector("#resultado").innerHTML = error)
}

function cargarApi() {
    fetch('https://picsum.photos/v2/list')
        .then(res => res.json())
        .then(data => {
            let html = ``
            data.forEach(imagen => {
                html += `
                <li>
                <a href="${imagen.url}" target="_blank">Ver imagen</a>
                ${imagen.author}
                </li>`
            });
            document.querySelector("#resultado").innerHTML = html;
        })
        .catch(error => document.querySelector("#resultado").innerHTML = error)
}