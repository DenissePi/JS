//Cotizador constructor
function Seguro(marca, anio, tipo) {
    this.marca = marca;
    this.anio = anio;
    this.tipo = tipo;
}
Seguro.prototype.cotizarSeguro = function() {
        /* 
            1 - americano - 1.15
            2 - asiatico - 1.05
            3 - europeo - 1.35
        */
        let cantidad;
        const base = 2000;
        switch (this.marca) {
            case "1":
                cantidad = base * 1.15;
                break;
            case "2":
                cantidad = base * 1.05;
                break;
            case "3":
                cantidad = base * 1.35;
                break;
        }
        //Leer el anio
        const diferencia = max - this.anio;
        //Cada anio de diferencia hay una reduccion del 3% del valor
        cantidad -= cantidad * (diferencia * .03);
        /* 
            Si el seguro es basico se multiplica por 30% mas
            Si es completo se multiplica por 50% más 
        */
        if (this.tipo === 'basico') {
            cantidad += cantidad * .3
        } else {
            cantidad += cantidad * .5
        }
        return cantidad;
    }
    //Todo lo que se muestra
function Interfaz() {}
//Mensaje que se imprime en el HTML
Interfaz.prototype.mostrarMensaje = (mensaje, tipo) => {
        const div = document.createElement('div')
        if (tipo === 'error') {
            div.classList.add('mensaje', 'error');
        } else {
            div.classList.add('mensaje', 'correcto');
        }
        div.innerHTML = `${mensaje}`;
        formulario.insertBefore(div, document.querySelector(".form-group"))
        setTimeout(() => {
            document.querySelector(".mensaje").remove();
        }, 3000)
    }
    //Imprime el resultado de la cotizacion
Interfaz.prototype.mostrarResultado = (seguro, cantidad) => {
    const resultado = document.querySelector('#resultado')
    let marca;
    switch (seguro.marca) {
        case "1":
            marca = 'Americano';
            break;
        case "2":
            marca = 'Asiatico';
            break;
        case "3":
            marca = 'Europeo';
            break;
    }
    //Crea un div
    const div = document.createElement('div');
    //Inserta informacion
    div.innerHTML = `
    <p class="header">Tu resumen:</p>
    <p>Marca: ${marca}</p>
    <p>Año: ${seguro.anio}</p>
    <p>Tipo: ${seguro.tipo}</p>
    <p>Total: $${cantidad}</p>`;
    const spinner = document.querySelector("#cargando img");
    spinner.style.display = 'block'
    setTimeout(() => {
        spinner.style.display = 'none'
        resultado.appendChild(div);
    }, 3000);
}

//Event Listener
const formulario = document.querySelector("#cotizar-seguro");

formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    //Leer la marca del vehiculo seleccionado
    const marca = document.querySelector("#marca");
    const marcaSeleccionada = marca.options[marca.selectedIndex].value;
    //Leer el anio del vehiculo seleccionado
    const anio = document.querySelector("#anio");
    const anioSeleccionada = anio.options[anio.selectedIndex].value;
    //Leer el tipo del vehiculo seleccionado
    const tipo = document.querySelector("input[name='tipo']:checked").value;
    //Crear un instancia de interfaz
    const interfaz = new Interfaz();
    //Revisamos que los campos no esten vacios
    if (marcaSeleccionada === '' || anioSeleccionada === '' || tipo === '') {
        //Interfaz imprimiendo un error
        interfaz.mostrarMensaje('Faltan datos, revisa el formulario y prueba de nuevo.', 'error')
    } else {
        //Eliminar resultado anterior
        const resultados = document.querySelector("#resultado div")
        if (resultados != null) {
            resultados.remove();
        }
        //Instanciar seguro y mostrar interfaz
        const seguro = new Seguro(marcaSeleccionada, anioSeleccionada, tipo);
        //Cotizar el seguro
        const cantidad = seguro.cotizarSeguro();
        //Mostrar el resultado
        interfaz.mostrarResultado(seguro, cantidad)
            //Interfaz imprimiendo un error
        interfaz.mostrarMensaje('Cotizando...', 'exito')
    }
})

const max = new Date().getFullYear(),
    min = max - 20;

const selectAnios = document.querySelector("#anio");
for (let index = max; index > min; index--) {
    let option = document.createElement('option')
    option.value = index
    option.innerHTML = index;
    selectAnios.appendChild(option)
}