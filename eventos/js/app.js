const eventBride = new EventBrite();
const ui = new Interfaz();

//Listener al buscador
const buscarBtn = document.querySelector("#buscarBtn");
buscarBtn.addEventListener('click', (e) => {
    e.preventDefault();
    //Leer texto del input buscar
    const textoBuscador = document.querySelector("#evento").value;
    //Leer categoria
    const selectCategorias = document.querySelector("#listado-categorias");
    const categoriaSeleccionado = selectCategorias.options[selectCategorias.selectedIndex].value;
    //Revisar que halla lago escrito en el buscado
    if (textoBuscador !== '') {
        //Realizar busqueda
        eventBride.obtenerEventos(textoBuscador, categoriaSeleccionado)
            .then(data => {
                if (data.eventos.events.length > 0) {
                    //Si hay eventos
                    ui.mostrarEventos(data.eventos.events)
                } else {
                    //Si no se encuentran eventos
                    ui.mostrarMensaje('No hay resultados para esta busqueda', 'alert alert-danger mt-4')
                }
            })
    } else {
        //Mostrar msj para que imrpima error
        ui.mostrarMensaje('Escribe algo en el buscador', 'alert alert-danger mt-4')
    }
})