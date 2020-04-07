//Variables
const presupuestoUsuario = prompt('¿Cual e stu presupuesto semanal?');
const formulario = document.querySelector("#agregar-gasto")
let cantidadPresupuesto;
//Clases
class Presupuesto {
    constructor(presupuesto) {
            this.presupuesto = Number(presupuesto);
            this.restante = Number(presupuesto);
        }
        //Metodo presupiesto actual
    presupuestoRestante(cantidad = 0) {
        return this.restante -= Number(cantidad);
    }
}
//Maneja lo relacionado al HTML
class Interfaz {
    insertarPresupuesto(cantidad) {
        const totalSpan = document.querySelector("#total")
        const restanteSpan = document.querySelector("#restante")
            //Insertar al HTML
        totalSpan.innerHTML = `${cantidad}`
        restanteSpan.innerHTML = `${cantidad}`
    }
    imprimirMensaje(mensaje, tipo) {
            const div = document.createElement('div')
            div.classList.add('text-center', 'alert')
            if (tipo === 'error') {
                div.classList.add('alert-danger')
            } else {
                div.classList.add('alert-success')
            }
            div.appendChild(document.createTextNode(mensaje));
            //Insertar en el DOM
            document.querySelector(".primario").insertBefore(div, formulario);
            //Quitar el alert despues de 3s
            setTimeout(() => {
                document.querySelector(".primario .alert").remove();
                formulario.reset();
            }, 3000);
        }
        //Inserta los gatsos a la lista
    agregarGastoListado(nombre, cantidad) {
            const gastosListado = document.querySelector("#gastos ul");
            //Crear li
            const li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between align-items-center';
            //Insertar gasto
            li.innerHTML = `
            ${nombre} 
            <span class="badge badge-primary badge-pill1500">$ ${cantidad}</span>`
                //Insertar al HTML
            gastosListado.appendChild(li)
        }
        //Comprueba el presupuesto restante
    presupuestoRestante(cantidad) {
            const restanteSpan = document.querySelector("#restante");
            //Leemos el presupuetso restante
            const presupuestoRestanteUsuario = cantidadPresupuesto.presupuestoRestante(cantidad);
            restanteSpan.innerHTML = `${presupuestoRestanteUsuario}`
            this.comprobarPresupuesto();
        }
        //Cambia de color el presupuesto restante
    comprobarPresupuesto() {
        const presupuestoTotal = cantidadPresupuesto.presupuesto;
        const presupuestoRestante = cantidadPresupuesto.restante;
        //Comprobar el 25%
        if (presupuestoRestante < (presupuestoTotal * .25)) {
            const restante = document.querySelector(".restante");
            restante.classList.remove('alert-success', 'alert-warning');
            restante.classList.add('alert-danger')
        } else if (presupuestoRestante < (presupuestoTotal * .5)) {
            const restante = document.querySelector(".restante");
            restante.classList.remove('alert-success');
            restante.classList.add('alert-warning')
        }
    }
}
//Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    if (presupuestoUsuario === null || presupuestoUsuario === '') {
        window.location.reload();
    } else {
        //Instanciar un presupuesto
        cantidadPresupuesto = new Presupuesto(presupuestoUsuario);
        //Instanciar la clase de interfaz
        const ui = new Interfaz();
        ui.insertarPresupuesto(cantidadPresupuesto.presupuesto)
    }
})
formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    //Leer del formulario de gastos
    const nombreGasto = document.querySelector("#gasto").value;
    const cantidadGasto = document.querySelector("#cantidad").value;
    //Instanciar la interfaz
    const ui = new Interfaz();
    //Comprobar qu elos camps no esten vacios
    if (nombreGasto === '' || cantidadGasto === '') {
        //2 patametros mensaje y tipo
        ui.imprimirMensaje('Hubo un error, llene todos los campos.', 'error');
    } else {
        //Insertar en el HTML
        ui.imprimirMensaje('Correcto', 'correcto');
        ui.agregarGastoListado(nombreGasto, cantidadGasto);
        ui.presupuestoRestante(cantidadGasto)
    }
})