const ui = new UI();

document.addEventListener('DOMContentLoaded', () => {
    ui.mostrarEstablecimientos();
})

//Habilitar búsqueda de establecimientos
const buscador = document.querySelector("#buscar input");
buscador.addEventListener('input', () => {
    let busqueda = buscador.value;
    if (busqueda.length > 3) {
        ui.obtenerSugerencias(busqueda);
    }
})