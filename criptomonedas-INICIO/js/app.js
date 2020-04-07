const api = new API('b1613198a85d36dbaa443516749d0fa369d54cd9a7b8a7d8f182c7e7163990de');
const ui = new Interfaz();

//Leer el formulario
const formulario = document.querySelector("#formulario")

//EventListener
formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    //Leer moneda seleccionada
    const monedaSelect = document.querySelector("#moneda")
    const monedaSeleccionada = monedaSelect.options[monedaSelect.selectedIndex].value;
    //Leer criptomoneda seleccionada
    const criptomonedaSelect = document.querySelector("#criptomoneda")
    const criptomonedaSeleccionada = criptomonedaSelect.options[criptomonedaSelect.selectedIndex].value;
    //Comprobar que ambos campos tengan algo seledcionado
    if (monedaSeleccionada === '' || criptomonedaSeleccionada === '') {
        //Arrojar una alerta de error
        ui.mostrarMensaje('Ambos campos son obligatorios', 'alert bg-danger text-center');
    } else {
        //Todo bien, consultar la api
        api.obtenerValores(criptomonedaSeleccionada, monedaSeleccionada)
            .then(data => {
                ui.mostrarResultado(data.resultado.RAW, monedaSeleccionada, criptomonedaSeleccionada)
            });
    }
})