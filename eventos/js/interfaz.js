class Interfaz {
    constructor() {
            //Inicializa la API
            this.init();
            //Leer el resultado
            this.listado = document.querySelector("#resultado-eventos")
        }
        //Metodo para cuando inicialice la API
    init() {
            this.imprimirCategorias();
        }
        //Imprimir categorias de eventos
    imprimirCategorias() {
            const listaCategorias = eventBride.obtenerCategorias()
                .then(data => {
                    const categorias = data.categorias.categories;
                    //Seleccionar el select categorias
                    const selectCategoria = document.querySelector("#listado-categorias");
                    //Recorrer categorias para imprimirlas
                    categorias.forEach(categoria => {
                        const option = document.createElement('option');
                        option.value = categoria.id;
                        option.appendChild(document.createTextNode(categoria.name_localized));
                        selectCategoria.appendChild(option)
                    });
                })
        }
        //Lee la respuesta de la API e imprimie los resultados
    mostrarEventos(eventos) {
            this.limpiarResultados();
            //Recorrer los eventos
            eventos.forEach(evento => {
                this.listado.innerHTML += `
                <div class="col-md-4 mb-4">
                    <div class="card">
                        <img class="img-fluid mb-2" src="${evento.logo !== null ? evento.logo.url : ''}">
                        <div class="card-body">
                            <div class="card-text">
                                <h2 class="text-center">${evento.name.text}</h2>
                                <p class="leade text-info">
                                    Información del evento
                                </p>
                                <p>
                                    ${evento.description.text.substring(0,200)}...
                                </p>
                                <span class="badge badge-primary">
                                    Capacidad: ${evento.capacity} personas
                                </span>
                                <span class="badge badge-secondary">
                                    Fecha y hora: ${evento.start.local}
                                </span>
                                <a href="${evento.url}" target="_blank" class="btn btn-primary btn-block mt-4">
                                    Comprar boletos
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            `
            });
        }
        //Metodo para imprimir mensajes
    mostrarMensaje(mensaje, clases) {
            const div = document.createElement('div');
            div.classList = clases;
            div.appendChild(document.createTextNode(mensaje));
            //Padre
            const buscadorDiv = document.querySelector("#buscador");
            buscadorDiv.appendChild(div);
            //Quitar alert despues de 3s
            setTimeout(() => {
                this.limpiarMensaje();
            }, 3000);
        }
        //Liampiar resultados previos
    limpiarResultados() {
            this.listado.innerHTML = '';
        }
        //Desaparece el msj en caso que exista
    limpiarMensaje() {
        const alert = document.querySelector(".alert");
        if (alert) {
            alert.remove();
        }
    }
}