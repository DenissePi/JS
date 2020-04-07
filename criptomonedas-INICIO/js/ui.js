class Interfaz {
    constructor() {
        this.init();
    }
    init() {
        this.construirSelect();
    }
    construirSelect() {
        api.obtenerMonedasAPI()
            .then(monedas => {
                //Craer un select de opciones
                const select = document.querySelector("#criptomoneda");
                //Iterar resultados de la api
                for (const [key, value] of Object.entries(monedas.monedas.Data)) {
                    //Añadi el simbol y nombre como opciones
                    const opcion = document.createElement('option');
                    opcion.value = value.Symbol;
                    opcion.appendChild(document.createTextNode(value.CoinName))
                    select.appendChild(opcion)
                }
            })
    }
    mostrarMensaje(mensaje, clases) {
            const div = document.createElement('div');
            div.className = clases;
            div.appendChild(document.createTextNode(mensaje))
                //Seleccionar mensajes
            const divMensaje = document.querySelector(".mensajes");
            divMensaje.appendChild(div);
            //Mostrar contenido
            setTimeout(() => {
                document.querySelector(".mensajes div").remove();
            }, 3000);
        }
        //Imprime el resultado de la cotizacion
    mostrarResultado(resultado, moneda, criptomoneda) {
            //En caso de que exista resultado anterior quitarlo
            const resultadoAnterior = document.querySelector("#resultado > div")
            if (resultadoAnterior) {
                resultadoAnterior.remove();
            }
            const datosMoneda = resultado[moneda][criptomoneda];
            //Construr el template
            let templateHtml = `
            <div class="card bg-warning">
                <div class="card-body text-light">
                    <h2 class="card-title">Resultado:</h2>
                    <p>El precio de ${datosMoneda.FROMSYMBOL} a moneda ${datosMoneda.TOSYMBOL} es de: $${datosMoneda.PRICE.toFixed(2)}</p>
                    <p>Variación último día: ${datosMoneda.CHANGEPCTDAY.toFixed(2)}%</p>
                    <p>última actualizacón: ${new Date(datosMoneda.LASTUPDATE * 1000).toLocaleDateString('es-MX')}</p>
                </div>
            </div>
        `;
            this.mostrarSpinner('block');
            setTimeout(() => {
                this.mostrarSpinner('none');
                //Insertar el resultado
                document.querySelector("#resultado").innerHTML = templateHtml;
            }, 3000);
        }
        //Mostrar spinner de carga al enviar para cotizacion
    mostrarSpinner(estilo) {
        const spinner = document.querySelector(".contenido-spinner")
        spinner.style.display = estilo
    }
}