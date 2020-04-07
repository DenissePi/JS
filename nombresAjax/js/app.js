const form = document.querySelector("#generar-nombre")
form.addEventListener('submit', cargarNombres)
    //Llamando Ajax para imprimir resultados
function cargarNombres(e) {
    e.preventDefault();
    //Leer variables
    const origen = document.querySelector("#origen");
    const origenSeleccionado = origen.options[origen.selectedIndex].value;
    const genero = document.querySelector("#genero");
    const generoSeleccionado = genero.options[genero.selectedIndex].value;
    const numero = document.querySelector("#numero").value;
    let url = '';
    url += 'https://uinames.com/api/?'
        //Si hay origen agregarlo a la URL
    if (origenSeleccionado != '') {
        url += `region=${origenSeleccionado}&`
    }
    //Si hay genero agregarlo a la URL
    if (generoSeleccionado != '') {
        url += `gender=${generoSeleccionado}&`
    }
    //Si hay un numero agregarlo a la URL
    if (numero != '') {
        url += `amount=${numero}&`
    }
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onload = function() {
        if (this.status === 200) {
            const nombres = JSON.parse(this.responseText);
            let html = `
            <h2>Nombres generados</h2>
            <ul class="lista">`;
            nombres.forEach(nombre => {
                html += `
                <li>
                    ${nombre.name}
                </li>`
            });
            html += `</ul>`
            document.querySelector("#resultado")
        }
    }
    xhr.send();
}