//Variables
const email = document.querySelector("#email");
const asunto = document.querySelector("#asunto");
const mensaje = document.querySelector("#mensaje");
const btnEnviar = document.querySelector("#enviar");
const btnReset = document.querySelector("#resetBtn");
const frm = document.querySelector("#enviar-mail");
//Event Listeners
eventListeners();

function eventListeners() {
    //Inicio de la aplicacion y deshabilitar boton submit
    document.addEventListener('DOMContentLoaded', inicioApp);
    //Campos del formulario
    email.addEventListener('blur', validarCampo);
    asunto.addEventListener('blur', validarCampo);
    mensaje.addEventListener('blur', validarCampo);
    //Clic boton reset
    frm.addEventListener('click', resetFormulario);
    //Enviar email
    frm.addEventListener('submit', enviarEmail);
}

//Funciones
function inicioApp() {
    //Deshabilitar el envio
    btnEnviar.disabled = true;
}
//Valida qu eel campo tenga algo escrito
function validarCampo() {
    //Se valida la longitus del texto y que no este vacio
    validarLongitud(this);
    if (this.type === 'email') {
        validarEmail(this);
    }
    let errores = document.querySelectorAll(".error")
    if (email.value !== '' && asunto.value !== '' && mensaje.value !== '' && errores.length === 0) {
        btnEnviar.disabled = false;
    }
}
//Cunaod se envia wl correo
function enviarEmail(e) {
    //Mostrar spinner al enviar
    const spinnerGif = document.querySelector("#spinner");
    spinnerGif.style.display = 'block';
    // Gif que envia email
    const enviado = document.createElement('img');
    enviado.src = 'img/mail.gif';
    enviado.display = 'block'
        //Ocultar spinner y mostrar gif de enviado
    setTimeout(() => {
        spinnerGif.style.display = 'none';
        document.querySelector("#loaders").appendChild(enviado)
        setTimeout(() => {
            enviado.remove();
            frm.reset();
        }, 5000)
    }, 3000);
    e.preventDefault();
}
//Verifica la longitud del texto en los campos
function validarLongitud(campo) {
    if (campo.value.length > 0) {
        campo.style.borderBottomColor = 'green';
        campo.classList.remove('error');
    } else {
        campo.style.borderBottomColor = 'red';
        campo.classList.add('error');
    }
}

function validarEmail(campo) {
    const mensaje = campo.value;
    if (mensaje.indexOf('@') !== -1) {
        campo.style.borderBottomColor = 'green';
        campo.classList.remove('error');
    } else {
        campo.style.borderBottomColor = 'red';
        campo.classList.add('error');
    }
}
//Resetear el formulario
function resetFormulario(e) {
    e.preventDefault();
    frm.reset();
}